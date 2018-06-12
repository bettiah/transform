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
export class MatrixClientR0EventsEventId {
  /**
   * @deprecated : true
   *
   * @description : Get a single event based on ``event_id``. You must have permission to
   *retrieve this event e.g. by being a member in the room for this event.
   *
   *This endpoint was deprecated in r0 of this specification. Clients
   *should instead call the |/rooms/{roomId}/event/{eventId}|_ API
   *or the |/rooms/{roomId}/context/{eventId}|_ API.
   *
   * @parameters : [
   *  {
   *    "description": "The event ID to get.",
   *    "in": "path",
   *    "name": "eventId",
   *    "required": true,
   *    "type": "string",
   *    "x-example": "$asfDuShaf7Gafaw:matrix.org"
   *  }
   *]
   *
   * @responses : {
   *  "200": {
   *    "description": "The full event.",
   *    "examples": {
   *      "application/json": {
   *        "content": {
   *          "body": "Hello world!",
   *          "msgtype": "m.text"
   *        },
   *        "event_id": "$asfDuShaf7Gafaw:matrix.org",
   *        "room_id": "!wfgy43Sg4a:matrix.org",
   *        "sender": "@bob:matrix.org",
   *        "type": "m.room.message"
   *      }
   *    },
   *    "schema": {
   *      "allOf": [
   *        {
   *          "description": "The basic set of fields all events must have.",
   *          "properties": {
   *            "content": {
   *              "description": "The fields in this object will vary depending on the type of event. When interacting with the REST API, this is the HTTP body.",
   *              "type": "object"
   *            },
   *            "type": {
   *              "description": "The type of event. This SHOULD be namespaced similar to Java package naming conventions e.g. 'com.example.subdomain.event.type'",
   *              "type": "string"
   *            }
   *          },
   *          "required": [
   *            "type"
   *          ],
   *          "title": "Event",
   *          "type": "object"
   *        }
   *      ]
   *    }
   *  },
   *  "404": {
   *    "description": "The event was not found or you do not have permission to read this event."
   *  }
   *}
   *
   * @security : [
   *  {
   *    "accessToken": []
   *  }
   *]
   *
   * @summary : Get a single event by event ID.
   *
   */
  @Get('/_matrix/client/r0/events/:eventId')
  async getOneEvent(
    @Param('eventId') eventId: string
  ): Promise<dto._EventResponse | any> {
    throw new HttpError(501);
  }
}
