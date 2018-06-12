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

import { User, Room } from '../model';
import * as dto from './types';
import { VisibilityType } from '../types';
import { normalizeRoom, normalizeAlias, rand } from '../utils';
import { getRepository } from 'typeorm';
const debug = require('debug')('server:createRoom');

@JsonController('')
export class MatrixClientR0CreateRoom {
  /**
   * @description : Create a new room with various configuration options.
   *
   *The server MUST apply the normal state resolution rules when creating
   *the new room, including checking power levels for each event. It MUST
   *apply the events implied by the request in the following order:
   *
   *0. A default ``m.room.power_levels`` event, giving the room creator
   *   (and not other members) permission to send state events.
   *
   *1. Events set by ``presets``.
   *
   *2. Events listed in ``initial_state``, in the order that they are
   *   listed.
   *
   *3. Events implied by ``name`` and ``topic``.
   *
   *4. Invite events implied by ``invite`` and ``invite_3pid``.
   *
   * @parameters : [
   *  {
   *    "description": "The desired room configuration.",
   *    "in": "body",
   *    "name": "body",
   *    "schema": {
   *      "example": {
   *        "creation_content": {
   *          "m.federate": false
   *        },
   *        "name": "The Grand Duke Pub",
   *        "preset": "public_chat",
   *        "room_alias_name": "thepub",
   *        "topic": "All about happy hour"
   *      },
   *      "properties": {
   *        "creation_content": {
   *          "description": "Extra keys to be added to the content of the ``m.room.create``.\nThe server will clobber the following keys: ``creator``. Future\nversions of the specification may allow the server to clobber\nother keys.",
   *          "title": "CreationContent",
   *          "type": "object"
   *        },
   *        "guest_can_join": {
   *          "description": "Allows guests to join the room. See `Guest Access`_ for more information.",
   *          "type": "boolean"
   *        },
   *        "initial_state": {
   *          "description": "A list of state events to set in the new room. This allows\nthe user to override the default state events set in the new\nroom. The expected format of the state events are an object\nwith type, state_key and content keys set.\n\nTakes precedence over events set by ``presets``, but gets\noverriden by ``name`` and ``topic`` keys.",
   *          "items": {
   *            "properties": {
   *              "content": {
   *                "type": "object"
   *              },
   *              "state_key": {
   *                "type": "string"
   *              },
   *              "type": {
   *                "type": "string"
   *              }
   *            },
   *            "title": "StateEvent",
   *            "type": "object"
   *          },
   *          "type": "array"
   *        },
   *        "invite": {
   *          "description": "A list of user IDs to invite to the room. This will tell the\nserver to invite everyone in the list to the newly created room.",
   *          "items": {
   *            "type": "string"
   *          },
   *          "type": "array"
   *        },
   *        "invite_3pid": {
   *          "description": "A list of objects representing third party IDs to invite into\nthe room.",
   *          "items": {
   *            "properties": {
   *              "address": {
   *                "description": "The invitee's third party identifier.",
   *                "type": "string"
   *              },
   *              "id_server": {
   *                "description": "The hostname+port of the identity server which should be used for third party identifier lookups.",
   *                "type": "string"
   *              },
   *              "medium": {
   *                "description": "The kind of address being passed in the address field, for example ``email``.",
   *                "type": "string"
   *              }
   *            },
   *            "required": [
   *              "id_server",
   *              "medium",
   *              "address"
   *            ],
   *            "title": "Invite3pid",
   *            "type": "object"
   *          },
   *          "type": "array"
   *        },
   *        "is_direct": {
   *          "description": "This flag makes the server set the ``is_direct`` flag on the\n``m.room.member`` events sent to the users in ``invite`` and\n``invite_3pid``. See `Direct Messaging`_ for more information.",
   *          "type": "boolean"
   *        },
   *        "name": {
   *          "description": "If this is included, an ``m.room.name`` event will be sent\ninto the room to indicate the name of the room. See Room\nEvents for more information on ``m.room.name``.",
   *          "type": "string"
   *        },
   *        "preset": {
   *          "description": "Convenience parameter for setting various default state events\nbased on a preset. Must be either:\n\n``private_chat`` =>\n  ``join_rules`` is set to ``invite``.\n  ``history_visibility`` is set to ``shared``.\n\n``trusted_private_chat`` =>\n    ``join_rules`` is set to ``invite``.\n    ``history_visibility`` is set to ``shared``.\n    All invitees are given the same power level as the room creator.\n\n``public_chat``: =>\n    ``join_rules`` is set to ``public``.\n    ``history_visibility`` is set to ``shared``.",
   *          "enum": [
   *            "private_chat",
   *            "public_chat",
   *            "trusted_private_chat"
   *          ],
   *          "type": "string"
   *        },
   *        "room_alias_name": {
   *          "description": "The desired room alias **local part**. If this is included, a\nroom alias will be created and mapped to the newly created\nroom. The alias will belong on the *same* homeserver which\ncreated the room. For example, if this was set to \"foo\" and\nsent to the homeserver \"example.com\" the complete room alias\nwould be ``#foo:example.com``.",
   *          "type": "string"
   *        },
   *        "topic": {
   *          "description": "If this is included, an ``m.room.topic`` event will be sent\ninto the room to indicate the topic for the room. See Room\nEvents for more information on ``m.room.topic``.",
   *          "type": "string"
   *        },
   *        "visibility": {
   *          "description": "A ``public`` visibility indicates that the room will be shown\nin the published room list. A ``private`` visibility will hide\nthe room from the published room list. Rooms default to\n``private`` visibility if this key is not included. NB: This\nshould not be confused with ``join_rules`` which also uses the\nword ``public``.",
   *          "enum": [
   *            "public",
   *            "private"
   *          ],
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
   *    "description": "Information about the newly created room.",
   *    "examples": {
   *      "application/json": {
   *        "room_id": "!sefiuhWgwghwWgh:example.com"
   *      }
   *    },
   *    "schema": {
   *      "description": "Information about the newly created room.",
   *      "properties": {
   *        "room_id": {
   *          "description": "The created room's ID.",
   *          "type": "string"
   *        }
   *      },
   *      "type": "object"
   *    }
   *  },
   *  "400": {
   *    "description": "\nThe request is invalid. A meaningful ``errcode`` and description\nerror text will be returned. Example reasons for rejection include:\n\n- The request body is malformed (``errcode`` set to ``M_BAD_JSON``\n  or ``M_NOT_JSON``).\n\n- The room alias specified is already taken (``errcode`` set to\n  ``M_ROOM_IN_USE``).\n\n- The initial state implied by the parameters to the request is\n  invalid: for example, the user's ``power_level`` is set below\n  that necessary to set the room name (``errcode`` set to\n  ``M_INVALID_ROOM_STATE``)."
   *  }
   *}
   *
   * @security : [
   *  {
   *    "accessToken": []
   *  }
   *]
   *
   * @summary : Create a new room
   *
   */
  @Post('/_matrix/client/r0/createRoom')
  async createRoom(
    @CurrentUser() user: User,
    @Body() body: dto.CreateRoomBody
  ): Promise<dto.CreateRoomResponse> {
    const room = new Room();
    room.name = body.name || rand();
    room.topic = body.topic || '';
    room.visibility = body.visibility || VisibilityType.private;
    room.aliases = body.room_alias_name
      ? [{ id: 0, name: normalizeAlias(body.room_alias_name), room }]
      : [];
    room.isDirect = body.is_direct || false;
    room.room_id = normalizeRoom(rand());
    // at least one user
    room.users = [user];
    const savedRoom = await getRepository(Room).save(room);
    debug('saved', savedRoom);
    return { room_id: savedRoom.room_id };
  }
}
