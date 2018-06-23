import { MessageEventType, MessageEventMessgae } from './client-server/events';
import { redisEnque, RedisKeys } from './redis';

const debug = require('debug')('server:events:send');

export async function handleMessage(
  message: MessageEventMessgae
): Promise<boolean> {
  const events: string[] = [];
  events.push(`${MessageEventType.message}`, JSON.stringify(message));

  const to = RedisKeys.STATE_EVENTS + message.room_id;
  const q = await redisEnque(to, events);
  debug(`${to}: queued`, q);

  return true;
}
