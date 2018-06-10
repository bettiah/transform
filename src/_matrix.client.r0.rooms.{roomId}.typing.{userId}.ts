
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
export class MatrixClientR0RoomsRoomIdTypingUserId {
@Put("/_matrix/client/r0/rooms/{roomId}/typing/{userId}")
async setTyping(@Param("userId") userId:string,@Param("roomId") roomId:string,@Body({ required: true }) body: dto.SetTypingBody) : Promise< dto.SetTypingResponse429|any > {
 throw new HttpError(501);
}

}

