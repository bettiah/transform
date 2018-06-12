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
export class MatrixClientR0RoomsRoomIdLeave {
  /**
   * @description : This API stops a user participating in a particular room.
   *
   *If the user was already in the room, they will no longer be able to see
   *new events in the room. If the room requires an invite to join, they
   *will need to be re-invited before they can re-join.
   *
   *If the user was invited to the room, but had not joined, this call
   *serves to reject the invite.
   *
   *The user will still be allowed to retrieve history from the room which
   *they were previously allowed to see.
   *
   * @parameters : [
   *  {
   *    "description": "The room identifier to leave.",
   *    "in": "path",
   *    "name": "roomId",
   *    "required": true,
   *    "type": "string",
   *    "x-example": "!nkl290a:matrix.org"
   *  }
   *]
   *
   * @responses : {
   *  "200": {
   *    "description": "The room has been left.",
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
   * @summary : Stop the requesting user participating in a particular room.
   *
   */
  @Post('/_matrix/client/r0/rooms/:roomId/leave')
  async leaveRoom(
    @Param('roomId') roomId: string
  ): Promise<dto.LeaveRoomResponse429 | any> {
    throw new HttpError(501);
  }
}
