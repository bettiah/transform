import bluebird from 'bluebird';
import Redis, { RedisClient } from 'redis';

const once = require('lodash.once');
const debug = require('debug')('server:redis');

export const redis = once(Redis.createClient);

export const redisAsync = once(() => bluebird.promisifyAll(redis()));

export const redisMulti = () => bluebird.promisifyAll(redis().multi());

export function duplicateRedis(): RedisClient {
  return redis().duplicate();
}

export function existsInRedis(key: string) {
  return redisAsync().existsAsync(key);
}

export function redisEnque(queue: string, args: string[]): Promise<string> {
  return redisAsync().sendCommandAsync('XADD', [queue, '*', ...args]);
}

export function initRedis() {
  return new Promise((res, rej) => {
    const _redis = redis();
    _redis.on('ready', () => {
      debug('redis:', _redis.server_info.redis_version);
      res('ready');
    });
  });
}

export const enum RedisKeys {
  ROOM_EVENTS = 'roomevents',
  STATE_EVENTS = 'room:state:',
  MESSAGE_EVENTS = 'room:message:',
  ROOM_PENDING = 'pending:room:',
  ROOM_ALIAS = 'alias:'
}
