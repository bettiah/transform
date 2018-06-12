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
export class MatrixClientR0PushersSet {
  /**
   * @description : This endpoint allows the creation, modification and deletion of `pushers`_
   *for this user ID. The behaviour of this endpoint varies depending on the
   *values in the JSON body.
   *
   * @parameters : [
   *  {
   *    "description": "The pusher information",
   *    "in": "body",
   *    "name": "pusher",
   *    "required": true,
   *    "schema": {
   *      "example": {
   *        "app_display_name": "Mat Rix",
   *        "app_id": "com.example.app.ios",
   *        "append": false,
   *        "data": {
   *          "url": "https://push-gateway.location.here"
   *        },
   *        "device_display_name": "iPhone 9",
   *        "kind": "http",
   *        "lang": "en",
   *        "profile_tag": "xxyyzz",
   *        "pushkey": "APA91bHPRgkF3JUikC4ENAHEeMrd41Zxv3hVZjC9KtT8OvPVGJ-hQMRKRrZuJAEcl7B338qju59zJMjw2DELjzEvxwYv7hH5Ynpc1ODQ0aT4U4OFEeco8ohsN5PjL1iC2dNtk2BAokeMCg2ZXKqpc8FXKmhX94kIxQ"
   *      },
   *      "properties": {
   *        "app_display_name": {
   *          "description": "A string that will allow the user to identify what application\nowns this pusher.",
   *          "type": "string"
   *        },
   *        "app_id": {
   *          "description": "This is a reverse-DNS style identifier for the application.\nIt is recommended that this end with the platform, such that\ndifferent platform versions get different app identifiers.\nMax length, 64 chars.",
   *          "type": "string"
   *        },
   *        "append": {
   *          "description": "If true, the homeserver should add another pusher with the\ngiven pushkey and App ID in addition to any others with\ndifferent user IDs. Otherwise, the homeserver must remove any\nother pushers with the same App ID and pushkey for different\nusers. The default is ``false``.",
   *          "type": "boolean"
   *        },
   *        "data": {
   *          "description": "A dictionary of information for the pusher implementation\nitself. If ``kind`` is ``http``, this should contain ``url``\nwhich is the URL to use to send notifications to.",
   *          "properties": {
   *            "url": {
   *              "description": "Required if ``kind`` is ``http``. The URL to use to send\nnotifications to.",
   *              "type": "string"
   *            }
   *          },
   *          "title": "PusherData",
   *          "type": "object"
   *        },
   *        "device_display_name": {
   *          "description": "A string that will allow the user to identify what device owns\nthis pusher.",
   *          "type": "string"
   *        },
   *        "kind": {
   *          "description": "The kind of pusher to configure. ``\"http\"`` makes a pusher that\nsends HTTP pokes. ``null`` deletes the pusher.",
   *          "type": "string"
   *        },
   *        "lang": {
   *          "description": "The preferred language for receiving notifications (e.g. 'en'\nor 'en-US')",
   *          "type": "string"
   *        },
   *        "profile_tag": {
   *          "description": "This string determines which set of device specific rules this\npusher executes.",
   *          "type": "string"
   *        },
   *        "pushkey": {
   *          "description": "This is a unique identifier for this pusher. The value you\nshould use for this is the routing or destination address\ninformation for the notification, for example, the APNS token\nfor APNS or the Registration ID for GCM. If your notification\nclient has no such concept, use any unique identifier.\nMax length, 512 bytes.",
   *          "type": "string"
   *        }
   *      },
   *      "required": [
   *        "kind",
   *        "app_id",
   *        "app_display_name",
   *        "device_display_name",
   *        "pushkey",
   *        "lang",
   *        "data"
   *      ],
   *      "type": "object"
   *    }
   *  }
   *]
   *
   * @responses : {
   *  "200": {
   *    "description": "The pusher was set.",
   *    "examples": {
   *      "application/json": {}
   *    },
   *    "schema": {
   *      "type": "object"
   *    }
   *  },
   *  "400": {
   *    "description": "One or more of the pusher values were invalid.",
   *    "examples": {
   *      "application/json": {
   *        "errcode": "M_MISSING_PARAM",
   *        "error": "Missing parameters: lang, data"
   *      }
   *    },
   *    "schema": {
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
   * @summary : Modify a pusher for this user on the homeserver.
   *
   */
  @Post('/_matrix/client/r0/pushers/set')
  async postPusher(
    @Body({ required: true })
    body: dto.PostPusherBody,
    @CurrentUser() user?: User
  ): Promise<dto.PostPusherResponse429 | any> {
    throw new HttpError(501);
  }
}
