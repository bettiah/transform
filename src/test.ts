import 'reflect-metadata';

import {
  CreateRoomBody,
  RegisterBody,
  GetVersionsResponse,
  CreateRoomResponse,
  SetRoomStateResponse,
  StateEventResponse,
  SendMessageResponse
} from './client-server/dto';
import { rand } from './utils';
import { setAuth, client } from './test_client';

describe('Client Tests', () => {
  it('/_matrix/client/versions', async () => {
    const res: GetVersionsResponse = await client.getVersions();
    console.dir(res);
  });

  it('/_matrix/client/r0/register', async () => {
    const rand_ = rand().slice(-2);

    console.log('register id:', rand_);
    const reg1: RegisterBody = {
      auth: { type: 'ad' },
      username: rand_,
      password: rand_
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
    setAuth(result2.access_token);
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
