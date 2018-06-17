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

import * as dto from './types';
import { User, userRooms } from '../model';
import { ErrorTypes } from '../types';

const debug = require('debug')('server:sync');

@JsonController('')
export class MatrixClientR0Sync {
  @Get('/_matrix/client/r0/sync')
  async sync(
    @QueryParam('filter') filter: string,
    @QueryParam('since') since: string,
    @QueryParam('full_state') fullState: boolean,
    @QueryParam('set_presence') setPresence: string,
    @QueryParam('timeout') timeout: number,
    @CurrentUser() user: User
  ): Promise<dto.SyncResponse | any> {
    // TODO - timeout, set_presence, filter
    fullState = fullState || false;
    // find user's rooms
    const usersRooms = await userRooms(user.user_id);
    debug(usersRooms);
    const resp = new dto.SyncResponse();
    for (let room of usersRooms) {
      // user's timeline in room
      if (!since) {
        // recent messages & state since start of timeline
      }
      // state events
      //   if (fullState || since === undefined) {
      // all
      //   }
      // timeline
      // include latest message events from each room in addition to state events
      // for each room, a prev_batch
    }
    // include next_batch
    return resp;
  }
}
