import 'reflect-metadata';
require('isomorphic-fetch');
require('isomorphic-form-data');

import { Pretend, Post, Headers } from 'pretend';
import * as Tx from './tss';

class TestCli {
  @Post('/_matrix/client/r0/createRoom')
  async createRoom(
    body: Tx.CreateRoomBody
  ): Promise<Tx.CreateRoomResponse | any> {}
}

async function call() {
  const client = Pretend.builder()
    .requestInterceptor(request => {
      request.options.headers = {
        'Content-Type': 'application/json;charset=UTF-8'
      };
      return request;
    })
    .target(TestCli, 'http://localhost:1234/');

  const result = await client.createRoom({
    invite_3pid: [{ address: '', id_server: '', medium: '' }]
  });
  console.dir(result.errors);
}

call();
