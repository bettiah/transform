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
export class MatrixClientR0PublicRooms {
  /**
   * @description : Lists the public rooms on the server.
   *
   *This API returns paginated responses. The rooms are ordered by the number
   *of joined members, with the largest rooms first.
   *
   * @parameters : [
   *  {
   *    "description": "Limit the number of results returned.",
   *    "in": "query",
   *    "name": "limit",
   *    "type": "number"
   *  },
   *  {
   *    "description": "A pagination token from a previous request, allowing clients to\nget the next (or previous) batch of rooms.\nThe direction of pagination is specified solely by which token\nis supplied, rather than via an explicit flag.",
   *    "in": "query",
   *    "name": "since",
   *    "type": "string"
   *  },
   *  {
   *    "description": "The server to fetch the public room lists from. Defaults to the\nlocal server.",
   *    "in": "query",
   *    "name": "server",
   *    "type": "string"
   *  }
   *]
   *
   * @responses : {
   *  "200": {
   *    "description": "A list of the rooms on the server.",
   *    "examples": {
   *      "application/json": {
   *        "chunk": [
   *          {
   *            "aliases": [
   *              "#murrays:cheese.bar"
   *            ],
   *            "avatar_url": "mxc://bleeker.street/CHEDDARandBRIE",
   *            "guest_can_join": false,
   *            "name": "CHEESE",
   *            "num_joined_members": 37,
   *            "room_id": "!ol19s:bleecker.street",
   *            "topic": "Tasty tasty cheese",
   *            "world_readable": true
   *          }
   *        ],
   *        "next_batch": "p190q",
   *        "prev_batch": "p1902",
   *        "total_room_count_estimate": 115
   *      }
   *    },
   *    "schema": {
   *      "description": "A list of the rooms on the server.",
   *      "properties": {
   *        "chunk": {
   *          "description": "A paginated chunk of public rooms.",
   *          "items": {
   *            "properties": {
   *              "aliases": {
   *                "description": "Aliases of the room. May be empty.",
   *                "items": {
   *                  "type": "string"
   *                },
   *                "type": "array"
   *              },
   *              "avatar_url": {
   *                "description": "The URL for the room's avatar, if one is set.",
   *                "type": "string"
   *              },
   *              "canonical_alias": {
   *                "description": "The canonical alias of the room, if any.",
   *                "type": "string"
   *              },
   *              "guest_can_join": {
   *                "description": "Whether guest users may join the room and participate in it.\nIf they can, they will be subject to ordinary power level\nrules like any other user.",
   *                "type": "boolean"
   *              },
   *              "name": {
   *                "description": "The name of the room, if any.",
   *                "type": "string"
   *              },
   *              "num_joined_members": {
   *                "description": "The number of members joined to the room.",
   *                "type": "number"
   *              },
   *              "room_id": {
   *                "description": "The ID of the room.",
   *                "type": "string"
   *              },
   *              "topic": {
   *                "description": "The topic of the room, if any.",
   *                "type": "string"
   *              },
   *              "world_readable": {
   *                "description": "Whether the room may be viewed by guest users without joining.",
   *                "type": "boolean"
   *              }
   *            },
   *            "required": [
   *              "room_id",
   *              "num_joined_members",
   *              "world_readable",
   *              "guest_can_join"
   *            ],
   *            "title": "PublicRoomsChunk",
   *            "type": "object"
   *          },
   *          "title": "PublicRoomsChunks",
   *          "type": "array"
   *        },
   *        "next_batch": {
   *          "description": "A pagination token for the response. The absence of this token\nmeans there are no more results to fetch and the client should\nstop paginating.",
   *          "type": "string"
   *        },
   *        "prev_batch": {
   *          "description": "A pagination token that allows fetching previous results. The\nabsence of this token means there are no results before this\nbatch, i.e. this is the first batch.",
   *          "type": "string"
   *        },
   *        "total_room_count_estimate": {
   *          "description": "An estimate on the total number of public rooms, if the\nserver has an estimate.",
   *          "type": "number"
   *        }
   *      },
   *      "required": [
   *        "chunk"
   *      ],
   *      "type": "object"
   *    }
   *  }
   *}
   *
   * @summary : Lists the public rooms on the server.
   *
   */
  @Get('/_matrix/client/r0/publicRooms')
  async getPublicRooms(
    @QueryParam('limit', { required: true })
    limit: number,
    @QueryParam('since', { required: true })
    since: string,
    @QueryParam('server', { required: true })
    server: string
  ): Promise<dto.GetPublicRoomsResponse | any> {
    throw new HttpError(501);
  }

  /**
   * @description : Lists the public rooms on the server, with optional filter.
   *
   *This API returns paginated responses. The rooms are ordered by the number
   *of joined members, with the largest rooms first.
   *
   * @parameters : [
   *  {
   *    "description": "The server to fetch the public room lists from. Defaults to the\nlocal server.",
   *    "in": "query",
   *    "name": "server",
   *    "type": "string"
   *  },
   *  {
   *    "description": "Options for which rooms to return.",
   *    "in": "body",
   *    "name": "body",
   *    "required": true,
   *    "schema": {
   *      "example": {
   *        "filter": {
   *          "generic_search_term": "foo"
   *        },
   *        "limit": 10
   *      },
   *      "properties": {
   *        "filter": {
   *          "description": "Filter to apply to the results.",
   *          "properties": {
   *            "generic_search_term": {
   *              "description": "A string to search for in the room metadata, e.g. name,\ntopic, canonical alias etc. (Optional).",
   *              "type": "string"
   *            }
   *          },
   *          "title": "Filter",
   *          "type": "object"
   *        },
   *        "limit": {
   *          "description": "Limit the number of results returned.",
   *          "type": "number"
   *        },
   *        "since": {
   *          "description": "A pagination token from a previous request, allowing clients\nto get the next (or previous) batch of rooms.  The direction\nof pagination is specified solely by which token is supplied,\nrather than via an explicit flag.",
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
   *    "description": "A list of the rooms on the server.",
   *    "examples": {
   *      "application/json": {
   *        "chunk": [
   *          {
   *            "aliases": [
   *              "#murrays:cheese.bar"
   *            ],
   *            "avatar_url": "mxc://bleeker.street/CHEDDARandBRIE",
   *            "guest_can_join": false,
   *            "name": "CHEESE",
   *            "num_joined_members": 37,
   *            "room_id": "!ol19s:bleecker.street",
   *            "topic": "Tasty tasty cheese",
   *            "world_readable": true
   *          }
   *        ],
   *        "next_batch": "p190q",
   *        "prev_batch": "p1902",
   *        "total_room_count_estimate": 115
   *      }
   *    },
   *    "schema": {
   *      "description": "A list of the rooms on the server.",
   *      "properties": {
   *        "chunk": {
   *          "description": "A paginated chunk of public rooms.",
   *          "items": {
   *            "properties": {
   *              "aliases": {
   *                "description": "Aliases of the room. May be empty.",
   *                "items": {
   *                  "type": "string"
   *                },
   *                "type": "array"
   *              },
   *              "avatar_url": {
   *                "description": "The URL for the room's avatar, if one is set.",
   *                "type": "string"
   *              },
   *              "canonical_alias": {
   *                "description": "The canonical alias of the room, if any.",
   *                "type": "string"
   *              },
   *              "guest_can_join": {
   *                "description": "Whether guest users may join the room and participate in it.\nIf they can, they will be subject to ordinary power level\nrules like any other user.",
   *                "type": "boolean"
   *              },
   *              "name": {
   *                "description": "The name of the room, if any.",
   *                "type": "string"
   *              },
   *              "num_joined_members": {
   *                "description": "The number of members joined to the room.",
   *                "type": "number"
   *              },
   *              "room_id": {
   *                "description": "The ID of the room.",
   *                "type": "string"
   *              },
   *              "topic": {
   *                "description": "The topic of the room, if any.",
   *                "type": "string"
   *              },
   *              "world_readable": {
   *                "description": "Whether the room may be viewed by guest users without joining.",
   *                "type": "boolean"
   *              }
   *            },
   *            "required": [
   *              "room_id",
   *              "num_joined_members",
   *              "world_readable",
   *              "guest_can_join"
   *            ],
   *            "title": "PublicRoomsChunk",
   *            "type": "object"
   *          },
   *          "title": "PublicRoomsChunks",
   *          "type": "array"
   *        },
   *        "next_batch": {
   *          "description": "A pagination token for the response. The absence of this token\nmeans there are no more results to fetch and the client should\nstop paginating.",
   *          "type": "string"
   *        },
   *        "prev_batch": {
   *          "description": "A pagination token that allows fetching previous results. The\nabsence of this token means there are no results before this\nbatch, i.e. this is the first batch.",
   *          "type": "string"
   *        },
   *        "total_room_count_estimate": {
   *          "description": "An estimate on the total number of public rooms, if the\nserver has an estimate.",
   *          "type": "number"
   *        }
   *      },
   *      "required": [
   *        "chunk"
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
   * @summary : Lists the public rooms on the server with optional filter.
   *
   */
  @Post('/_matrix/client/r0/publicRooms')
  async queryPublicRooms(
    @QueryParam('server', { required: true })
    server: string,
    @Body({ required: true })
    body: dto.QueryPublicRoomsBody,
    @CurrentUser() user?: User
  ): Promise<dto.QueryPublicRoomsResponse | any> {
    throw new HttpError(501);
  }
}
