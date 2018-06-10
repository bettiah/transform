
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
export class MatrixMediaR0ThumbnailServerNameMediaId {
@Get("/_matrix/media/r0/thumbnail/{serverName}/{mediaId}")
async getContentThumbnail(@Param("serverName") serverName:string,@Param("mediaId") mediaId:string,@QueryParam("width",{ required: true }) width:number,@QueryParam("height",{ required: true }) height:number,@QueryParam("method",{ required: true }) method:string) : Promise< dto.GetContentThumbnailResponse429|any > {
 throw new HttpError(501);
}

}

