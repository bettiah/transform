import { rand } from './utils';
import { setAuth, client } from './test_client';
import { RegisterBody } from './dto';

it('/_matrix/client/r0/register', async () => {
  const rand_ = rand().slice(-2);

  console.log('register id:', rand_);
  const reg1: RegisterBody = {
    auth: {},
    username: rand_,
    password: rand_
  };
  const result1 = await client.register('', reg1);
  console.log(JSON.stringify(result1, null, 2));

  const reg2: RegisterBody = {
    auth: {
      type: 'm.login.dummy',
      session: result1.session
    }
  };
  const result2 = await client.register('', reg2);
  console.dir(result2);
  setAuth(result2.access_token);
});
