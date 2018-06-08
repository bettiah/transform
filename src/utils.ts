const once = require('lodash.once');
const bluebird = require('bluebird');
const Redis = require('redis');

const debug = require('debug')('server');

export async function initRedis() {
  const _redis = redis();
  _redis.on('ready', () => {
    debug('redis:', _redis.server_info.redis_version);
  });
}

export function redis() {
  return once(() => {
    const redis = Redis.createClient();
    return bluebird.promisifyAll(redis);
  })();
}

const config = require('../config.json');

export const rand = () =>
  Math.random()
    .toString(36)
    .substring(2);

export function normalizeUser(user: string): string {
  // make sure user
  if (user.startsWith('@')) {
    return user;
  }
  return `@${user}:${config.server}`;
}
