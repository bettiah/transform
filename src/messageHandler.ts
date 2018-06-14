import { MessageEventType, MessageEventMessgae } from './client-server/events';
import { redisEnque } from './redis';
import { getRepository } from 'typeorm';
import { User, Room } from './model';

const debug = require('debug')('server:events:send');

export async function handleMessage(
  message: MessageEventMessgae
): Promise<boolean> {
  const sender = await getRepository(User)
    .createQueryBuilder('user')
    .select('user.user_id')
    .leftJoinAndSelect('user.rooms', 'room', 'room.room_id = :room_id', {
      room_id: message.room_id
    })
    .where('user.user_id = :user_id', { user_id: message.sender })
    .getOne();
  // can fail if user has been deleted in between event & now
  if (!sender) {
    debug(`sender has been deleted:${message.sender}`);
    false;
  }
  if (sender!.rooms.length != 1) {
    debug(`sender is not a part of room:${message.sender}`);
    false;
  }
  debug(sender);

  const events: string[] = [];
  events.push(`${MessageEventType.message}`, JSON.stringify(message));

  const q = await redisEnque(`room:${message.room_id}`, events);
  debug(`${message.room_id} queued`, q);

  return true;
}
