const once = require('lodash.once');
import bluebird from 'bluebird';
import Redis, { RedisClient } from 'redis';

export const debug = require('debug')('server:redis');

export function redis(): RedisClient {
  return once(() => {
    return Redis.createClient();
  })();
}

export function redisAsync() {
  return once(() => {
    return bluebird.promisifyAll(redis());
  })();
}

export function redisMulti(): any {
  return bluebird.promisifyAll(redis().multi());
}

export function redisEnque(queue: string, args: string[]): Promise<string> {
  return redisAsync().sendCommandAsync('XADD', [queue, '*', ...args]);
}

export async function initRedis() {
  const _redis = redis();
  _redis.on('ready', () => {
    debug('redis:', _redis.server_info.redis_version);
  });
}
