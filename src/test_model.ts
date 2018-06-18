import 'reflect-metadata';

import {
  Room,
  RoomAlias,
  initDb,
  User,
  UserInRoom,
  userRooms,
  removeUsersFromRoom,
  removeUserFromRoom,
  checkUserInRoom,
  userRooms_bug
} from './model';
import { getRepository, createQueryBuilder } from 'typeorm';

import { expect } from 'chai';

describe('model', () => {
  before(async () => {
    await initDb();
  });

  describe('room-alias', async () => {
    beforeEach(async () => {
      // remove everything from room & room-alias
      await getRepository(UserInRoom).clear();
      await getRepository(RoomAlias).clear();
      await getRepository(Room).clear();
      // delete everything
      console.log('init');
    });

    it('save room with alias cascade', async () => {
      const room: Room = {
        room_id: 'r1',
        visibility: '1',
        isDirect: false,
        aliases: [{ name: 'a1' }]
      };
      await getRepository(Room).save(room);
      const alias = await getRepository(RoomAlias).findOneOrFail();
      expect(alias.name).be.equals('a1');

      // change alias
      const r2 = await getRepository(Room).findOneOrFail();
      expect(r2.aliases![0].name).be.equals('a1');
      r2.aliases = [{ name: 'a2' }];
      await getRepository(Room).save(r2);
      const a2 = await getRepository(RoomAlias).find();
      expect(a2.length).be.equals(2);

      // change back
      const r3 = await getRepository(Room).findOneOrFail();
      const a1 = await getRepository(RoomAlias).findOneOrFail(alias.id);
      r3.aliases = [a1];
      await getRepository(Room).save(r3);

      const r4 = await getRepository(Room).findOneOrFail();
      expect(r4.aliases![0].name).be.equals('a1');
    });
  });

  describe('room-users', async () => {
    beforeEach(async () => {
      // remove everything from room & room-alias
      await getRepository(UserInRoom).clear();
      await getRepository(RoomAlias).clear();
      await getRepository(User).clear();
      await getRepository(Room).clear();

      // delete everything
      console.log('init');
    });

    it('room-users: nonexistent user', async () => {
      const none = await userRooms_bug('0');
      console.dir(none);
      expect(none).to.be.empty;
    });

    it('room-users: user with no room', async () => {
      const user: User = {
        home_server: 'h1',
        user_id: 'u1',
        password_hash: 'p1'
      };
      const user_ = await getRepository(User).save(user);

      const none = await userRooms_bug('u1');
      console.dir(none);
      expect(none).to.be.empty;
    });

    it('room-users: create a room, add a user', async () => {
      const room: Room = {
        room_id: 'r1',
        visibility: '1',
        isDirect: false
      };
      const room_ = await getRepository(Room).save(room);
      console.dir(room_);

      const user: User = {
        home_server: 'h1',
        user_id: 'u1',
        password_hash: 'p1'
      };
      const user_ = await getRepository(User).save(user);
      console.dir(user_);

      const rel = await getRepository(UserInRoom).save({
        user: user_,
        room: room_
      });
      console.dir(rel);

      let rooms = await userRooms_bug('u1');
      console.dir(rooms);
      expect(rooms).is.not.empty;
      // expect(rooms[0].room_id).equals('r1');

      let count = await checkUserInRoom(user_, room_);
      expect(count).equals(1);

      const room2_ = await getRepository(Room).save({
        room_id: 'r2',
        visibility: '1',
        isDirect: false
      });
      await getRepository(UserInRoom).save({
        user: user_,
        room: room2_
      });
      rooms = await userRooms_bug('u1');
      console.dir(rooms);
      // expect(rooms.map(r => r.room_id)).contains('r2', 'r1');

      // delete room - not allowed
      // const del = await getRepository(Room)
      //   .createQueryBuilder()
      //   .delete()
      //   .where('room_id =:id', { id: room2_.room_id })
      //   .execute();
      let del = await removeUsersFromRoom(room2_);
      console.dir(del);
      rooms = await userRooms_bug('u1');
      console.dir(rooms);
      // expect(rooms.map(r => r.room_id)).contains('r1');

      del = await removeUserFromRoom(user_, room_);
      console.dir(del);
      rooms = await userRooms_bug('u1');
      console.dir(rooms);
      expect(rooms).is.empty;
    });
  });
});
