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

@JsonController('')
export class MatrixClientR0RoomsRoomIdJoin {
  /**
   * @description : *Note that this API requires a room ID, not alias.* ``/join/{roomIdOrAlias}`` *exists if you have a room alias.*
   *
   *This API starts a user participating in a particular room, if that user
   *is allowed to participate in that room. After this call, the client is
   *allowed to see all current state events in the room, and all subsequent
   *events associated with the room until the user leaves the room.
   *
   *After a user has joined a room, the room will appear as an entry in the
   *response of the |/initialSync|_ and |/sync|_ APIs.
   *
   *If a ``third_party_signed`` was supplied, the homeserver must verify
   *that it matches a pending ``m.room.third_party_invite`` event in the
   *room, and perform key validity checking if required by the event.
   *
   * @parameters : [
   *  {
   *    "description": "The room identifier (not alias) to join.",
   *    "in": "path",
   *    "name": "roomId",
   *    "required": true,
   *    "type": "string",
   *    "x-example": "!d41d8cd:matrix.org"
   *  },
   *  {
   *    "in": "body",
   *    "name": "third_party_signed",
   *    "schema": {
   *      "example": {
   *        "third_party_signed": {
   *          "mxid": "@green:eggs.ham",
   *          "sender": "@cat:the.hat",
   *          "signatures": {
   *            "horton.hears": {
   *              "ed25519:0": "some9signature"
   *            }
   *          },
   *          "token": "random8nonce"
   *        }
   *      },
   *      "properties": {
   *        "third_party_signed": {
   *          "description": "A signature of an ``m.third_party_invite`` token to prove that this user owns a third party identity which has been invited to the room.",
   *          "properties": {
   *            "mxid": {
   *              "description": "The Matrix ID of the invitee.",
   *              "type": "string"
   *            },
   *            "sender": {
   *              "description": "The Matrix ID of the user who issued the invite.",
   *              "type": "string"
   *            },
   *            "signatures": {
   *              "description": "A signatures object containing a signature of the entire signed object.",
   *              "title": "Signatures",
   *              "type": "object"
   *            },
   *            "token": {
   *              "description": "The state key of the m.third_party_invite event.",
   *              "type": "string"
   *            }
   *          },
   *          "required": [
   *            "sender",
   *            "mxid",
   *            "token",
   *            "signatures"
   *          ],
   *          "title": "ThirdPartySigned",
   *          "type": "object"
   *        }
   *      },
   *      "type": "object"
   *    }
   *  }
   *]
   *
   * @responses : {
   *  "200": {
   *    "description": "The room has been joined.\n\nThe joined room ID must be returned in the ``room_id`` field.",
   *    "examples": {
   *      "application/json": {
   *        "room_id": "!d41d8cd:matrix.org"
   *      }
   *    },
   *    "schema": {
   *      "type": "object"
   *    }
   *  },
   *  "403": {
   *    "description": "You do not have permission to join the room. A meaningful ``errcode`` and description error text will be returned. Example reasons for rejection are:\n\n- The room is invite-only and the user was not invited.\n- The user has been banned from the room.",
   *    "examples": {
   *      "application/json": {
   *        "errcode": "M_FORBIDDEN",
   *        "error": "You are not invited to this room."
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
   * @summary : Start the requesting user participating in a particular room.
   *
   */
  @Post('/_matrix/client/r0/rooms/:roomId/join')
  async joinRoomById(
    @Param('roomId') roomId: string,
    @Body({ required: true })
    body: dto.JoinRoomByIdBody
  ): Promise<dto.JoinRoomByIdResponse429 | any> {
    throw new HttpError(501);
  }
}
