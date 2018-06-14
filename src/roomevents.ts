import Redis from 'redis';
import { duplicateRedis, redisAsync } from './redis';
import {
  Event,
  MessageEventType,
  StateEventType,
  CreateRoomEvent
} from './client-server/events';
import { Room, initDb, RoomAlias } from './model';
import { getRepository } from 'typeorm';
import { VisibilityType } from './types';
import { normalizeAlias } from './utils';
const debug = require('debug')('server:roomevents');

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
  const watching: Hash = { roomevents: 0 }; // using 0 here with empty q is problematic
  const forever = () => {
    debug(watching);
    redis.sendCommand(
      'XREAD',
      ['BLOCK', TIMEOUT, 'STREAMS', ...flatten(watching)],
      (error, reply) => {
        // Redis.print(error, reply);
        // console.log('reply', reply);
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
            // console.log(ts, kind, msg);
            processEvent(key, ts, kind, JSON.parse(msg) as Event);
          });
          watching[key] = values[values.length - 1][0];
        });
        setImmediate(forever);
      }
    );
  };
  forever();
}

async function processEvent(key: string, ts: string, kind: string, ev: Event) {
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
      // get key from redis -- delete when everything is done
      const roomKey = `pending:room:${create.room_id}`;
      const body_ = await redisAsync().getAsync(roomKey);
      if (!body_) {
        debug('canot find pending room for key:', roomKey);
        return;
      }
      const body = JSON.parse(body_);
      const alias = body.room_alias_name
        ? normalizeAlias(body.room_alias_name)
        : null;

      const room: Room = {
        name: body.name,
        topic: body.topic,
        visibility: body.visibility || VisibilityType.private,
        aliases: alias ? [{ name: alias }] : [],
        isDirect: body.isDirect || false,
        room_id: create.room_id
        // at least one user ?
        // users: [user]
      };
      try {
        const savedRoom = await getRepository(Room).save(room);
        debug('saved', savedRoom);
      } catch (ex) {
        debug('error saving room:', ex.message);
      }
      if (alias) {
        const roomAlias: RoomAlias = {
          name: alias,
          room: room
        };
        try {
          const savedAlias = await getRepository(RoomAlias).save(roomAlias);
          debug('saved', savedAlias);
        } catch (ex) {
          debug('error saving alias:', ex.message);
        }
      }

      // delete pending key from redis, can happen in background
      redisAsync().del(roomKey);
      // TODO: ensure this is the first event for the room
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
  roomEvents();
}
