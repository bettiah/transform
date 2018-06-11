
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
export class MatrixClientR0RoomsRoomIdReceiptReceiptTypeEventId {
@Post("/_matrix/client/r0/rooms/{roomId}/receipt/{receiptType}/{eventId}")
async postReceipt(@Param("roomId") roomId:string,@Param("receiptType") receiptType:string,@Param("eventId") eventId:string,@Body({ required: true }) body: any) : Promise< dto.PostReceiptResponse429|any > {
 throw new HttpError(501);
}

}

