require('dotenv').config();

import { LoginResponse } from './client-server/types';
import { client, doRegister } from './test_client';
import { LoginType } from './types';
import { verifyToken } from './jwt';
import { expect } from 'chai';
import { rand } from './utils';

it('login', async () => {
  const rand_ = rand();

  await doRegister(rand_);

  const login: LoginResponse = await client.login({
    type: LoginType.password,
    user: rand_,
    password: rand_
  });
  console.log('login:', login);
  const token = await verifyToken(login.access_token!);
  console.log('token:', token);
  expect(token).to.not.be.undefined;
  expect(token.user_id.startsWith(`@${rand_}`)).to.be.true;
});
