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
export class MatrixClientR0RoomsRoomIdStateEventType {
  /**
   * @description : Looks up the contents of a state event in a room. If the user is
   *joined to the room then the state is taken from the current
   *state of the room. If the user has left the room then the state is
   *taken from the state of the room when they left.
   *
   *This looks up the state event with the empty state key.
   *
   * @parameters : [
   *  {
   *    "description": "The room to look up the state in.",
   *    "in": "path",
   *    "name": "roomId",
   *    "required": true,
   *    "type": "string",
   *    "x-example": "!636q39766251:example.com"
   *  },
   *  {
   *    "description": "The type of state to look up.",
   *    "in": "path",
   *    "name": "eventType",
   *    "required": true,
   *    "type": "string",
   *    "x-example": "m.room.name"
   *  }
   *]
   *
   * @responses : {
   *  "200": {
   *    "description": "The content of the state event.",
   *    "examples": {
   *      "application/json": {
   *        "name": "Example room name"
   *      }
   *    },
   *    "schema": {
   *      "type": "object"
   *    }
   *  },
   *  "403": {
   *    "description": "You aren't a member of the room and weren't previously a member of the room.\n"
   *  },
   *  "404": {
   *    "description": "The room has no state with the given type or key."
   *  }
   *}
   *
   * @security : [
   *  {
   *    "accessToken": []
   *  }
   *]
   *
   * @summary : Get the state identified by the type, with the empty state key.
   *
   */
  @Get('/_matrix/client/r0/rooms/:roomId/state/:eventType')
  async getRoomStateByType(
    @Param('roomId') roomId: string,
    @Param('eventType') eventType: string,
    @CurrentUser() user?: User
  ): Promise<any> {
    throw new HttpError(501);
  }

  /**
   * @description : State events can be sent using this endpoint. This endpoint is
   *equivalent to calling `/rooms/{roomId}/state/{eventType}/{stateKey}`
   *with an empty `stateKey`. Previous state events with matching
   *`<roomId>` and `<eventType>`, and empty `<stateKey>`, will be overwritten.
   *
   *Requests to this endpoint **cannot use transaction IDs**
   *like other ``PUT`` paths because they cannot be differentiated from the
   *``state_key``. Furthermore, ``POST`` is unsupported on state paths.
   *
   *The body of the request should be the content object of the event; the
   *fields in this object will vary depending on the type of event. See
   *`Room Events`_ for the ``m.`` event specification.
   *
   *
   * @parameters : [
   *  {
   *    "description": "The room to set the state in",
   *    "in": "path",
   *    "name": "roomId",
   *    "required": true,
   *    "type": "string",
   *    "x-example": "!636q39766251:example.com"
   *  },
   *  {
   *    "description": "The type of event to send.",
   *    "in": "path",
   *    "name": "eventType",
   *    "required": true,
   *    "type": "string",
   *    "x-example": "m.room.name"
   *  },
   *  {
   *    "in": "body",
   *    "name": "body",
   *    "schema": {
   *      "example": {
   *        "name": "New name for the room"
   *      },
   *      "type": "object"
   *    }
   *  }
   *]
   *
   * @responses : {
   *  "200": {
   *    "description": "An ID for the sent event.",
   *    "examples": {
   *      "application/json": {
   *        "event_id": "$YUwRidLecu:example.com"
   *      }
   *    },
   *    "schema": {
   *      "properties": {
   *        "event_id": {
   *          "description": "A unique identifier for the event.",
   *          "type": "string"
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
   * @summary : Send a state event to the given room.
   *
   */
  @Put('/_matrix/client/r0/rooms/:roomId/state/:eventType')
  async setRoomState(
    @Param('roomId') roomId: string,
    @Param('eventType') eventType: string,
    @Body({ required: true })
    body: any,
    @CurrentUser() user?: User
  ): Promise<dto.SetRoomStateResponse | any> {
    throw new HttpError(501);
  }
}
