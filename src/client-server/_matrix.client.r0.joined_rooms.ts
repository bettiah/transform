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
export class MatrixClientR0JoinedRooms {
  /**
   * @description : This API returns a list of the user's current rooms.
   *
   * @responses : {
   *  "200": {
   *    "description": "A list of the rooms the user is in.",
   *    "examples": {
   *      "application/json": {
   *        "joined_rooms": [
   *          "!foo:example.com"
   *        ]
   *      }
   *    },
   *    "schema": {
   *      "properties": {
   *        "joined_rooms": {
   *          "description": "The ID of each room in which the user has ``joined`` membership.",
   *          "items": {
   *            "type": "string"
   *          },
   *          "type": "array"
   *        }
   *      },
   *      "required": [
   *        "joined_rooms"
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
   * @summary : Lists the user's current rooms.
   *
   */
  @Get('/_matrix/client/r0/joined_rooms')
  async getJoinedRooms(): Promise<dto.GetJoinedRoomsResponse | any> {
    throw new HttpError(501);
  }
}
