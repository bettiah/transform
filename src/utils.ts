import { validate } from 'class-validator';
import { BadRequestError } from 'routing-controllers';

export const debug = require('debug')('server:utils');

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

export function normalizeRoom(room: string): string {
  if (room.startsWith('!')) {
    return room;
  }
  return `!${room}:${config.server}`;
}

export function validateRequest(event: any) {
  return validate(event).then(err => {
    if (err.length === 0) {
      return;
    }
    const reason = err.map(it => it.toString()).join(',');
    debug('validation failed', reason);
    throw new BadRequestError(reason);
  });
}
