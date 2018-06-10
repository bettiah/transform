
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
export class MatrixClientR0RegisterAvailable {
@Get("/_matrix/client/r0/register/available")
async checkUsernameAvailability(@QueryParam("username",{ required: true }) username:string) : Promise< dto.CheckUsernameAvailabilityResponse|dto.CheckUsernameAvailabilityResponse429|any > {
 throw new HttpError(501);
}

}

