
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
export class MatrixClientR0RoomsRoomIdLeave {
@Post("/_matrix/client/r0/rooms/{roomId}/leave")
async leaveRoom(@Param("roomId") roomId:string) : Promise< dto.LeaveRoomResponse429|any > {
 throw new HttpError(501);
}

}

