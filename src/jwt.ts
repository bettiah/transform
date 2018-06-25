import * as jwt from 'jsonwebtoken';

import { User } from './model';

// const JWT_ALGORITHM = 'HS256'; // default

export interface JwtSigned {
  home_server: string;
  user_id: string;
  device_id: string;
}

export function verifyToken(token: string) {
  return new Promise<JwtSigned>((resolve, reject) => {
    jwt.verify(token, process.env.JWT_SECRET as string, (error, decoded) => {
      if (error) {
        reject(error);
        return;
      }
      resolve(decoded as JwtSigned);
    });
  });
}

export function newToken(user: User, deviceId: string): string {
  return jwt.sign(
    {
      home_server: user.home_server,
      user_id: user.user_id,
      device_id: deviceId
    },
    process.env.JWT_SECRET as string,
    { expiresIn: process.env.JWT_EXP_DELTA_SECONDS }
  );
}
