
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
export class MatrixClientR0KeysQuery {
@Post("/_matrix/client/r0/keys/query")
async queryKeys(@Body({ required: true }) body: dto.QueryKeysBody) : Promise< dto.QueryKeysResponse|any > {
 throw new HttpError(501);
}

}

