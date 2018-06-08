import 'reflect-metadata';

import { LoginResponse, SyncResponse } from './dto';
import { setAuth, client } from './test_client';

describe('user tests', () => {
  it('login', async () => {
    const login: LoginResponse = await client.login({
      type: 'm.login.password',
      user: 'u1',
      password: 'u1'
    });
    console.dir(login);
    setAuth(login.access_token!);
  });

  //   let roomId = '';
  //   it('/_matrix/client/r0/createRoom', async () => {
  //     const room: CreateRoomBody = {
  //       // invite_3pid:[]
  //     };
  //     const resp: CreateRoomResponse = await client.createRoom(room);
  //     console.dir(resp);
  //     roomId = resp.room_id!;
  //   });

  it('sync', async () => {
    const sync: SyncResponse = await client.sync('', '', true, '', 0);
    console.dir(sync);
    console.dir(sync.rooms!.join);
  });
});
