import 'reflect-metadata';

import { LoginResponse } from './client-server/types';
import { setAuth, client } from './test_client';
import { LoginType } from './types';

it('login', async () => {
  const login: LoginResponse = await client.login({
    type: LoginType.password,
    user: 'vm',
    password: 'vm'
  });
  console.dir(login);
  setAuth(login.access_token!);
});
