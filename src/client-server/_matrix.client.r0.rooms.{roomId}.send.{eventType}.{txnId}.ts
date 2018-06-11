
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
export class MatrixClientR0RoomsRoomIdSendEventTypeTxnId {
@Put("/_matrix/client/r0/rooms/{roomId}/send/{eventType}/{txnId}")
async sendMessage(@Param("roomId") roomId:string,@Param("eventType") eventType:string,@Param("txnId") txnId:string,@Body({ required: true }) body: any) : Promise< dto.SendMessageResponse|any > {
 throw new HttpError(501);
}

}

