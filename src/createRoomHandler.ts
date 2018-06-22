import { redisAsync, RedisKeys, redisEnque } from './redis';
import { CreateRoomEvent } from './client-server/events';
import { Room, User } from './model';
import { getRepository } from 'typeorm';
import { VisibilityType } from './types';
import { normalizeAlias, rand } from './utils';
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
    debug(errors);
    return false;
  }

  const room_id = create.room_id;
  // get key from redis -- delete when everything is done
  const roomPendingKey = RedisKeys.ROOM_PENDING + room_id;
  const body_ = await redisAsync().getAsync(roomPendingKey);
  if (!body_) {
    debug('cannot find pending room for key:', roomPendingKey);
    return false;
  }
  const body = JSON.parse(body_);
  const alias = body.room_alias_name
    ? normalizeAlias(body.room_alias_name)
    : null;

  if (alias) {
    // alias was reserverd for this room in redis
    const curr = await redisAsync().getAsync(RedisKeys.ROOM_ALIAS + alias);
    if (curr !== room_id) {
      debug(`alias in redis does not match, expect:${room_id} found:${curr}`);
      return false;
    }
  }

  const stateQ = RedisKeys.STATE_EVENTS + room_id;
  const q = await redisEnque(stateQ, [
    `${create.type}`,
    JSON.stringify(create)
  ]);
  debug(`${stateQ}: queued: ${q}`);

  // create room in db
  const room: Room = {
    name: body.name,
    topic: body.topic,
    visibility: body.visibility || VisibilityType.private,
    aliases: alias ? [{ name: alias }] : [],
    is_direct: body.is_direct === undefined ? false : body.is_direct,
    room_id
  };
  try {
    const room_ = await getRepository(Room).save(room);
    debug('saved room', room_);
  } catch (ex) {
    debug('error saving room:', ex.message);
    return false;
  }

  // delete pending key from redis, can happen in background
  redisAsync().del(roomPendingKey);
  // TODO: ensure this is the first event for the room
  return true;
}
