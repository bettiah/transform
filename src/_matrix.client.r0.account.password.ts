
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
  
  import * as dto from './dto';  
  
@JsonController("")
export class MatrixClientR0AccountPassword {
@Post("/_matrix/client/r0/account/password")
async changePassword(@Body({ required: true }) body: dto.ChangePasswordBody) : Promise< dto.AuthenticationResponse|dto.ChangePasswordResponse429|any > {
 throw new HttpError(501);
}

}

