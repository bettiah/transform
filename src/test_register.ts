import { rand } from './utils';
import { setAuth, client } from './test_client';
import { RegisterBody } from './dto';
import { expect } from 'chai';

describe('/_matrix/client/r0/register', () => {
  it('2steps ok', async () => {
    const rand_ = rand().slice(-2);

    console.log('register id:', rand_);
    const reg1: RegisterBody = {
      auth: {},
      username: rand_,
      password: rand_
    };
    const result1 = await client.register('', reg1);
    console.log(JSON.stringify(result1, null, 2));
    expect(result1.session).not.null;

    const reg2: RegisterBody = {
      auth: {
        type: 'm.login.dummy',
        session: result1.session
      }
    };
    const result2 = await client.register('', reg2);
    console.dir(result2);
    expect(result2.access_token).is.not.null;
    setAuth(result2.access_token);
  });

  it('1step fail', async () => {
    const reg2: RegisterBody = {
      auth: {
        type: 'm.login.dummy',
        session: 'bad session'
      }
    };
    const result2 = await client.register('', reg2);
    console.dir(result2);
    expect(result2.access_token).to.be.undefined;
  });
});
