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
export class MatrixMediaR0PreviewUrl {
  /**
   * @parameters : [
   *  {
   *    "description": "The URL to get a preview of",
   *    "in": "query",
   *    "name": "url",
   *    "required": true,
   *    "type": "string",
   *    "x-example": "https://matrix.org"
   *  },
   *  {
   *    "description": "The preferred point in time to return a preview for. The server may\nreturn a newer version if it does not have the requested version\navailable.",
   *    "in": "query",
   *    "name": "ts",
   *    "type": "number",
   *    "x-example": 1510610716656
   *  }
   *]
   *
   * @produces : [
   *  "application/json"
   *]
   *
   * @responses : {
   *  "200": {
   *    "description": "The OpenGraph data for the URL, which may be empty. Some values are\nreplaced with matrix equivalents if they are provided in the response.\nThe differences from the OpenGraph protocol are described here.",
   *    "examples": {
   *      "application/json": {
   *        "matrix:image:size": 102400,
   *        "og:description": "This is a really cool blog post from matrix.org",
   *        "og:image": "mxc://example.com/ascERGshawAWawugaAcauga",
   *        "og:image:height": 48,
   *        "og:image:type": "image/png",
   *        "og:image:width": 48,
   *        "og:title": "Matrix Blog Post"
   *      }
   *    },
   *    "schema": {
   *      "properties": {
   *        "matrix:image:size": {
   *          "description": "The byte-size of the image. Omitted if there is no image attached.",
   *          "type": "number"
   *        },
   *        "og:image": {
   *          "description": "An MXC URI to the image. Omitted if there is no image.",
   *          "type": "string"
   *        }
   *      },
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
   * @summary : Get information about a URL for a client
   *
   */
  @Get('/_matrix/media/r0/preview_url')
  async getUrlPreview(
    @QueryParam('url', { required: true })
    url: string,
    @QueryParam('ts', { required: true })
    ts: number
  ): Promise<dto.GetUrlPreviewResponse | dto.GetUrlPreviewResponse429 | any> {
    throw new HttpError(501);
  }
}
