const once = require('lodash.once');
import bluebird from 'bluebird';
import Redis, { RedisClient } from 'redis';

const debug = require('debug')('server');

export async function initRedis() {
  const _redis = redis();
  _redis.on('ready', () => {
    debug('redis:', _redis.server_info.redis_version);
  });
}

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

const config = require('../config.json');

export const rand = () =>
  Math.random()
    .toString(36)
    .substring(2);

export function normalizeUser(user: string): string {
  // TODO - do better
  if (user.startsWith('@')) {
    return user;
  }
  return `@${user}:${config.server}`;
}

export function normalizeAlias(alias: string): string {
  if (alias.startsWith('#')) {
    return alias;
  }
  return `#${alias}:${config.server}`;
}
