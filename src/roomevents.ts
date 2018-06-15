import Redis from 'redis';
import { duplicateRedis, initRedis } from './redis';
import {
  Event,
  MessageEvent,
  MessageEventType,
  StateEventType,
  CreateRoomEvent,
  MessageEventMessgae
} from './client-server/events';
import { initDb } from './model';
import { handleCreateRoom } from './createRoomHandler';
import { handleMessage } from './messageHandler';

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
  const watching: Hash = { roomevents: '$' }; // using 0 here with empty q is problematic
  const forever = () => {
    debug(watching);
    redis.sendCommand(
      'XREAD',
      ['BLOCK', TIMEOUT, 'STREAMS', ...flatten(watching)],
      (error, reply) => {
        Redis.print(error, reply);
        if (error) {
          return;
        }
        if (!reply) {
          // timed out; setImmediate ensures continuity
          setImmediate(forever);
          return;
        }
        (reply as Array<Array<any>>).forEach(element => {
          const key = element[0] as string;
          const values = element[1] as Array<Array<any>>;
          values.forEach(timestamped => {
            const ts = timestamped[0] as string;
            const [kind, msg] = timestamped[1] as Array<string>;
            processEvent(key, ts, kind, JSON.parse(msg) as Event);
          });
          watching[key] = values[values.length - 1][0];
        });
        setImmediate(forever);
      }
    );
  };
  // start loop
  forever();
}

function processEvent(key: string, ts: string, kind: string, ev: Event) {
  // console.log(key, ts, kind, ev);
  switch (kind) {
    case MessageEventType.redaction:
      break;
    case MessageEventType.message:
      handleMessage(Object.assign(new MessageEventMessgae(), ev));
      break;
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
      handleCreateRoom(Object.assign(new CreateRoomEvent(), ev));
      break;
    case StateEventType.join_rules:
      break;
    case StateEventType.member:
      break;
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
}

if (require.main === module) {
  initDb();
  initRedis();
  roomEvents();
}
