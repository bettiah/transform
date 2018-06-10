
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
  
  import * as dto from './dto';  
  
@JsonController("")
export class MatrixClientR0DevicesDeviceId {
@Get("/_matrix/client/r0/devices/{deviceId}")
async getDevice(@Param("deviceId") deviceId:string) : Promise< dto.DeviceResponse|any > {
 throw new HttpError(501);
}

@Put("/_matrix/client/r0/devices/{deviceId}")
async updateDevice(@Param("deviceId") deviceId:string,@Body({ required: true }) body: dto.UpdateDeviceBody) : Promise< any > {
 throw new HttpError(501);
}

@Delete("/_matrix/client/r0/devices/{deviceId}")
async deleteDevice(@Param("deviceId") deviceId:string,@Body({ required: true }) body: dto.DeleteDeviceBody) : Promise< dto.AuthenticationResponse|any > {
 throw new HttpError(501);
}

}

