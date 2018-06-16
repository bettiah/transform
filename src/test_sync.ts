import { doLogin, client } from './test_client';

describe('sync', async () => {
  before(async function() {
    // await doLogin('vm');
  });

  describe('Tests all', function() {
    it('sync', async () => {
      const sync = await client.sync('', '', true, '', 0);
      console.log('sync', sync);
    });
  });
});
