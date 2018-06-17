import { MemberEvent } from './client-server/events';
import { getRepository } from 'typeorm';
import { User, UserInRoom, Room } from './model';

const debug = require('debug')('server:events:join');

export async function handleMember(join: MemberEvent): Promise<boolean> {
  const user = await getRepository(User).findOne({
    user_id: join.sender
  });
  // can fail if user has been deleted in between event & now
  if (!user) {
    debug(`creator has been deleted:${join.sender}`);
    return false;
  }

  const room = await getRepository(Room).findOne({ room_id: join.room_id });
  if (!room) {
    debug(`room has been deleted:${join.room_id}`);
    return false;
  }

  // TODO : checks

  await getRepository(UserInRoom).save({ user, room });
  return true;
}
