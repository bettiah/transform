import {
  createConnection,
  Entity,
  PrimaryGeneratedColumn,
  Index,
  Column,
  OneToMany,
  ManyToOne,
  ManyToMany,
  JoinTable,
  getRepository
} from 'typeorm';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import { SqliteConnectionOptions } from 'typeorm/driver/sqlite/SqliteConnectionOptions';

const debug = require('debug')('server:model');

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid') id!: number;

  @Column({ length: 128 })
  home_server!: string;

  @Index({ unique: true })
  @Column({ length: 128 })
  user_id!: string;

  @Column({ length: 128 })
  password_hash!: string;

  @ManyToMany(type => Room, room => room.users)
  rooms!: Room[];
}

@Entity()
export class Room {
  @PrimaryGeneratedColumn('uuid') id?: number;

  @Index({ unique: true })
  @Column({ length: 128 })
  room_id!: string;

  @Column() visibility!: string;

  @Column({ length: 128, nullable: true })
  name?: string;

  @Column({ length: 128, nullable: true })
  topic?: string;

  @Column() isDirect!: boolean;

  @OneToMany(type => RoomAlias, alias => alias.room, {
    eager: true,
    cascade: true,
    nullable: true
  })
  aliases!: RoomAlias[];

  @ManyToMany(type => User, user => user.rooms)
  @JoinTable()
  users?: User[];
}

@Entity()
export class RoomAlias {
  @PrimaryGeneratedColumn('uuid') id?: number;

  @Index({ unique: true })
  @Column({ length: 128 })
  name!: string;

  @ManyToOne(type => Room, room => room.aliases, { nullable: true })
  room?: Room;
}

const postgres: PostgresConnectionOptions = {
  type: 'postgres',
  database: 'matrix',
  host: process.platform === 'linux' ? '/var/run/postgresql' : '/tmp',
  entities: [User, Room, RoomAlias],
  synchronize: true,
  logging: true
};

const sqlite: SqliteConnectionOptions = {
  type: 'sqlite',
  database: 'matrix.sqlite',
  entities: [User, Room, RoomAlias],
  synchronize: true,
  logging: true
};

export function initDb() {
  return createConnection(sqlite)
    .then(() => debug('db connected'))
    .catch(ex => {
      debug('db', ex);
      throw new Error(ex.message);
    });
}

export async function checkUserInRoom(
  room_id: string,
  user_id: string
): Promise<boolean> {
  // check if sender exists & is in room
  // TODO - figure out how to only load user_id from users
  const sender = await getRepository(User)
    .createQueryBuilder('user')
    .select('user.user_id')
    .leftJoinAndSelect('user.rooms', 'room', 'room.room_id = :room_id', {
      room_id: room_id
    })
    .where('user.user_id = :user_id', { user_id: user_id })
    .getOne();
  // can fail if user has been deleted in between event & now
  if (!sender) {
    debug(`sender not found:${user_id}`);
    return false;
  }
  if (sender.rooms.length === 0) {
    debug(`sender is not a part of room:${user_id}`);
    return false;
  }
  return true;
}
