require('isomorphic-fetch');
require('isomorphic-form-data');

import { Get, Put, Delete, Post, QueryParam } from 'pretend';

import * as dto from './types';

function Body(options?: any): Function {
  return () => {};
}
function Param(options?: any): Function {
  return () => {};
}
function HeaderParam(name: string, options?: any): Function {
  return () => {};
}

export class MatrixClient {
  @Get('/_matrix/client/r0/account/3pid')
  async getAccount3PIDs(): Promise<dto.GetAccount3PIDsResponse | any> {}

  @Post('/_matrix/client/r0/account/3pid')
  async post3PIDs(
    @Body({ required: true })
    body: dto.Post3PIDsBody
  ): Promise<any> {}

  @Post('/_matrix/client/r0/account/deactivate')
  async deactivateAccount(
    @Body({ required: true })
    body: dto.DeactivateAccountBody
  ): Promise<
    dto.AuthenticationResponse | dto.DeactivateAccountResponse429 | any
  > {}

  @Post('/_matrix/client/r0/account/password')
  async changePassword(
    @Body({ required: true })
    body: dto.ChangePasswordBody
  ): Promise<
    dto.AuthenticationResponse | dto.ChangePasswordResponse429 | any
  > {}

  @Get('/_matrix/client/r0/account/whoami')
  async getTokenOwner(): Promise<
    | dto.GetTokenOwnerResponse
    | dto.GetTokenOwnerResponse401
    | dto.GetTokenOwnerResponse403
    | dto.GetTokenOwnerResponse429
    | any
  > {}

  @Get('/_matrix/client/r0/admin/whois/{userId}')
  async getWhoIs(
    @Param('userId') userId: string
  ): Promise<dto.GetWhoIsResponse | any> {}

  @Post('/_matrix/client/r0/createRoom')
  async createRoom(
    @Body({ required: true })
    body: dto.CreateRoomBody
  ): Promise<dto.CreateRoomResponse | any> {}

  @Post('/_matrix/client/r0/delete_devices')
  async deleteDevices(
    @Body({ required: true })
    body: dto.DeleteDevicesBody
  ): Promise<dto.AuthenticationResponse | any> {}

  @Get('/_matrix/client/r0/devices')
  async getDevices(): Promise<dto.GetDevicesResponse | any> {}

  @Get('/_matrix/client/r0/devices/{deviceId}')
  async getDevice(
    @Param('deviceId') deviceId: string
  ): Promise<dto.DeviceResponse | any> {}

  @Put('/_matrix/client/r0/devices/{deviceId}')
  async updateDevice(
    @Param('deviceId') deviceId: string,
    @Body({ required: true })
    body: dto.UpdateDeviceBody
  ): Promise<any> {}

  @Delete('/_matrix/client/r0/devices/{deviceId}')
  async deleteDevice(
    @Param('deviceId') deviceId: string,
    @Body({ required: true })
    body: dto.DeleteDeviceBody
  ): Promise<dto.AuthenticationResponse | any> {}

  @Get('/_matrix/client/r0/directory/room/{roomAlias}')
  async getRoomIdByAlias(
    @Param('roomAlias') roomAlias: string
  ): Promise<dto.GetRoomIdByAliasResponse | any> {}

  @Put('/_matrix/client/r0/directory/room/{roomAlias}')
  async setRoomAlias(
    @Param('roomAlias') roomAlias: string,
    @Body({ required: true })
    body: dto.SetRoomAliasBody
  ): Promise<any> {}

  @Delete('/_matrix/client/r0/directory/room/{roomAlias}')
  async deleteRoomAlias(@Param('roomAlias') roomAlias: string): Promise<any> {}

  @Get('/_matrix/client/r0/events')
  async getEvents(
    @QueryParam('from') from: string,
    @QueryParam('timeout') timeout: number
  ): Promise<dto.GetEventsResponse | any> {}

  @Get('/_matrix/client/r0/events/{eventId}')
  async getOneEvent(
    @Param('eventId') eventId: string
  ): Promise<dto.EventResponse | any> {}

  @Get('/_matrix/client/r0/initialSync')
  async initialSync(
    @QueryParam('limit') limit: number,
    @QueryParam('archived') archived: boolean
  ): Promise<dto.InitialSyncResponse | any> {}

  @Post('/_matrix/client/r0/join/{roomIdOrAlias}')
  async joinRoom(
    @Param('roomIdOrAlias') roomIdOrAlias: string,
    @Body({ required: true })
    body: dto.JoinRoomBody
  ): Promise<dto.JoinRoomResponse429 | any> {}

  @Get('/_matrix/client/r0/joined_rooms')
  async getJoinedRooms(): Promise<dto.GetJoinedRoomsResponse | any> {}

  @Get('/_matrix/client/r0/keys/changes')
  async getKeysChanges(
    @QueryParam('from', { required: true })
    from: string,
    @QueryParam('to', { required: true })
    to: string
  ): Promise<dto.GetKeysChangesResponse | any> {}

  @Post('/_matrix/client/r0/keys/claim')
  async claimKeys(
    @Body({ required: true })
    body: dto.ClaimKeysBody
  ): Promise<dto.ClaimKeysResponse | any> {}

  @Post('/_matrix/client/r0/keys/query')
  async queryKeys(
    @Body({ required: true })
    body: dto.QueryKeysBody
  ): Promise<dto.QueryKeysResponse | any> {}

  @Post('/_matrix/client/r0/keys/upload')
  async uploadKeys(
    @Body({ required: true })
    body: dto.UploadKeysBody
  ): Promise<dto.UploadKeysResponse | any> {}

  @Post('/_matrix/client/r0/login')
  async login(
    @Body({ required: true })
    body: dto.LoginBody
  ): Promise<dto.LoginResponse | dto.LoginResponse429 | any> {}

  @Post('/_matrix/client/r0/logout')
  async logout(): Promise<any> {}

  @Get('/_matrix/client/r0/notifications')
  async getNotifications(
    @QueryParam('from') from: string,
    @QueryParam('limit') limit: number,
    @QueryParam('only') only: string
  ): Promise<dto.GetNotificationsResponse | any> {}

  @Get('/_matrix/client/r0/presence/list/{userId}')
  async getPresenceForList(
    @Param('userId') userId: string
  ): Promise<dto.PresenceEventResponse[] | any> {}

  @Post('/_matrix/client/r0/presence/list/{userId}')
  async modifyPresenceList(
    @Param('userId') userId: string,
    @Body({ required: true })
    body: dto.ModifyPresenceListBody
  ): Promise<dto.ModifyPresenceListResponse429 | any> {}

  @Get('/_matrix/client/r0/presence/{userId}/status')
  async getPresence(
    @Param('userId') userId: string
  ): Promise<dto.GetPresenceResponse | any> {}

  @Put('/_matrix/client/r0/presence/{userId}/status')
  async setPresence(
    @Param('userId') userId: string,
    @Body({ required: true })
    body: dto.SetPresenceBody
  ): Promise<dto.SetPresenceResponse429 | any> {}

  @Get('/_matrix/client/r0/profile/{userId}')
  async getUserProfile(
    @Param('userId') userId: string
  ): Promise<dto.GetUserProfileResponse | any> {}

  @Get('/_matrix/client/r0/profile/{userId}/avatar_url')
  async getAvatarUrl(
    @Param('userId') userId: string
  ): Promise<dto.GetAvatarUrlResponse | any> {}

  @Put('/_matrix/client/r0/profile/{userId}/avatar_url')
  async setAvatarUrl(
    @Param('userId') userId: string,
    @Body({ required: true })
    body: dto.SetAvatarUrlBody
  ): Promise<dto.SetAvatarUrlResponse429 | any> {}

  @Get('/_matrix/client/r0/profile/{userId}/displayname')
  async getDisplayName(
    @Param('userId') userId: string
  ): Promise<dto.GetDisplayNameResponse | any> {}

  @Put('/_matrix/client/r0/profile/{userId}/displayname')
  async setDisplayName(
    @Param('userId') userId: string,
    @Body({ required: true })
    body: dto.SetDisplayNameBody
  ): Promise<dto.SetDisplayNameResponse429 | any> {}

  @Get('/_matrix/client/r0/publicRooms')
  async getPublicRooms(
    @QueryParam('limit', { required: true })
    limit: number,
    @QueryParam('since', { required: true })
    since: string,
    @QueryParam('server', { required: true })
    server: string
  ): Promise<dto.GetPublicRoomsResponse | any> {}

  @Post('/_matrix/client/r0/publicRooms')
  async queryPublicRooms(
    @QueryParam('server', { required: true })
    server: string,
    @Body({ required: true })
    body: dto.QueryPublicRoomsBody
  ): Promise<dto.QueryPublicRoomsResponse | any> {}

  @Get('/_matrix/client/r0/pushers')
  async getPushers(): Promise<dto.GetPushersResponse | any> {}

  @Post('/_matrix/client/r0/pushers/set')
  async postPusher(
    @Body({ required: true })
    body: dto.PostPusherBody
  ): Promise<dto.PostPusherResponse429 | any> {}

  @Get('/_matrix/client/r0/pushrules/')
  async getPushRules(): Promise<dto.GetPushRulesResponse | any> {}

  @Get('/_matrix/client/r0/pushrules/{scope}/{kind}/{ruleId}')
  async getPushRule(
    @Param('scope') scope: string,
    @Param('kind') kind: string,
    @Param('ruleId') ruleId: string
  ): Promise<dto.PushRuleResponse | any> {}

  @Put('/_matrix/client/r0/pushrules/{scope}/{kind}/{ruleId}')
  async setPushRule(
    @Param('scope') scope: string,
    @Param('kind') kind: string,
    @Param('ruleId') ruleId: string,
    @QueryParam('before') before: string,
    @QueryParam('after') after: string,
    @Body({ required: true })
    body: dto.SetPushRuleBody
  ): Promise<dto.SetPushRuleResponse429 | any> {}

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
    body: dto.SetPushRuleActionsBody
  ): Promise<any> {}

  @Put('/_matrix/client/r0/pushrules/{scope}/{kind}/{ruleId}/enabled')
  async setPushRuleEnabled(
    @Param('scope') scope: string,
    @Param('kind') kind: string,
    @Param('ruleId') ruleId: string,
    @Body({ required: true })
    body: dto.SetPushRuleEnabledBody
  ): Promise<any> {}

  @Post('/_matrix/client/r0/register', true)
  async register(
    @QueryParam('kind') kind: string,
    @Body({ required: true })
    body: dto.RegisterBody
  ): Promise<
    | dto.RegisterResponse
    | dto.AuthenticationResponse
    | dto.RegisterResponse429
    | any
  > {}

  @Get('/_matrix/client/r0/register/available')
  async checkUsernameAvailability(
    @QueryParam('username', { required: true })
    username: string
  ): Promise<
    | dto.CheckUsernameAvailabilityResponse
    | dto.CheckUsernameAvailabilityResponse429
    | any
  > {}

  @Post('/_matrix/client/r0/rooms/{roomId}/ban')
  async ban(
    @Param('roomId') roomId: string,
    @Body({ required: true })
    body: dto.BanBody
  ): Promise<any> {}

  @Get('/_matrix/client/r0/rooms/{roomId}/context/{eventId}')
  async getEventContext(
    @Param('roomId') roomId: string,
    @Param('eventId') eventId: string,
    @QueryParam('limit', { required: true })
    limit: number
  ): Promise<dto.GetEventContextResponse | any> {}

  @Get('/_matrix/client/r0/rooms/{roomId}/event/{eventId}')
  async getOneRoomEvent(
    @Param('roomId') roomId: string,
    @Param('eventId') eventId: string
  ): Promise<dto.EventResponse | any> {}

  @Post('/_matrix/client/r0/rooms/{roomId}/forget')
  async forgetRoom(
    @Param('roomId') roomId: string
  ): Promise<dto.ForgetRoomResponse429 | any> {}

  @Get('/_matrix/client/r0/rooms/{roomId}/initialSync')
  async roomInitialSync(
    @Param('roomId') roomId: string
  ): Promise<dto.RoomInfoResponse | any> {}

  @Post('/_matrix/client/r0/rooms/{roomId}/invite')
  async inviteBy3PID(
    @Param('roomId') roomId: string,
    @Body({ required: true })
    body: dto.InviteBy3PIDBody
  ): Promise<dto.InviteBy3PIDResponse429 | any> {}

  @Post('/_matrix/client/r0/rooms/{roomId}/invite ')
  async inviteUser(
    @Param('roomId') roomId: string,
    @Body({ required: true })
    body: dto.InviteUserBody
  ): Promise<dto.InviteUserResponse429 | any> {}

  @Post('/_matrix/client/r0/rooms/{roomId}/join')
  async joinRoomById(
    @Param('roomId') roomId: string,
    @Body({ required: true })
    body: dto.JoinRoomByIdBody
  ): Promise<dto.JoinRoomByIdResponse429 | any> {}

  @Get('/_matrix/client/r0/rooms/{roomId}/joined_members')
  async getJoinedMembersByRoom(
    @Param('roomId') roomId: string
  ): Promise<dto.GetJoinedMembersByRoomResponse | any> {}

  @Post('/_matrix/client/r0/rooms/{roomId}/kick')
  async kick(
    @Param('roomId') roomId: string,
    @Body({ required: true })
    body: dto.KickBody
  ): Promise<any> {}

  @Post('/_matrix/client/r0/rooms/{roomId}/leave')
  async leaveRoom(
    @Param('roomId') roomId: string
  ): Promise<dto.LeaveRoomResponse429 | any> {}

  @Get('/_matrix/client/r0/rooms/{roomId}/members')
  async getMembersByRoom(
    @Param('roomId') roomId: string
  ): Promise<dto.GetMembersByRoomResponse | any> {}

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
  ): Promise<dto.GetRoomEventsResponse | any> {}

  @Post('/_matrix/client/r0/rooms/{roomId}/receipt/{receiptType}/{eventId}')
  async postReceipt(
    @Param('roomId') roomId: string,
    @Param('receiptType') receiptType: string,
    @Param('eventId') eventId: string,
    @Body({ required: true })
    body: any
  ): Promise<dto.PostReceiptResponse429 | any> {}

  @Put('/_matrix/client/r0/rooms/{roomId}/redact/{eventId}/{txnId}')
  async redactEvent(
    @Param('roomId') roomId: string,
    @Param('eventId') eventId: string,
    @Param('txnId') txnId: string,
    @Body({ required: true })
    body: dto.RedactEventBody
  ): Promise<dto.RedactEventResponse | any> {}

  @Put('/_matrix/client/r0/rooms/{roomId}/send/{eventType}/{txnId}')
  async sendMessage(
    @Param('roomId') roomId: string,
    @Param('eventType') eventType: string,
    @Param('txnId') txnId: string,
    @Body({ required: true })
    body: any
  ): Promise<dto.SendMessageResponse | any> {}

  @Get('/_matrix/client/r0/rooms/{roomId}/state')
  async getRoomState(
    @Param('roomId') roomId: string
  ): Promise<dto.StateEventResponse[] | any> {}

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
  ): Promise<dto.SetRoomStateResponse | any> {}

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
  ): Promise<dto.SetRoomStateWithKeyResponse | any> {}

  @Put('/_matrix/client/r0/rooms/{roomId}/typing/{userId}')
  async setTyping(
    @Param('userId') userId: string,
    @Param('roomId') roomId: string,
    @Body({ required: true })
    body: dto.SetTypingBody
  ): Promise<dto.SetTypingResponse429 | any> {}

  @Post('/_matrix/client/r0/rooms/{roomId}/unban')
  async unban(
    @Param('roomId') roomId: string,
    @Body({ required: true })
    body: dto.UnbanBody
  ): Promise<any> {}

  @Post('/_matrix/client/r0/search')
  async search(
    @QueryParam('next_batch', { required: true })
    nextBatch: string,
    @Body({ required: true })
    body: dto.SearchBody
  ): Promise<dto.ResultsResponse | dto.SearchResponse429 | any> {}

  @Put('/_matrix/client/r0/sendToDevice/{eventType}/{txnId}')
  async sendToDevice(
    @Param('eventType') eventType: string,
    @Param('txnId') txnId: string,
    @Body({ required: true })
    body: dto.SendToDeviceBody
  ): Promise<any> {}

  @Get('/_matrix/client/r0/sync', true)
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
  ): Promise<dto.SyncResponse | any> {}

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
    body: dto.DefineFilterBody
  ): Promise<dto.DefineFilterResponse | any> {}

  @Get('/_matrix/client/r0/user/{userId}/filter/{filterId}')
  async getFilter(
    @Param('userId') userId: string,
    @Param('filterId') filterId: string
  ): Promise<dto.GetFilterResponse | any> {}

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
  ): Promise<dto.GetRoomTagsResponse | any> {}

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
    body: dto.SearchUserDirectoryBody
  ): Promise<
    dto.SearchUserDirectoryResponse | dto.SearchUserDirectoryResponse429 | any
  > {}

  @Get('/_matrix/client/r0/voip/turnServer')
  async getTurnServer(): Promise<
    dto.GetTurnServerResponse | dto.GetTurnServerResponse429 | any
  > {}

  @Get('/_matrix/client/versions')
  async getVersions(): Promise<dto.GetVersionsResponse | any> {}

  @Get('/_matrix/media/r0/download/{serverName}/{mediaId}')
  async getContent(
    @Param('serverName') serverName: string,
    @Param('mediaId') mediaId: string
  ): Promise<dto.GetContentResponse429 | any> {}

  @Get('/_matrix/media/r0/download/{serverName}/{mediaId}/{fileName}')
  async getContentOverrideName(
    @Param('serverName') serverName: string,
    @Param('mediaId') mediaId: string,
    @Param('fileName') fileName: string
  ): Promise<dto.GetContentOverrideNameResponse429 | any> {}

  @Get('/_matrix/media/r0/preview_url')
  async getUrlPreview(
    @QueryParam('url', { required: true })
    url: string,
    @QueryParam('ts', { required: true })
    ts: number
  ): Promise<dto.GetUrlPreviewResponse | dto.GetUrlPreviewResponse429 | any> {}

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
  ): Promise<dto.GetContentThumbnailResponse429 | any> {}

  @Post('/_matrix/media/r0/upload')
  async uploadContent(
    @HeaderParam('Content-Type', { required: true })
    contentType: string,
    @QueryParam('filename', { required: true })
    filename: string,
    @Body({ required: true })
    body: string
  ): Promise<dto.UploadContentResponse | dto.UploadContentResponse429 | any> {}
}
