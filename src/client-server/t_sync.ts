import { initDb } from '../model';
import { rand } from '../utils';
import { doRoom, client, doRegister, doSend } from '../test_client';
import { SyncResponse } from './types';

async function main() {
  await initDb();
  await doRegister(rand());

  const room = await doRoom('room1');
  await doSend(room, 'hello');
  let resp: SyncResponse = await client.sync('', '', true, 'online', 10);
  console.log('r1', JSON.stringify(resp));

  while (true) {
    // await doSend(room, 'hello:' + resp.next_batch!);
    resp = await client.sync('', resp.next_batch!, false, '', 10000);
    console.log('r2', JSON.stringify(resp));
  }
}

main();
