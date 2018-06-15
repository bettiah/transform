import { redisAsync, redisEnque, RedisKeys } from './redis';
import { CreateRoomEvent, StateEventType } from './client-server/events';
import { Room, User } from './model';
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
    debug(errors);
    return false;
  }

  const room_id = create.room_id;
  // get key from redis -- delete when everything is done
  const roomPendingKey = RedisKeys.ROOM_PENDING + create.room_id;
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

  const creator = await getRepository(User).findOne({
    user_id: create.content.creator
  });
  // can fail if user has been deleted in between event & now
  if (!creator) {
    debug(`creator has been deleted:${create.content.creator}`);
    false;
  }
  // create room in db
  const room: Room = {
    name: body.name,
    topic: body.topic,
    visibility: body.visibility || VisibilityType.private,
    aliases: alias ? [{ name: alias }] : [],
    isDirect: body.isDirect || false,
    room_id,
    // at least one user ?
    users: [creator!]
  };
  try {
    const savedRoom = await getRepository(Room).save(room);
    debug('saved', savedRoom);
  } catch (ex) {
    debug('error saving room:', ex.message);
    return false;
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
  const to = RedisKeys.STATE_EVENTS + room_id;
  const q = await redisEnque(to, events);
  debug(`${to}: queued`, q);

  // delete pending key from redis, can happen in background
  redisAsync().del(roomPendingKey);
  // TODO: ensure this is the first event for the room
  return true;
}
