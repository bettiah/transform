
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
export class MatrixClientR0UserUserIdRoomsRoomIdTags {
@Get("/_matrix/client/r0/user/{userId}/rooms/{roomId}/tags")
async getRoomTags(@Param("userId") userId:string,@Param("roomId") roomId:string) : Promise< dto.GetRoomTagsResponse|any > {
 throw new HttpError(501);
}

}

