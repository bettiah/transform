
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
export class MatrixClientR0PublicRooms {
@Get("/_matrix/client/r0/publicRooms")
async getPublicRooms(@QueryParam("limit",{ required: true }) limit:number,@QueryParam("since",{ required: true }) since:string,@QueryParam("server",{ required: true }) server:string) : Promise< dto.GetPublicRoomsResponse|any > {
 throw new HttpError(501);
}

@Post("/_matrix/client/r0/publicRooms")
async queryPublicRooms(@QueryParam("server",{ required: true }) server:string,@Body({ required: true }) body: dto.QueryPublicRoomsBody) : Promise< dto.QueryPublicRoomsResponse|any > {
 throw new HttpError(501);
}

}

