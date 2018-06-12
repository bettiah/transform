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

import { User, Room } from '../model';
import * as dto from './types';
import { redisAsync, redisEnque, validateRequest } from '../utils';
import * as events from './events';
import { Validator, validate } from 'class-validator';
const debug = require('debug')('server:sendMessage');

const validator = new Validator();

@JsonController('')
export class MatrixClientR0RoomsRoomIdSendEventTypeTxnId {
  @Put('/_matrix/client/r0/rooms/:roomId/send/:eventType/:txnId')
  async sendMessage(
    @CurrentUser() user: User,
    @Param('roomId') roomId: string,
    @Param('eventType') eventType: events.MessageEventType,
    @Param('txnId') txnId: string,
    @Body({ required: true })
    body: any
  ): Promise<dto.SendMessageResponse | any> {
    // const rooms = await user.rooms;
    // const room = rooms.find(it => {
    //   return it.room_id === roomId;
    // });
    // make sure user has access to room
    // if (!room) {
    //   throw new ForbiddenError();
    // }

    // validate event type
    if (!validator.isIn(eventType, Object.values(events.MessageEventType))) {
      throw new BadRequestError('not a message event');
    }
    // validate other event parms
    const event = new events.RoomEvent();
    event.type = eventType;
    event.event_id = '';
    event.room_id = roomId;
    event.sender = user.user_id;
    event.origin_server_ts = new Date().getTime();
    await validateRequest(event);
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
    await validateRequest(content);
    event.content = content;
    // queue event to room
    const ret = await redisEnque('roomevents', ['msg', JSON.stringify(event)]);
    return { event_id: ret };
  }
}
