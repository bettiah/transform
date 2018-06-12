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
export class MatrixClientR0RoomsRoomIdForget {
  /**
   * @description : This API stops a user remembering about a particular room.
   *
   *In general, history is a first class citizen in Matrix. After this API
   *is called, however, a user will no longer be able to retrieve history
   *for this room. If all users on a homeserver forget a room, the room is
   *eligible for deletion from that homeserver.
   *
   *If the user is currently joined to the room, they will implicitly leave
   *the room as part of this API call.
   *
   * @parameters : [
   *  {
   *    "description": "The room identifier to forget.",
   *    "in": "path",
   *    "name": "roomId",
   *    "required": true,
   *    "type": "string",
   *    "x-example": "!au1ba7o:matrix.org"
   *  }
   *]
   *
   * @responses : {
   *  "200": {
   *    "description": "The room has been forgotten.",
   *    "examples": {
   *      "application/json": {}
   *    },
   *    "schema": {
   *      "type": "object"
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
   * @summary : Stop the requesting user remembering about a particular room.
   *
   */
  @Post('/_matrix/client/r0/rooms/:roomId/forget')
  async forgetRoom(
    @Param('roomId') roomId: string
  ): Promise<dto.ForgetRoomResponse429 | any> {
    throw new HttpError(501);
  }
}
