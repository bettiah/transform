import 'reflect-metadata';

import { Pretend } from 'pretend';
import { MatrixClient } from './cli';
import {
  CreateRoomBody,
  RegisterBody,
  GetVersionsResponse,
  CreateRoomResponse,
  SetRoomStateResponse,
  StateEventResponse,
  SendMessageResponse
} from './dto';

let auth = '';

describe('Client Tests', () => {
  let client: MatrixClient = Pretend.builder()
    .requestInterceptor(request => {
      request.options.headers = {
        'Content-Type': 'application/json;charset=UTF-8'
      };
      if (auth) {
        request.options.headers['Authorization'] = `Bearer ${auth}`;
      }
      return request;
    })
    .target(MatrixClient, 'http://localhost:8008/');
  // .target(MatrixClient, 'http://localhost:1234/');

  it('/_matrix/client/versions', async () => {
    const res: GetVersionsResponse = await client.getVersions();
    console.dir(res);
  });

  it('/_matrix/client/r0/register', async () => {
    const rand = Math.random()
      .toString(36)
      .substring(2)
      .slice(-2);

    console.log('register id:', rand);
    const reg1: RegisterBody = {
      username: rand,
      password: rand
    };
    const result1 = await client.register('', reg1);
    console.log(JSON.stringify(result1, null, 2));

    const reg2: RegisterBody = {
      auth: {
        type: 'm.login.dummy',
        session: result1.session
      }
    };
    const result2 = await client.register('', reg2);
    console.dir(result2);
    auth = result2.access_token;
  });

  let roomId = '';
  it('/_matrix/client/r0/createRoom', async () => {
    const room: CreateRoomBody = {
      // invite_3pid:[]
    };
    const resp: CreateRoomResponse = await client.createRoom(room);
    console.dir(resp);
    roomId = resp.room_id!;
  });

  it('setRoomState', async () => {
    const resp: SetRoomStateResponse = await client.setRoomState(
      roomId,
      'ev.type1',
      { ev: 1 }
    );
    console.dir(resp);
  });

  it('getRoomState', async () => {
    const events: StateEventResponse[] = await client.getRoomState(roomId);
    console.dir(events);
  });

  it('sendMessage - timeline event', async () => {
    const resp: SendMessageResponse = await client.sendMessage(
      roomId,
      'm.room.message',
      '1',
      {
        body: 'hello',
        msgtype: 'm.text'
      }
    );
    console.dir(resp);
  });

  it('sync', async () => {
    const resp = await client.sync(roomId, '', true, '', 0);
    console.log(JSON.stringify(resp, null, 2));
  });
});
