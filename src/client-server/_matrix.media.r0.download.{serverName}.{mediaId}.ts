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
export class MatrixMediaR0DownloadServerNameMediaId {
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
   *  }
   *]
   *
   * @produces : [
   *  "**"
   *]
   *
   * @responses : {
   *  "200": {
   *    "description": "The content that was previously uploaded.",
   *    "headers": {
   *      "Content-Disposition": {
   *        "description": "The name of the file that was previously uploaded, if set.",
   *        "type": "string"
   *      },
   *      "Content-Type": {
   *        "description": "The content type of the file that was previously uploaded.",
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
   * @summary : Download content from the content repository.
   *
   */
  @Get('/_matrix/media/r0/download/:serverName/:mediaId')
  async getContent(
    @Param('serverName') serverName: string,
    @Param('mediaId') mediaId: string
  ): Promise<dto.GetContentResponse429 | any> {
    throw new HttpError(501);
  }
}
