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
export class MatrixClientR0RegisterAvailable {
  /**
   * @description : Checks to see if a username is available, and valid, for the server.
   *
   *The server should check to ensure that, at the time of the request, the
   *username requested is available for use. This includes verifying that an
   *application service has not claimed the username and that the username
   *fits the server's desired requirements (for example, a server could dictate
   *that it does not permit usernames with underscores).
   *
   *Matrix clients may wish to use this API prior to attempting registration,
   *however the clients must also be aware that using this API does not normally
   *reserve the username. This can mean that the username becomes unavailable
   *between checking its availability and attempting to register it.
   *
   * @parameters : [
   *  {
   *    "default": "my_cool_localpart",
   *    "description": "The username to check the availability of.",
   *    "in": "query",
   *    "name": "username",
   *    "required": true,
   *    "type": "string",
   *    "x-example": "my_cool_localpart"
   *  }
   *]
   *
   * @responses : {
   *  "200": {
   *    "description": "The username is available",
   *    "examples": {
   *      "application/json": {
   *        "available": true
   *      }
   *    },
   *    "schema": {
   *      "properties": {
   *        "available": {
   *          "description": "A flag to indicate that the username is available. This should always\nbe ``true`` when the server replies with 200 OK.",
   *          "type": "boolean"
   *        }
   *      },
   *      "type": "object"
   *    }
   *  },
   *  "400": {
   *    "description": "Part of the request was invalid or the username is not available. This may \ninclude one of the following error codes:\n\n* ``M_USER_IN_USE`` : The desired username is already taken.\n* ``M_INVALID_USERNAME`` : The desired username is not a valid user name.\n* ``M_EXCLUSIVE`` : The desired username is in the exclusive namespace\n  claimed by an application service.",
   *    "examples": {
   *      "application/json": {
   *        "errcode": "M_USER_IN_USE",
   *        "error": "Desired user ID is already taken."
   *      }
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
   * @summary : Checks to see if a username is available on the server.
   *
   */
  @Get('/_matrix/client/r0/register/available')
  async checkUsernameAvailability(
    @QueryParam('username', { required: true })
    username: string
  ): Promise<
    | dto.CheckUsernameAvailabilityResponse
    | dto.CheckUsernameAvailabilityResponse429
    | any
  > {
    throw new HttpError(501);
  }
}
