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
export class MatrixClientR0KeysClaim {
  /**
   * @description : Claims one-time keys for use in pre-key messages.
   *
   * @parameters : [
   *  {
   *    "description": "Query defining the keys to be claimed",
   *    "in": "body",
   *    "name": "query",
   *    "schema": {
   *      "properties": {
   *        "one_time_keys": {
   *          "additionalProperties": {
   *            "additionalProperties": {
   *              "description": "algorithm",
   *              "example": "signed_curve25519",
   *              "type": "string"
   *            },
   *            "type": "object"
   *          },
   *          "description": "The keys to be claimed. A map from user ID, to a map from\ndevice ID to algorithm name.",
   *          "example": {
   *            "@alice:example.com": {
   *              "JLAFKJWSCS": "curve25519"
   *            }
   *          },
   *          "type": "object"
   *        },
   *        "timeout": {
   *          "description": "The time (in milliseconds) to wait when downloading keys from\nremote servers. 10 seconds is the recommended default.",
   *          "example": 10000,
   *          "type": "integer"
   *        }
   *      },
   *      "required": [
   *        "one_time_keys"
   *      ],
   *      "type": "object"
   *    }
   *  }
   *]
   *
   * @responses : {
   *  "200": {
   *    "description": "The claimed keys",
   *    "schema": {
   *      "properties": {
   *        "failures": {
   *          "additionalProperties": {
   *            "type": "object"
   *          },
   *          "description": "If any remote homeservers could not be reached, they are\nrecorded here. The names of the properties are the names of\nthe unreachable servers.\n\nIf the homeserver could be reached, but the user or device\nwas unknown, no failure is recorded. Instead, the corresponding\nuser or device is missing from the ``one_time_keys`` result.",
   *          "example": {},
   *          "type": "object"
   *        },
   *        "one_time_keys": {
   *          "additionalProperties": {
   *            "additionalProperties": {
   *              "type": [
   *                "string",
   *                "object"
   *              ]
   *            },
   *            "type": "object"
   *          },
   *          "description": "One-time keys for the queried devices. A map from user ID, to a\nmap from ``<algorithm>:<key_id>`` to the key object.",
   *          "example": {
   *            "@alice:example.com": {
   *              "JLAFKJWSCS": {
   *                "signed_curve25519:AAAAHg": {
   *                  "key": "zKbLg+NrIjpnagy+pIY6uPL4ZwEG2v+8F9lmgsnlZzs",
   *                  "signatures": {
   *                    "@alice:example.com": {
   *                      "ed25519:JLAFKJWSCS": "FLWxXqGbwrb8SM3Y795eB6OA8bwBcoMZFXBqnTn58AYWZSqiD45tlBVcDa2L7RwdKXebW/VzDlnfVJ+9jok1Bw"
   *                    }
   *                  }
   *                }
   *              }
   *            }
   *          },
   *          "type": "object"
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
   * @summary : Claim one-time encryption keys.
   *
   */
  @Post('/_matrix/client/r0/keys/claim')
  async claimKeys(
    @Body({ required: true })
    body: dto.ClaimKeysBody,
    @CurrentUser() user?: User
  ): Promise<dto.ClaimKeysResponse | any> {
    throw new HttpError(501);
  }
}
