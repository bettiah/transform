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
export class MatrixMediaR0ThumbnailServerNameMediaId {
  /**
   * @parameters : [
   *  {
   *    "description": "The server name from the ``mxc://`` URI (the authoritory component)\n",
   *    "in": "path",
   *    "name": "serverName",
   *    "required": true,
   *    "type": "string",
   *    "x-example": "matrix.org"
   *  },
   *  {
   *    "description": "The media ID from the ``mxc://`` URI (the path component)\n",
   *    "in": "path",
   *    "name": "mediaId",
   *    "required": true,
   *    "type": "string",
   *    "x-example": "ascERGshawAWawugaAcauga"
   *  },
   *  {
   *    "description": "The *desired* width of the thumbnail. The actual thumbnail may not\nmatch the size specified.",
   *    "in": "query",
   *    "name": "width",
   *    "type": "integer",
   *    "x-example": 64
   *  },
   *  {
   *    "description": "The *desired* height of the thumbnail. The actual thumbnail may not\nmatch the size specified.",
   *    "in": "query",
   *    "name": "height",
   *    "type": "integer",
   *    "x-example": 64
   *  },
   *  {
   *    "description": "The desired resizing method.",
   *    "enum": [
   *      "crop",
   *      "scale"
   *    ],
   *    "in": "query",
   *    "name": "method",
   *    "type": "string",
   *    "x-example": "scale"
   *  }
   *]
   *
   * @produces : [
   *  "image/jpeg",
   *  "image/png"
   *]
   *
   * @responses : {
   *  "200": {
   *    "description": "A thumbnail of the requested content.",
   *    "headers": {
   *      "Content-Type": {
   *        "description": "The content type of the thumbnail.",
   *        "enum": [
   *          "image/jpeg",
   *          "image/png"
   *        ],
   *        "type": "string"
   *      }
   *    },
   *    "schema": {
   *      "type": "file"
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
   * @summary : Download a thumbnail of the content from the content repository.
   *
   */
  @Get('/_matrix/media/r0/thumbnail/:serverName/:mediaId')
  async getContentThumbnail(
    @Param('serverName') serverName: string,
    @Param('mediaId') mediaId: string,
    @QueryParam('width', { required: true })
    width: number,
    @QueryParam('height', { required: true })
    height: number,
    @QueryParam('method', { required: true })
    method: string
  ): Promise<dto.GetContentThumbnailResponse429 | any> {
    throw new HttpError(501);
  }
}
