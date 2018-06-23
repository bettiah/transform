import { RedisKeys, redisMulti } from './redis';

// TODO implement redis keyspace notifications for monitoring & modifying presence
// .set(presence_, msg, 'EX', config.presence_timeout)

export interface Presence {
  presence: string;
  status_msg: string;
  last_active_ago: number;
}

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

export function getPresence_(userId: string) {
  const redis = redisMulti();
  redis.get(RedisKeys.USER_PRESENCE + userId);
  redis.get(RedisKeys.USER_STATUS + userId);
  redis.get(RedisKeys.USER_ACTIVITY + userId);
  return redis.execAsync();
}

export function getPresence(userId: string): Promise<Presence> {
  return getPresence_(userId).then((res: any[]) => {
    return {
      presence: res[0],
      status_msg: res[1],
      last_active_ago: Date.now() - res[2]
    };
  });
}
