import {
  createConnection,
  Entity,
  PrimaryGeneratedColumn,
  Index,
  Column,
  OneToMany,
  ManyToOne,
  getRepository,
  CreateDateColumn,
  UpdateDateColumn,
  createQueryBuilder
} from 'typeorm';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import { SqliteConnectionOptions } from 'typeorm/driver/sqlite/SqliteConnectionOptions';

const debug = require('debug')('server:model');

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid') id?: number;

  @Column({ length: 128 })
  home_server!: string;

  @Index({ unique: true })
  @Column({ length: 128 })
  user_id!: string;

  @Column({ length: 128 })
  password_hash!: string;

  @OneToMany(type => UserInRoom, userRoom => userRoom.room, {
    cascade: true,
    nullable: true
  })
  userRooms?: UserInRoom[];

  @CreateDateColumn() createdAt?: Date;

  @UpdateDateColumn() updatedAt?: Date;
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
  aliases?: RoomAlias[];

  @OneToMany(type => UserInRoom, userRoom => userRoom.room, {
    cascade: true,
    nullable: true
  })
  roomUsers?: UserInRoom[];

  @CreateDateColumn() createdAt?: Date;

  @UpdateDateColumn() updatedAt?: Date;
}

@Entity()
export class UserInRoom {
  @ManyToOne(type => User, (user: User) => user.userRooms, { primary: true })
  user?: User;

  @ManyToOne(type => Room, (room: Room) => room.roomUsers, { primary: true })
  room?: Room;

  @Column() timeline!: string;

  @Column({ length: 12 })
  membership!: string; // one of join, invite, leave [leave, ban?]

  @CreateDateColumn() createdAt?: Date;

  @UpdateDateColumn() updatedAt?: Date;
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

const entities = [User, Room, RoomAlias, UserInRoom];

const postgres: PostgresConnectionOptions = {
  type: 'postgres',
  database: 'matrix',
  host: process.platform === 'linux' ? '/var/run/postgresql' : '/tmp',
  entities,
  synchronize: true,
  logging: true
};

const sqlite: SqliteConnectionOptions = {
  type: 'sqlite',
  database: 'matrix.sqlite',
  entities,
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

export function checkUserInRoom(user: User, room: Room) {
  return getRepository(UserInRoom)
    .createQueryBuilder()
    .where('roomId = :roomId', {
      roomId: getRepository(Room).getId(room)
    })
    .andWhere('userId = :userId', {
      userId: getRepository(User).getId(user)
    })
    .getCount();
}

export function userRooms(user: User) {
  return getRepository(UserInRoom).find({
    where: { user },
    relations: ['room'],
    select: ['timeline']
  });
}

// BUG
export function userRooms_bug(user_id: string) {
  return getRepository(Room)
    .createQueryBuilder('room')
    .select(['room.room_id', 'roomUser.user'])
    .innerJoin('room.roomUsers', 'roomUser')
    .innerJoin('roomUser.user', 'user', 'user.user_id = :user_id', {
      user_id
    })
    .getMany();
}

export function removeUserFromRoom(user: User, room: Room) {
  return createQueryBuilder()
    .delete()
    .from(UserInRoom)
    .where('roomId = :roomId', {
      roomId: getRepository(Room).getId(room)
    })
    .andWhere('userId = :userId', {
      userId: getRepository(User).getId(user)
    })
    .execute();
}

export function removeUserFromAllRooms(user: User) {
  return createQueryBuilder()
    .delete()
    .from(UserInRoom)
    .where('userId = :userId', {
      userId: getRepository(User).getId(user)
    })
    .execute();
}

export function removeUsersFromRoom(room: Room) {
  return createQueryBuilder()
    .delete()
    .from(UserInRoom)
    .where('roomId = :roomId', {
      roomId: getRepository(Room).getId(room)
    })
    .execute();
}
