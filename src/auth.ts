import { UnauthorizedError } from 'routing-controllers';
import { User } from './model';
import { newToken } from './jwt';
import { getRepository } from 'typeorm';
import { ErrorTypes } from './types';
import { normalizeUser, rand } from './utils';
import { redisAsync } from './redis';

const auth = require('passport-local-authenticate');

const config = require('../config.json');
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
  username: string;
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

async function authenticate(
  username: string,
  password: string,
  device_id: string
) {
  const user = await getRepository(User).findOne({ user_id: username });
  if (!user) {
    throw new UnauthorizedError('user does not exist');
  }
  const [_, salt, hash] = user!.password_hash.split('$', 3);

  return new Promise<SignedIn>((resolve, reject) => {
    auth.verify(password, { salt, hash }, passwordOptions, function(
      err: any,
      verified: boolean
    ) {
      if (err || !verified) {
        reject(new UnauthorizedError('bad password')); // bad username or password
      }
      const jwt = newToken(user, device_id);
      const session = {
        device_id,
        uid: user.id!,
        username: user.user_id,
        home_server: user.home_server
      };
      resolve(new SignedIn(jwt, session));
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
  user.home_server = config.server;
  user.user_id = username;
  user.password_hash = pw;
  return getRepository(User).save(user);
}

async function signup(
  username: string,
  password: string,
  device_id: string
): Promise<SignedIn> {
  const exists = await getRepository(User).count({ user_id: username });
  if (exists !== 0) {
    throw new UnauthorizedError(ErrorTypes.M_USER_IN_USE);
  }
  const user = await newUser(username, password);
  const jwt = newToken(user, device_id);
  const session = {
    device_id,
    uid: user.id!,
    username: user.user_id,
    home_server: user.home_server
  };
  return new SignedIn(jwt, session);
}

async function loginOrRegister(
  isLogin: boolean,
  user: string,
  pass: string,
  device_id?: string
): Promise<SignedIn> {
  user = normalizeUser(user);
  device_id = device_id || rand(); // TODO - store, check device_id
  let signedIn;
  if (isLogin) {
    signedIn = await authenticate(user, pass, device_id);
  } else {
    signedIn = await signup(user, pass, device_id);
  }
  const key = `${signedIn.session.home_server}:${user}:${device_id}`;
  // set in redis, overwrite old key
  await redisAsync().setAsync(key, signedIn.session.uid!, 'EX', 24 * 60 * 60);
  return signedIn;
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
