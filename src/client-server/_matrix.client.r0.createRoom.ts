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

import * as dto from './types';
import { Session } from '../auth';
import { normalizeAlias, normalizeRoom, rand } from '../utils';
import { RedisKeys, redisAsync } from '../redis';
import { ErrorTypes } from '../types';
import { CreateRoomEvent, StateEventType, MemberEvent } from './events';
import { processEvent } from '../roomevents';

const debug = require('debug')('server:createRoom');

@JsonController('')
export class MatrixClientR0CreateRoom {
  @Post('/_matrix/client/r0/createRoom')
  async createRoom(
    @CurrentUser() session: Session,
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
      const roomKey = RedisKeys.ROOM_ALIAS + alias;
      const canSet = await redisAsync().setAsync(roomKey, [room_id, 'NX']);
      debug('set', roomKey, canSet);
      if (!canSet) {
        throw new BadRequestError(ErrorTypes.M_ROOM_IN_USE);
      }
    }

    // save body
    await redisAsync().setAsync(RedisKeys.ROOM_PENDING + room_id, [
      JSON.stringify(body)
    ]);

    const ts = Date.now();
    // m.room.create event
    // visibility & is_direct cannot be accomodated in events TODO - file bug
    const createEvent: CreateRoomEvent = {
      content: { creator: session.user_id, 'm.federate': true },
      type: StateEventType.create,
      event_id: rand(),
      room_id,
      sender: session.user_id,
      origin_server_ts: ts,
      state_key: ''
    };

    await processEvent(createEvent);

    // creator joins automatically
    const joinEvent: MemberEvent = {
      content: { membership: 'join' },
      type: StateEventType.member,
      event_id: rand(),
      state_key: session.user_id,
      room_id,
      sender: session.user_id,
      origin_server_ts: Date.now()
    };
    await processEvent(joinEvent);

    // queue to room
    // TODO events
    // presets
    // initial_state
    // name, topic
    // invite3Pid
    // alias?

    // m.room.power_levels
    // const power: PowerLevelsEvent = {
    //   content:
    // };
    // await processEvent(power);

    // m.room.join_rules
    // TODO - M_INVALID_ROOM_STATE:

    // m.room.history_visibility
    // m.room.guest_access

    // invite initial lot
    const invitees = body.invite || [];
    for (const invitee of invitees) {
      const inviteEvent: MemberEvent = {
        content: { membership: 'invite', is_direct: body.is_direct },
        type: StateEventType.member,
        event_id: rand(),
        state_key: invitee,
        room_id,
        sender: session.user_id,
        origin_server_ts: Date.now()
      };
      await processEvent(inviteEvent);
    }

    return { room_id };
  }
}
