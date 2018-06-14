import { getRepository } from 'typeorm';
import { Room, RoomAlias, initDb } from './model';
import { CreateRoomEvent, StateEventType } from './client-server/events';
import { handleCreateRoom } from './createRoomHandler';
import { initRedis, redisAsync } from './redis';

import { expect } from 'chai';

describe('createRoomHadler', async () => {
  before(async () => {
    await initDb();
    await initRedis();
  });

  beforeEach(async () => {
    // remove everything from room & room-alias
    await getRepository(RoomAlias).clear();
    await getRepository(Room).clear();
    // delete everything
    await redisAsync().flushdbAsync();
    console.log('init');
  });

  let cr: CreateRoomEvent = {
    content: { creator: 's1', 'm.federate': false },
    type: StateEventType.create,
    state_key: '',
    event_id: '0123456789',
    room_id: 'room1',
    sender: 'sender1',
    origin_server_ts: 1
  };

  describe('no alias', async () => {
    it('cannot validate 1', async () => {
      const ret = await handleCreateRoom(cr);
      expect(ret).be.equal(false);
    });

    it('cannot validete 2', async () => {
      const ev = Object.assign(new CreateRoomEvent(), cr, {
        state_key: undefined
      });
      const ret = await handleCreateRoom(ev);
      expect(ret).be.equal(false);
    });

    it('cannot find pending', async () => {
      const ret = await handleCreateRoom(
        Object.assign(new CreateRoomEvent(), cr)
      );
      expect(ret).be.equal(false);
    });

    it('OK', async () => {
      await redisAsync().setAsync('pending:room:room1', '{}');
      const ret = await handleCreateRoom(
        Object.assign(new CreateRoomEvent(), cr)
      );
      expect(ret).be.equal(true);
      const key = await redisAsync().getAsync('pending:room:room1');
      expect(key).be.null;
      const rooms = await getRepository(Room).find();
      expect(rooms.length).be.equal(1);
    });
  });

  describe('with alias', async () => {
    it('ok', async () => {
      // create pending
      await redisAsync().setAsync(
        'pending:room:room1',
        JSON.stringify({ room_alias_name: 'alias1' })
      );
      // create alias in redis
      await redisAsync().setAsync(`alias:#alias1:s1.local`, 'room1');
      // create alias in db , without room, like in an update - TODO handle this case
      //   await getRepository(RoomAlias).save({ name: '#alias1:s1.local' });

      const ret = await handleCreateRoom(
        Object.assign(new CreateRoomEvent(), cr)
      );
      expect(ret).be.equal(true);
      const alias = await getRepository(RoomAlias).findOne(
        {
          name: '#alias1:s1.local'
        },
        {
          relations: ['room']
        }
      );
      expect(await alias!.name).be.equal('#alias1:s1.local');
      expect(alias!.room).be.not.undefined;
    });
  });
});
