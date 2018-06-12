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
export class MatrixClientR0UserUserIdAccountDataType {
  /**
   * @description : Set some account_data for the client. This config is only visible to the user
   *that set the account_data. The config will be synced to clients in the
   *top-level ``account_data``.
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
   *    "description": "The event type of the account_data to set. Custom types should be\nnamespaced to avoid clashes.",
   *    "in": "path",
   *    "name": "type",
   *    "required": true,
   *    "type": "string",
   *    "x-example": "org.example.custom.config"
   *  },
   *  {
   *    "description": "The content of the account_data",
   *    "in": "body",
   *    "name": "content",
   *    "required": true,
   *    "schema": {
   *      "example": {
   *        "custom_account_data_key": "custom_config_value"
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
  @Put('/_matrix/client/r0/user/:userId/account_data/:type')
  async setAccountData(
    @Param('userId') userId: string,
    @Param('type') type: string,
    @Body({ required: true })
    body: any,
    @CurrentUser() user?: User
  ): Promise<any> {
    throw new HttpError(501);
  }
}
