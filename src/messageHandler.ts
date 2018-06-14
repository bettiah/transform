import { MessageEventType, MessageEventMessgae } from './client-server/events';
import { redisEnque } from './redis';
import { getRepository } from 'typeorm';
import { User, Room } from './model';

const debug = require('debug')('server:events:send');

export async function handleMessage(
  message: MessageEventMessgae
): Promise<boolean> {
  // user exists
  const sender = await getRepository(User).findOne(
    {
      user_id: message.sender
    },
    { relations: ['rooms'], loadEagerRelations: false }
  );
  // can fail if user has been deleted in between event & now
  if (!sender) {
    debug(`sender has been deleted:${message.sender}`);
    false;
  }
  const rooms = await sender!.rooms;
  // user is in room & can post messages
  const room = rooms.find(it => {
    return it.room_id === message.room_id;
  });
  if (!room) {
    debug(`sender is not a part of room:${message.sender}`);
    false;
  }

  const events: string[] = [];
  events.push(`${MessageEventType.message}`, JSON.stringify(message));

  const q = await redisEnque(`room:${room!.room_id}`, events);
  debug(`${room!.room_id} queued`, q);

  return true;
}
