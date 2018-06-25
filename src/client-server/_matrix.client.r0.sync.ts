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
import { userRooms } from '../model';
import { QueueTimelines } from '../types';
import { setPresence as setPresenceFn, getPresence } from '../presence';

import {
  RedisKeys,
  redisGetAndDel,
  redisAsync,
  redisReadQueue
} from '../redis';
import { rand } from '../utils';
import { Session } from '../auth';

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
    @CurrentUser() session: Session
  ): Promise<dto.SyncResponse | any> {
    // TODO - timeout, set_presence, filter
    fullState = fullState || false;
    const _presence = await getPresence(session.username);

    const { rooms, next_batch } = await getUsersEvents(
      session.uid,
      since,
      fullState,
      timeout
    );
    const resp: dto.SyncResponse = {
      next_batch,
      // device_one_time_keys_count: { signed_curve25519: 50 },
      account_data: { events: [] },
      to_device: { events: [] },
      // groups: { leave: {}, join: {}, invite: {} },
      presence: {
        events: [
          {
            content: {
              currently_active: true,
              last_active_ago: _presence.last_active_ago,
              presence: _presence.presence
            },
            type: 'm.presence',
            sender: session.username
          }
        ]
      },
      device_lists: { changed: [], left: [] },
      rooms
    };

    await setPresenceFn(session.username, setPresence);
    return resp;
  }
}

class Hash {
  [key: string]: any;
}

async function getUsersEvents(
  uid: number,
  since: string,
  fullState: boolean,
  timeout: number
) {
  // find user's rooms => {<start timeline>, membership}
  const usersRooms = (await userRooms(uid)).reduce((acc, it) => {
    acc[it.room!.room_id] = {
      timeline: it.timeline,
      membership: it.membership
    };
    return acc;
  }, new QueueTimelines());
  debug('usersRooms', usersRooms, 'uid', uid);

  // get usable timelines for query
  const timelines = await getTimelines(usersRooms, since, fullState);
  debug(timelines);

  // may return after timeout
  const responses =
    (await redisReadQueue(
      flattenRequest(timelines),
      fullState === true ? 0 : timeout // return immediately if fullstate
    )) || [];
  debug('response', responses);

  const rooms = { invite: new Hash(), join: new Hash(), leave: new Hash() };
  for (const response of responses) {
    // convert room:state:!w5v2fc2dblo:my.matrix.host => !w5v2fc2dblo:my.matrix.host
    const room_id = response[0]
      .split(':')
      .slice(2)
      .join(':');
    debug('room_id', room_id);
    const timeline: dto.Timeline = { events: [], prev_batch: '' };
    for (const timestamped of response[1]) {
      // debug('timestamped', timestamped);
      const ts = timestamped[0] as string;
      const [, msg] = timestamped[1] as Array<string>;
      timeline.events!.push(JSON.parse(msg) as dto.Event);
      // overwrite timestamps
      timelines[response[0]].timeline = ts;
    }

    const membership_ = usersRooms[room_id].membership;
    switch (membership_) {
      case 'invite':
      case 'join':
        rooms['join'] = {
          [room_id]: {
            account_data: { events: [] },
            ephemeral: { events: [] },
            state: { events: [] },
            timeline
          }
        };
      case 'leave':
    }
  }
  const next_batch = rand();
  // save baseline to redis
  await redisAsync().setAsync(
    RedisKeys.SINCE + next_batch,
    JSON.stringify(timelines)
  );

  return { rooms, next_batch };
}

// ensure correct data is fetched from q
// this depends on membership status and previous fetches
async function getTimelines(
  baselines: QueueTimelines,
  since: string,
  fullState: boolean
) {
  const ret = new QueueTimelines();
  // retrieve since token from redis
  let previousTimeline: QueueTimelines = {};
  if (since) {
    previousTimeline =
      JSON.parse(await redisGetAndDel(RedisKeys.SINCE + since)) || {};
  }
  // debug('since', since, previousTimeline);
  // baselines has reference timelines, override with events sent last time
  for (let t in baselines) {
    const stateEv = RedisKeys.STATE_EVENTS + t;
    // state events:
    if (fullState) {
      // start from beginning
      ret[stateEv] = {
        timeline: '0-0',
        membership: baselines[t].membership
      };
    } else if (previousTimeline[stateEv]) {
      // use previous if 'since' or fullstate was not requested
      ret[stateEv] = previousTimeline[stateEv];
    } else {
      // start from one before start of timeline
      const { timeline, membership } = baselines[t];
      const prev = oneBefore(timeline);
      // ret[stateEv] = { timeline: prev, membership };
      ret[stateEv] = { timeline: '0-0', membership };
    }
    // message events:
    // TODO
    // invite: dont get any ?
    // leave: get till left
  }
  return ret;
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
