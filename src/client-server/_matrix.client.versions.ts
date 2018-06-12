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
export class MatrixClientVersions {
  /**
   * @description : Gets the versions of the specification supported by the server.
   *
   *Values will take the form ``rX.Y.Z``.
   *
   *Only the latest ``Z`` value will be reported for each supported ``X.Y`` value.
   *i.e. if the server implements ``r0.0.0``, ``r0.0.1``, and ``r1.2.0``, it will report ``r0.0.1`` and ``r1.2.0``.
   *
   * @responses : {
   *  "200": {
   *    "description": "The versions supported by the server.",
   *    "examples": {
   *      "application/json": {
   *        "versions": [
   *          "r0.0.1"
   *        ]
   *      }
   *    },
   *    "schema": {
   *      "properties": {
   *        "versions": {
   *          "description": "The supported versions.",
   *          "items": {
   *            "description": "The supported versions",
   *            "type": "string"
   *          },
   *          "type": "array"
   *        }
   *      },
   *      "type": "object"
   *    }
   *  }
   *}
   *
   * @summary : Gets the versions of the specification supported by the server.
   *
   */
  @Get('/_matrix/client/versions')
  async getVersions(): Promise<dto.GetVersionsResponse | any> {
    throw new HttpError(501);
  }
}
