import 'reflect-metadata';
require('isomorphic-fetch');
require('isomorphic-form-data');

import { Pretend, Get, Put, Delete, Post, Headers } from 'pretend';
import * as Tx from './tss';

class TestCli {
  @Post('/_matrix/client/r0/createRoom')
  async createRoom(
    body: Tx.CreateRoomBody
  ): Promise<Tx.CreateRoomResponse | any> {}
}

async function call() {
  const client = Pretend.builder()
    .requestInterceptor(request => {
      request.options.headers = {
        'Content-Type': 'application/json;charset=UTF-8'
      };
      return request;
    })
    .target(TestCli, 'http://localhost:1234/');

  const result = await client.createRoom({
    invite_3pid: [{ address: '', id_server: '', medium: '' }]
  });
  console.dir(result.errors);
}

call();

function Body(options?: any): Function {
  return () => {};
}
function Param(options?: any): Function {
  return () => {};
}
function QueryParam(name: string, options?: any): Function {
  return () => {};
}
function HeaderParam(name: string, options?: any): Function {
  return () => {};
}

export class MatrixClient {
  @Get('/_matrix/client/r0/account/3pid')
  async getAccount3PIDs(): Promise<Tx.GetAccount3PIDsResponse | any> {}

  @Post('/_matrix/client/r0/account/3pid')
  async post3PIDs(
    @Body({ required: true })
    body: Tx.Post3PIDsBody
  ): Promise<any> {}

  @Post('/_matrix/client/r0/account/deactivate')
  async deactivateAccount(
    @Body({ required: true })
    body: Tx.DeactivateAccountBody
  ): Promise<
    Tx.AuthenticationResponse | Tx.DeactivateAccountResponse429 | any
  > {}

  @Post('/_matrix/client/r0/account/password')
  async changePassword(
    @Body({ required: true })
    body: Tx.ChangePasswordBody
  ): Promise<Tx.AuthenticationResponse | Tx.ChangePasswordResponse429 | any> {}

  @Get('/_matrix/client/r0/account/whoami')
  async getTokenOwner(): Promise<
    | Tx.GetTokenOwnerResponse
    | Tx.GetTokenOwnerResponse401
    | Tx.GetTokenOwnerResponse403
    | Tx.GetTokenOwnerResponse429
    | any
  > {}

  @Get('/_matrix/client/r0/admin/whois/{userId}')
  async getWhoIs(
    @Param('userId') userId: string
  ): Promise<Tx.GetWhoIsResponse | any> {}

  @Post('/_matrix/client/r0/createRoom')
  async createRoom(
    @Body({ required: true })
    body: Tx.CreateRoomBody
  ): Promise<Tx.CreateRoomResponse | any> {}

  @Post('/_matrix/client/r0/delete_devices')
  async deleteDevices(
    @Body({ required: true })
    body: Tx.DeleteDevicesBody
  ): Promise<Tx.AuthenticationResponse | any> {}

  @Get('/_matrix/client/r0/devices')
  async getDevices(): Promise<Tx.GetDevicesResponse | any> {}

  @Get('/_matrix/client/r0/devices/{deviceId}')
  async getDevice(
    @Param('deviceId') deviceId: string
  ): Promise<Tx.DeviceResponse | any> {}

  @Put('/_matrix/client/r0/devices/{deviceId}')
  async updateDevice(
    @Param('deviceId') deviceId: string,
    @Body({ required: true })
    body: Tx.UpdateDeviceBody
  ): Promise<any> {}

  @Delete('/_matrix/client/r0/devices/{deviceId}')
  async deleteDevice(
    @Param('deviceId') deviceId: string,
    @Body({ required: true })
    body: Tx.DeleteDeviceBody
  ): Promise<Tx.AuthenticationResponse | any> {}

  @Get('/_matrix/client/r0/directory/room/{roomAlias}')
  async getRoomIdByAlias(
    @Param('roomAlias') roomAlias: string
  ): Promise<Tx.GetRoomIdByAliasResponse | any> {}

  @Put('/_matrix/client/r0/directory/room/{roomAlias}')
  async setRoomAlias(
    @Param('roomAlias') roomAlias: string,
    @Body({ required: true })
    body: Tx.SetRoomAliasBody
  ): Promise<any> {}

  @Delete('/_matrix/client/r0/directory/room/{roomAlias}')
  async deleteRoomAlias(@Param('roomAlias') roomAlias: string): Promise<any> {}

  @Get('/_matrix/client/r0/events')
  async getEvents(
    @QueryParam('from') from: string,
    @QueryParam('timeout') timeout: number
  ): Promise<Tx.GetEventsResponse | any> {}

  @Get('/_matrix/client/r0/events/{eventId}')
  async getOneEvent(
    @Param('eventId') eventId: string
  ): Promise<Tx.EventResponse | any> {}

  @Get('/_matrix/client/r0/initialSync')
  async initialSync(
    @QueryParam('limit') limit: number,
    @QueryParam('archived') archived: boolean
  ): Promise<Tx.InitialSyncResponse | any> {}

  @Post('/_matrix/client/r0/join/{roomIdOrAlias}')
  async joinRoom(
    @Param('roomIdOrAlias') roomIdOrAlias: string,
    @Body({ required: true })
    body: Tx.JoinRoomBody
  ): Promise<Tx.JoinRoomResponse429 | any> {}

  @Get('/_matrix/client/r0/joined_rooms')
  async getJoinedRooms(): Promise<Tx.GetJoinedRoomsResponse | any> {}

  @Get('/_matrix/client/r0/keys/changes')
  async getKeysChanges(
    @QueryParam('from', { required: true })
    from: string,
    @QueryParam('to', { required: true })
    to: string
  ): Promise<Tx.GetKeysChangesResponse | any> {}

  @Post('/_matrix/client/r0/keys/claim')
  async claimKeys(
    @Body({ required: true })
    body: Tx.ClaimKeysBody
  ): Promise<Tx.ClaimKeysResponse | any> {}

  @Post('/_matrix/client/r0/keys/query')
  async queryKeys(
    @Body({ required: true })
    body: Tx.QueryKeysBody
  ): Promise<Tx.QueryKeysResponse | any> {}

  @Post('/_matrix/client/r0/keys/upload')
  async uploadKeys(
    @Body({ required: true })
    body: Tx.UploadKeysBody
  ): Promise<Tx.UploadKeysResponse | any> {}

  @Post('/_matrix/client/r0/login')
  async login(
    @Body({ required: true })
    body: Tx.LoginBody
  ): Promise<Tx.LoginResponse | Tx.LoginResponse429 | any> {}

  @Post('/_matrix/client/r0/logout')
  async logout(): Promise<any> {}

  @Get('/_matrix/client/r0/notifications')
  async getNotifications(
    @QueryParam('from') from: string,
    @QueryParam('limit') limit: number,
    @QueryParam('only') only: string
  ): Promise<Tx.GetNotificationsResponse | any> {}

  @Get('/_matrix/client/r0/presence/list/{userId}')
  async getPresenceForList(
    @Param('userId') userId: string
  ): Promise<Tx.PresenceEvent[] | any> {}

  @Post('/_matrix/client/r0/presence/list/{userId}')
  async modifyPresenceList(
    @Param('userId') userId: string,
    @Body({ required: true })
    body: Tx.ModifyPresenceListBody
  ): Promise<Tx.ModifyPresenceListResponse429 | any> {}

  @Get('/_matrix/client/r0/presence/{userId}/status')
  async getPresence(
    @Param('userId') userId: string
  ): Promise<Tx.GetPresenceResponse | any> {}

  @Put('/_matrix/client/r0/presence/{userId}/status')
  async setPresence(
    @Param('userId') userId: string,
    @Body({ required: true })
    body: Tx.SetPresenceBody
  ): Promise<Tx.SetPresenceResponse429 | any> {}

  @Get('/_matrix/client/r0/profile/{userId}')
  async getUserProfile(
    @Param('userId') userId: string
  ): Promise<Tx.GetUserProfileResponse | any> {}

  @Get('/_matrix/client/r0/profile/{userId}/avatar_url')
  async getAvatarUrl(
    @Param('userId') userId: string
  ): Promise<Tx.GetAvatarUrlResponse | any> {}

  @Put('/_matrix/client/r0/profile/{userId}/avatar_url')
  async setAvatarUrl(
    @Param('userId') userId: string,
    @Body({ required: true })
    body: Tx.SetAvatarUrlBody
  ): Promise<Tx.SetAvatarUrlResponse429 | any> {}

  @Get('/_matrix/client/r0/profile/{userId}/displayname')
  async getDisplayName(
    @Param('userId') userId: string
  ): Promise<Tx.GetDisplayNameResponse | any> {}

  @Put('/_matrix/client/r0/profile/{userId}/displayname')
  async setDisplayName(
    @Param('userId') userId: string,
    @Body({ required: true })
    body: Tx.SetDisplayNameBody
  ): Promise<Tx.SetDisplayNameResponse429 | any> {}

  @Get('/_matrix/client/r0/publicRooms')
  async getPublicRooms(
    @QueryParam('limit', { required: true })
    limit: number,
    @QueryParam('since', { required: true })
    since: string,
    @QueryParam('server', { required: true })
    server: string
  ): Promise<Tx.GetPublicRoomsResponse | any> {}

  @Post('/_matrix/client/r0/publicRooms')
  async queryPublicRooms(
    @QueryParam('server', { required: true })
    server: string,
    @Body({ required: true })
    body: Tx.QueryPublicRoomsBody
  ): Promise<Tx.QueryPublicRoomsResponse | any> {}

  @Get('/_matrix/client/r0/pushers')
  async getPushers(): Promise<Tx.GetPushersResponse | any> {}

  @Post('/_matrix/client/r0/pushers/set')
  async postPusher(
    @Body({ required: true })
    body: Tx.PostPusherBody
  ): Promise<Tx.PostPusherResponse429 | any> {}

  @Get('/_matrix/client/r0/pushrules/')
  async getPushRules(): Promise<Tx.GetPushRulesResponse | any> {}

  @Get('/_matrix/client/r0/pushrules/{scope}/{kind}/{ruleId}')
  async getPushRule(
    @Param('scope') scope: string,
    @Param('kind') kind: string,
    @Param('ruleId') ruleId: string
  ): Promise<Tx.PushRuleResponse | any> {}

  @Put('/_matrix/client/r0/pushrules/{scope}/{kind}/{ruleId}')
  async setPushRule(
    @Param('scope') scope: string,
    @Param('kind') kind: string,
    @Param('ruleId') ruleId: string,
    @QueryParam('before') before: string,
    @QueryParam('after') after: string,
    @Body({ required: true })
    body: Tx.SetPushRuleBody
  ): Promise<Tx.SetPushRuleResponse429 | any> {}

  @Delete('/_matrix/client/r0/pushrules/{scope}/{kind}/{ruleId}')
  async deletePushRule(
    @Param('scope') scope: string,
    @Param('kind') kind: string,
    @Param('ruleId') ruleId: string
  ): Promise<any> {}

  @Put('/_matrix/client/r0/pushrules/{scope}/{kind}/{ruleId}/actions')
  async setPushRuleActions(
    @Param('scope') scope: string,
    @Param('kind') kind: string,
    @Param('ruleId') ruleId: string,
    @Body({ required: true })
    body: Tx.SetPushRuleActionsBody
  ): Promise<any> {}

  @Put('/_matrix/client/r0/pushrules/{scope}/{kind}/{ruleId}/enabled')
  async setPushRuleEnabled(
    @Param('scope') scope: string,
    @Param('kind') kind: string,
    @Param('ruleId') ruleId: string,
    @Body({ required: true })
    body: Tx.SetPushRuleEnabledBody
  ): Promise<any> {}

  @Post('/_matrix/client/r0/register')
  async register(
    @QueryParam('kind') kind: string,
    @Body({ required: true })
    body: Tx.RegisterBody
  ): Promise<
    | Tx.RegisterResponse
    | Tx.AuthenticationResponse
    | Tx.RegisterResponse429
    | any
  > {}

  @Get('/_matrix/client/r0/register/available')
  async checkUsernameAvailability(
    @QueryParam('username', { required: true })
    username: string
  ): Promise<
    | Tx.CheckUsernameAvailabilityResponse
    | Tx.CheckUsernameAvailabilityResponse429
    | any
  > {}

  @Post('/_matrix/client/r0/rooms/{roomId}/ban')
  async ban(
    @Param('roomId') roomId: string,
    @Body({ required: true })
    body: Tx.BanBody
  ): Promise<any> {}

  @Get('/_matrix/client/r0/rooms/{roomId}/context/{eventId}')
  async getEventContext(
    @Param('roomId') roomId: string,
    @Param('eventId') eventId: string,
    @QueryParam('limit', { required: true })
    limit: number
  ): Promise<Tx.GetEventContextResponse | any> {}

  @Get('/_matrix/client/r0/rooms/{roomId}/event/{eventId}')
  async getOneRoomEvent(
    @Param('roomId') roomId: string,
    @Param('eventId') eventId: string
  ): Promise<Tx.EventResponse | any> {}

  @Post('/_matrix/client/r0/rooms/{roomId}/forget')
  async forgetRoom(
    @Param('roomId') roomId: string
  ): Promise<Tx.ForgetRoomResponse429 | any> {}

  @Get('/_matrix/client/r0/rooms/{roomId}/initialSync')
  async roomInitialSync(
    @Param('roomId') roomId: string
  ): Promise<Tx.RoomInfoResponse | any> {}

  @Post('/_matrix/client/r0/rooms/{roomId}/invite')
  async inviteBy3PID(
    @Param('roomId') roomId: string,
    @Body({ required: true })
    body: Tx.InviteBy3PIDBody
  ): Promise<Tx.InviteBy3PIDResponse429 | any> {}

  @Post('/_matrix/client/r0/rooms/{roomId}/invite ')
  async inviteUser(
    @Param('roomId') roomId: string,
    @Body({ required: true })
    body: Tx.InviteUserBody
  ): Promise<Tx.InviteUserResponse429 | any> {}

  @Post('/_matrix/client/r0/rooms/{roomId}/join')
  async joinRoomById(
    @Param('roomId') roomId: string,
    @Body({ required: true })
    body: Tx.JoinRoomByIdBody
  ): Promise<Tx.JoinRoomByIdResponse429 | any> {}

  @Get('/_matrix/client/r0/rooms/{roomId}/joined_members')
  async getJoinedMembersByRoom(
    @Param('roomId') roomId: string
  ): Promise<Tx.GetJoinedMembersByRoomResponse | any> {}

  @Post('/_matrix/client/r0/rooms/{roomId}/kick')
  async kick(
    @Param('roomId') roomId: string,
    @Body({ required: true })
    body: Tx.KickBody
  ): Promise<any> {}

  @Post('/_matrix/client/r0/rooms/{roomId}/leave')
  async leaveRoom(
    @Param('roomId') roomId: string
  ): Promise<Tx.LeaveRoomResponse429 | any> {}

  @Get('/_matrix/client/r0/rooms/{roomId}/members')
  async getMembersByRoom(
    @Param('roomId') roomId: string
  ): Promise<Tx.GetMembersByRoomResponse | any> {}

  @Get('/_matrix/client/r0/rooms/{roomId}/messages')
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
  ): Promise<Tx.GetRoomEventsResponse | any> {}

  @Post('/_matrix/client/r0/rooms/{roomId}/receipt/{receiptType}/{eventId}')
  async postReceipt(
    @Param('roomId') roomId: string,
    @Param('receiptType') receiptType: string,
    @Param('eventId') eventId: string,
    @Body({ required: true })
    body: any
  ): Promise<Tx.PostReceiptResponse429 | any> {}

  @Put('/_matrix/client/r0/rooms/{roomId}/redact/{eventId}/{txnId}')
  async redactEvent(
    @Param('roomId') roomId: string,
    @Param('eventId') eventId: string,
    @Param('txnId') txnId: string,
    @Body({ required: true })
    body: Tx.RedactEventBody
  ): Promise<Tx.RedactEventResponse | any> {}

  @Put('/_matrix/client/r0/rooms/{roomId}/send/{eventType}/{txnId}')
  async sendMessage(
    @Param('roomId') roomId: string,
    @Param('eventType') eventType: string,
    @Param('txnId') txnId: string,
    @Body({ required: true })
    body: any
  ): Promise<Tx.SendMessageResponse | any> {}

  @Get('/_matrix/client/r0/rooms/{roomId}/state')
  async getRoomState(
    @Param('roomId') roomId: string
  ): Promise<Tx.StateEvent[] | any> {}

  @Get('/_matrix/client/r0/rooms/{roomId}/state/{eventType}')
  async getRoomStateByType(
    @Param('roomId') roomId: string,
    @Param('eventType') eventType: string
  ): Promise<any> {}

  @Put('/_matrix/client/r0/rooms/{roomId}/state/{eventType}')
  async setRoomState(
    @Param('roomId') roomId: string,
    @Param('eventType') eventType: string,
    @Body({ required: true })
    body: any
  ): Promise<Tx.SetRoomStateResponse | any> {}

  @Get('/_matrix/client/r0/rooms/{roomId}/state/{eventType}/{stateKey}')
  async getRoomStateWithKey(
    @Param('roomId') roomId: string,
    @Param('eventType') eventType: string,
    @Param('stateKey') stateKey: string
  ): Promise<any> {}

  @Put('/_matrix/client/r0/rooms/{roomId}/state/{eventType}/{stateKey}')
  async setRoomStateWithKey(
    @Param('roomId') roomId: string,
    @Param('eventType') eventType: string,
    @Param('stateKey') stateKey: string,
    @Body({ required: true })
    body: any
  ): Promise<Tx.SetRoomStateWithKeyResponse | any> {}

  @Put('/_matrix/client/r0/rooms/{roomId}/typing/{userId}')
  async setTyping(
    @Param('userId') userId: string,
    @Param('roomId') roomId: string,
    @Body({ required: true })
    body: Tx.SetTypingBody
  ): Promise<Tx.SetTypingResponse429 | any> {}

  @Post('/_matrix/client/r0/rooms/{roomId}/unban')
  async unban(
    @Param('roomId') roomId: string,
    @Body({ required: true })
    body: Tx.UnbanBody
  ): Promise<any> {}

  @Post('/_matrix/client/r0/search')
  async search(
    @QueryParam('next_batch', { required: true })
    nextBatch: string,
    @Body({ required: true })
    body: Tx.SearchBody
  ): Promise<Tx.ResultsResponse | Tx.SearchResponse429 | any> {}

  @Put('/_matrix/client/r0/sendToDevice/{eventType}/{txnId}')
  async sendToDevice(
    @Param('eventType') eventType: string,
    @Param('txnId') txnId: string,
    @Body({ required: true })
    body: Tx.SendToDeviceBody
  ): Promise<any> {}

  @Get('/_matrix/client/r0/sync')
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
  ): Promise<Tx.SyncResponse | any> {}

  @Put('/_matrix/client/r0/user/{userId}/account_data/{type}')
  async setAccountData(
    @Param('userId') userId: string,
    @Param('type') type: string,
    @Body({ required: true })
    body: any
  ): Promise<any> {}

  @Post('/_matrix/client/r0/user/{userId}/filter')
  async defineFilter(
    @Param('userId') userId: string,
    @Body({ required: true })
    body: Tx.DefineFilterBody
  ): Promise<Tx.DefineFilterResponse | any> {}

  @Get('/_matrix/client/r0/user/{userId}/filter/{filterId}')
  async getFilter(
    @Param('userId') userId: string,
    @Param('filterId') filterId: string
  ): Promise<Tx.GetFilterResponse | any> {}

  @Put('/_matrix/client/r0/user/{userId}/rooms/{roomId}/account_data/{type}')
  async setAccountDataPerRoom(
    @Param('userId') userId: string,
    @Param('roomId') roomId: string,
    @Param('type') type: string,
    @Body({ required: true })
    body: any
  ): Promise<any> {}

  @Get('/_matrix/client/r0/user/{userId}/rooms/{roomId}/tags')
  async getRoomTags(
    @Param('userId') userId: string,
    @Param('roomId') roomId: string
  ): Promise<Tx.GetRoomTagsResponse | any> {}

  @Put('/_matrix/client/r0/user/{userId}/rooms/{roomId}/tags/{tag}')
  async setRoomTag(
    @Param('userId') userId: string,
    @Param('roomId') roomId: string,
    @Param('tag') tag: string,
    @Body({ required: true })
    body: any
  ): Promise<any> {}

  @Delete('/_matrix/client/r0/user/{userId}/rooms/{roomId}/tags/{tag}')
  async deleteRoomTag(
    @Param('userId') userId: string,
    @Param('roomId') roomId: string,
    @Param('tag') tag: string
  ): Promise<any> {}

  @Post('/_matrix/client/r0/user_directory/search')
  async searchUserDirectory(
    @Body({ required: true })
    body: Tx.SearchUserDirectoryBody
  ): Promise<
    Tx.SearchUserDirectoryResponse | Tx.SearchUserDirectoryResponse429 | any
  > {}

  @Get('/_matrix/client/r0/voip/turnServer')
  async getTurnServer(): Promise<
    Tx.GetTurnServerResponse | Tx.GetTurnServerResponse429 | any
  > {}

  @Get('/_matrix/client/versions')
  async getVersions(): Promise<Tx.GetVersionsResponse | any> {}

  @Get('/_matrix/media/r0/download/{serverName}/{mediaId}')
  async getContent(
    @Param('serverName') serverName: string,
    @Param('mediaId') mediaId: string
  ): Promise<Tx.GetContentResponse429 | any> {}

  @Get('/_matrix/media/r0/download/{serverName}/{mediaId}/{fileName}')
  async getContentOverrideName(
    @Param('serverName') serverName: string,
    @Param('mediaId') mediaId: string,
    @Param('fileName') fileName: string
  ): Promise<Tx.GetContentOverrideNameResponse429 | any> {}

  @Get('/_matrix/media/r0/preview_url')
  async getUrlPreview(
    @QueryParam('url', { required: true })
    url: string,
    @QueryParam('ts', { required: true })
    ts: number
  ): Promise<Tx.GetUrlPreviewResponse | Tx.GetUrlPreviewResponse429 | any> {}

  @Get('/_matrix/media/r0/thumbnail/{serverName}/{mediaId}')
  async getContentThumbnail(
    @Param('serverName') serverName: string,
    @Param('mediaId') mediaId: string,
    @QueryParam('width', { required: true })
    width: number,
    @QueryParam('height', { required: true })
    height: number,
    @QueryParam('method', { required: true })
    method: string
  ): Promise<Tx.GetContentThumbnailResponse429 | any> {}

  @Post('/_matrix/media/r0/upload')
  async uploadContent(
    @HeaderParam('Content-Type', { required: true })
    contentType: string,
    @QueryParam('filename', { required: true })
    filename: string,
    @Body({ required: true })
    body: string
  ): Promise<Tx.UploadContentResponse | Tx.UploadContentResponse429 | any> {}
}
