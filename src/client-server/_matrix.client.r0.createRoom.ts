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
  UnauthorizedError
} from 'routing-controllers';

import { User } from '../model';
import * as dto from './types';
import { ErrorTypes } from '../types';
import { normalizeRoom, normalizeAlias, rand } from '../utils';
import { StateEventType, CreateRoomEvent } from './events';
import { redisEnque, redisAsync } from '../redis';

const debug = require('debug')('server:createRoom');

@JsonController('')
export class MatrixClientR0CreateRoom {
  @Post('/_matrix/client/r0/createRoom')
  async createRoom(
    @CurrentUser() user: User,
    @Body() body: dto.CreateRoomBody
  ): Promise<dto.CreateRoomResponse> {
    // TODO - check if room can be created
    // by user:power
    // by config

    // Room can be identified uniquely by alias, if supplied
    const alias = body.room_alias_name
      ? normalizeAlias(body.room_alias_name)
      : null;
    const room_id = normalizeRoom(rand());

    if (alias) {
      // check and set room:alias -> id
      // otherwise we can have a race condition where multiple users try and create same room
      const roomKey = `alias:${alias}`;
      const canSet = await redisAsync().setAsync(roomKey, [room_id, 'NX']);
      debug('set', roomKey, canSet);
      if (!canSet) {
        throw new BadRequestError(ErrorTypes.M_ROOM_IN_USE);
      }
    }

    // save body
    await redisAsync().setAsync(`pending:room:${room_id}`, [
      JSON.stringify(body)
    ]);

    const ts = Date.now();
    const events: string[] = [];
    // m.room.create event
    // visibility & isDirect cannot be accomodated in events TODO - file bug
    const createEvent: CreateRoomEvent = {
      content: { creator: user.user_id, 'm.federate': true },
      type: StateEventType.create,
      event_id: rand(),
      room_id,
      sender: user.user_id,
      origin_server_ts: ts,
      state_key: ''
    };
    // validate before adding to Q?
    events.push(`${createEvent.type}`, JSON.stringify(createEvent));

    // queue events to roomevents, so that we can start watching the room Q
    const roomevents = await redisEnque('roomevents', events);
    debug('roomevents queued', roomevents);

    // TODO - M_INVALID_ROOM_STATE:
    return { room_id };
  }
}
