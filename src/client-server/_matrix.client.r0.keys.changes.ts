
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
export class MatrixClientR0KeysChanges {
@Get("/_matrix/client/r0/keys/changes")
async getKeysChanges(@QueryParam("from",{ required: true }) from:string,@QueryParam("to",{ required: true }) to:string) : Promise< dto.GetKeysChangesResponse|any > {
 throw new HttpError(501);
}

}

