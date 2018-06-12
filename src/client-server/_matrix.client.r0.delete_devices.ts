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
export class MatrixClientR0DeleteDevices {
  /**
   * @description : This API endpoint uses the `User-Interactive Authentication API`_.
   *
   *Deletes the given devices, and invalidates any access token associated with them.
   *
   * @parameters : [
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
   *        },
   *        "devices": {
   *          "description": "The list of device IDs to delete.",
   *          "example": [
   *            "QBUAZIFURK",
   *            "AUIECTSRND"
   *          ],
   *          "items": {
   *            "description": "A list of device IDs.",
   *            "type": "string"
   *          },
   *          "type": "array"
   *        }
   *      },
   *      "required": [
   *        "devices"
   *      ],
   *      "type": "object"
   *    }
   *  }
   *]
   *
   * @responses : {
   *  "200": {
   *    "description": "The devices were successfully removed, or had been removed\npreviously.",
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
   * @summary : Bulk deletion of devices
   *
   */
  @Post('/_matrix/client/r0/delete_devices')
  async deleteDevices(
    @Body({ required: true })
    body: dto.DeleteDevicesBody,
    @CurrentUser() user?: User
  ): Promise<dto.AuthenticationResponse | any> {
    throw new HttpError(501);
  }
}
