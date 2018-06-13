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
    const ts = Date.now();
    const room_id = normalizeRoom(rand());

    // TODO - check if room can be created by user

    // save to db here
    // otherwise we can have a race condition where multiple users try and create same room
    // visibility & isDirect cannot be accomodated in events
    // TODO - file bug
    // TODO - M_ROOM_IN_USE if alias already exists
    const room: Room = {
      name: body.name,
      topic: body.topic,
      visibility: body.visibility || VisibilityType.private,
      aliases: body.room_alias_name
        ? [{ name: normalizeAlias(body.room_alias_name) }]
        : [],
      isDirect: body.is_direct || false,
      room_id,
      // at least one user ?
      users: [user]
    };
    const savedRoom = await getRepository(Room).save(room);
    debug('saved', savedRoom);

    const events: string[] = [];
    // m.room.create event
    const createEvent = Object.assign(new CreateRoomEvent(), {
      content: { creator: user.user_id, 'm.federate': true },
      type: StateEventType.create,
      event_id: rand(),
      room_id,
      sender: user.user_id,
      origin_server_ts: ts,
      state_key: ''
    });
    events.push(`${createEvent.type}`, JSON.stringify(createEvent));

    // queue events to roomevents
    const roomevents = await redisEnque('roomevents', events);
    debug('roomevents queued', roomevents);

    // queue to room
    // TODO events
    // m.room.power_levels
    // presets
    // initial_state
    // name, topic
    // invite, invite3Pid
    // alias?
    const q = await redisEnque(`${room_id}`, events);
    debug(`${room_id} queued`, q);

    // TODO - M_INVALID_ROOM_STATE:
    return { room_id };
  }
}
