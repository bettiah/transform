import { Room, RoomAlias, initDb } from './model';
import { getRepository } from 'typeorm';

import { expect } from 'chai';

describe('createRoomHadler', async () => {
  before(async () => {
    await initDb();
  });

  beforeEach(async () => {
    // remove everything from room & room-alias
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
    expect(r2.aliases[0].name).be.equals('a1');
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
    expect(r4.aliases[0].name).be.equals('a1');
  });
});
