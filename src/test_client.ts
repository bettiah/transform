import 'reflect-metadata';

import { Pretend } from 'pretend';
import { MatrixClient } from './client-server/cli';
import {
  LoginResponse,
  CreateRoomBody,
  CreateRoomResponse,
  RegisterBody,
  SendMessageResponse
} from './client-server/types';
import { LoginType } from './types';
import { MessageEventType, MsgType } from './client-server/events';

let auth = '';
let room = '';
export const setAuth = (_auth: string) => (auth = _auth);
export const setRoom = (_room: string) => (room = _room);

export const client: MatrixClient = Pretend.builder()
  .requestInterceptor(request => {
    request.options.headers = {
      'Content-Type': 'application/json;charset=UTF-8',
      Connection: 'keep-alive'
    };
    if (auth) {
      request.options.headers['Authorization'] = `Bearer ${auth}`;
    }
    return request;
  })
  // .target(MatrixClient, 'http://localhost:8008/');
  .target(MatrixClient, 'http://localhost:1234/');

export async function doRegister(user: string) {
  const reg1: RegisterBody = {
    auth: { type: '' },
    username: user,
    password: user
  };
  const result1 = await client.register('user', reg1);
  console.log(JSON.stringify(result1, null, 2));

  const reg2: RegisterBody = {
    auth: {
      type: LoginType.dummy,
      session: result1.session
    },
    username: user,
    password: user
  };
  const result2 = await client.register('user', reg2);
  console.dir(result2);
  if (!result2.access_token) {
    throw new Error('missing token, no logon');
  }
  setAuth(result2.access_token);
  return result2.user_id;
}

export async function doLogin(user: string) {
  const login: LoginResponse = await client.login({
    type: LoginType.password,
    user: user,
    password: user
  });
  if (!login.access_token) {
    throw 'unable to login as: ' + user;
  }
  setAuth(login.access_token!);
}

export async function doRoom(name: string) {
  const room: CreateRoomBody = {
    name
  };
  const resp: CreateRoomResponse = await client.createRoom(room);
  if (!resp.room_id) {
    throw 'unable to create room';
  }
  setRoom(resp.room_id!);
  return resp.room_id;
}

export async function doSend(roomId: string, msg: string) {
  const resp: SendMessageResponse = await client.sendMessage(
    roomId,
    MessageEventType.message,
    '1',
    {
      msgtype: MsgType.text,
      body: msg
    }
  );
  if (!resp.event_id) {
    throw 'unable to send message';
  }
  return resp.event_id;
}
