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
export class MatrixClientR0UserUserIdRoomsRoomIdAccountDataType {
  /**
   * @description : Set some account_data for the client on a given room. This config is only
   *visible to the user that set the account_data. The config will be synced to
   *clients in the per-room ``account_data``.
   *
   * @parameters : [
   *  {
   *    "description": "The id of the user to set account_data for. The access token must be\nauthorized to make requests for this user id.",
   *    "in": "path",
   *    "name": "userId",
   *    "required": true,
   *    "type": "string",
   *    "x-example": "@alice:example.com"
   *  },
   *  {
   *    "description": "The id of the room to set account_data on.",
   *    "in": "path",
   *    "name": "roomId",
   *    "required": true,
   *    "type": "string",
   *    "x-example": "!726s6s6q:example.com"
   *  },
   *  {
   *    "description": "The event type of the account_data to set. Custom types should be\nnamespaced to avoid clashes.",
   *    "in": "path",
   *    "name": "type",
   *    "required": true,
   *    "type": "string",
   *    "x-example": "org.example.custom.room.config"
   *  },
   *  {
   *    "description": "The content of the account_data",
   *    "in": "body",
   *    "name": "content",
   *    "required": true,
   *    "schema": {
   *      "example": {
   *        "custom_account_data_key": "custom_account_data_value"
   *      },
   *      "type": "object"
   *    }
   *  }
   *]
   *
   * @responses : {
   *  "200": {
   *    "description": "The account_data was successfully added."
   *  }
   *}
   *
   * @security : [
   *  {
   *    "accessToken": []
   *  }
   *]
   *
   * @summary : Set some account_data for the user.
   *
   */
  @Put('/_matrix/client/r0/user/:userId/rooms/:roomId/account_data/:type')
  async setAccountDataPerRoom(
    @Param('userId') userId: string,
    @Param('roomId') roomId: string,
    @Param('type') type: string,
    @Body({ required: true })
    body: any,
    @CurrentUser() user?: User
  ): Promise<any> {
    throw new HttpError(501);
  }
}
