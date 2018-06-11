
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
export class MatrixMediaR0PreviewUrl {
@Get("/_matrix/media/r0/preview_url")
async getUrlPreview(@QueryParam("url",{ required: true }) url:string,@QueryParam("ts",{ required: true }) ts:number) : Promise< dto.GetUrlPreviewResponse|dto.GetUrlPreviewResponse429|any > {
 throw new HttpError(501);
}

}

