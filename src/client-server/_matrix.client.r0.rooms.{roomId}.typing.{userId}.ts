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
export class MatrixClientR0RoomsRoomIdTypingUserId {
  /**
   * @description : This tells the server that the user is typing for the next N
   *milliseconds where N is the value specified in the ``timeout`` key.
   *Alternatively, if ``typing`` is ``false``, it tells the server that the
   *user has stopped typing.
   *
   * @parameters : [
   *  {
   *    "description": "The user who has started to type.",
   *    "in": "path",
   *    "name": "userId",
   *    "required": true,
   *    "type": "string",
   *    "x-example": "@alice:example.com"
   *  },
   *  {
   *    "description": "The room in which the user is typing.",
   *    "in": "path",
   *    "name": "roomId",
   *    "required": true,
   *    "type": "string",
   *    "x-example": "!wefh3sfukhs:example.com"
   *  },
   *  {
   *    "description": "The current typing state.",
   *    "in": "body",
   *    "name": "typingState",
   *    "required": true,
   *    "schema": {
   *      "example": {
   *        "timeout": 30000,
   *        "typing": true
   *      },
   *      "properties": {
   *        "timeout": {
   *          "description": "The length of time in milliseconds to mark this user as typing.",
   *          "type": "integer"
   *        },
   *        "typing": {
   *          "description": "Whether the user is typing or not. If ``false``, the ``timeout``\nkey can be omitted.",
   *          "type": "boolean"
   *        }
   *      },
   *      "required": [
   *        "typing"
   *      ],
   *      "type": "object"
   *    }
   *  }
   *]
   *
   * @responses : {
   *  "200": {
   *    "description": "The new typing state was set.",
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
   * @summary : Informs the server that the user has started or stopped typing.
   *
   */
  @Put('/_matrix/client/r0/rooms/:roomId/typing/:userId')
  async setTyping(
    @Param('userId') userId: string,
    @Param('roomId') roomId: string,
    @Body({ required: true })
    body: dto.SetTypingBody,
    @CurrentUser() user?: User
  ): Promise<dto.SetTypingResponse429 | any> {
    throw new HttpError(501);
  }
}
