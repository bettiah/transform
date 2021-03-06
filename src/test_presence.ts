import { client, doRegister } from './test_client';
import { rand } from './utils';
import { expect } from 'chai';

describe('/_matrix/client/r0/presence', async () => {
  let user = '';
  before(async function() {
    user = await doRegister(rand());
  });

  describe('all', async () => {
    it('set', async () => {
      await client.setPresence(user, { presence: 'online', status_msg: 'HI' });
    });

    it('get', async () => {
      const pr = await client.getPresence(user);
      expect(pr).to.have.all.keys('presence', 'status_msg', 'last_active_ago');
    });
  });
});
