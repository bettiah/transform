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
export class MatrixClientR0RoomsRoomIdMessages {
  /**
   * @description : This API returns a list of message and state events for a room. It uses
   *pagination query parameters to paginate history in the room.
   *
   * @parameters : [
   *  {
   *    "description": "The room to get events from.",
   *    "in": "path",
   *    "name": "roomId",
   *    "required": true,
   *    "type": "string",
   *    "x-example": "!636q39766251:example.com"
   *  },
   *  {
   *    "description": "The token to start returning events from. This token can be obtained\nfrom a ``prev_batch`` token returned for each room by the sync API,\nor from a ``start`` or ``end`` token returned by a previous request\nto this endpoint.",
   *    "in": "query",
   *    "name": "from",
   *    "required": true,
   *    "type": "string",
   *    "x-example": "s345_678_333"
   *  },
   *  {
   *    "description": "The token to stop returning events at. This token can be obtained from\na ``prev_batch`` token returned for each room by the sync endpoint,\nor from a ``start`` or ``end`` token returned by a previous request to\nthis endpoint.",
   *    "in": "query",
   *    "name": "to",
   *    "required": false,
   *    "type": "string"
   *  },
   *  {
   *    "description": "The direction to return events from.",
   *    "enum": [
   *      "b",
   *      "f"
   *    ],
   *    "in": "query",
   *    "name": "dir",
   *    "required": true,
   *    "type": "string",
   *    "x-example": "b"
   *  },
   *  {
   *    "description": "The maximum number of events to return. Default: 10.",
   *    "in": "query",
   *    "name": "limit",
   *    "type": "integer",
   *    "x-example": "3"
   *  },
   *  {
   *    "description": "A JSON RoomEventFilter to filter returned events with.",
   *    "in": "query",
   *    "name": "filter",
   *    "type": "string",
   *    "x-example": "{\"contains_url\":true}"
   *  }
   *]
   *
   * @responses : {
   *  "200": {
   *    "description": "A list of messages with a new token to request more.",
   *    "examples": {
   *      "application/json": {
   *        "chunk": [
   *          {
   *            "age": 1042,
   *            "content": {
   *              "body": "hello world",
   *              "msgtype": "m.text"
   *            },
   *            "event_id": "$1444812213350496Caaaa:example.com",
   *            "origin_server_ts": 1444812213737,
   *            "room_id": "!Xq3620DUiqCaoxq:example.com",
   *            "sender": "@alice:example.com",
   *            "type": "m.room.message"
   *          },
   *          {
   *            "age": 20123,
   *            "content": {
   *              "body": "the world is big",
   *              "msgtype": "m.text"
   *            },
   *            "event_id": "$1444812213350496Cbbbb:example.com",
   *            "origin_server_ts": 1444812194656,
   *            "room_id": "!Xq3620DUiqCaoxq:example.com",
   *            "sender": "@bob:example.com",
   *            "type": "m.room.message"
   *          },
   *          {
   *            "age": 50789,
   *            "content": {
   *              "name": "New room name"
   *            },
   *            "event_id": "$1444812213350496Ccccc:example.com",
   *            "origin_server_ts": 1444812163990,
   *            "prev_content": {
   *              "name": "Old room name"
   *            },
   *            "room_id": "!Xq3620DUiqCaoxq:example.com",
   *            "sender": "@bob:example.com",
   *            "state_key": "",
   *            "type": "m.room.name"
   *          }
   *        ],
   *        "end": "t47409-4357353_219380_26003_2265",
   *        "start": "t47429-4392820_219380_26003_2265"
   *      }
   *    },
   *    "schema": {
   *      "description": "A list of messages with a new token to request more.",
   *      "properties": {
   *        "chunk": {
   *          "description": "A list of room events.",
   *          "items": {
   *            "title": "RoomEvent",
   *            "type": "object"
   *          },
   *          "type": "array"
   *        },
   *        "end": {
   *          "description": "The token the pagination ends at. If ``dir=b`` this token should\nbe used again to request even earlier events.",
   *          "type": "string"
   *        },
   *        "start": {
   *          "description": "The token the pagination starts from. If ``dir=b`` this will be\nthe token supplied in ``from``.",
   *          "type": "string"
   *        }
   *      },
   *      "type": "object"
   *    }
   *  },
   *  "403": {
   *    "description": "You aren't a member of the room.\n"
   *  }
   *}
   *
   * @security : [
   *  {
   *    "accessToken": []
   *  }
   *]
   *
   * @summary : Get a list of events for this room
   *
   */
  @Get('/_matrix/client/r0/rooms/:roomId/messages')
  async getRoomEvents(
    @Param('roomId') roomId: string,
    @QueryParam('from', { required: true })
    from: string,
    @QueryParam('to') to: string,
    @QueryParam('dir', { required: true })
    dir: string,
    @QueryParam('limit', { required: true })
    limit: number,
    @QueryParam('filter', { required: true })
    filter: string,
    @CurrentUser() user?: User
  ): Promise<dto.GetRoomEventsResponse | any> {
    throw new HttpError(501);
  }
}
