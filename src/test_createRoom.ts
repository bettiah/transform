import { CreateRoomBody, CreateRoomResponse } from './client-server/types';
import { client, doLogin } from './test_client';

let roomId = '';
it('/_matrix/client/r0/createRoom', async () => {
  await doLogin('vm');
  const room: CreateRoomBody = {
    // invite_3pid:[]
  };
  const resp: CreateRoomResponse = await client.createRoom(room);
  console.dir(resp);
  roomId = resp.room_id!;
});
