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

import * as dto from './types';
import { RedisKeys, existsInRedis } from '../redis';
import { rand } from '../utils';
import * as events from './events';
import { validate } from 'class-validator';
import { processEvent } from '../roomevents';
import { Session } from '../auth';

const debug = require('debug')('server:sendMessage');

@JsonController('')
export class MatrixClientR0RoomsRoomIdSendEventTypeTxnId {
  @Put('/_matrix/client/r0/rooms/:roomId/send/:eventType/:txnId')
  async sendMessage(
    @Param('roomId') roomId: string,
    @Param('eventType') eventType: string,
    @Param('txnId') txnId: string,
    @Body() body: any,
    @CurrentUser() session: Session
  ): Promise<dto.SendMessageResponse | any> {
    const event_id = rand();
    // validate other event parms
    const event = Object.assign(new events.MessageEvent(), {
      type: eventType,
      event_id,
      room_id: roomId,
      sender: session.user_id,
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

    // basic checks:
    // room exists or is pending
    if (
      (await existsInRedis(RedisKeys.STATE_EVENTS + event.room_id)) ||
      (await existsInRedis(RedisKeys.ROOM_PENDING + event.room_id))
    ) {
    } else {
      throw new BadRequestError(`cannot find room: ${event.room_id}`);
    }
    // TODO - check if user can post message to grp
    // cannot check db as room may not have appeared there yet

    await processEvent(event);

    return { event_id };
  }
}
