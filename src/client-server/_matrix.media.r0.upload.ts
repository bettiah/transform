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
export class MatrixMediaR0Upload {
  /**
   * @parameters : [
   *  {
   *    "description": "The content type of the file being uploaded",
   *    "in": "header",
   *    "name": "Content-Type",
   *    "type": "string",
   *    "x-example": "Content-Type: audio/mpeg"
   *  },
   *  {
   *    "description": "The name of the file being uploaded",
   *    "in": "query",
   *    "name": "filename",
   *    "type": "string",
   *    "x-example": "War and Peace.pdf"
   *  },
   *  {
   *    "description": "The content to be uploaded.",
   *    "in": "body",
   *    "name": "<content>",
   *    "required": true,
   *    "schema": {
   *      "example": "<bytes>",
   *      "format": "byte",
   *      "type": "string"
   *    }
   *  }
   *]
   *
   * @produces : [
   *  "application/json"
   *]
   *
   * @responses : {
   *  "200": {
   *    "description": "The MXC URI for the uploaded content.",
   *    "examples": {
   *      "application/json": {
   *        "content_uri": "mxc://example.com/AQwafuaFswefuhsfAFAgsw"
   *      }
   *    },
   *    "schema": {
   *      "properties": {
   *        "content_uri": {
   *          "description": "The MXC URI to the uploaded content.",
   *          "type": "string"
   *        }
   *      },
   *      "required": [
   *        "content_uri"
   *      ],
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
   * @summary : Upload some content to the content repository.
   *
   */
  @Post('/_matrix/media/r0/upload')
  async uploadContent(
    @HeaderParam('Content-Type', { required: true })
    contentType: string,
    @QueryParam('filename', { required: true })
    filename: string,
    @Body({ required: true })
    body: string,
    @CurrentUser() user?: User
  ): Promise<dto.UploadContentResponse | dto.UploadContentResponse429 | any> {
    throw new HttpError(501);
  }
}
