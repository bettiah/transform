import { doLogin, doRoom, client } from './test_client';
import { SyncResponse } from './client-server/types';

describe('Send Message', async () => {
  before(async function() {
    await doLogin('vm');
  });

  describe('Tests all', function() {
    it('sendMessage', async () => {
      const resp: SyncResponse = await client.sync('', '', true, '', 0);
      console.dir(resp);
    });
  });
});
