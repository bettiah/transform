
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
export class MatrixClientR0UserUserIdRoomsRoomIdAccountDataType {
@Put("/_matrix/client/r0/user/{userId}/rooms/{roomId}/account_data/{type}")
async setAccountDataPerRoom(@Param("userId") userId:string,@Param("roomId") roomId:string,@Param("type") type:string,@Body({ required: true }) body: any) : Promise< any > {
 throw new HttpError(501);
}

}

