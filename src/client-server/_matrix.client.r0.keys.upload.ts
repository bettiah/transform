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
export class MatrixClientR0KeysUpload {
  /**
   * @description : Publishes end-to-end encryption keys for the device.
   *
   * @parameters : [
   *  {
   *    "description": "The keys to be published",
   *    "in": "body",
   *    "name": "keys",
   *    "schema": {
   *      "properties": {
   *        "device_keys": {
   *          "allOf": [
   *            {
   *              "description": "Device identity keys",
   *              "properties": {
   *                "algorithms": {
   *                  "description": "The encryption algorithms supported by this device.",
   *                  "example": [
   *                    "m.olm.curve25519-aes-sha256",
   *                    "m.megolm.v1.aes-sha"
   *                  ],
   *                  "items": {
   *                    "type": "string"
   *                  },
   *                  "type": "array"
   *                },
   *                "device_id": {
   *                  "description": "The ID of the device these keys belong to. Must match the device ID used\nwhen logging in.",
   *                  "example": "JLAFKJWSCS",
   *                  "type": "string"
   *                },
   *                "keys": {
   *                  "additionalProperties": {
   *                    "type": "string"
   *                  },
   *                  "description": "Public identity keys. The names of the properties should be in the\nformat ``<algorithm>:<device_id>``. The keys themselves should be\nencoded as specified by the key algorithm.",
   *                  "example": {
   *                    "curve25519:JLAFKJWSCS": "3C5BFWi2Y8MaVvjM8M22DBmh24PmgR0nPvJOIArzgyI",
   *                    "ed25519:JLAFKJWSCS": "lEuiRJBit0IG6nUf5pUzWTUEsRVVe/HJkoKuEww9ULI"
   *                  },
   *                  "type": "object"
   *                },
   *                "signatures": {
   *                  "additionalProperties": {
   *                    "additionalProperties": {
   *                      "type": "string"
   *                    },
   *                    "type": "object"
   *                  },
   *                  "description": "Signatures for the device key object. A map from user ID, to a map from\n``<algorithm>:<device_id>`` to the signature.\n\nThe signature is calculated using the process described at `Signing\nJSON`_.",
   *                  "example": {
   *                    "@alice:example.com": {
   *                      "ed25519:JLAFKJWSCS": "dSO80A01XiigH3uBiDVx/EjzaoycHcjq9lfQX0uWsqxl2giMIiSPR8a4d291W1ihKJL/a+myXS367WT6NAIcBA"
   *                    }
   *                  },
   *                  "type": "object"
   *                },
   *                "user_id": {
   *                  "description": "The ID of the user the device belongs to. Must match the user ID used\nwhen logging in.",
   *                  "example": "@alice:example.com",
   *                  "type": "string"
   *                }
   *              },
   *              "required": [
   *                "user_id",
   *                "device_id",
   *                "algorithms",
   *                "keys",
   *                "signatures"
   *              ],
   *              "title": "DeviceKeys",
   *              "type": "object"
   *            }
   *          ],
   *          "description": "Identity keys for the device. May be absent if no new\nidentity keys are required."
   *        },
   *        "one_time_keys": {
   *          "additionalProperties": {
   *            "type": [
   *              "string",
   *              "object"
   *            ]
   *          },
   *          "description": "One-time public keys for \"pre-key\" messages.  The names of\nthe properties should be in the format\n``<algorithm>:<key_id>``. The format of the key is determined\nby the key algorithm.\n\nMay be absent if no new one-time keys are required.",
   *          "example": {
   *            "curve25519:AAAAAQ": "/qyvZvwjiTxGdGU0RCguDCLeR+nmsb3FfNG3/Ve4vU8",
   *            "signed_curve25519:AAAAHQ": {
   *              "key": "j3fR3HemM16M7CWhoI4Sk5ZsdmdfQHsKL1xuSft6MSw",
   *              "signatures": {
   *                "@alice:example.com": {
   *                  "ed25519:JLAFKJWSCS": "IQeCEPb9HFk217cU9kw9EOiusC6kMIkoIRnbnfOh5Oc63S1ghgyjShBGpu34blQomoalCyXWyhaaT3MrLZYQAA"
   *                }
   *              }
   *            },
   *            "signed_curve25519:AAAAHg": {
   *              "key": "zKbLg+NrIjpnagy+pIY6uPL4ZwEG2v+8F9lmgsnlZzs",
   *              "signatures": {
   *                "@alice:example.com": {
   *                  "ed25519:JLAFKJWSCS": "FLWxXqGbwrb8SM3Y795eB6OA8bwBcoMZFXBqnTn58AYWZSqiD45tlBVcDa2L7RwdKXebW/VzDlnfVJ+9jok1Bw"
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
   *]
   *
   * @responses : {
   *  "200": {
   *    "description": "The provided keys were sucessfully uploaded.",
   *    "schema": {
   *      "properties": {
   *        "one_time_key_counts": {
   *          "additionalProperties": {
   *            "type": "integer"
   *          },
   *          "description": "For each key algorithm, the number of unclaimed one-time keys\nof that type currently held on the server for this device.",
   *          "example": {
   *            "curve25519": 10,
   *            "signed_curve25519": 20
   *          },
   *          "type": "object"
   *        }
   *      },
   *      "required": [
   *        "one_time_key_counts"
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
   * @summary : Upload end-to-end encryption keys.
   *
   */
  @Post('/_matrix/client/r0/keys/upload')
  async uploadKeys(
    @Body({ required: true })
    body: dto.UploadKeysBody
  ): Promise<dto.UploadKeysResponse | any> {
    throw new HttpError(501);
  }
}
