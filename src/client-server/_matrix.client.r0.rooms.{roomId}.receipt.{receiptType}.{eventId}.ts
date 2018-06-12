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

@JsonController('')
export class MatrixClientR0RoomsRoomIdReceiptReceiptTypeEventId {
  /**
   * @description : This API updates the marker for the given receipt type to the event ID
   *specified.
   *
   * @parameters : [
   *  {
   *    "description": "The room in which to send the event.",
   *    "in": "path",
   *    "name": "roomId",
   *    "required": true,
   *    "type": "string",
   *    "x-example": "!wefuh21ffskfuh345:example.com"
   *  },
   *  {
   *    "description": "The type of receipt to send.",
   *    "enum": [
   *      "m.read"
   *    ],
   *    "in": "path",
   *    "name": "receiptType",
   *    "required": true,
   *    "type": "string",
   *    "x-example": "m.read"
   *  },
   *  {
   *    "description": "The event ID to acknowledge up to.",
   *    "in": "path",
   *    "name": "eventId",
   *    "required": true,
   *    "type": "string",
   *    "x-example": "$1924376522eioj:example.com"
   *  },
   *  {
   *    "description": "Extra receipt information to attach to ``content`` if any. The\nserver will automatically set the ``ts`` field.",
   *    "in": "body",
   *    "name": "receipt",
   *    "schema": {
   *      "example": {},
   *      "type": "object"
   *    }
   *  }
   *]
   *
   * @responses : {
   *  "200": {
   *    "description": "The receipt was sent.",
   *    "examples": {
   *      "application/json": {}
   *    },
   *    "schema": {
   *      "type": "object"
   *    }
   *  },
   *  "429": {
   *    "description": "This request was rate-limited.",
   *    "schema": {
   *      "description": "A Matrix-level Error",
   *      "properties": {
   *        "errcode": {
   *          "description": "An error code.",
   *          "type": "string"
   *        },
   *        "error": {
   *          "description": "A human-readable error message.",
   *          "type": "string"
   *        }
   *      },
   *      "required": [
   *        "errcode"
   *      ],
   *      "type": "object"
   *    }
   *  }
   *}
   *
   * @security : [
   *  {
   *    "accessToken": []
   *  }
   *]
   *
   * @summary : Send a receipt for the given event ID.
   *
   */
  @Post('/_matrix/client/r0/rooms/:roomId/receipt/:receiptType/:eventId')
  async postReceipt(
    @Param('roomId') roomId: string,
    @Param('receiptType') receiptType: string,
    @Param('eventId') eventId: string,
    @Body({ required: true })
    body: any
  ): Promise<dto.PostReceiptResponse429 | any> {
    throw new HttpError(501);
  }
}
