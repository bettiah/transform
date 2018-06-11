
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
export class MatrixClientR0Sync {
@Get("/_matrix/client/r0/sync")
async sync(@QueryParam("filter",{ required: true }) filter:string,@QueryParam("since",{ required: true }) since:string,@QueryParam("full_state",{ required: true }) fullState:boolean,@QueryParam("set_presence",{ required: true }) setPresence:string,@QueryParam("timeout",{ required: true }) timeout:number) : Promise< dto.SyncResponse|any > {
 throw new HttpError(501);
}

}

