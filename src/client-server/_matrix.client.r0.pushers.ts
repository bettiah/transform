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
export class MatrixClientR0Pushers {
  /**
   * @description : Gets all currently active pushers for the authenticated user
   *
   * @responses : {
   *  "200": {
   *    "description": "The pushers for this user",
   *    "examples": {
   *      "application/json": {
   *        "pushers": [
   *          {
   *            "app_display_name": "Appy McAppface",
   *            "app_id": "face.mcapp.appy.prod",
   *            "data": {
   *              "url": "https://example.com/_matrix/push/v1/notify"
   *            },
   *            "device_display_name": "Alice's Phone",
   *            "kind": "http",
   *            "lang": "en-US",
   *            "profile_tag": "xyz",
   *            "pushkey": "Xp/MzCt8/9DcSNE9cuiaoT5Ac55job3TdLSSmtmYl4A="
   *          }
   *        ]
   *      }
   *    },
   *    "schema": {
   *      "properties": {
   *        "pushers": {
   *          "description": "An array containing the current pushers for the user",
   *          "items": {
   *            "properties": {
   *              "app_display_name": {
   *                "description": "A string that will allow the user to identify what application\nowns this pusher.",
   *                "type": "string"
   *              },
   *              "app_id": {
   *                "description": "This is a reverse-DNS style identifier for the application.\nMax length, 64 chars.",
   *                "type": "string"
   *              },
   *              "data": {
   *                "description": "A dictionary of information for the pusher implementation\nitself.",
   *                "properties": {
   *                  "url": {
   *                    "description": "Required if ``kind`` is ``http``. The URL to use to send\nnotifications to.",
   *                    "type": "string"
   *                  }
   *                },
   *                "title": "PusherData",
   *                "type": "object"
   *              },
   *              "device_display_name": {
   *                "description": "A string that will allow the user to identify what device owns\nthis pusher.",
   *                "type": "string"
   *              },
   *              "kind": {
   *                "description": "The kind of pusher. ``\"http\"`` is a pusher that\nsends HTTP pokes.",
   *                "type": "string"
   *              },
   *              "lang": {
   *                "description": "The preferred language for receiving notifications (e.g. 'en'\nor 'en-US')",
   *                "type": "string"
   *              },
   *              "profile_tag": {
   *                "description": "This string determines which set of device specific rules this\npusher executes.",
   *                "type": "string"
   *              },
   *              "pushkey": {
   *                "description": "This is a unique identifier for this pusher. See `/set` for\nmore detail.\nMax length, 512 bytes.",
   *                "type": "string"
   *              }
   *            },
   *            "title": "Pusher",
   *            "type": "object"
   *          },
   *          "title": "Pushers",
   *          "type": "array"
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
   * @summary : Gets the current pushers for the authenticated user
   *
   */
  @Get('/_matrix/client/r0/pushers')
  async getPushers(
    @CurrentUser() user?: User
  ): Promise<dto.GetPushersResponse | any> {
    throw new HttpError(501);
  }
}
