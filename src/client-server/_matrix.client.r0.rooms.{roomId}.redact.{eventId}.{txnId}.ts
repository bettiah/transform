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
import { User } from '../model';

@JsonController('')
export class MatrixClientR0RoomsRoomIdRedactEventIdTxnId {
  /**
   * @description : Strips all information out of an event which isn't critical to the
   *integrity of the server-side representation of the room.
   *
   *This cannot be undone.
   *
   *Users may redact their own events, and any user with a power level
   *greater than or equal to the `redact` power level of the room may
   *redact events there.
   *
   * @parameters : [
   *  {
   *    "description": "The room from which to redact the event.",
   *    "in": "path",
   *    "name": "roomId",
   *    "required": true,
   *    "type": "string",
   *    "x-example": "!637q39766251:example.com"
   *  },
   *  {
   *    "description": "The ID of the event to redact",
   *    "in": "path",
   *    "name": "eventId",
   *    "required": true,
   *    "type": "string",
   *    "x-example": "bai2b1i9:matrix.org"
   *  },
   *  {
   *    "description": "The transaction ID for this event. Clients should generate a\nunique ID; it will be used by the server to ensure idempotency of requests.",
   *    "in": "path",
   *    "name": "txnId",
   *    "required": true,
   *    "type": "string",
   *    "x-example": "37"
   *  },
   *  {
   *    "in": "body",
   *    "name": "body",
   *    "schema": {
   *      "example": {
   *        "reason": "Indecent material"
   *      },
   *      "properties": {
   *        "reason": {
   *          "description": "The reason for the event being redacted.",
   *          "type": "string"
   *        }
   *      },
   *      "type": "object"
   *    }
   *  }
   *]
   *
   * @responses : {
   *  "200": {
   *    "description": "An ID for the redaction event.",
   *    "examples": {
   *      "application/json": {
   *        "event_id": "$YUwQidLecu:example.com"
   *      }
   *    },
   *    "schema": {
   *      "properties": {
   *        "event_id": {
   *          "description": "A unique identifier for the event.",
   *          "type": "string"
   *        }
   *      },
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
   * @summary : Strips all non-integrity-critical information out of an event.
   *
   */
  @Put('/_matrix/client/r0/rooms/:roomId/redact/:eventId/:txnId')
  async redactEvent(
    @Param('roomId') roomId: string,
    @Param('eventId') eventId: string,
    @Param('txnId') txnId: string,
    @Body({ required: true })
    body: dto.RedactEventBody,
    @CurrentUser() user?: User
  ): Promise<dto.RedactEventResponse | any> {
    throw new HttpError(501);
  }
}
