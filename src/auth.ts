import { UnauthorizedError } from 'routing-controllers';
import { User } from './model';
import { newToken } from './jwt';
import { getRepository } from 'typeorm';
import { ErrorTypes } from './types';
import { normalizeUser, rand } from './utils';
import { redisAsync } from './redis';

const auth = require('passport-local-authenticate');

const debug = require('debug')('server:auth');

const passwordOptions = {
  digestAlgorithm: 'SHA256',
  iterations: 50000,
  keylen: 32,
  saltlen: 8,
  encoding: 'hex'
};

export interface Session {
  uid: number;
  user_id: string;
  home_server: string;
  device_id: string;
}

export class SignedIn {
  jwt!: string;
  session!: Session;
  constructor(jwt: string, session: Session) {
    this.jwt = jwt;
    this.session = session;
  }
}

async function authenticate(username: string, password: string) {
  const user = await getRepository(User).findOne({ user_id: username });
  if (!user) {
    throw new UnauthorizedError('user does not exist');
  }
  const [_, salt, hash] = user!.password_hash.split('$', 3);

  return new Promise<User>((resolve, reject) => {
    auth.verify(password, { salt, hash }, passwordOptions, function(
      err: any,
      verified: boolean
    ) {
      if (err || !verified) {
        reject(new UnauthorizedError('bad username or password'));
        return;
      }
      resolve(user);
    });
  });
}

function hashPassword(password: string) {
  return new Promise<string>((resolve, reject) => {
    auth.hash(password, passwordOptions, (error: any, hashed: any) => {
      if (error) {
        reject('bad username or password');
      }
      const { salt, hash } = hashed;
      resolve(`pbkdf2:sha256:${passwordOptions.iterations}$${salt}$${hash}`);
    });
  });
}

export async function newUser(
  username: string,
  password: string
): Promise<User> {
  const pw = await hashPassword(password);
  let user = new User();
  user.home_server = process.env.HOMSERVER_NAME as string;
  user.user_id = username;
  user.password_hash = pw;
  return getRepository(User).save(user);
}

async function signup(username: string, password: string): Promise<User> {
  const exists = await getRepository(User).count({ user_id: username });
  if (exists !== 0) {
    throw new UnauthorizedError(ErrorTypes.M_USER_IN_USE);
  }
  return newUser(username, password);
}

async function loginOrRegister(
  isLogin: boolean,
  user_id: string,
  pass: string,
  device_id?: string
): Promise<SignedIn> {
  user_id = normalizeUser(user_id);
  device_id = device_id || rand(); // TODO - store, check device_id
  let user;
  if (isLogin) {
    user = await authenticate(user_id, pass);
  } else {
    user = await signup(user_id, pass);
  }
  const jwt = newToken(user, device_id);
  const session = {
    device_id,
    uid: user.id!,
    user_id: user.user_id,
    home_server: user.home_server
  };
  const signedInUser = new SignedIn(jwt, session);

  // set in redis, overwrite old key
  await redisAsync().setAsync(
    `${signedInUser.session.home_server}:${user_id}:${device_id}`,
    signedInUser.session.uid!,
    'EX',
    process.env.JWT_EXP_DELTA_SECONDS
  );
  return signedInUser;
}

export async function loginUser(
  user: string,
  pass: string,
  device_id?: string
): Promise<SignedIn> {
  return loginOrRegister(true, user, pass, device_id);
}

export async function registerUser(
  user: string,
  pass: string,
  device_id?: string
): Promise<SignedIn> {
  return loginOrRegister(false, user, pass, device_id);
}
