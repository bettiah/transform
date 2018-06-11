import 'reflect-metadata';

import { LoginResponse } from './client-server/types';
import { client } from './test_client';
import { LoginType } from './types';
import { verifyToken } from './jwt';
import { expect } from 'chai';

it('login', async () => {
  const login: LoginResponse = await client.login({
    type: LoginType.password,
    user: 'vm',
    password: 'vm'
  });
  const token = verifyToken(login.access_token!);
  console.log('token:', token);
  expect(token).to.not.be.undefined;
  expect(token.user_id.startsWith('@vm')).to.be.true;
});
