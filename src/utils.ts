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
