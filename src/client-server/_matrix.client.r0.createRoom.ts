
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
export class MatrixClientR0CreateRoom {
@Post("/_matrix/client/r0/createRoom")
async createRoom(@Body({ required: true }) body: dto.CreateRoomBody) : Promise< dto.CreateRoomResponse|any > {
 throw new HttpError(501);
}

}

