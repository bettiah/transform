import { doRoom, client, doRegister } from './test_client';
import { SyncResponse } from './client-server/types';
import { getRepository } from 'typeorm';
import { UserInRoom, RoomAlias, User, Room, initDb } from './model';

describe('Send Message', async () => {
  before(async function() {
    await initDb();
    // remove everything from room & room-alias
    await getRepository(UserInRoom).clear();
    await getRepository(RoomAlias).clear();
    await getRepository(User).clear();
    await getRepository(Room).clear();

    console.log('init');
    await doRegister('vm');
  });

  describe('Tests all', function() {
    beforeEach(async () => {});

    it('sendMessage', async () => {
      await doRoom('room1');
      const resp: SyncResponse = await client.sync('', '', true, '', 0);
      console.dir(resp);
    });
  });
});
