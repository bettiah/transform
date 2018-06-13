import Redis from 'redis';
import { duplicateRedis } from './redis';
import {
  Event,
  MessageEventType,
  StateEventType,
  CreateRoomEvent
} from './client-server/events';
const debug = require('debug')('server:roomevents');

interface Hash {
  [key: string]: any;
}

const flatten = (obj: Hash) =>
  Object.keys(obj).reduce((acc, key) => {
    acc.push(key, obj[key]);
    return acc;
  }, new Array<string>());

const TIMEOUT = 1000000;
export function roomEvents() {
  const redis = duplicateRedis();
  const watching: Hash = { roomevents: '0' };
  const forever = () => {
    console.dir(watching);
    redis.sendCommand(
      'XREAD',
      ['BLOCK', TIMEOUT, 'STREAMS', ...flatten(watching)],
      (error, reply) => {
        // Redis.print(error, reply);
        if (error) {
          return;
        }
        if (!reply) {
          // timed out; setImmediate ensure continuity
          setImmediate(forever);
          return;
        }
        (reply as Array<Array<any>>).forEach(element => {
          const key = element[0] as string;
          const values = element[1] as Array<Array<any>>;
          values.forEach(timestamped => {
            const ts = timestamped[0] as string;
            const [kind, msg] = timestamped[1] as Array<string>;
            // console.log(ts, kind, msg);
            processEvent(ts, kind, JSON.parse(msg) as Event);
          });
          watching[key] = values[values.length - 1][0];
        });
        setImmediate(forever);
      }
    );
  };
  forever();
}

async function processEvent(ts: string, kind: string, ev: Event) {
  switch (kind) {
    case MessageEventType.redaction:
      break;
    case MessageEventType.message:
      console.log(ts, ev);
      break;
    case MessageEventType.feedback:
      break;
    case MessageEventType.invite:
      break;
    case MessageEventType.candidates:
      break;
    case MessageEventType.answer:
      break;
    case MessageEventType.hangup:
      break;
    case StateEventType.aliases:
      break;
    case StateEventType.canonical_alias:
      break;
    case StateEventType.create:
      const create = ev as CreateRoomEvent;
      console.log(ts, create);
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
  roomEvents();
}
