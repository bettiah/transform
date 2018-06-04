import 'reflect-metadata';

import { Pretend } from 'pretend';
import { MatrixClient } from './cli';
import { CreateRoomBody } from './dto';

describe('Client Tests', () => {
  let client: MatrixClient = Pretend.builder()
    .requestInterceptor(request => {
      request.options.headers = {
        'Content-Type': 'application/json;charset=UTF-8'
      };
      return request;
    })
    .target(MatrixClient, 'http://localhost:1234/');

  it('should respond with all users', async done => {
    // const room = new CreateRoomBody();
    // room.invite_3pid = [{ address: '', id_server: '', medium: '' }];
    const result = await client.createRoom({
      invite_3pid: [{ address: '', id_server: '', medium: '' }]
    });

    done(result);
  });
});
