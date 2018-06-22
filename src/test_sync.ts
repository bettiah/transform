import { doRoom, client, doRegister, doSend } from './test_client';
import { SyncResponse } from './client-server/types';
import { getRepository } from 'typeorm';
import { UserInRoom, RoomAlias, User, Room, initDb } from './model';
import { rand } from './utils';

describe('Send Message', async () => {
  before(async function() {
    await initDb();
    // remove everything from room & room-alias
    await getRepository(UserInRoom).clear();
    await getRepository(RoomAlias).clear();
    await getRepository(User).clear();
    await getRepository(Room).clear();

    console.log('init');
    await doRegister(rand());
  });

  describe('Tests all', function() {
    beforeEach(async () => {});

    it('sync', async () => {
      const room = await doRoom('room1');
      await doSend(room, 'hello');
      const resp: SyncResponse = await client.sync('', '', true, 'online', 10);
      console.log('r1', JSON.stringify(resp));

      const resp2: SyncResponse = await client.sync(
        '',
        resp.next_batch!,
        false,
        '',
        10
      );
      console.log('r2', JSON.stringify(resp2));
    });
  });
});
