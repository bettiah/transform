import { CreateRoomBody, CreateRoomResponse } from './client-server/types';
import { client, doLogin } from './test_client';
import { expect } from 'chai';

it('/_matrix/client/r0/createRoom', async () => {
  await doLogin('vm');
  const room: CreateRoomBody = {
    room_alias_name: 'xx'
  };
  const resp: CreateRoomResponse = await client.createRoom(room);
  console.dir(resp);
  expect(resp.room_id).to.not.be.empty;
});
