import Redis from 'redis';
import { duplicateRedis, initRedis } from './redis';
import {
  Event,
  MessageEvent,
  MessageEventType,
  StateEventType,
  CreateRoomEvent,
  MessageEventMessgae,
  MemberEvent
} from './client-server/events';
import { initDb } from './model';
import { handleCreateRoom } from './createRoomHandler';
import { handleMessage } from './messageHandler';
import { handleMember } from './memberHandler';

const debug = require('debug')('server:events');

interface Hash {
  [key: string]: any;
}

// [k1, k2, v1, v2]
const flatten = (obj: Hash) =>
  Object.keys(obj).reduce((acc, key) => {
    acc.push(obj[key]);
    return acc;
  }, Object.keys(obj));

const TIMEOUT = 1000000;
export function roomEvents() {
  const redis = duplicateRedis();
  let watching: Hash = { roomevents: '$' }; // using 0 here with empty q is problematic
  const forever = () => {
    debug(watching);
    redis.sendCommand(
      'XREAD',
      ['BLOCK', TIMEOUT, 'STREAMS', ...flatten(watching)],
      async (error, reply) => {
        Redis.print(error, reply);
        if (error) {
          return;
        }
        if (!reply) {
          // no reply means: timed out; setImmediate ensures continuity
          setImmediate(forever);
          return;
        }
        // synchronously consume repliles
        // this can be done asynchronously
        // but then we loose control over number of queued events
        watching = await processReply(reply as Array<Array<any>>);
        // continue
        setImmediate(forever);
      }
    );
  };
  // start loop
  forever();
}

async function processReply(reply: Array<Array<any>>) {
  let watching: Hash = {};
  for (const element of reply) {
    const key = element[0] as string;
    const values = element[1];
    for (let timestamped of values as Array<Array<any>>) {
      const ts = timestamped[0] as string;
      const [kind, msg] = timestamped[1] as Array<string>;
      const ret = await processEvent(JSON.parse(msg) as Event);
      if (!ret) {
        debug('unable to handle:', key, ts, kind, msg);
      }
    }
    watching[key] = values[values.length - 1][0];
  }
  return watching;
}

export function processEvent(ev: Event) {
  // console.log(key, ts, kind, ev);
  switch (ev.type) {
    case MessageEventType.redaction:
      break;
    case MessageEventType.message:
      return handleMessage(Object.assign(new MessageEventMessgae(), ev));
    case MessageEventType.feedback:
      break;
    case MessageEventType.call_invite:
      break;
    case MessageEventType.call_candidates:
      break;
    case MessageEventType.call_answer:
      break;
    case MessageEventType.call_hangup:
      break;
    case StateEventType.aliases:
      break;
    case StateEventType.canonical_alias:
      break;
    case StateEventType.create:
      return handleCreateRoom(Object.assign(new CreateRoomEvent(), ev));
    case StateEventType.join_rules:
      break;
    case StateEventType.member:
      return handleMember(Object.assign(new MemberEvent(), ev));
    case StateEventType.power_levels:
      break;
    case StateEventType.name:
      break;
    case StateEventType.topic:
      break;
    case StateEventType.avatar:
      break;
    case StateEventType.pinned_events:
      break;
  }
  return false;
}

if (require.main === module) {
  initDb();
  initRedis();
  roomEvents();
}
