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
export class MatrixClientR0DevicesDeviceId {
  /**
   * @description : Gets information on a single device, by device id.
   *
   * @parameters : [
   *  {
   *    "description": "The device to retrieve.",
   *    "in": "path",
   *    "name": "deviceId",
   *    "required": true,
   *    "type": "string",
   *    "x-example": "QBUAZIFURK"
   *  }
   *]
   *
   * @responses : {
   *  "200": {
   *    "description": "Device information",
   *    "examples": {
   *      "application/json": {
   *        "device_id": "QBUAZIFURK",
   *        "display_name": "android",
   *        "last_seen_ip": "1.2.3.4",
   *        "last_seen_ts": 1474491775024
   *      }
   *    },
   *    "schema": {
   *      "allOf": [
   *        {
   *          "description": "A client device",
   *          "properties": {
   *            "device_id": {
   *              "description": "Identifier of this device.",
   *              "example": "QBUAZIFURK",
   *              "type": "string"
   *            },
   *            "display_name": {
   *              "description": "Display name set by the user for this device. Absent if no name has been\nset.",
   *              "example": "android",
   *              "type": "string"
   *            },
   *            "last_seen_ip": {
   *              "description": "The IP address where this device was last seen. (May be a few minutes out\nof date, for efficiency reasons).",
   *              "example": "1.2.3.4",
   *              "type": "string"
   *            },
   *            "last_seen_ts": {
   *              "description": "The timestamp (in milliseconds since the unix epoch) when this devices\nwas last seen. (May be a few minutes out of date, for efficiency\nreasons).",
   *              "example": 1474491775024,
   *              "format": "int64",
   *              "type": "integer"
   *            }
   *          },
   *          "required": [
   *            "device_id"
   *          ],
   *          "title": "Device",
   *          "type": "object"
   *        }
   *      ],
   *      "type": "object"
   *    }
   *  },
   *  "404": {
   *    "description": "The current user has no device with the given ID."
   *  }
   *}
   *
   * @security : [
   *  {
   *    "accessToken": []
   *  }
   *]
   *
   * @summary : Get a single device
   *
   */
  @Get('/_matrix/client/r0/devices/:deviceId')
  async getDevice(
    @Param('deviceId') deviceId: string
  ): Promise<dto.DeviceResponse | any> {
    throw new HttpError(501);
  }

  /**
   * @description : Updates the metadata on the given device.
   *
   * @parameters : [
   *  {
   *    "description": "The device to update.",
   *    "in": "path",
   *    "name": "deviceId",
   *    "required": true,
   *    "type": "string",
   *    "x-example": "QBUAZIFURK"
   *  },
   *  {
   *    "description": "New information for the device.",
   *    "in": "body",
   *    "name": "body",
   *    "required": true,
   *    "schema": {
   *      "properties": {
   *        "display_name": {
   *          "description": "The new display name for this device. If not given, the\ndisplay name is unchanged.",
   *          "example": "My other phone",
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
   *    "description": "The device was successfully updated.",
   *    "examples": {
   *      "application/json": {}
   *    },
   *    "schema": {
   *      "type": "object"
   *    }
   *  },
   *  "404": {
   *    "description": "The current user has no device with the given ID."
   *  }
   *}
   *
   * @security : [
   *  {
   *    "accessToken": []
   *  }
   *]
   *
   * @summary : Update a device
   *
   */
  @Put('/_matrix/client/r0/devices/:deviceId')
  async updateDevice(
    @Param('deviceId') deviceId: string,
    @Body({ required: true })
    body: dto.UpdateDeviceBody
  ): Promise<any> {
    throw new HttpError(501);
  }

  /**
   * @description : This API endpoint uses the `User-Interactive Authentication API`_.
   *
   *Deletes the given device, and invalidates any access token associated with it.
   *
   * @parameters : [
   *  {
   *    "description": "The device to delete.",
   *    "in": "path",
   *    "name": "deviceId",
   *    "required": true,
   *    "type": "string",
   *    "x-example": "QBUAZIFURK"
   *  },
   *  {
   *    "in": "body",
   *    "name": "body",
   *    "schema": {
   *      "properties": {
   *        "auth": {
   *          "additionalProperties": {
   *            "description": "Keys dependent on the login type",
   *            "type": "object"
   *          },
   *          "description": "Additional authentication information for the\nuser-interactive authentication API.",
   *          "example": {
   *            "example_credential": "verypoorsharedsecret",
   *            "session": "xxxxx",
   *            "type": "example.type.foo"
   *          },
   *          "properties": {
   *            "session": {
   *              "description": "The value of the session key given by the homeserver.",
   *              "type": "string"
   *            },
   *            "type": {
   *              "description": "The login type that the client is attempting to complete.",
   *              "type": "string"
   *            }
   *          },
   *          "required": [
   *            "type"
   *          ],
   *          "title": "Authentication Data",
   *          "type": "object"
   *        }
   *      },
   *      "type": "object"
   *    }
   *  }
   *]
   *
   * @responses : {
   *  "200": {
   *    "description": "The device was successfully removed, or had been removed\npreviously.",
   *    "examples": {
   *      "application/json": {}
   *    },
   *    "schema": {
   *      "type": "object"
   *    }
   *  },
   *  "401": {
   *    "description": "The homeserver requires additional authentication information.",
   *    "schema": {
   *      "description": "Used by servers to indicate that additional authentication information is required,",
   *      "properties": {
   *        "completed": {
   *          "description": "A list of the stages the client has completed successfully",
   *          "items": {
   *            "example": "example.type.foo",
   *            "type": "string"
   *          },
   *          "type": "array"
   *        },
   *        "flows": {
   *          "description": "A list of the login flows supported by the server for this API.",
   *          "items": {
   *            "properties": {
   *              "stages": {
   *                "description": "The login type of each of the stages required to complete this\nauthentication flow",
   *                "items": {
   *                  "example": "example.type.foo",
   *                  "type": "string"
   *                },
   *                "type": "array"
   *              }
   *            },
   *            "required": [
   *              "stages"
   *            ],
   *            "type": "object"
   *          },
   *          "title": "Flow information",
   *          "type": "array"
   *        },
   *        "params": {
   *          "additionalProperties": {
   *            "type": "object"
   *          },
   *          "description": "Contains any information that the client will need to know in order to\nuse a given type of authentication. For each login type presented,\nthat type may be present as a key in this dictionary. For example, the\npublic part of an OAuth client ID could be given here.",
   *          "example": {
   *            "example.type.baz": {
   *              "example_key": "foobar"
   *            }
   *          },
   *          "type": "object"
   *        },
   *        "session": {
   *          "description": "This is a session identifier that the client must pass back to the home\nserver, if one is provided, in subsequent attempts to authenticate in the\nsame API call.",
   *          "example": "xxxxxxyz",
   *          "type": "string"
   *        }
   *      },
   *      "required": [
   *        "flows"
   *      ],
   *      "title": "Authentication response",
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
   * @summary : Delete a device
   *
   */
  @Delete('/_matrix/client/r0/devices/:deviceId')
  async deleteDevice(
    @Param('deviceId') deviceId: string,
    @Body({ required: true })
    body: dto.DeleteDeviceBody
  ): Promise<dto.AuthenticationResponse | any> {
    throw new HttpError(501);
  }
}
