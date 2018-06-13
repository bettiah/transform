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

import { User, Room, RoomAlias } from '../model';
import * as dto from './types';
import { VisibilityType } from '../types';
import { normalizeRoom, normalizeAlias, rand } from '../utils';
import { getRepository } from 'typeorm';
import { StateEventType, CreateRoomEvent } from './events';
import { redisEnque } from '../redis';
const debug = require('debug')('server:createRoom');

@JsonController('')
export class MatrixClientR0CreateRoom {
  @Post('/_matrix/client/r0/createRoom')
  async createRoom(
    @CurrentUser() user: User,
    @Body() body: dto.CreateRoomBody
  ): Promise<dto.CreateRoomResponse> {
    const ts = new Date().getTime();
    // const alias: RoomAlias = body.room_alias_name
    //   ? { id: 0, name: normalizeAlias(body.room_alias_name), room }
    //   : null;
    const room: Room = {
      name: body.name || rand(),
      topic: body.topic || '',
      visibility: body.visibility || VisibilityType.private,
      aliases: [],
      isDirect: body.is_direct || false,
      room_id: normalizeRoom(rand())
      // at least one user ?
      // users: [user]
    };
    // TODO - M_ROOM_IN_USE
    const savedRoom = await getRepository(Room).save(room);
    debug('saved', savedRoom);

    const events: string[] = [];
    // m.room.create event
    const createEvent: CreateRoomEvent = {
      content: { creator: user.user_id, 'm.federate': true },
      type: StateEventType.create,
      event_id: '',
      room_id: savedRoom.room_id,
      sender: user.user_id,
      origin_server_ts: ts,
      state_key: ''
    };
    events.push(`${createEvent.type}`, JSON.stringify(createEvent));
    // TODO events
    // m.room.power_levels
    // presets
    // initial_state
    // name, topic
    // invite, invite3Pid
    // alias?

    // queue events to room
    const ret = await redisEnque('roomevents', events);
    debug('queued', ret);

    // TODO - M_INVALID_ROOM_STATE:
    return { room_id: savedRoom.room_id };
  }
}
