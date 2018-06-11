
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
export class MatrixClientR0VoipTurnServer {
@Get("/_matrix/client/r0/voip/turnServer")
async getTurnServer() : Promise< dto.GetTurnServerResponse|dto.GetTurnServerResponse429|any > {
 throw new HttpError(501);
}

}

