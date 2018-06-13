import { client, doLogin, doRoom } from './test_client';
import { expect } from 'chai';
import { SendMessageResponse } from './client-server/types';
import {
  MsgType,
  MessageEventType,
  StateEventType
} from './client-server/events';

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

    it('sendMessage missing body', async () => {
      const resp: SendMessageResponse = await client.sendMessage(
        roomId,
        MessageEventType.message,
        '1',
        {
          msgtype: MsgType.text
        }
      );
      console.log('sendMessage', resp);
      expect(resp.event_id).is.undefined;
    });

    it('sendMessage bad type', async () => {
      const resp: SendMessageResponse = await client.sendMessage(
        roomId,
        StateEventType.aliases,
        '1',
        {
          msgtype: MsgType.text
        }
      );
      console.log('sendMessage', resp);
      expect(resp.event_id).is.undefined;
    });
  });
});
