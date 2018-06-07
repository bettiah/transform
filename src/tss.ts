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
  HeaderParam
} from 'routing-controllers';

import * as dto from './dto';
import { signup, authenticate } from './auth';
import { rand, normalizeUser } from './utils';
import { normalize } from 'path';

@JsonController('/_matrix/client/r0')
export class MatrixController {
  @Get('/account/3pid')
  async getAccount3PIDs(): Promise<dto.GetAccount3PIDsResponse | any> {
    throw new HttpError(501);
  }

  @Post('/account/3pid')
  async post3PIDs(
    @Body({ required: true })
    body: dto.Post3PIDsBody
  ): Promise<any> {
    throw new HttpError(501);
  }

  @Post('/account/deactivate')
  async deactivateAccount(
    @Body({ required: true })
    body: dto.DeactivateAccountBody
  ): Promise<
    dto.AuthenticationResponse | dto.DeactivateAccountResponse429 | any
  > {
    throw new HttpError(501);
  }

  @Post('/account/password')
  async changePassword(
    @Body({ required: true })
    body: dto.ChangePasswordBody
  ): Promise<dto.AuthenticationResponse | dto.ChangePasswordResponse429 | any> {
    throw new HttpError(501);
  }

  @Get('/account/whoami')
  async getTokenOwner(): Promise<
    | dto.GetTokenOwnerResponse
    | dto.GetTokenOwnerResponse401
    | dto.GetTokenOwnerResponse403
    | dto.GetTokenOwnerResponse429
    | any
  > {
    throw new HttpError(501);
  }

  @Get('/admin/whois/{userId}')
  async getWhoIs(
    @Param('userId') userId: string
  ): Promise<dto.GetWhoIsResponse | any> {
    throw new HttpError(501);
  }

  @Post('/createRoom')
  async createRoom(
    @Body({ required: true })
    body: dto.CreateRoomBody
  ): Promise<dto.CreateRoomResponse | any> {
    throw new HttpError(501);
  }

  @Post('/delete_devices')
  async deleteDevices(
    @Body({ required: true })
    body: dto.DeleteDevicesBody
  ): Promise<dto.AuthenticationResponse | any> {
    throw new HttpError(501);
  }

  @Get('/devices')
  async getDevices(): Promise<dto.GetDevicesResponse | any> {
    throw new HttpError(501);
  }

  @Get('/devices/{deviceId}')
  async getDevice(
    @Param('deviceId') deviceId: string
  ): Promise<dto.DeviceResponse | any> {
    throw new HttpError(501);
  }

  @Put('/devices/{deviceId}')
  async updateDevice(
    @Param('deviceId') deviceId: string,
    @Body({ required: true })
    body: dto.UpdateDeviceBody
  ): Promise<any> {
    throw new HttpError(501);
  }

  @Delete('/devices/{deviceId}')
  async deleteDevice(
    @Param('deviceId') deviceId: string,
    @Body({ required: true })
    body: dto.DeleteDeviceBody
  ): Promise<dto.AuthenticationResponse | any> {
    throw new HttpError(501);
  }

  @Get('/directory/room/{roomAlias}')
  async getRoomIdByAlias(
    @Param('roomAlias') roomAlias: string
  ): Promise<dto.GetRoomIdByAliasResponse | any> {
    throw new HttpError(501);
  }

  @Put('/directory/room/{roomAlias}')
  async setRoomAlias(
    @Param('roomAlias') roomAlias: string,
    @Body({ required: true })
    body: dto.SetRoomAliasBody
  ): Promise<any> {
    throw new HttpError(501);
  }

  @Delete('/directory/room/{roomAlias}')
  async deleteRoomAlias(@Param('roomAlias') roomAlias: string): Promise<any> {
    throw new HttpError(501);
  }

  @Get('/events')
  async getEvents(
    @QueryParam('from') from: string,
    @QueryParam('timeout') timeout: number
  ): Promise<dto.GetEventsResponse | any> {
    throw new HttpError(501);
  }

  @Get('/events/{eventId}')
  async getOneEvent(
    @Param('eventId') eventId: string
  ): Promise<dto.EventResponse | any> {
    throw new HttpError(501);
  }

  @Get('/initialSync')
  async initialSync(
    @QueryParam('limit') limit: number,
    @QueryParam('archived') archived: boolean
  ): Promise<dto.InitialSyncResponse | any> {
    throw new HttpError(501);
  }

  @Post('/join/{roomIdOrAlias}')
  async joinRoom(
    @Param('roomIdOrAlias') roomIdOrAlias: string,
    @Body({ required: true })
    body: dto.JoinRoomBody
  ): Promise<dto.JoinRoomResponse429 | any> {
    throw new HttpError(501);
  }

  @Get('/joined_rooms')
  async getJoinedRooms(): Promise<dto.GetJoinedRoomsResponse | any> {
    throw new HttpError(501);
  }

  @Get('/keys/changes')
  async getKeysChanges(
    @QueryParam('from', { required: true })
    from: string,
    @QueryParam('to', { required: true })
    to: string
  ): Promise<dto.GetKeysChangesResponse | any> {
    throw new HttpError(501);
  }

  @Post('/keys/claim')
  async claimKeys(
    @Body({ required: true })
    body: dto.ClaimKeysBody
  ): Promise<dto.ClaimKeysResponse | any> {
    throw new HttpError(501);
  }

  @Post('/keys/query')
  async queryKeys(
    @Body({ required: true })
    body: dto.QueryKeysBody
  ): Promise<dto.QueryKeysResponse | any> {
    throw new HttpError(501);
  }

  @Post('/keys/upload')
  async uploadKeys(
    @Body({ required: true })
    body: dto.UploadKeysBody
  ): Promise<dto.UploadKeysResponse | any> {
    throw new HttpError(501);
  }

  @Post('/login')
  async login(
    @Body({ required: true })
    body: dto.LoginBody
  ): Promise<dto.LoginResponse | dto.LoginResponse429 | any> {
    if (body.type === 'm.login.password') {
      const { user, jwt } = await authenticate(
        body.user!,
        body.password!,
        body.device_id!
      );
      const resp: dto.LoginResponse = {
        access_token: jwt,
        device_id: user.device_id,
        home_server: user.home_server,
        user_id: user.user_id
      };
      return resp;
    }
    throw new HttpError(501);
  }

  @Post('/logout')
  async logout(): Promise<any> {
    throw new HttpError(501);
  }

  @Get('/notifications')
  async getNotifications(
    @QueryParam('from') from: string,
    @QueryParam('limit') limit: number,
    @QueryParam('only') only: string
  ): Promise<dto.GetNotificationsResponse | any> {
    throw new HttpError(501);
  }

  @Get('/presence/list/{userId}')
  async getPresenceForList(
    @Param('userId') userId: string
  ): Promise<dto.PresenceEventResponse[] | any> {
    throw new HttpError(501);
  }

  @Post('/presence/list/{userId}')
  async modifyPresenceList(
    @Param('userId') userId: string,
    @Body({ required: true })
    body: dto.ModifyPresenceListBody
  ): Promise<dto.ModifyPresenceListResponse429 | any> {
    throw new HttpError(501);
  }

  @Get('/presence/{userId}/status')
  async getPresence(
    @Param('userId') userId: string
  ): Promise<dto.GetPresenceResponse | any> {
    throw new HttpError(501);
  }

  @Put('/presence/{userId}/status')
  async setPresence(
    @Param('userId') userId: string,
    @Body({ required: true })
    body: dto.SetPresenceBody
  ): Promise<dto.SetPresenceResponse429 | any> {
    throw new HttpError(501);
  }

  @Get('/profile/{userId}')
  async getUserProfile(
    @Param('userId') userId: string
  ): Promise<dto.GetUserProfileResponse | any> {
    throw new HttpError(501);
  }

  @Get('/profile/{userId}/avatar_url')
  async getAvatarUrl(
    @Param('userId') userId: string
  ): Promise<dto.GetAvatarUrlResponse | any> {
    throw new HttpError(501);
  }

  @Put('/profile/{userId}/avatar_url')
  async setAvatarUrl(
    @Param('userId') userId: string,
    @Body({ required: true })
    body: dto.SetAvatarUrlBody
  ): Promise<dto.SetAvatarUrlResponse429 | any> {
    throw new HttpError(501);
  }

  @Get('/profile/{userId}/displayname')
  async getDisplayName(
    @Param('userId') userId: string
  ): Promise<dto.GetDisplayNameResponse | any> {
    throw new HttpError(501);
  }

  @Put('/profile/{userId}/displayname')
  async setDisplayName(
    @Param('userId') userId: string,
    @Body({ required: true })
    body: dto.SetDisplayNameBody
  ): Promise<dto.SetDisplayNameResponse429 | any> {
    throw new HttpError(501);
  }

  @Get('/publicRooms')
  async getPublicRooms(
    @QueryParam('limit', { required: true })
    limit: number,
    @QueryParam('since', { required: true })
    since: string,
    @QueryParam('server', { required: true })
    server: string
  ): Promise<dto.GetPublicRoomsResponse | any> {
    throw new HttpError(501);
  }

  @Post('/publicRooms')
  async queryPublicRooms(
    @QueryParam('server', { required: true })
    server: string,
    @Body({ required: true })
    body: dto.QueryPublicRoomsBody
  ): Promise<dto.QueryPublicRoomsResponse | any> {
    throw new HttpError(501);
  }

  @Get('/pushers')
  async getPushers(): Promise<dto.GetPushersResponse | any> {
    throw new HttpError(501);
  }

  @Post('/pushers/set')
  async postPusher(
    @Body({ required: true })
    body: dto.PostPusherBody
  ): Promise<dto.PostPusherResponse429 | any> {
    throw new HttpError(501);
  }

  @Get('/pushrules/')
  async getPushRules(): Promise<dto.GetPushRulesResponse | any> {
    throw new HttpError(501);
  }

  @Get('/pushrules/{scope}/{kind}/{ruleId}')
  async getPushRule(
    @Param('scope') scope: string,
    @Param('kind') kind: string,
    @Param('ruleId') ruleId: string
  ): Promise<dto.PushRuleResponse | any> {
    throw new HttpError(501);
  }

  @Put('/pushrules/{scope}/{kind}/{ruleId}')
  async setPushRule(
    @Param('scope') scope: string,
    @Param('kind') kind: string,
    @Param('ruleId') ruleId: string,
    @QueryParam('before') before: string,
    @QueryParam('after') after: string,
    @Body({ required: true })
    body: dto.SetPushRuleBody
  ): Promise<dto.SetPushRuleResponse429 | any> {
    throw new HttpError(501);
  }

  @Delete('/pushrules/{scope}/{kind}/{ruleId}')
  async deletePushRule(
    @Param('scope') scope: string,
    @Param('kind') kind: string,
    @Param('ruleId') ruleId: string
  ): Promise<any> {
    throw new HttpError(501);
  }

  @Put('/pushrules/{scope}/{kind}/{ruleId}/actions')
  async setPushRuleActions(
    @Param('scope') scope: string,
    @Param('kind') kind: string,
    @Param('ruleId') ruleId: string,
    @Body({ required: true })
    body: dto.SetPushRuleActionsBody
  ): Promise<any> {
    throw new HttpError(501);
  }

  @Put('/pushrules/{scope}/{kind}/{ruleId}/enabled')
  async setPushRuleEnabled(
    @Param('scope') scope: string,
    @Param('kind') kind: string,
    @Param('ruleId') ruleId: string,
    @Body({ required: true })
    body: dto.SetPushRuleEnabledBody
  ): Promise<any> {
    throw new HttpError(501);
  }

  @Post('/register')
  async register(
    @QueryParam('kind') kind: string,
    @Body({ required: true })
    body: dto.RegisterBody
  ): Promise<
    | dto.RegisterResponse
    | dto.AuthenticationResponse
    | dto.RegisterResponse429
    | any
  > {
    if (body.auth && body.auth.session && body.auth.type === 'm.login.dummy') {
      // get user / pass from session
      const session = body.auth.session;
      // get from redis -
      const [user, pass, _] = session.split(':');
      const device_id = body.device_id || rand();
      const userN = normalizeUser(user);
      const signedIn = await signup(userN, pass, device_id);
      const resp: dto.RegisterResponse = {
        access_token: signedIn.jwt,
        device_id,
        home_server: signedIn.user.home_server,
        user_id: signedIn.user.user_id
      };
      return resp;
    } else if (body.username && body.password) {
      // send back a session id
      const session = `${body.username}:${body.password}:${rand()}`;
      // hash it, store in redis
      const resp: dto.AuthenticationResponse = {
        session,
        flows: [{ stages: ['m.loging.dummy'] }]
      };
      return resp;
    }
    throw new HttpError(501);
  }

  @Get('/register/available')
  async checkUsernameAvailability(
    @QueryParam('username', { required: true })
    username: string
  ): Promise<
    | dto.CheckUsernameAvailabilityResponse
    | dto.CheckUsernameAvailabilityResponse429
    | any
  > {
    throw new HttpError(501);
  }

  @Post('/rooms/{roomId}/ban')
  async ban(
    @Param('roomId') roomId: string,
    @Body({ required: true })
    body: dto.BanBody
  ): Promise<any> {
    throw new HttpError(501);
  }

  @Get('/rooms/{roomId}/context/{eventId}')
  async getEventContext(
    @Param('roomId') roomId: string,
    @Param('eventId') eventId: string,
    @QueryParam('limit', { required: true })
    limit: number
  ): Promise<dto.GetEventContextResponse | any> {
    throw new HttpError(501);
  }

  @Get('/rooms/{roomId}/event/{eventId}')
  async getOneRoomEvent(
    @Param('roomId') roomId: string,
    @Param('eventId') eventId: string
  ): Promise<dto.EventResponse | any> {
    throw new HttpError(501);
  }

  @Post('/rooms/{roomId}/forget')
  async forgetRoom(
    @Param('roomId') roomId: string
  ): Promise<dto.ForgetRoomResponse429 | any> {
    throw new HttpError(501);
  }

  @Get('/rooms/{roomId}/initialSync')
  async roomInitialSync(
    @Param('roomId') roomId: string
  ): Promise<dto.RoomInfoResponse | any> {
    throw new HttpError(501);
  }

  @Post('/rooms/{roomId}/invite')
  async inviteBy3PID(
    @Param('roomId') roomId: string,
    @Body({ required: true })
    body: dto.InviteBy3PIDBody
  ): Promise<dto.InviteBy3PIDResponse429 | any> {
    throw new HttpError(501);
  }

  @Post('/rooms/{roomId}/invite ')
  async inviteUser(
    @Param('roomId') roomId: string,
    @Body({ required: true })
    body: dto.InviteUserBody
  ): Promise<dto.InviteUserResponse429 | any> {
    throw new HttpError(501);
  }

  @Post('/rooms/{roomId}/join')
  async joinRoomById(
    @Param('roomId') roomId: string,
    @Body({ required: true })
    body: dto.JoinRoomByIdBody
  ): Promise<dto.JoinRoomByIdResponse429 | any> {
    throw new HttpError(501);
  }

  @Get('/rooms/{roomId}/joined_members')
  async getJoinedMembersByRoom(
    @Param('roomId') roomId: string
  ): Promise<dto.GetJoinedMembersByRoomResponse | any> {
    throw new HttpError(501);
  }

  @Post('/rooms/{roomId}/kick')
  async kick(
    @Param('roomId') roomId: string,
    @Body({ required: true })
    body: dto.KickBody
  ): Promise<any> {
    throw new HttpError(501);
  }

  @Post('/rooms/{roomId}/leave')
  async leaveRoom(
    @Param('roomId') roomId: string
  ): Promise<dto.LeaveRoomResponse429 | any> {
    throw new HttpError(501);
  }

  @Get('/rooms/{roomId}/members')
  async getMembersByRoom(
    @Param('roomId') roomId: string
  ): Promise<dto.GetMembersByRoomResponse | any> {
    throw new HttpError(501);
  }

  @Get('/rooms/{roomId}/messages')
  async getRoomEvents(
    @Param('roomId') roomId: string,
    @QueryParam('from', { required: true })
    from: string,
    @QueryParam('to') to: string,
    @QueryParam('dir', { required: true })
    dir: string,
    @QueryParam('limit', { required: true })
    limit: number,
    @QueryParam('filter', { required: true })
    filter: string
  ): Promise<dto.GetRoomEventsResponse | any> {
    throw new HttpError(501);
  }

  @Post('/rooms/{roomId}/receipt/{receiptType}/{eventId}')
  async postReceipt(
    @Param('roomId') roomId: string,
    @Param('receiptType') receiptType: string,
    @Param('eventId') eventId: string,
    @Body({ required: true })
    body: any
  ): Promise<dto.PostReceiptResponse429 | any> {
    throw new HttpError(501);
  }

  @Put('/rooms/{roomId}/redact/{eventId}/{txnId}')
  async redactEvent(
    @Param('roomId') roomId: string,
    @Param('eventId') eventId: string,
    @Param('txnId') txnId: string,
    @Body({ required: true })
    body: dto.RedactEventBody
  ): Promise<dto.RedactEventResponse | any> {
    throw new HttpError(501);
  }

  @Put('/rooms/{roomId}/send/{eventType}/{txnId}')
  async sendMessage(
    @Param('roomId') roomId: string,
    @Param('eventType') eventType: string,
    @Param('txnId') txnId: string,
    @Body({ required: true })
    body: any
  ): Promise<dto.SendMessageResponse | any> {
    throw new HttpError(501);
  }

  @Get('/rooms/{roomId}/state')
  async getRoomState(
    @Param('roomId') roomId: string
  ): Promise<dto.StateEventResponse[] | any> {
    throw new HttpError(501);
  }

  @Get('/rooms/{roomId}/state/{eventType}')
  async getRoomStateByType(
    @Param('roomId') roomId: string,
    @Param('eventType') eventType: string
  ): Promise<any> {
    throw new HttpError(501);
  }

  @Put('/rooms/{roomId}/state/{eventType}')
  async setRoomState(
    @Param('roomId') roomId: string,
    @Param('eventType') eventType: string,
    @Body({ required: true })
    body: any
  ): Promise<dto.SetRoomStateResponse | any> {
    throw new HttpError(501);
  }

  @Get('/rooms/{roomId}/state/{eventType}/{stateKey}')
  async getRoomStateWithKey(
    @Param('roomId') roomId: string,
    @Param('eventType') eventType: string,
    @Param('stateKey') stateKey: string
  ): Promise<any> {
    throw new HttpError(501);
  }

  @Put('/rooms/{roomId}/state/{eventType}/{stateKey}')
  async setRoomStateWithKey(
    @Param('roomId') roomId: string,
    @Param('eventType') eventType: string,
    @Param('stateKey') stateKey: string,
    @Body({ required: true })
    body: any
  ): Promise<dto.SetRoomStateWithKeyResponse | any> {
    throw new HttpError(501);
  }

  @Put('/rooms/{roomId}/typing/{userId}')
  async setTyping(
    @Param('userId') userId: string,
    @Param('roomId') roomId: string,
    @Body({ required: true })
    body: dto.SetTypingBody
  ): Promise<dto.SetTypingResponse429 | any> {
    throw new HttpError(501);
  }

  @Post('/rooms/{roomId}/unban')
  async unban(
    @Param('roomId') roomId: string,
    @Body({ required: true })
    body: dto.UnbanBody
  ): Promise<any> {
    throw new HttpError(501);
  }

  @Post('/search')
  async search(
    @QueryParam('next_batch', { required: true })
    nextBatch: string,
    @Body({ required: true })
    body: dto.SearchBody
  ): Promise<dto.ResultsResponse | dto.SearchResponse429 | any> {
    throw new HttpError(501);
  }

  @Put('/sendToDevice/{eventType}/{txnId}')
  async sendToDevice(
    @Param('eventType') eventType: string,
    @Param('txnId') txnId: string,
    @Body({ required: true })
    body: dto.SendToDeviceBody
  ): Promise<any> {
    throw new HttpError(501);
  }

  @Get('/sync')
  async sync(
    @QueryParam('filter', { required: true })
    filter: string,
    @QueryParam('since', { required: true })
    since: string,
    @QueryParam('full_state', { required: true })
    fullState: boolean,
    @QueryParam('set_presence', { required: true })
    setPresence: string,
    @QueryParam('timeout', { required: true })
    timeout: number
  ): Promise<dto.SyncResponse | any> {
    throw new HttpError(501);
  }

  @Put('/user/{userId}/account_data/{type}')
  async setAccountData(
    @Param('userId') userId: string,
    @Param('type') type: string,
    @Body({ required: true })
    body: any
  ): Promise<any> {
    throw new HttpError(501);
  }

  @Post('/user/{userId}/filter')
  async defineFilter(
    @Param('userId') userId: string,
    @Body({ required: true })
    body: dto.DefineFilterBody
  ): Promise<dto.DefineFilterResponse | any> {
    throw new HttpError(501);
  }

  @Get('/user/{userId}/filter/{filterId}')
  async getFilter(
    @Param('userId') userId: string,
    @Param('filterId') filterId: string
  ): Promise<dto.GetFilterResponse | any> {
    throw new HttpError(501);
  }

  @Put('/user/{userId}/rooms/{roomId}/account_data/{type}')
  async setAccountDataPerRoom(
    @Param('userId') userId: string,
    @Param('roomId') roomId: string,
    @Param('type') type: string,
    @Body({ required: true })
    body: any
  ): Promise<any> {
    throw new HttpError(501);
  }

  @Get('/user/{userId}/rooms/{roomId}/tags')
  async getRoomTags(
    @Param('userId') userId: string,
    @Param('roomId') roomId: string
  ): Promise<dto.GetRoomTagsResponse | any> {
    throw new HttpError(501);
  }

  @Put('/user/{userId}/rooms/{roomId}/tags/{tag}')
  async setRoomTag(
    @Param('userId') userId: string,
    @Param('roomId') roomId: string,
    @Param('tag') tag: string,
    @Body({ required: true })
    body: any
  ): Promise<any> {
    throw new HttpError(501);
  }

  @Delete('/user/{userId}/rooms/{roomId}/tags/{tag}')
  async deleteRoomTag(
    @Param('userId') userId: string,
    @Param('roomId') roomId: string,
    @Param('tag') tag: string
  ): Promise<any> {
    throw new HttpError(501);
  }

  @Post('/user_directory/search')
  async searchUserDirectory(
    @Body({ required: true })
    body: dto.SearchUserDirectoryBody
  ): Promise<
    dto.SearchUserDirectoryResponse | dto.SearchUserDirectoryResponse429 | any
  > {
    throw new HttpError(501);
  }

  @Get('/voip/turnServer')
  async getTurnServer(): Promise<
    dto.GetTurnServerResponse | dto.GetTurnServerResponse429 | any
  > {
    throw new HttpError(501);
  }
}

@JsonController('/_matrix/media/r0')
export class MatrixMediaController {
  @Get('/download/{serverName}/{mediaId}')
  async getContent(
    @Param('serverName') serverName: string,
    @Param('mediaId') mediaId: string
  ): Promise<dto.GetContentResponse429 | any> {
    throw new HttpError(501);
  }

  @Get('/download/{serverName}/{mediaId}/{fileName}')
  async getContentOverrideName(
    @Param('serverName') serverName: string,
    @Param('mediaId') mediaId: string,
    @Param('fileName') fileName: string
  ): Promise<dto.GetContentOverrideNameResponse429 | any> {
    throw new HttpError(501);
  }

  @Get('/preview_url')
  async getUrlPreview(
    @QueryParam('url', { required: true })
    url: string,
    @QueryParam('ts', { required: true })
    ts: number
  ): Promise<dto.GetUrlPreviewResponse | dto.GetUrlPreviewResponse429 | any> {
    throw new HttpError(501);
  }

  @Get('/thumbnail/{serverName}/{mediaId}')
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

  @Post('/upload')
  async uploadContent(
    @HeaderParam('Content-Type', { required: true })
    contentType: string,
    @QueryParam('filename', { required: true })
    filename: string,
    @Body({ required: true })
    body: string
  ): Promise<dto.UploadContentResponse | dto.UploadContentResponse429 | any> {
    throw new HttpError(501);
  }
}
