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
export class MatrixClientR0KeysChanges {
  /**
   * @description : Gets a list of users who have updated their device identity keys since a
   *previous sync token.
   *
   *The server should include in the results any users who:
   *
   ** currently share a room with the calling user (ie, both users have
   *  membership state ``join``); *and*
   ** added new device identity keys or removed an existing device with
   *  identity keys, between ``from`` and ``to``.
   *
   * @parameters : [
   *  {
   *    "description": "The desired start point of the list. Should be the ``next_batch`` field\nfrom a response to an earlier call to |/sync|. Users who have not\nuploaded new device identity keys since this point, nor deleted\nexisting devices with identity keys since then, will be excluded\nfrom the results.",
   *    "in": "query",
   *    "name": "from",
   *    "required": true,
   *    "type": "string",
   *    "x-example": "s72594_4483_1934"
   *  },
   *  {
   *    "description": "The desired end point of the list. Should be the ``next_batch``\nfield from a recent call to |/sync| - typically the most recent\nsuch call. This may be used by the server as a hint to check its\ncaches are up to date.",
   *    "in": "query",
   *    "name": "to",
   *    "required": true,
   *    "type": "string",
   *    "x-example": "s75689_5632_2435"
   *  }
   *]
   *
   * @responses : {
   *  "200": {
   *    "description": "The list of users who updated their devices.",
   *    "schema": {
   *      "properties": {
   *        "changed": {
   *          "description": "The Matrix User IDs of all users who updated their device\nidentity keys.",
   *          "example": [
   *            "@alice:example.com",
   *            "@bob:example.org"
   *          ],
   *          "items": {
   *            "type": "string"
   *          },
   *          "type": "array"
   *        },
   *        "left": {
   *          "description": "The Matrix User IDs of all users who may have left all\nthe end-to-end encrypted rooms they previously shared\nwith the user.",
   *          "example": [
   *            "@clara:example.com",
   *            "@doug:example.org"
   *          ],
   *          "items": {
   *            "type": "string"
   *          },
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
   * @summary : Query users with recent device key updates.
   *
   */
  @Get('/_matrix/client/r0/keys/changes')
  async getKeysChanges(
    @QueryParam('from', { required: true })
    from: string,
    @QueryParam('to', { required: true })
    to: string
  ): Promise<dto.GetKeysChangesResponse | any> {
    throw new HttpError(501);
  }
}
