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
export class MatrixClientR0RoomsRoomIdKick {
  /**
   * @description : Kick a user from the room.
   *
   *The caller must have the required power level in order to perform this operation.
   *
   * @parameters : [
   *  {
   *    "description": "The room identifier (not alias) from which the user should be kicked.",
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
   *          "description": "The reason the user has been kicked.",
   *          "type": "string"
   *        },
   *        "user_id": {
   *          "description": "The fully qualified user ID of the user being kicked.",
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
   *    "description": "The user has been kicked from the room.",
   *    "examples": {
   *      "application/json": {}
   *    },
   *    "schema": {
   *      "type": "object"
   *    }
   *  },
   *  "403": {
   *    "description": "You do not have permission to kick the user from the room. A meaningful ``errcode`` and description error text will be returned. Example reasons for rejections are:\n\n- The kicker is not currently in the room.\n- The kickee is not currently in the room.\n- The kicker's power level is insufficient to kick users from the room.",
   *    "examples": {
   *      "application/json": {
   *        "errcode": "M_FORBIDDEN",
   *        "error": "You do not have a high enough power level to kick from this room."
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
   * @summary : Kick a user from the room.
   *
   */
  @Post('/_matrix/client/r0/rooms/:roomId/kick')
  async kick(
    @Param('roomId') roomId: string,
    @Body({ required: true })
    body: dto.KickBody,
    @CurrentUser() user?: User
  ): Promise<any> {
    throw new HttpError(501);
  }
}
