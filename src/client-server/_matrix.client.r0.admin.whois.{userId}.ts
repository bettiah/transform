
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
export class MatrixClientR0AdminWhoisUserId {
@Get("/_matrix/client/r0/admin/whois/{userId}")
async getWhoIs(@Param("userId") userId:string) : Promise< dto.GetWhoIsResponse|any > {
 throw new HttpError(501);
}

}

