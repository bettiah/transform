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
import { Session } from '../auth';
import { MemberEvent, StateEventType } from './events';
import { rand } from '../utils';
import { processEvent } from '../roomevents';

const debug = require('debug')('server:joinRoom');

@JsonController('')
export class MatrixClientR0JoinRoomIdOrAlias {
  @Post('/_matrix/client/r0/join/:roomIdOrAlias')
  async joinRoom(
    @Param('roomIdOrAlias') roomIdOrAlias: string,
    @CurrentUser() session: Session
  ): Promise<dto.JoinRoomResponse429 | any> {
    debug(`user ${session.user_id} join ${roomIdOrAlias}`);
    // TODO - get room_id if alias is given
    const room_id = roomIdOrAlias;

    const joinEvent: MemberEvent = {
      content: { membership: 'join' },
      type: StateEventType.member,
      event_id: rand(),
      state_key: session.user_id,
      room_id,
      sender: session.user_id,
      origin_server_ts: Date.now()
    };
    await processEvent(joinEvent);

    return { room_id };
  }
}
