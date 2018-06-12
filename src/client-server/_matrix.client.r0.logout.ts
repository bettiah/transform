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
export class MatrixClientR0Logout {
  /**
   * @description : Invalidates an existing access token, so that it can no longer be used for
   *authorization.
   *
   * @responses : {
   *  "200": {
   *    "description": "The access token used in the request was succesfully invalidated.",
   *    "schema": {
   *      "properties": {},
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
   * @summary : Invalidates a user access token
   *
   */
  @Post('/_matrix/client/r0/logout')
  async logout(@CurrentUser() user?: User): Promise<dto.LogoutResponse | any> {
    throw new HttpError(501);
  }
}
