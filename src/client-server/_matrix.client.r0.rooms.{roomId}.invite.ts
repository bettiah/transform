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
   * @description : .. _invite-by-third-party-id-endpoint:
   *
   **Note that there are two forms of this API, which are documented separately.
   *This version of the API does not require that the inviter know the Matrix
   *identifier of the invitee, and instead relies on third party identifiers.
   *The homeserver uses an identity server to perform the mapping from
   *third party identifier to a Matrix identifier. The other is documented in the*
   *`joining rooms section`_.
   *
   *This API invites a user to participate in a particular room.
   *They do not start participating in the room until they actually join the
   *room.
   *
   *Only users currently in a particular room can invite other users to
   *join that room.
   *
   *If the identity server did know the Matrix user identifier for the
   *third party identifier, the homeserver will append a ``m.room.member``
   *event to the room.
   *
   *If the identity server does not know a Matrix user identifier for the
   *passed third party identifier, the homeserver will issue an invitation
   *which can be accepted upon providing proof of ownership of the third
   *party identifier. This is achieved by the identity server generating a
   *token, which it gives to the inviting homeserver. The homeserver will
   *add an ``m.room.third_party_invite`` event into the graph for the room,
   *containing that token.
   *
   *When the invitee binds the invited third party identifier to a Matrix
   *user ID, the identity server will give the user a list of pending
   *invitations, each containing:
   *
   *- The room ID to which they were invited
   *
   *- The token given to the homeserver
   *
   *- A signature of the token, signed with the identity server's private key
   *
   *- The matrix user ID who invited them to the room
   *
   *If a token is requested from the identity server, the homeserver will
   *append a ``m.room.third_party_invite`` event to the room.
   *
   *.. _joining rooms section: `invite-by-user-id-endpoint`_
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
   *        "address": "cheeky@monkey.com",
   *        "id_server": "matrix.org",
   *        "medium": "email"
   *      },
   *      "properties": {
   *        "address": {
   *          "description": "The invitee's third party identifier.",
   *          "type": "string"
   *        },
   *        "id_server": {
   *          "description": "The hostname+port of the identity server which should be used for third party identifier lookups.",
   *          "type": "string"
   *        },
   *        "medium": {
   *          "description": "The kind of address being passed in the address field, for example ``email``.",
   *          "type": "string"
   *        }
   *      },
   *      "required": [
   *        "id_server",
   *        "medium",
   *        "address"
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
  @Post('/_matrix/client/r0/rooms/:roomId/invite')
  async inviteBy3PID(
    @Param('roomId') roomId: string,
    @Body({ required: true })
    body: dto.InviteBy3PIDBody,
    @CurrentUser() user?: User
  ): Promise<dto.InviteBy3PIDResponse429 | any> {
    throw new HttpError(501);
  }
}
