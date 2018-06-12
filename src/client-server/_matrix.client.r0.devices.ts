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
export class MatrixClientR0Devices {
  /**
   * @description : Gets information about all devices for the current user.
   *
   * @responses : {
   *  "200": {
   *    "description": "Device information",
   *    "examples": {
   *      "application/json": {
   *        "devices": [
   *          {
   *            "device_id": "QBUAZIFURK",
   *            "display_name": "android",
   *            "last_seen_ip": "1.2.3.4",
   *            "last_seen_ts": 1474491775024
   *          }
   *        ]
   *      }
   *    },
   *    "schema": {
   *      "properties": {
   *        "devices": {
   *          "description": "A list of all registered devices for this user.",
   *          "items": {
   *            "allOf": [
   *              {
   *                "description": "A client device",
   *                "properties": {
   *                  "device_id": {
   *                    "description": "Identifier of this device.",
   *                    "example": "QBUAZIFURK",
   *                    "type": "string"
   *                  },
   *                  "display_name": {
   *                    "description": "Display name set by the user for this device. Absent if no name has been\nset.",
   *                    "example": "android",
   *                    "type": "string"
   *                  },
   *                  "last_seen_ip": {
   *                    "description": "The IP address where this device was last seen. (May be a few minutes out\nof date, for efficiency reasons).",
   *                    "example": "1.2.3.4",
   *                    "type": "string"
   *                  },
   *                  "last_seen_ts": {
   *                    "description": "The timestamp (in milliseconds since the unix epoch) when this devices\nwas last seen. (May be a few minutes out of date, for efficiency\nreasons).",
   *                    "example": 1474491775024,
   *                    "format": "int64",
   *                    "type": "integer"
   *                  }
   *                },
   *                "required": [
   *                  "device_id"
   *                ],
   *                "title": "Device",
   *                "type": "object"
   *              }
   *            ],
   *            "type": "object"
   *          },
   *          "type": "array"
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
   * @summary : List registered devices for the current user
   *
   */
  @Get('/_matrix/client/r0/devices')
  async getDevices(): Promise<dto.GetDevicesResponse | any> {
    throw new HttpError(501);
  }
}
