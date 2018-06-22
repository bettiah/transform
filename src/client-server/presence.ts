import { RedisKeys, redisMulti } from '../redis';

const config = require('../../config.json');

// TODO implement redis keyspace notifications for monitoring & modifying presence
// .set(presence_, msg, 'EX', config.presence_timeout)

export function setPresence(
  userId: string,
  presence?: string,
  status_msg?: string
) {
  const redis = redisMulti();
  if (presence) redis.set(RedisKeys.USER_PRESENCE + userId, presence);
  if (status_msg) redis.set(RedisKeys.USER_STATUS + userId, status_msg);
  redis.set(RedisKeys.USER_ACTIVITY + userId, Date.now());
  return redis.execAsync();
}

export function getPresence(userId: string) {
  const redis = redisMulti();
  redis.get(RedisKeys.USER_PRESENCE + userId);
  redis.get(RedisKeys.USER_STATUS + userId);
  redis.get(RedisKeys.USER_ACTIVITY + userId);
  return redis.execAsync();
}
