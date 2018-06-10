
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
export class MatrixClientR0RoomsRoomIdRedactEventIdTxnId {
@Put("/_matrix/client/r0/rooms/{roomId}/redact/{eventId}/{txnId}")
async redactEvent(@Param("roomId") roomId:string,@Param("eventId") eventId:string,@Param("txnId") txnId:string,@Body({ required: true }) body: dto.RedactEventBody) : Promise< dto.RedactEventResponse|any > {
 throw new HttpError(501);
}

}

