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
export class MatrixClientR0RoomsRoomIdJoinedMembers {
  /**
   * @description : This API returns a map of MXIDs to member info objects for members of the room. The current user must be in the room for it to work, unless it is an Application Service in which case any of the AS's users must be in the room. This API is primarily for Application Services and should be faster to respond than ``/members`` as it can be implemented more efficiently on the server.
   *
   * @parameters : [
   *  {
   *    "description": "The room to get the members of.",
   *    "in": "path",
   *    "name": "roomId",
   *    "required": true,
   *    "type": "string",
   *    "x-example": "!636q39766251:example.com"
   *  }
   *]
   *
   * @responses : {
   *  "200": {
   *    "description": "A map of MXID to room member objects.",
   *    "examples": {
   *      "application/json": {
   *        "joined": {
   *          "@bar:example.com": {
   *            "avatar_url": "mxc://riot.ovh/printErCATzZijQsSDWorRaK",
   *            "display_name": "Bar"
   *          }
   *        }
   *      }
   *    },
   *    "schema": {
   *      "properties": {
   *        "joined": {
   *          "additionalProperties": {
   *            "properties": {
   *              "avatar_url": {
   *                "description": "The mxc avatar url of the user this object is representing.",
   *                "type": "string"
   *              },
   *              "display_name": {
   *                "description": "The display name of the user this object is representing.",
   *                "type": "string"
   *              }
   *            },
   *            "title": "RoomMember",
   *            "type": "object"
   *          },
   *          "description": "A map from user ID to a RoomMember object.",
   *          "type": "object"
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
   * @summary : Gets the list of currently joined users and their profile data.
   *
   */
  @Get('/_matrix/client/r0/rooms/:roomId/joined_members')
  async getJoinedMembersByRoom(
    @Param('roomId') roomId: string,
    @CurrentUser() user?: User
  ): Promise<dto.GetJoinedMembersByRoomResponse | any> {
    throw new HttpError(501);
  }
}
