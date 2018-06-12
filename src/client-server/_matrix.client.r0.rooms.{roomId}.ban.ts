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
export class MatrixClientR0RoomsRoomIdBan {
  /**
   * @description : Ban a user in the room. If the user is currently in the room, also kick them.
   *
   *When a user is banned from a room, they may not join it or be invited to it until they are unbanned.
   *
   *The caller must have the required power level in order to perform this operation.
   *
   * @parameters : [
   *  {
   *    "description": "The room identifier (not alias) from which the user should be banned.",
   *    "in": "path",
   *    "name": "roomId",
   *    "required": true,
   *    "type": "string",
   *    "x-example": "!e42d8c:matrix.org"
   *  },
   *  {
   *    "in": "body",
   *    "name": "body",
   *    "required": true,
   *    "schema": {
   *      "example": {
   *        "reason": "Telling unfunny jokes",
   *        "user_id": "@cheeky_monkey:matrix.org"
   *      },
   *      "properties": {
   *        "reason": {
   *          "description": "The reason the user has been banned.",
   *          "type": "string"
   *        },
   *        "user_id": {
   *          "description": "The fully qualified user ID of the user being banned.",
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
   *    "description": "The user has been kicked and banned from the room.",
   *    "examples": {
   *      "application/json": {}
   *    },
   *    "schema": {
   *      "type": "object"
   *    }
   *  },
   *  "403": {
   *    "description": "You do not have permission to ban the user from the room. A meaningful ``errcode`` and description error text will be returned. Example reasons for rejections are:\n\n- The banner is not currently in the room.\n- The banner's power level is insufficient to ban users from the room.",
   *    "examples": {
   *      "application/json": {
   *        "errcode": "M_FORBIDDEN",
   *        "error": "You do not have a high enough power level to ban from this room."
   *      }
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
   * @summary : Ban a user in the room.
   *
   */
  @Post('/_matrix/client/r0/rooms/:roomId/ban')
  async ban(
    @Param('roomId') roomId: string,
    @Body({ required: true })
    body: dto.BanBody
  ): Promise<any> {
    throw new HttpError(501);
  }
}
