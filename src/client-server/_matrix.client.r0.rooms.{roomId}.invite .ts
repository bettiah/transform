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
import { User } from '../model';

@JsonController('')
export class MatrixClientR0RoomsRoomIdInvite {
  /**
   * @description : .. _invite-by-user-id-endpoint:
   *
   **Note that there are two forms of this API, which are documented separately.
   *This version of the API requires that the inviter knows the Matrix
   *identifier of the invitee. The other is documented in the*
   *`third party invites section`_.
   *
   *This API invites a user to participate in a particular room.
   *They do not start participating in the room until they actually join the
   *room.
   *
   *Only users currently in a particular room can invite other users to
   *join that room.
   *
   *If the user was invited to the room, the homeserver will append a
   *``m.room.member`` event to the room.
   *
   *.. _third party invites section: `invite-by-third-party-id-endpoint`_
   *
   * @parameters : [
   *  {
   *    "description": "The room identifier (not alias) to which to invite the user.",
   *    "in": "path",
   *    "name": "roomId",
   *    "required": true,
   *    "type": "string",
   *    "x-example": "!d41d8cd:matrix.org"
   *  },
   *  {
   *    "in": "body",
   *    "name": "body",
   *    "required": true,
   *    "schema": {
   *      "example": {
   *        "user_id": "@cheeky_monkey:matrix.org"
   *      },
   *      "properties": {
   *        "user_id": {
   *          "description": "The fully qualified user ID of the invitee.",
   *          "type": "string"
   *        }
   *      },
   *      "required": [
   *        "user_id"
   *      ],
   *      "type": "object"
   *    }
   *  }
   *]
   *
   * @responses : {
   *  "200": {
   *    "description": "The user has been invited to join the room.",
   *    "examples": {
   *      "application/json": {}
   *    },
   *    "schema": {
   *      "type": "object"
   *    }
   *  },
   *  "403": {
   *    "description": "You do not have permission to invite the user to the room. A meaningful ``errcode`` and description error text will be returned. Example reasons for rejections are:\n\n- The invitee has been banned from the room.\n- The invitee is already a member of the room.\n- The inviter is not currently in the room.\n- The inviter's power level is insufficient to invite users to the room.",
   *    "examples": {
   *      "application/json": {
   *        "errcode": "M_FORBIDDEN",
   *        "error": "@cheeky_monkey:matrix.org is banned from the room"
   *      }
   *    }
   *  },
   *  "429": {
   *    "description": "This request was rate-limited.",
   *    "schema": {
   *      "description": "A Matrix-level Error",
   *      "properties": {
   *        "errcode": {
   *          "description": "An error code.",
   *          "type": "string"
   *        },
   *        "error": {
   *          "description": "A human-readable error message.",
   *          "type": "string"
   *        }
   *      },
   *      "required": [
   *        "errcode"
   *      ],
   *      "type": "object"
   *    }
   *  }
   *}
   *
   * @security : [
   *  {
   *    "accessToken": []
   *  }
   *]
   *
   * @summary : Invite a user to participate in a particular room.
   *
   */
  @Post('/_matrix/client/r0/rooms/:roomId/invite ')
  async inviteUser(
    @Param('roomId') roomId: string,
    @Body({ required: true })
    body: dto.InviteUserBody,
    @CurrentUser() user?: User
  ): Promise<dto.InviteUserResponse429 | any> {
    throw new HttpError(501);
  }
}
