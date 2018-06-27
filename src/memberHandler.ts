import { MemberEvent } from './client-server/events';
import { getRepository } from 'typeorm';
import { User, UserInRoom, Room } from './model';
import { RedisKeys, redisEnque, existsInRedis } from './redis';
import { validate } from 'class-validator';

const debug = require('debug')('server:events:join');

export async function handleMember(event: MemberEvent): Promise<boolean> {
  if (!(event instanceof MemberEvent)) {
    debug('cannot validate event: not an instance');
    return false;
  }
  const errors = await validate(event);
  if (errors.length > 0) {
    debug(errors);
    return false;
  }

  // user who the event is for
  const user = await getRepository(User).findOne({
    user_id: event.state_key
  });
  // can fail if user has been deleted in between event & now
  if (!user) {
    debug(`user has been deleted:${event.state_key}`);
    return false;
  }

  const room = await getRepository(Room).findOne({ room_id: event.room_id });
  if (!room) {
    debug(`room has been deleted:${event.room_id}`);
    return false;
  }

  // TODO : checks
  // room q must already be present & this must not be the first event
  const stateQ = RedisKeys.STATE_EVENTS + event.room_id;
  if (!existsInRedis(stateQ)) {
    debug(`${stateQ}: missing. cannot enqueue`);
    return false;
  }

  // TODO - check previous state in db
  const q = await redisEnque(stateQ, [`${event.type}`, JSON.stringify(event)]);
  debug(`${stateQ}: queued: ${q}`);

  // save invite in db
  await getRepository(UserInRoom).save({
    user,
    room,
    timeline: q,
    membership: event.content.membership
  });
  return true;
}
