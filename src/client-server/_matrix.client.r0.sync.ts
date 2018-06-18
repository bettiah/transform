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
import { User, userRooms, userRooms2 } from '../model';
import { ErrorTypes } from '../types';
import { redisRange, RedisKeys } from '../redis';

const debug = require('debug')('server:sync');

@JsonController('')
export class MatrixClientR0Sync {
  @Get('/_matrix/client/r0/sync')
  async sync(
    @QueryParam('filter') filter: string,
    @QueryParam('since') since: string,
    @QueryParam('full_state') fullState: boolean,
    @QueryParam('set_presence') setPresence: string,
    @QueryParam('timeout') timeout: number,
    @CurrentUser() user: User
  ): Promise<dto.SyncResponse | any> {
    // TODO - timeout, set_presence, filter
    fullState = fullState || false;
    // find user's rooms
    const usersRooms = await userRooms2(user);
    debug(usersRooms);

    const resp = new dto.SyncResponse();
    resp.rooms = new dto.RoomsResponse();
    // TODO - invite & leave
    const joined: dto.Join = {};
    for (let room of usersRooms) {
      let joinedRoom: dto.JoinedRoom = {
        state: { events: [] },
        timeline: { events: [], limited: false, prev_batch: '' }
      };
      const room_id = room.room!.room_id;
      // user's timeline in room
      let startAt = since;
      if (!startAt) {
        // without since : recent messages & state since start of timeline
        startAt = room.timeline;
      } else {
        // make sure 'since' is after room.timeline
        if (startAt < room.timeline) {
          startAt = room.timeline;
        }
      }
      let states: any;
      if (fullState) {
        // state all
        states = await redisRange(RedisKeys.STATE_EVENTS + room_id, '-');
      } else {
        // state since
        states = await redisRange(RedisKeys.STATE_EVENTS + room_id, startAt);
      }
      for (let [_ts, evt] of flattenEvents(states)) {
        joinedRoom.state!.events!.push(evt);
      }
      // timeline : startAt
      const timeline = await redisRange(
        RedisKeys.MESSAGE_EVENTS + room_id,
        startAt
      );
      for (let [ts, evt] of flattenEvents(timeline)) {
        joinedRoom.timeline!.events!.push(evt);
        // for each room, a prev_batch
        joinedRoom.timeline!.prev_batch = ts;
      }
      joined[room_id] = joinedRoom;
    }
    resp.rooms.join = joined;
    // include next_batch
    return resp;
  }
}

function* flattenEvents(reply: Array<Array<any>>) {
  for (let timestamped of reply) {
    const ts = timestamped[0] as string;
    const [kind, msg] = timestamped[1] as Array<string>;
    yield [ts, JSON.parse(msg)];
  }
}
