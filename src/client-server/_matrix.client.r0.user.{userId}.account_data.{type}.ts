
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
export class MatrixClientR0UserUserIdAccountDataType {
@Put("/_matrix/client/r0/user/{userId}/account_data/{type}")
async setAccountData(@Param("userId") userId:string,@Param("type") type:string,@Body({ required: true }) body: any) : Promise< any > {
 throw new HttpError(501);
}

}

