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
import { loginUser } from '../auth';
import { LoginType } from '../types';

@JsonController('')
export class MatrixClientR0Login {
  @Post('/_matrix/client/r0/login')
  async login(
    @Body({ required: true })
    body: dto.LoginBody
  ): Promise<dto.LoginResponse | dto.LoginResponse429 | any> {
    if (body.type === LoginType.password) {
      const signedIn = await loginUser(
        body.user!,
        body.password!,
        body.device_id
      );
      const resp: dto.LoginResponse = {
        access_token: signedIn.jwt,
        device_id: signedIn.session.device_id,
        home_server: signedIn.session.home_server,
        user_id: signedIn.session.user_id
      };
      return resp;
    }
    throw new HttpError(501);
  }
}
