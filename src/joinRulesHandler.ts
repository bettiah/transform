import { JoinRulesEvent } from './client-server/events';
import { validate } from 'class-validator';
import { existsInRedis, RedisKeys, redisEnque } from './redis';

const debug = require('debug')('server:events:joinRules');

export async function handleJoinRules(event: JoinRulesEvent) {
  if (!(event instanceof JoinRulesEvent)) {
    debug('cannot validate event: not an instance');
    return false;
  }
  const errors = await validate(event);
  if (errors.length > 0) {
    debug(errors);
    return false;
  }

  // TODO : checks
  // room q must already be present & this must not be the first event
  const stateQ = RedisKeys.STATE_EVENTS + event.room_id;
  if (!existsInRedis(stateQ)) {
    debug(`${stateQ}: missing. cannot enqueue`);
    return false;
  }

  const q = await redisEnque(stateQ, [`${event.type}`, JSON.stringify(event)]);
  debug(`${stateQ}: queued: ${q}`);

  return true;
}
