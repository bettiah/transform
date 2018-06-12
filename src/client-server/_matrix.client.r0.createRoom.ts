import {
  JsonController,
  Authorized,
  Post,
  Body,
  Get,
  Put,
  Delete,
  Param,
  HttpError,
  NotFoundError,
  BadRequestError,
  CurrentUser,
  QueryParam,
  HeaderParam,
  UnauthorizedError
} from 'routing-controllers';

import { User, Room } from '../model';
import * as dto from './types';
import { VisibilityType } from '../types';
import { normalizeRoom, normalizeAlias, rand } from '../utils';
import { getRepository } from 'typeorm';
const debug = require('debug')('server:createRoom');

@JsonController('')
export class MatrixClientR0CreateRoom {
  @Post('/_matrix/client/r0/createRoom')
  async createRoom(
    @CurrentUser() user: User,
    @Body() body: dto.CreateRoomBody
  ): Promise<dto.CreateRoomResponse> {
    const room = new Room();
    room.name = body.name || rand();
    room.topic = body.topic || '';
    room.visibility = body.visibility || VisibilityType.private;
    room.aliases = body.room_alias_name
      ? [{ id: 0, name: normalizeAlias(body.room_alias_name), room }]
      : [];
    room.isDirect = body.is_direct || false;
    room.room_id = normalizeRoom(rand());
    // at least one user
    room.users = [user];
    const savedRoom = await getRepository(Room).save(room);
    debug('saved', savedRoom);
    return { room_id: savedRoom.room_id };
  }
}
