import {
  createConnection,
  Entity,
  PrimaryGeneratedColumn,
  Index,
  Column,
  OneToMany,
  ManyToOne,
  ManyToMany,
  JoinTable
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
  rooms!: Promise<Room[]>;
}

@Entity()
export class Room {
  @PrimaryGeneratedColumn('uuid') id!: number;

  @Index({ unique: true })
  @Column({ length: 128 })
  room_id!: string;

  @Column() visibility!: string;

  @Index({ unique: true })
  @Column()
  name!: string;

  @Column() topic!: string;

  @Column() isDirect!: boolean;

  @OneToMany(type => RoomAlias, alias => alias.room)
  aliases!: RoomAlias[];

  @ManyToMany(type => User, user => user.rooms)
  @JoinTable()
  users!: User[];
}

@Entity()
export class RoomAlias {
  @PrimaryGeneratedColumn('uuid') id!: number;

  @Column() name!: string;

  @ManyToOne(type => Room, room => room.aliases)
  room!: Room;
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

export async function dbConnection() {
  await createConnection(postgres);
  debug('db connected');
}
