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
export class MatrixClientR0UserDirectorySearch {
  /**
   * @description : This API performs a server-side search over all users registered on the server.
   *It searches user ID and displayname case-insensitively for users that you share a room with or that are in public rooms.
   *
   * @parameters : [
   *  {
   *    "in": "body",
   *    "name": "body",
   *    "schema": {
   *      "properties": {
   *        "limit": {
   *          "description": "The maximum number of results to return (Defaults to 10).",
   *          "example": 10,
   *          "type": "number"
   *        },
   *        "search_term": {
   *          "description": "The term to search for",
   *          "example": "foo",
   *          "type": "string"
   *        }
   *      },
   *      "required": [
   *        "search_term"
   *      ],
   *      "type": "object"
   *    }
   *  }
   *]
   *
   * @responses : {
   *  "200": {
   *    "description": "The results of the search.",
   *    "examples": {
   *      "application/json": {
   *        "limited": false,
   *        "results": [
   *          {
   *            "avatar_url": "mxc://bar.com/foo",
   *            "display_name": "Foo",
   *            "user_id": "@foo:bar.com"
   *          }
   *        ]
   *      }
   *    },
   *    "schema": {
   *      "properties": {
   *        "limited": {
   *          "description": "Indicates if the result list has been truncated by the limit.",
   *          "type": "boolean"
   *        },
   *        "results": {
   *          "description": "Ordered by rank and then whether or not profile info is available.",
   *          "items": {
   *            "properties": {
   *              "avatar_url": {
   *                "description": "The avatar url, as an MXC, if one exists.",
   *                "example": "mxc://bar.com/foo",
   *                "type": "string"
   *              },
   *              "display_name": {
   *                "description": "The display name of the user, if one exists.",
   *                "example": "Foo",
   *                "type": "string"
   *              },
   *              "user_id": {
   *                "description": "The user's matrix user ID.",
   *                "example": "@foo:bar.com",
   *                "type": "string"
   *              }
   *            },
   *            "required": [
   *              "user_id"
   *            ],
   *            "title": "User",
   *            "type": "object"
   *          },
   *          "type": "array"
   *        }
   *      },
   *      "required": [
   *        "results",
   *        "limited"
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
   * @summary : Searches the user directory.
   *
   */
  @Post('/_matrix/client/r0/user_directory/search')
  async searchUserDirectory(
    @Body({ required: true })
    body: dto.SearchUserDirectoryBody
  ): Promise<
    dto.SearchUserDirectoryResponse | dto.SearchUserDirectoryResponse429 | any
  > {
    throw new HttpError(501);
  }
}
