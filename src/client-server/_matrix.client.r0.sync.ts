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
import { User, userRooms } from '../model';
import { QueueTimelines } from '../types';
import {
  RedisKeys,
  redisGetAndDel,
  redisAsync,
  redisReadQueue
} from '../redis';
import { rand } from '../utils';

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

    const resp: dto.SyncResponse = {
      rooms: {
        invite: {
          invite_state: { events: [] }
        },
        join: {
          state: { events: [] },
          timeline: { events: [], limited: false, prev_batch: '' }
        },
        leave: {
          state: { events: [] },
          timeline: { events: [], limited: false, prev_batch: '' }
        }
      }
    };

    // find user's rooms
    const rooms = (await userRooms(user)).reduce((acc, it) => {
      acc[it.room!.room_id] = {
        timeline: it.timeline,
        membership: it.membership
      };
      return acc;
    }, new QueueTimelines());
    debug(rooms);

    // need usable timelines for query
    const timelines = await getTimelines(rooms, since, fullState);
    debug(timelines);
    const response = await redisReadQueue(
      flattenRequest(timelines),
      fullState ? 0 : timeout // return immediately if fullstate
    );

    for (let [room_id, ts, evt] of flattenResponse(response)) {
      debug(room_id, ts, JSON.stringify(evt));
      const membership = timelines[room_id].membership;
      switch (membership) {
        case 'join': {
          if (room_id.startsWith(RedisKeys.MESSAGE_EVENTS)) {
            resp.rooms!.join!.timeline!.events!.push(evt);
            resp.rooms!.join!.timeline!.prev_batch = ts;
          } else {
            resp.rooms!.join!.state!.events!.push(evt);
          }
        }
      }
      // update last seen
      timelines[room_id].timeline = ts;
    }

    const next_batch = rand();
    // save baseline to redis
    await redisAsync().setAsync(next_batch, JSON.stringify(timelines));
    // include next_batch
    resp.next_batch = next_batch;
    return resp;
  }
}

// ensure correct data is fetched from q
// this depends on membership status and previous fetches
async function getTimelines(
  baselines: QueueTimelines,
  since: string,
  fullState: boolean
) {
  const timelines = new QueueTimelines();
  // retrieve since token from redis
  let previousTimeline: QueueTimelines = {};
  if (since) {
    previousTimeline = JSON.parse(await redisGetAndDel(since));
  }
  // baselines has reference timelines, override with events sent last time
  for (let t in baselines) {
    const stateEv = RedisKeys.STATE_EVENTS + t;
    // state events:
    if (fullState) {
      // start from beginning
      timelines[stateEv] = {
        timeline: '0-0',
        membership: baselines[t].membership
      };
    } else if (previousTimeline[stateEv]) {
      // use previous if 'since' or fullstate was not requested
      timelines[stateEv] = previousTimeline[stateEv];
    } else {
      // start from one before start of timeline
      const { timeline, membership } = baselines[t];
      const prev = oneBefore(timeline);
      timelines[stateEv] = { timeline: prev, membership };
    }
    // message events:
    // TODO
    // invite: dont get any ?
    // leave: get till left
    const msgEv = RedisKeys.MESSAGE_EVENTS + t;
    if (previousTimeline[msgEv]) {
      timelines[msgEv] = previousTimeline[msgEv];
    } else {
      timelines[msgEv] = baselines[t];
    }
  }
  return timelines;
}

function oneBefore(timeline: string): string {
  const parts = timeline.split('-');
  return `${parseInt(parts[0]) - 1}-${parts[1]}`;
}

// {k=>v} => [k1, k2, v1, v2]
function flattenRequest(timelines: QueueTimelines) {
  const ids = Object.keys(timelines);
  return ids.reduce((acc, id) => {
    // select timeline component
    acc.push(timelines[id].timeline);
    return acc;
  }, ids);
}

// converts deeply nested XREAD responses
function* flattenResponse(reply: Array<Array<any>>) {
  for (const rooms of reply) {
    const room = rooms[0];
    const values = rooms[1];
    for (const timestamped of values) {
      const ts = timestamped[0] as string;
      const [kind, msg] = timestamped[1] as Array<string>;
      yield [room, ts, JSON.parse(msg)];
    }
  }
}
