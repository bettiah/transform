import 'reflect-metadata';

import { LoginResponse } from './client-server/types';
import { setAuth, client } from './test_client';

it('login', async () => {
  const login: LoginResponse = await client.login({
    type: 'm.login.password',
    user: 'vm',
    password: 'vm'
  });
  console.dir(login);
  setAuth(login.access_token!);
});
