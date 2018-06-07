import 'reflect-metadata';

import { Pretend } from 'pretend';
import { MatrixClient } from './cli';
import {
  LoginResponse,
  SyncResponse,
  CreateRoomBody,
  CreateRoomResponse
} from './dto';

describe('user tests', () => {
  let _login: LoginResponse = {};
  let client: MatrixClient = Pretend.builder()
    .requestInterceptor(request => {
      request.options.headers = {
        'Content-Type': 'application/json;charset=UTF-8'
      };
      if (_login.access_token) {
        request.options.headers['Authorization'] = `Bearer ${
          _login.access_token
        }`;
      }
      return request;
    })
    .target(MatrixClient, 'http://localhost:8008/');

  it('login', async () => {
    const login: LoginResponse = await client.login({
      type: 'm.login.password',
      user: 'u1',
      password: 'u1'
    });
    console.dir(login);
    _login = login;
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
