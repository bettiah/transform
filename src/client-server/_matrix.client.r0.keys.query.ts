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
export class MatrixClientR0KeysQuery {
  /**
   * @description : Returns the current devices and identity keys for the given users.
   *
   * @parameters : [
   *  {
   *    "description": "Query defining the keys to be downloaded",
   *    "in": "body",
   *    "name": "query",
   *    "schema": {
   *      "properties": {
   *        "device_keys": {
   *          "additionalProperties": {
   *            "items": {
   *              "description": "device ID",
   *              "type": "string"
   *            },
   *            "type": "array"
   *          },
   *          "description": "The keys to be downloaded. A map from user ID, to a list of\ndevice IDs, or to an empty list to indicate all devices for the\ncorresponding user.",
   *          "example": {
   *            "@alice:example.com": []
   *          },
   *          "type": "object"
   *        },
   *        "timeout": {
   *          "description": "The time (in milliseconds) to wait when downloading keys from\nremote servers. 10 seconds is the recommended default.",
   *          "example": 10000,
   *          "type": "integer"
   *        },
   *        "token": {
   *          "description": "If the client is fetching keys as a result of a device update received\nin a sync request, this should be the 'since' token of that sync request,\nor any later sync token. This allows the server to ensure its response\ncontains the keys advertised by the notification in that sync.",
   *          "type": "string"
   *        }
   *      },
   *      "required": [
   *        "device_keys"
   *      ],
   *      "type": "object"
   *    }
   *  }
   *]
   *
   * @responses : {
   *  "200": {
   *    "description": "The device information",
   *    "schema": {
   *      "properties": {
   *        "device_keys": {
   *          "additionalProperties": {
   *            "additionalProperties": {
   *              "allOf": [
   *                {
   *                  "description": "Device identity keys",
   *                  "properties": {
   *                    "algorithms": {
   *                      "description": "The encryption algorithms supported by this device.",
   *                      "example": [
   *                        "m.olm.curve25519-aes-sha256",
   *                        "m.megolm.v1.aes-sha"
   *                      ],
   *                      "items": {
   *                        "type": "string"
   *                      },
   *                      "type": "array"
   *                    },
   *                    "device_id": {
   *                      "description": "The ID of the device these keys belong to. Must match the device ID used\nwhen logging in.",
   *                      "example": "JLAFKJWSCS",
   *                      "type": "string"
   *                    },
   *                    "keys": {
   *                      "additionalProperties": {
   *                        "type": "string"
   *                      },
   *                      "description": "Public identity keys. The names of the properties should be in the\nformat ``<algorithm>:<device_id>``. The keys themselves should be\nencoded as specified by the key algorithm.",
   *                      "example": {
   *                        "curve25519:JLAFKJWSCS": "3C5BFWi2Y8MaVvjM8M22DBmh24PmgR0nPvJOIArzgyI",
   *                        "ed25519:JLAFKJWSCS": "lEuiRJBit0IG6nUf5pUzWTUEsRVVe/HJkoKuEww9ULI"
   *                      },
   *                      "type": "object"
   *                    },
   *                    "signatures": {
   *                      "additionalProperties": {
   *                        "additionalProperties": {
   *                          "type": "string"
   *                        },
   *                        "type": "object"
   *                      },
   *                      "description": "Signatures for the device key object. A map from user ID, to a map from\n``<algorithm>:<device_id>`` to the signature.\n\nThe signature is calculated using the process described at `Signing\nJSON`_.",
   *                      "example": {
   *                        "@alice:example.com": {
   *                          "ed25519:JLAFKJWSCS": "dSO80A01XiigH3uBiDVx/EjzaoycHcjq9lfQX0uWsqxl2giMIiSPR8a4d291W1ihKJL/a+myXS367WT6NAIcBA"
   *                        }
   *                      },
   *                      "type": "object"
   *                    },
   *                    "user_id": {
   *                      "description": "The ID of the user the device belongs to. Must match the user ID used\nwhen logging in.",
   *                      "example": "@alice:example.com",
   *                      "type": "string"
   *                    }
   *                  },
   *                  "required": [
   *                    "user_id",
   *                    "device_id",
   *                    "algorithms",
   *                    "keys",
   *                    "signatures"
   *                  ],
   *                  "title": "DeviceKeys",
   *                  "type": "object"
   *                }
   *              ],
   *              "properties": {
   *                "unsigned": {
   *                  "description": "Additional data added to the device key information\nby intermediate servers, and not covered by the\nsignatures.",
   *                  "properties": {
   *                    "device_display_name": {
   *                      "description": "The display name which the user set on the device.",
   *                      "type": "string"
   *                    }
   *                  },
   *                  "title": "UnsignedDeviceInfo",
   *                  "type": "object"
   *                }
   *              }
   *            },
   *            "type": "object"
   *          },
   *          "description": "Information on the queried devices. A map from user ID, to a\nmap from device ID to device information.  For each device,\nthe information returned will be the same as uploaded via\n``/keys/upload``, with the addition of an ``unsigned``\nproperty.",
   *          "example": {
   *            "@alice:example.com": {
   *              "JLAFKJWSCS": {
   *                "algorithms": [
   *                  "m.olm.curve25519-aes-sha256",
   *                  "m.megolm.v1.aes-sha"
   *                ],
   *                "device_id": "JLAFKJWSCS",
   *                "keys": {
   *                  "curve25519:JLAFKJWSCS": "3C5BFWi2Y8MaVvjM8M22DBmh24PmgR0nPvJOIArzgyI",
   *                  "ed25519:JLAFKJWSCS": "lEuiRJBit0IG6nUf5pUzWTUEsRVVe/HJkoKuEww9ULI"
   *                },
   *                "signatures": {
   *                  "@alice:example.com": {
   *                    "ed25519:JLAFKJWSCS": "dSO80A01XiigH3uBiDVx/EjzaoycHcjq9lfQX0uWsqxl2giMIiSPR8a4d291W1ihKJL/a+myXS367WT6NAIcBA"
   *                  }
   *                },
   *                "unsigned": {
   *                  "device_display_name": "Alice's mobile phone"
   *                },
   *                "user_id": "@alice:example.com"
   *              }
   *            }
   *          },
   *          "type": "object"
   *        },
   *        "failures": {
   *          "additionalProperties": {
   *            "type": "object"
   *          },
   *          "description": "If any remote homeservers could not be reached, they are\nrecorded here. The names of the properties are the names of\nthe unreachable servers.\n\nIf the homeserver could be reached, but the user or device\nwas unknown, no failure is recorded. Instead, the corresponding\nuser or device is missing from the ``device_keys`` result.",
   *          "example": {},
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
   * @summary : Download device identity keys.
   *
   */
  @Post('/_matrix/client/r0/keys/query')
  async queryKeys(
    @Body({ required: true })
    body: dto.QueryKeysBody
  ): Promise<dto.QueryKeysResponse | any> {
    throw new HttpError(501);
  }
}
