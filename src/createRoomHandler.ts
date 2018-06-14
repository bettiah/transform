import { redisAsync, redisEnque } from './redis';
import { CreateRoomEvent, StateEventType } from './client-server/events';
import { Room, RoomAlias } from './model';
import { getRepository } from 'typeorm';
import { VisibilityType } from './types';
import { normalizeAlias } from './utils';
import { validate } from 'class-validator';

const debug = require('debug')('server:events:createRoom');

export async function handleCreateRoom(
  create: CreateRoomEvent
): Promise<boolean> {
  if (!(create instanceof CreateRoomEvent)) {
    debug('cannot validate event: not an instance');
    return false;
  }
  const errors = await validate(create);
  if (errors.length > 0) {
    debug('cannot validate event:', errors);
    return false;
  }

  const room_id = create.room_id;
  // get key from redis -- delete when everything is done
  const roomPendingKey = `pending:room:${create.room_id}`;
  const body_ = await redisAsync().getAsync(roomPendingKey);
  if (!body_) {
    debug('cannot find pending room for key:', roomPendingKey);
    return false;
  }
  const body = JSON.parse(body_);
  const alias = body.room_alias_name
    ? normalizeAlias(body.room_alias_name)
    : null;

  // create room in db
  const room: Room = {
    name: body.name,
    topic: body.topic,
    visibility: body.visibility || VisibilityType.private,
    aliases: alias ? [{ name: alias }] : [],
    isDirect: body.isDirect || false,
    room_id
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
    // alias was reserverd for this room in redis
    const curr = await redisAsync().getAsync(`alias:${alias}`);
    if (curr !== room_id) {
      debug(`alias in redis does not match, expect:${room_id} found:${curr}`);
      return false;
    }
    // create alias in db
    const roomAlias: RoomAlias = {
      name: alias,
      room: room
    };
    try {
      // insert or update
      const savedAlias = await getRepository(RoomAlias).save(roomAlias);
      debug('saved alias', savedAlias);
    } catch (ex) {
      debug('error saving alias:', ex.message);
      return false;
    }
  }

  const events: string[] = [];
  events.push(`${StateEventType.create}`, JSON.stringify(create));

  // queue to room
  // TODO events
  // m.room.power_levels
  // presets
  // initial_state
  // name, topic
  // invite, invite3Pid
  // alias?
  const q = await redisEnque(`room:${room_id}`, events);
  debug(`${room_id} queued`, q);

  // delete pending key from redis, can happen in background
  redisAsync().del(roomPendingKey);
  // TODO: ensure this is the first event for the room
  return true;
}
