import { redisAsync, redisEnque } from './redis';
import { CreateRoomEvent, StateEventType } from './client-server/events';
import { Room, RoomAlias } from './model';
import { getRepository } from 'typeorm';
import { VisibilityType } from './types';
import { normalizeAlias } from './utils';

const debug = require('debug')('server:hander:createRoom');

export async function handleCreateRoom(create: CreateRoomEvent) {
  const room_id = create.room_id;
  // get key from redis -- delete when everything is done
  const roomPendingKey = `pending:room:${create.room_id}`;
  const body_ = await redisAsync().getAsync(roomPendingKey);
  if (!body_) {
    debug('canot find pending room for key:', roomPendingKey);
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
  const q = await redisEnque(`${room_id}`, events);
  debug(`${room_id} queued`, q);

  // delete pending key from redis, can happen in background
  redisAsync().del(roomPendingKey);
  // TODO: ensure this is the first event for the room
}
