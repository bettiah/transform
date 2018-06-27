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

@JsonController('')
export class MatrixClientR0RoomsRoomIdInvite {
  @Post('/_matrix/client/r0/rooms/:roomId/invite')
  async inviteUser(
    @Param('roomId') roomId: string,
    @Body({ required: true })
    body: dto.InviteUserBody,
    @CurrentUser() session: Session
  ): Promise<dto.InviteUserResponse429 | any> {
    const inviteEvent: MemberEvent = {
      content: { membership: 'invite', is_direct: false },
      type: StateEventType.member,
      event_id: rand(),
      state_key: body.user_id!,
      room_id: roomId,
      sender: session.user_id,
      origin_server_ts: Date.now()
    };
    await processEvent(inviteEvent);
    return {};
  }
}
