import * as jwt from 'jsonwebtoken';

import { User } from './model';

const JWT_SECRET = 'secret';
const JWT_ALGORITHM = 'HS256';
const JWT_EXP_DELTA_SECONDS = 60 * 60 * 60;

export function verifyToken(token: string): any {
  return jwt.verify(token, JWT_SECRET, {
    algorithms: [JWT_ALGORITHM]
  });
}

export function newToken(user: User, deviceId: string): string {
  return jwt.sign(
    {
      home_server: user.home_server,
      user_id: user.user_id,
      device_id: deviceId
    },
    JWT_SECRET,
    { expiresIn: JWT_EXP_DELTA_SECONDS }
  );
}
