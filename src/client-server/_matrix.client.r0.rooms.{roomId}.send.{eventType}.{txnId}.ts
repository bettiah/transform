import {
  JsonController,
  Authorized,
  Post,
  Body,
  Get,
  Put,
  Delete,
  Param,
  HttpError,
  NotFoundError,
  BadRequestError,
  CurrentUser,
  QueryParam,
  HeaderParam,
  UnauthorizedError,
  ForbiddenError
} from 'routing-controllers';

import { User } from '../model';
import * as dto from './types';
import { redisEnque, RedisKeys } from '../redis';
import { rand } from '../utils';
import * as events from './events';
import { validate } from 'class-validator';

const debug = require('debug')('server:sendMessage');

@JsonController('')
export class MatrixClientR0RoomsRoomIdSendEventTypeTxnId {
  @Put('/_matrix/client/r0/rooms/:roomId/send/:eventType/:txnId')
  async sendMessage(
    @CurrentUser() user: User,
    @Param('roomId') roomId: string,
    @Param('eventType') eventType: string,
    @Param('txnId') txnId: string,
    @Body({ required: true })
    body: any
  ): Promise<dto.SendMessageResponse | any> {
    const event_id = rand();
    // validate other event parms
    const event = Object.assign(new events.MessageEvent(), {
      type: eventType,
      event_id,
      room_id: roomId,
      sender: user.user_id,
      origin_server_ts: Date.now()
    });
    // validate content
    let content;
    switch (eventType) {
      case events.MessageEventType.redaction:
        content = Object.assign(new events.RedactionEventContent(), body);
        break;
      case events.MessageEventType.message:
        switch (body.msgtype) {
          case events.MsgType.text:
            content = Object.assign(new events.TextEventContent(), body);
            break;
          case events.MsgType.emote:
            content = Object.assign(new events.EmoteEventContent(), body);
            break;
          case events.MsgType.notice:
            content = Object.assign(new events.NoticeEventContent(), body);
            break;
          case events.MsgType.image:
            content = Object.assign(new events.ImageEventContent(), body);
            break;
          case events.MsgType.file:
            content = Object.assign(new events.FileEventContent(), body);
            break;
          case events.MsgType.location:
            content = Object.assign(new events.LocationEventContent(), body);
            break;
          case events.MsgType.video:
            content = Object.assign(new events.VideoEventContent(), body);
            break;
          case events.MsgType.audio:
            content = Object.assign(new events.AudioEventContent(), body);
            break;
          default:
            throw new BadRequestError(
              `Bad Message request type: ${body.msgtype}`
            );
        }
        break;
      case events.MessageEventType.feedback:
        content = Object.assign(new events.FeedbackEventContent(), body);
        break;
      // TODO - call types
    }
    event.content = content;
    if (txnId) {
      event.unsigned = { transaction_id: txnId };
    }
    // validate event
    const errors = await validate(event);
    if (errors.length !== 0) {
      debug(errors);
      throw new BadRequestError(errors.map(it => it.toString()).join(','));
    }

    // TODO - check if user can post message
    // queue event to room
    const ret = await redisEnque(RedisKeys.ROOM_EVENTS, [
      `${eventType}`,
      JSON.stringify(event)
    ]);
    debug('queued', ret);
    return { event_id };
  }
}
