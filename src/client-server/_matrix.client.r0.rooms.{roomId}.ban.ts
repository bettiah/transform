
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
export class MatrixClientR0RoomsRoomIdBan {
@Post("/_matrix/client/r0/rooms/{roomId}/ban")
async ban(@Param("roomId") roomId:string,@Body({ required: true }) body: dto.BanBody) : Promise< any > {
 throw new HttpError(501);
}

}

