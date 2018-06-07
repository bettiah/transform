import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import {
  createConnection,
  Entity,
  PrimaryGeneratedColumn,
  Index,
  Column
} from 'typeorm';
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
}

const postgres: PostgresConnectionOptions = {
  type: 'postgres',
  database: 'chat',
  schema: 'chat',
  host: process.platform === 'linux' ? '/var/run/postgresql' : '/tmp',
  entities: [User],
  synchronize: true,
  logging: true
};

const sqlite: SqliteConnectionOptions = {
  type: 'sqlite',
  database: 'chat.sqlite',
  entities: [User],
  synchronize: true,
  logging: true
};

export async function dbConnection() {
  await createConnection(sqlite);
  debug('db connected');
}
