
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
export class MatrixClientR0Account3pid {
@Get("/_matrix/client/r0/account/3pid")
async getAccount3PIDs() : Promise< dto.GetAccount3PIDsResponse|any > {
 throw new HttpError(501);
}

@Post("/_matrix/client/r0/account/3pid")
async post3PIDs(@Body({ required: true }) body: dto.Post3PIDsBody) : Promise< any > {
 throw new HttpError(501);
}

}

