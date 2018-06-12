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
export class MatrixClientR0AccountWhoami {
  /**
   * @description : Gets information about the owner of a given access token.
   *
   *Note that, as with the rest of the Client-Server API,
   *Application Services may masquerade as users within their
   *namespace by giving a ``user_id`` query parameter. In this
   *situation, the server should verify that the given ``user_id``
   *is registered by the appservice, and return it in the response
   *body.
   *
   * @parameters : []
   *
   * @responses : {
   *  "200": {
   *    "description": "The token belongs to a known user.",
   *    "examples": {
   *      "application/json": {
   *        "user_id": "@joe:example.org"
   *      }
   *    },
   *    "schema": {
   *      "properties": {
   *        "user_id": {
   *          "description": "The user id that owns the access token.",
   *          "type": "string"
   *        }
   *      },
   *      "required": [
   *        "user_id"
   *      ],
   *      "type": "object"
   *    }
   *  },
   *  "401": {
   *    "description": "The token is not recognised",
   *    "examples": {
   *      "application/json": {
   *        "errcode": "M_UNKNOWN_TOKEN",
   *        "error": "Unrecognised access token."
   *      }
   *    },
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
   *  },
   *  "403": {
   *    "description": "The appservice cannot masquerade as the user or has not registered them.",
   *    "examples": {
   *      "application/json": {
   *        "errcode": "M_FORBIDDEN",
   *        "error": "Application service has not registered this user."
   *      }
   *    },
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
   * @security : [
   *  {
   *    "accessToken": []
   *  }
   *]
   *
   * @summary : Gets information about the owner of an access token.
   *
   */
  @Get('/_matrix/client/r0/account/whoami')
  async getTokenOwner(
    @CurrentUser() user?: User
  ): Promise<
    | dto.GetTokenOwnerResponse
    | dto.GetTokenOwnerResponse401
    | dto.GetTokenOwnerResponse403
    | dto.GetTokenOwnerResponse429
    | any
  > {
    throw new HttpError(501);
  }
}
