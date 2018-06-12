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
export class MatrixClientR0SendToDeviceEventTypeTxnId {
  /**
   * @description : This endpoint is used to send send-to-device events to a set of
   *client devices.
   *
   * @parameters : [
   *  {
   *    "description": "The type of event to send.",
   *    "in": "path",
   *    "name": "eventType",
   *    "required": true,
   *    "type": "string",
   *    "x-example": "m.new_device"
   *  },
   *  {
   *    "description": "The transaction ID for this event. Clients should generate an\nID unique across requests with the same access token; it will be\nused by the server to ensure idempotency of requests.",
   *    "in": "path",
   *    "name": "txnId",
   *    "required": true,
   *    "type": "string",
   *    "x-example": "35"
   *  },
   *  {
   *    "in": "body",
   *    "name": "body",
   *    "required": true,
   *    "schema": {
   *      "properties": {
   *        "messages": {
   *          "additionalProperties": {
   *            "additionalProperties": {
   *              "description": "Message content",
   *              "title": "EventContent",
   *              "type": "object"
   *            },
   *            "type": "object"
   *          },
   *          "description": "The messages to send. A map from user ID, to a map from\ndevice ID to message body. The device ID may also be `*`,\nmeaning all known devices for the user.",
   *          "example": {
   *            "@alice:example.com": {
   *              "TLLBEANAAG": {
   *                "example_content_key": "value"
   *              }
   *            }
   *          },
   *          "type": "object"
   *        }
   *      },
   *      "title": "body",
   *      "type": "object"
   *    }
   *  }
   *]
   *
   * @responses : {
   *  "200": {
   *    "description": "The message was successfully sent.",
   *    "examples": {
   *      "application/json": {}
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
   * @summary : Send an event to a given set of devices.
   *
   */
  @Put('/_matrix/client/r0/sendToDevice/:eventType/:txnId')
  async sendToDevice(
    @Param('eventType') eventType: string,
    @Param('txnId') txnId: string,
    @Body({ required: true })
    body: dto.SendToDeviceBody,
    @CurrentUser() user?: User
  ): Promise<any> {
    throw new HttpError(501);
  }
}
