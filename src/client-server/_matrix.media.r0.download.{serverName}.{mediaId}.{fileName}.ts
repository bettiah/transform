
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
export class MatrixMediaR0DownloadServerNameMediaIdFileName {
@Get("/_matrix/media/r0/download/{serverName}/{mediaId}/{fileName}")
async getContentOverrideName(@Param("serverName") serverName:string,@Param("mediaId") mediaId:string,@Param("fileName") fileName:string) : Promise< dto.GetContentOverrideNameResponse429|any > {
 throw new HttpError(501);
}

}

