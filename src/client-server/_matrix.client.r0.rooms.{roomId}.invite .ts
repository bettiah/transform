
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
  
  import * as dto from './types';  
  
@JsonController("")
export class MatrixClientR0RoomsRoomIdInvite {
@Post("/_matrix/client/r0/rooms/{roomId}/invite ")
async inviteUser(@Param("roomId") roomId:string,@Body({ required: true }) body: dto.InviteUserBody) : Promise< dto.InviteUserResponse429|any > {
 throw new HttpError(501);
}

}

