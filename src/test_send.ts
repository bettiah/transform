import { client, doLogin, doRoom } from './test_client';
import { expect } from 'chai';
import { SendMessageResponse } from './client-server/types';
import { MsgType, MessageEventType } from './client-server/events';

describe('Send Message', async () => {
  let roomId = '';

  before(async function() {
    await doLogin('vm');
    roomId = await doRoom('');
  });

  describe('Tests all', function() {
    it('sendMessage', async () => {
      const resp: SendMessageResponse = await client.sendMessage(
        roomId,
        MessageEventType.message,
        '1',
        {
          body: 'hello',
          msgtype: MsgType.text
        }
      );
      console.log('sendMessage', resp);
      expect(resp.event_id).is.not.empty;
    });

    it('sendMessage Bad', async () => {
      const resp: SendMessageResponse = await client.sendMessage(
        roomId,
        MessageEventType.message,
        '1',
        {
          msgtype: MsgType.text
        }
      );
      console.log('sendMessage', resp);
      expect(resp.event_id).is.not.empty;
    });
  });
});
