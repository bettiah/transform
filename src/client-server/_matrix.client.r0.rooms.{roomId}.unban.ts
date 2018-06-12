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
export class MatrixClientR0RoomsRoomIdUnban {
  /**
   * @description : Unban a user from the room. This allows them to be invited to the room,
   *and join if they would otherwise be allowed to join according to its join rules.
   *
   *The caller must have the required power level in order to perform this operation.
   *
   * @parameters : [
   *  {
   *    "description": "The room identifier (not alias) from which the user should be unbanned.",
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
   *        "user_id": "@cheeky_monkey:matrix.org"
   *      },
   *      "properties": {
   *        "user_id": {
   *          "description": "The fully qualified user ID of the user being unbanned.",
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
   *    "description": "The user has been unbanned from the room.",
   *    "examples": {
   *      "application/json": {}
   *    },
   *    "schema": {
   *      "type": "object"
   *    }
   *  },
   *  "403": {
   *    "description": "You do not have permission to unban the user from the room. A meaningful ``errcode`` and description error text will be returned. Example reasons for rejections are:\n\n- The unbanner's power level is insufficient to unban users from the room.",
   *    "examples": {
   *      "application/json": {
   *        "errcode": "M_FORBIDDEN",
   *        "error": "You do not have a high enough power level to unban from this room."
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
   * @summary : Unban a user from the room.
   *
   */
  @Post('/_matrix/client/r0/rooms/:roomId/unban')
  async unban(
    @Param('roomId') roomId: string,
    @Body({ required: true })
    body: dto.UnbanBody,
    @CurrentUser() user?: User
  ): Promise<any> {
    throw new HttpError(501);
  }
}
