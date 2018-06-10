
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
export class MatrixClientR0PresenceUserIdStatus {
@Get("/_matrix/client/r0/presence/{userId}/status")
async getPresence(@Param("userId") userId:string) : Promise< dto.GetPresenceResponse|any > {
 throw new HttpError(501);
}

@Put("/_matrix/client/r0/presence/{userId}/status")
async setPresence(@Param("userId") userId:string,@Body({ required: true }) body: dto.SetPresenceBody) : Promise< dto.SetPresenceResponse429|any > {
 throw new HttpError(501);
}

}

