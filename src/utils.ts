export const rand = () =>
  Math.random()
    .toString(36)
    .substring(2);

export function normalizeUser(user: string): string {
  // TODO - do better
  if (user.startsWith('@')) {
    return user;
  }
  return `@${user}:${process.env.HOMSERVER_NAME as string}`;
}

export function normalizeAlias(alias: string): string {
  if (alias.startsWith('#')) {
    return alias;
  }
  return `#${alias}:${process.env.HOMSERVER_NAME as string}`;
}

export function normalizeRoom(room: string): string {
  if (room.startsWith('!')) {
    return room;
  }
  return `!${room}:${process.env.HOMSERVER_NAME as string}`;
}
