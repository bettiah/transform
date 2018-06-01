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

@JsonController('/_matrix/client/r0')
export class MatrixController {
  @Get('/account/3pid')
  async getAccount3PIDs() {
    throw new HttpError(501);
  }
  @Post('/account/3pid')
  async post3PIDs(@Body() body?: Post3PIDsBody) {
    throw new HttpError(501);
  }
  @Post('/account/deactivate')
  async deactivateAccount(@Body() body?: DeactivateAccountBody) {
    throw new HttpError(501);
  }
  @Post('/account/password')
  async changePassword(@Body() body?: ChangePasswordBody) {
    throw new HttpError(501);
  }
  @Get('/account/whoami')
  async getTokenOwner() {
    throw new HttpError(501);
  }
  @Get('/admin/whois/{userId}')
  async getWhoIs(@Param('userId') userId: string) {
    throw new HttpError(501);
  }
  @Post('/createRoom')
  async createRoom(@Body() body?: CreateRoomBody) {
    throw new HttpError(501);
  }
  @Post('/delete_devices')
  async deleteDevices(@Body() body?: DeleteDevicesBody) {
    throw new HttpError(501);
  }
  @Get('/devices')
  async getDevices() {
    throw new HttpError(501);
  }
  @Get('/devices/{deviceId}')
  async getDevice(@Param('deviceId') deviceId: string) {
    throw new HttpError(501);
  }
  @Put('/devices/{deviceId}')
  async updateDevice(
    @Param('deviceId') deviceId: string,
    @Body() body: UpdateDeviceBody
  ) {
    throw new HttpError(501);
  }
  @Delete('/devices/{deviceId}')
  async deleteDevice(
    @Param('deviceId') deviceId: string,
    @Body() body?: DeleteDeviceBody
  ) {
    throw new HttpError(501);
  }
  @Get('/directory/room/{roomAlias}')
  async getRoomIdByAlias(@Param('roomAlias') roomAlias: string) {
    throw new HttpError(501);
  }
  @Put('/directory/room/{roomAlias}')
  async setRoomAlias(
    @Param('roomAlias') roomAlias: string,
    @Body() body: SetRoomAliasBody
  ) {
    throw new HttpError(501);
  }
  @Delete('/directory/room/{roomAlias}')
  async deleteRoomAlias(@Param('roomAlias') roomAlias: string) {
    throw new HttpError(501);
  }
  @Get('/events')
  async getEvents(
    @Param('from') from?: string,
    @Param('timeout') timeout?: number
  ) {
    throw new HttpError(501);
  }
  @Get('/events/{eventId}')
  async getOneEvent(@Param('eventId') eventId: string) {
    throw new HttpError(501);
  }
  @Get('/initialSync')
  async initialSync(
    @Param('limit') limit?: number,
    @Param('archived') archived?: boolean
  ) {
    throw new HttpError(501);
  }
  @Post('/join/{roomIdOrAlias}')
  async joinRoom(
    @Param('roomIdOrAlias') roomIdOrAlias: string,
    @Body() body?: JoinRoomBody
  ) {
    throw new HttpError(501);
  }
  @Get('/joined_rooms')
  async getJoinedRooms() {
    throw new HttpError(501);
  }
  @Get('/keys/changes')
  async getKeysChanges(@Param('from') from: string, @Param('to') to: string) {
    throw new HttpError(501);
  }
  @Post('/keys/claim')
  async claimKeys(@Body() body?: ClaimKeysBody) {
    throw new HttpError(501);
  }
  @Post('/keys/query')
  async queryKeys(@Body() body?: QueryKeysBody) {
    throw new HttpError(501);
  }
  @Post('/keys/upload')
  async uploadKeys(@Body() body?: UploadKeysBody) {
    throw new HttpError(501);
  }
  @Post('/login')
  async login(@Body() body?: LoginBody) {
    throw new HttpError(501);
  }
  @Post('/logout')
  async logout() {
    throw new HttpError(501);
  }
  @Get('/notifications')
  async getNotifications(
    @Param('from') from?: string,
    @Param('limit') limit?: number,
    @Param('only') only?: string
  ) {
    throw new HttpError(501);
  }
  @Get('/presence/list/{userId}')
  async getPresenceForList(@Param('userId') userId: string) {
    throw new HttpError(501);
  }
  @Post('/presence/list/{userId}')
  async modifyPresenceList(
    @Param('userId') userId: string,
    @Body() body: ModifyPresenceListBody
  ) {
    throw new HttpError(501);
  }
  @Get('/presence/{userId}/status')
  async getPresence(@Param('userId') userId: string) {
    throw new HttpError(501);
  }
  @Put('/presence/{userId}/status')
  async setPresence(
    @Param('userId') userId: string,
    @Body() body: SetPresenceBody
  ) {
    throw new HttpError(501);
  }
  @Get('/profile/{userId}')
  async getUserProfile(@Param('userId') userId: string) {
    throw new HttpError(501);
  }
  @Get('/profile/{userId}/avatar_url')
  async getAvatarUrl(@Param('userId') userId: string) {
    throw new HttpError(501);
  }
  @Put('/profile/{userId}/avatar_url')
  async setAvatarUrl(
    @Param('userId') userId: string,
    @Body() body: SetAvatarUrlBody
  ) {
    throw new HttpError(501);
  }
  @Get('/profile/{userId}/displayname')
  async getDisplayName(@Param('userId') userId: string) {
    throw new HttpError(501);
  }
  @Put('/profile/{userId}/displayname')
  async setDisplayName(
    @Param('userId') userId: string,
    @Body() body: SetDisplayNameBody
  ) {
    throw new HttpError(501);
  }
  @Get('/publicRooms')
  async getPublicRooms(
    @Param('limit') limit?: number,
    @Param('since') since?: string,
    @Param('server') server?: string
  ) {
    throw new HttpError(501);
  }
  @Post('/publicRooms')
  async queryPublicRooms(
    @Param('server') server?: string,
    @Body() body: QueryPublicRoomsBody
  ) {
    throw new HttpError(501);
  }
  @Get('/pushers')
  async getPushers() {
    throw new HttpError(501);
  }
  @Post('/pushers/set')
  async postPusher(@Body() body: PostPusherBody) {
    throw new HttpError(501);
  }
  @Get('/pushrules/')
  async getPushRules() {
    throw new HttpError(501);
  }
  @Get('/pushrules/{scope}/{kind}/{ruleId}')
  async getPushRule(
    @Param('scope') scope: string,
    @Param('kind') kind: string,
    @Param('ruleId') ruleId: string
  ) {
    throw new HttpError(501);
  }
  @Put('/pushrules/{scope}/{kind}/{ruleId}')
  async setPushRule(
    @Param('scope') scope: string,
    @Param('kind') kind: string,
    @Param('ruleId') ruleId: string,
    @Param('before') before?: string,
    @Param('after') after?: string,
    @Body() body: SetPushRuleBody
  ) {
    throw new HttpError(501);
  }
  @Delete('/pushrules/{scope}/{kind}/{ruleId}')
  async deletePushRule(
    @Param('scope') scope: string,
    @Param('kind') kind: string,
    @Param('ruleId') ruleId: string
  ) {
    throw new HttpError(501);
  }
  @Put('/pushrules/{scope}/{kind}/{ruleId}/actions')
  async setPushRuleActions(
    @Param('scope') scope: string,
    @Param('kind') kind: string,
    @Param('ruleId') ruleId: string,
    @Body() body: SetPushRuleActionsBody
  ) {
    throw new HttpError(501);
  }
  @Put('/pushrules/{scope}/{kind}/{ruleId}/enabled')
  async setPushRuleEnabled(
    @Param('scope') scope: string,
    @Param('kind') kind: string,
    @Param('ruleId') ruleId: string,
    @Body() body: SetPushRuleEnabledBody
  ) {
    throw new HttpError(501);
  }
  @Post('/register')
  async register(@Param('kind') kind?: string, @Body() body?: RegisterBody) {
    throw new HttpError(501);
  }
  @Get('/register/available')
  async checkUsernameAvailability(@Param('username') username: string) {
    throw new HttpError(501);
  }
  @Post('/rooms/{roomId}/ban')
  async ban(@Param('roomId') roomId: string, @Body() body: BanBody) {
    throw new HttpError(501);
  }
  @Get('/rooms/{roomId}/context/{eventId}')
  async getEventContext(
    @Param('roomId') roomId: string,
    @Param('eventId') eventId: string,
    @Param('limit') limit?: number
  ) {
    throw new HttpError(501);
  }
  @Get('/rooms/{roomId}/event/{eventId}')
  async getOneRoomEvent(
    @Param('roomId') roomId: string,
    @Param('eventId') eventId: string
  ) {
    throw new HttpError(501);
  }
  @Post('/rooms/{roomId}/forget')
  async forgetRoom(@Param('roomId') roomId: string) {
    throw new HttpError(501);
  }
  @Get('/rooms/{roomId}/initialSync')
  async roomInitialSync(@Param('roomId') roomId: string) {
    throw new HttpError(501);
  }
  @Post('/rooms/{roomId}/invite')
  async inviteBy3PID(
    @Param('roomId') roomId: string,
    @Body() body: InviteBy3PIDBody
  ) {
    throw new HttpError(501);
  }
  @Post('/rooms/{roomId}/invite ')
  async inviteUser(
    @Param('roomId') roomId: string,
    @Body() body: InviteUserBody
  ) {
    throw new HttpError(501);
  }
  @Post('/rooms/{roomId}/join')
  async joinRoomById(
    @Param('roomId') roomId: string,
    @Body() body?: JoinRoomByIdBody
  ) {
    throw new HttpError(501);
  }
  @Get('/rooms/{roomId}/joined_members')
  async getJoinedMembersByRoom(@Param('roomId') roomId: string) {
    throw new HttpError(501);
  }
  @Post('/rooms/{roomId}/kick')
  async kick(@Param('roomId') roomId: string, @Body() body: KickBody) {
    throw new HttpError(501);
  }
  @Post('/rooms/{roomId}/leave')
  async leaveRoom(@Param('roomId') roomId: string) {
    throw new HttpError(501);
  }
  @Get('/rooms/{roomId}/members')
  async getMembersByRoom(@Param('roomId') roomId: string) {
    throw new HttpError(501);
  }
  @Get('/rooms/{roomId}/messages')
  async getRoomEvents(
    @Param('roomId') roomId: string,
    @Param('from') from: string,
    @Param('to') to?: string,
    @Param('dir') dir: string,
    @Param('limit') limit?: number,
    @Param('filter') filter?: string
  ) {
    throw new HttpError(501);
  }
  @Post('/rooms/{roomId}/receipt/{receiptType}/{eventId}')
  async postReceipt(
    @Param('roomId') roomId: string,
    @Param('receiptType') receiptType: string,
    @Param('eventId') eventId: string,
    @Body() body?: any
  ) {
    throw new HttpError(501);
  }
  @Put('/rooms/{roomId}/redact/{eventId}/{txnId}')
  async redactEvent(
    @Param('roomId') roomId: string,
    @Param('eventId') eventId: string,
    @Param('txnId') txnId: string,
    @Body() body?: RedactEventBody
  ) {
    throw new HttpError(501);
  }
  @Put('/rooms/{roomId}/send/{eventType}/{txnId}')
  async sendMessage(
    @Param('roomId') roomId: string,
    @Param('eventType') eventType: string,
    @Param('txnId') txnId: string,
    @Body() body?: any
  ) {
    throw new HttpError(501);
  }
  @Get('/rooms/{roomId}/state')
  async getRoomState(@Param('roomId') roomId: string) {
    throw new HttpError(501);
  }
  @Get('/rooms/{roomId}/state/{eventType}')
  async getRoomStateByType(
    @Param('roomId') roomId: string,
    @Param('eventType') eventType: string
  ) {
    throw new HttpError(501);
  }
  @Put('/rooms/{roomId}/state/{eventType}')
  async setRoomState(
    @Param('roomId') roomId: string,
    @Param('eventType') eventType: string,
    @Body() body?: any
  ) {
    throw new HttpError(501);
  }
  @Get('/rooms/{roomId}/state/{eventType}/{stateKey}')
  async getRoomStateWithKey(
    @Param('roomId') roomId: string,
    @Param('eventType') eventType: string,
    @Param('stateKey') stateKey: string
  ) {
    throw new HttpError(501);
  }
  @Put('/rooms/{roomId}/state/{eventType}/{stateKey}')
  async setRoomStateWithKey(
    @Param('roomId') roomId: string,
    @Param('eventType') eventType: string,
    @Param('stateKey') stateKey: string,
    @Body() body?: any
  ) {
    throw new HttpError(501);
  }
  @Put('/rooms/{roomId}/typing/{userId}')
  async setTyping(
    @Param('userId') userId: string,
    @Param('roomId') roomId: string,
    @Body() body: SetTypingBody
  ) {
    throw new HttpError(501);
  }
  @Post('/rooms/{roomId}/unban')
  async unban(@Param('roomId') roomId: string, @Body() body: UnbanBody) {
    throw new HttpError(501);
  }
  @Post('/search')
  async search(
    @Param('next_batch') nextBatch?: string,
    @Body() body?: SearchBody
  ) {
    throw new HttpError(501);
  }
  @Put('/sendToDevice/{eventType}/{txnId}')
  async sendToDevice(
    @Param('eventType') eventType: string,
    @Param('txnId') txnId: string,
    @Body() body: SendToDeviceBody
  ) {
    throw new HttpError(501);
  }
  @Get('/sync')
  async sync(
    @Param('filter') filter?: string,
    @Param('since') since?: string,
    @Param('full_state') fullState?: boolean,
    @Param('set_presence') setPresence?: string,
    @Param('timeout') timeout?: number
  ) {
    throw new HttpError(501);
  }
  @Put('/user/{userId}/account_data/{type}')
  async setAccountData(
    @Param('userId') userId: string,
    @Param('type') type: string,
    @Body() body: any
  ) {
    throw new HttpError(501);
  }
  @Post('/user/{userId}/filter')
  async defineFilter(
    @Param('userId') userId: string,
    @Body() body: DefineFilterBody
  ) {
    throw new HttpError(501);
  }
  @Get('/user/{userId}/filter/{filterId}')
  async getFilter(
    @Param('userId') userId: string,
    @Param('filterId') filterId: string
  ) {
    throw new HttpError(501);
  }
  @Put('/user/{userId}/rooms/{roomId}/account_data/{type}')
  async setAccountDataPerRoom(
    @Param('userId') userId: string,
    @Param('roomId') roomId: string,
    @Param('type') type: string,
    @Body() body: any
  ) {
    throw new HttpError(501);
  }
  @Get('/user/{userId}/rooms/{roomId}/tags')
  async getRoomTags(
    @Param('userId') userId: string,
    @Param('roomId') roomId: string
  ) {
    throw new HttpError(501);
  }
  @Put('/user/{userId}/rooms/{roomId}/tags/{tag}')
  async setRoomTag(
    @Param('userId') userId: string,
    @Param('roomId') roomId: string,
    @Param('tag') tag: string,
    @Body() body: any
  ) {
    throw new HttpError(501);
  }
  @Delete('/user/{userId}/rooms/{roomId}/tags/{tag}')
  async deleteRoomTag(
    @Param('userId') userId: string,
    @Param('roomId') roomId: string,
    @Param('tag') tag: string
  ) {
    throw new HttpError(501);
  }
  @Post('/user_directory/search')
  async searchUserDirectory(@Body() body?: SearchUserDirectoryBody) {
    throw new HttpError(501);
  }
  @Get('/voip/turnServer')
  async getTurnServer() {
    throw new HttpError(501);
  }
}

@JsonController('/_matrix/media/r0')
export class MatrixMediaController {
  @Get('/download/{serverName}/{mediaId}')
  async getContent(
    @Param('serverName') serverName: string,
    @Param('mediaId') mediaId: string
  ) {
    throw new HttpError(501);
  }
  @Get('/download/{serverName}/{mediaId}/{fileName}')
  async getContentOverrideName(
    @Param('serverName') serverName: string,
    @Param('mediaId') mediaId: string,
    @Param('fileName') fileName: string
  ) {
    throw new HttpError(501);
  }
  @Get('/preview_url')
  async getUrlPreview(@Param('url') url: string, @Param('ts') ts?: number) {
    throw new HttpError(501);
  }
  @Get('/thumbnail/{serverName}/{mediaId}')
  async getContentThumbnail(
    @Param('serverName') serverName: string,
    @Param('mediaId') mediaId: string,
    @Param('width') width?: number,
    @Param('height') height?: number,
    @Param('method') method?: string
  ) {
    throw new HttpError(501);
  }
  @Post('/upload')
  async uploadContent(
    @HeaderParam('Content-Type') contentType?: string,
    @Param('filename') filename?: string,
    @Body() body: string
  ) {
    throw new HttpError(501);
  }
}

export class ResponseThirdPartyIdentifier {
  address!: string;
  medium!: string;
}
export class ResponseGetAccount3PIDs200 {
  threepids!: ResponseThirdPartyIdentifier[];
}
export class ThreePidCredentials {
  client_secret!: string;
  id_server!: string;
  sid!: string;
}
export class Post3PIDsBody {
  bind!: boolean;
  three_pid_creds!: ThreePidCredentials;
}
export class AuthenticationData {
  session!: string;
  type!: string;
}
export class DeactivateAccountBody {
  auth!: AuthenticationData;
}
export class Flows {
  stages!: string[];
}
export class ResponseAuthenticationResponse {
  completed!: string[];
  flows!: Flows[];
  params!: any;
  session!: string;
}
export class ResponseDeactivateAccount429 {
  errcode!: string;
  error!: string;
}
export class ChangePasswordBody {
  auth!: AuthenticationData;
  new_password!: string;
}
export class ResponseChangePassword429 {
  errcode!: string;
  error!: string;
}
export class ResponseGetTokenOwner200 {
  user_id!: string;
}
export class ResponseGetTokenOwner401 {
  errcode!: string;
  error!: string;
}
export class ResponseGetTokenOwner403 {
  errcode!: string;
  error!: string;
}
export class ResponseGetTokenOwner429 {
  errcode!: string;
  error!: string;
}
export class ResponseGetWhoIs200 {
  devices!: any;
  user_id!: string;
}
export class StateEvent {
  content!: any;
  state_key!: string;
  type!: string;
}
export class Invite3pid {
  address!: string;
  id_server!: string;
  medium!: string;
}
export class CreateRoomBody {
  creation_content!: any;
  guest_can_join!: boolean;
  initial_state!: StateEvent[];
  invite!: string[];
  invite_3pid!: Invite3pid[];
  is_direct!: boolean;
  name!: string;
  preset!: string;
  room_alias_name!: string;
  topic!: string;
  visibility!: string;
}
export class ResponseCreateRoom200 {
  room_id!: string;
}
export class DeleteDevicesBody {
  auth!: AuthenticationData;
  devices!: string[];
}
export class ResponseDevice {
  device_id!: string;
  display_name!: string;
  last_seen_ip!: string;
  last_seen_ts!: number;
}
export class ResponseGetDevices200 {
  devices!: ResponseDevice[];
}
export class UpdateDeviceBody {
  display_name!: string;
}
export class DeleteDeviceBody {
  auth!: AuthenticationData;
}
export class ResponseGetRoomIdByAlias200 {
  room_id!: string;
  servers!: string[];
}
export class SetRoomAliasBody {
  room_id!: string;
}
export class ResponseUnsignedData {
  age!: number;
  redacted_because!: any;
  transaction_id!: string;
}
export class ResponseEvent {
  content!: any;
  type!: string;
}
export class ResponseGetEvents200 {
  chunk!: ResponseEvent[];
  end!: string;
  start!: string;
}
export class ResponseSigned {
  mxid!: string;
  signatures!: any;
  token!: string;
}
export class ResponseInvite {
  display_name!: string;
  signed!: ResponseSigned;
}
export class ResponseEventContent {
  avatar_url!: string;
  displayname!: any;
  is_direct!: boolean;
  membership!: string;
  third_party_invite!: ResponseInvite;
}
export class ResponseStrippedState {
  content!: any;
  state_key!: string;
  type!: string;
}
export class ResponseInviteEvent {
  content!: any;
  invite_room_state!: ResponseStrippedState[];
  state_key!: string;
  type!: string;
}
export class ResponseRoomEvent {
  event_id!: string;
  origin_server_ts!: number;
  room_id!: string;
  sender!: string;
  unsigned!: ResponseUnsignedData;
}
export class ResponsePaginationChunk {
  chunk!: ResponseRoomEvent[];
  end!: string;
  start!: string;
}
export class ResponseStateEvent {
  prev_content!: any;
  state_key!: string;
}
export class ResponseRoomInfo {
  account_data!: ResponseEvent[];
  membership!: string;
  messages!: ResponsePaginationChunk;
  room_id!: string;
  state!: ResponseStateEvent[];
  visibility!: string;
}
export class ResponseInitialSync200 {
  account_data!: ResponseEvent[];
  end!: string;
  presence!: ResponseEvent[];
  rooms!: ResponseRoomInfo[];
}
export class Signed {
  mxid!: string;
  sender!: string;
  signatures!: any;
  token!: string;
}
export class ThirdPartySigned {
  mxid!: string;
  sender!: string;
  signatures!: any;
  token!: string;
}
export class JoinRoomBody {
  third_party_signed!: ThirdPartySigned;
}
export class ResponseJoinRoom429 {
  errcode!: string;
  error!: string;
}
export class ResponseGetJoinedRooms200 {
  joined_rooms!: string[];
}
export class ResponseGetKeysChanges200 {
  changed!: string[];
  left!: string[];
}
export class ClaimKeysBody {
  one_time_keys!: any;
  timeout!: number;
}
export class ResponseClaimKeys200 {
  failures!: any;
  one_time_keys!: any;
}
export class QueryKeysBody {
  device_keys!: any;
  timeout!: number;
  token!: string;
}
export class ResponseQueryKeys200 {
  device_keys!: any;
  failures!: any;
}
export class UploadKeysBody {
  device_keys!: any;
  one_time_keys!: any;
}
export class ResponseUploadKeys200 {
  one_time_key_counts!: any;
}
export class LoginBody {
  address!: string;
  device_id!: string;
  initial_device_display_name!: string;
  medium!: string;
  password!: string;
  token!: string;
  type!: string;
  user!: string;
}
export class ResponseLogin200 {
  access_token!: string;
  device_id!: string;
  home_server!: string;
  user_id!: string;
}
export class ResponseLogin429 {
  errcode!: string;
  error!: string;
}
export class ResponseUnsigned {
  age!: number;
  prev_content!: any;
  redacted_because!: any;
  transaction_id!: string;
}
export class ResponseNotification {
  actions!: any[];
  event!: ResponseEvent;
  profile_tag!: string;
  read!: boolean;
  room_id!: string;
  ts!: number;
}
export class ResponseGetNotifications200 {
  next_token!: string;
  notifications!: ResponseNotification[];
}
export class ModifyPresenceListBody {
  drop!: string[];
  invite!: string[];
}
export class ResponseModifyPresenceList429 {
  errcode!: string;
  error!: string;
}
export class ResponseGetPresence200 {
  currently_active!: boolean;
  last_active_ago!: number;
  presence!: string;
  status_msg!: any;
}
export class SetPresenceBody {
  presence!: string;
  status_msg!: string;
}
export class ResponseSetPresence429 {
  errcode!: string;
  error!: string;
}
export class ResponseGetUserProfile200 {
  avatar_url!: string;
  displayname!: string;
}
export class ResponseGetAvatarUrl200 {
  avatar_url!: string;
}
export class SetAvatarUrlBody {
  avatar_url!: string;
}
export class ResponseSetAvatarUrl429 {
  errcode!: string;
  error!: string;
}
export class ResponseGetDisplayName200 {
  displayname!: string;
}
export class SetDisplayNameBody {
  displayname!: string;
}
export class ResponseSetDisplayName429 {
  errcode!: string;
  error!: string;
}
export class ResponsePublicRoomsChunk {
  aliases!: string[];
  avatar_url!: string;
  canonical_alias!: string;
  guest_can_join!: boolean;
  name!: string;
  num_joined_members!: number;
  room_id!: string;
  topic!: string;
  world_readable!: boolean;
}
export class ResponseGetPublicRooms200 {
  chunk!: ResponsePublicRoomsChunk[];
  next_batch!: string;
  prev_batch!: string;
  total_room_count_estimate!: number;
}
export class Filter {
  generic_search_term!: string;
}
export class QueryPublicRoomsBody {
  filter!: Filter;
  limit!: number;
  since!: string;
}
export class ResponseQueryPublicRooms200 {
  chunk!: ResponsePublicRoomsChunk[];
  next_batch!: string;
  prev_batch!: string;
  total_room_count_estimate!: number;
}
export class ResponsePusherData {
  url!: string;
}
export class ResponsePusher {
  app_display_name!: string;
  app_id!: string;
  data!: ResponsePusherData;
  device_display_name!: string;
  kind!: string;
  lang!: string;
  profile_tag!: string;
  pushkey!: string;
}
export class ResponseGetPushers200 {
  pushers!: ResponsePusher[];
}
export class PusherData {
  url!: string;
}
export class PostPusherBody {
  app_display_name!: string;
  app_id!: string;
  append!: boolean;
  data!: PusherData;
  device_display_name!: string;
  kind!: string;
  lang!: string;
  profile_tag!: string;
  pushkey!: string;
}
export class ResponsePostPusher429 {
  errcode!: string;
  error!: string;
}
export class ResponsePushCondition {
  is!: string;
  key!: string;
  kind!: string;
  pattern!: string;
}
export class ResponsePushRule {
  actions!: any[];
  conditions!: ResponsePushCondition[];
  default!: boolean;
  enabled!: boolean;
  pattern!: string;
  rule_id!: string;
}
export class ResponseRuleset {
  content!: ResponsePushRule[];
  override!: ResponsePushRule[];
  room!: ResponsePushRule[];
  sender!: ResponsePushRule[];
  underride!: ResponsePushRule[];
}
export class ResponseGetPushRules200 {
  global!: ResponseRuleset;
}
export class PushCondition {
  is!: string;
  key!: string;
  kind!: string;
  pattern!: string;
}
export class SetPushRuleBody {
  actions!: string[];
  conditions!: PushCondition[];
  pattern!: string;
}
export class ResponseSetPushRule429 {
  errcode!: string;
  error!: string;
}
export class SetPushRuleActionsBody {
  actions!: string[];
}
export class SetPushRuleEnabledBody {
  enabled!: boolean;
}
export class RegisterBody {
  auth!: AuthenticationData;
  bind_email!: boolean;
  device_id!: string;
  initial_device_display_name!: string;
  password!: string;
  username!: string;
}
export class ResponseRegister200 {
  access_token!: string;
  device_id!: string;
  home_server!: string;
  user_id!: string;
}
export class ResponseRegister429 {
  errcode!: string;
  error!: string;
}
export class ResponseCheckUsernameAvailability200 {
  available!: boolean;
}
export class ResponseCheckUsernameAvailability429 {
  errcode!: string;
  error!: string;
}
export class BanBody {
  reason!: string;
  user_id!: string;
}
export class ResponseGetEventContext200 {
  end!: string;
  event!: any;
  events_after!: ResponseRoomEvent[];
  events_before!: ResponseRoomEvent[];
  start!: string;
  state!: ResponseStateEvent[];
}
export class ResponseForgetRoom429 {
  errcode!: string;
  error!: string;
}
export class InviteBy3PIDBody {
  address!: string;
  id_server!: string;
  medium!: string;
}
export class ResponseInviteBy3PID429 {
  errcode!: string;
  error!: string;
}
export class InviteUserBody {
  user_id!: string;
}
export class ResponseInviteUser429 {
  errcode!: string;
  error!: string;
}
export class JoinRoomByIdBody {
  third_party_signed!: ThirdPartySigned;
}
export class ResponseJoinRoomById429 {
  errcode!: string;
  error!: string;
}
export class ResponseGetJoinedMembersByRoom200 {
  joined!: any;
}
export class KickBody {
  reason!: string;
  user_id!: string;
}
export class ResponseLeaveRoom429 {
  errcode!: string;
  error!: string;
}
export class ResponseMemberEvent {
  content!: any;
  invite_room_state!: ResponseStrippedState[];
  state_key!: string;
  type!: string;
}
export class ResponseGetMembersByRoom200 {
  chunk!: ResponseMemberEvent[];
}
export class ResponseGetRoomEvents200 {
  chunk!: any[];
  end!: string;
  start!: string;
}
export class ResponsePostReceipt429 {
  errcode!: string;
  error!: string;
}
export class RedactEventBody {
  reason!: string;
}
export class ResponseRedactEvent200 {
  event_id!: string;
}
export class ResponseSendMessage200 {
  event_id!: string;
}
export class ResponseSetRoomState200 {
  event_id!: string;
}
export class ResponseSetRoomStateWithKey200 {
  event_id!: string;
}
export class SetTypingBody {
  timeout!: number;
  typing!: boolean;
}
export class ResponseSetTyping429 {
  errcode!: string;
  error!: string;
}
export class UnbanBody {
  user_id!: string;
}
export class EventContext {
  after_limit!: number;
  before_limit!: number;
  include_profile!: boolean;
}
export class Group {
  key!: string;
}
export class Groupings {
  group_by!: Group[];
}
export class RoomEvents {
  event_context!: EventContext;
  filter!: any;
  groupings!: Groupings;
  include_state!: boolean;
  keys!: string[];
  order_by!: string;
  search_term!: string;
}
export class Categories {
  room_events!: RoomEvents;
}
export class SearchBody {
  search_categories!: Categories;
}
export class ResponseEventContext {
  end!: string;
  events_after!: ResponseEvent[];
  events_before!: ResponseEvent[];
  profile_info!: any;
  start!: string;
}
export class ResponseResult {
  context!: ResponseEventContext;
  rank!: number;
  result!: ResponseEvent;
}
export class ResponseRoomEventResults {
  count!: number;
  groups!: any;
  next_batch!: string;
  results!: ResponseResult[];
  state!: any;
}
export class ResponseCategories {
  room_events!: ResponseRoomEventResults;
}
export class ResponseResults {
  search_categories!: ResponseCategories;
}
export class ResponseSearch429 {
  errcode!: string;
  error!: string;
}
export class SendToDeviceBody {
  messages!: any;
}
export class ResponseAccountData {
  events!: ResponseEvent[];
}
export class ResponsePresence {
  events!: ResponseEvent[];
}
export class ResponseRooms {
  invite!: any;
  join!: any;
  leave!: any;
}
export class ResponseSync200 {
  account_data!: ResponseAccountData;
  device_lists!: any;
  next_batch!: string;
  presence!: ResponsePresence;
  rooms!: ResponseRooms;
  to_device!: any;
}
export class RoomFilter {
  account_data!: any;
  ephemeral!: any;
  include_leave!: boolean;
  not_rooms!: string[];
  rooms!: string[];
  state!: any;
  timeline!: any;
}
export class DefineFilterBody {
  account_data!: any;
  event_fields!: string[];
  event_format!: string;
  presence!: any;
  room!: RoomFilter;
}
export class ResponseDefineFilter200 {
  filter_id!: string;
}
export class ResponseRoomFilter {
  account_data!: any;
  ephemeral!: any;
  include_leave!: boolean;
  not_rooms!: string[];
  rooms!: string[];
  state!: any;
  timeline!: any;
}
export class ResponseGetFilter200 {
  account_data!: any;
  event_fields!: string[];
  event_format!: string;
  presence!: any;
  room!: ResponseRoomFilter;
}
export class ResponseGetRoomTags200 {
  tags!: any;
}
export class SearchUserDirectoryBody {
  limit!: number;
  search_term!: string;
}
export class ResponseUser {
  avatar_url!: string;
  display_name!: string;
  user_id!: string;
}
export class ResponseSearchUserDirectory200 {
  limited!: boolean;
  results!: ResponseUser[];
}
export class ResponseSearchUserDirectory429 {
  errcode!: string;
  error!: string;
}
export class ResponseGetTurnServer200 {
  password!: string;
  ttl!: number;
  uris!: string[];
  username!: string;
}
export class ResponseGetTurnServer429 {
  errcode!: string;
  error!: string;
}
export class ResponseGetContent429 {
  errcode!: string;
  error!: string;
}
export class ResponseGetContentOverrideName429 {
  errcode!: string;
  error!: string;
}
export class ResponseGetUrlPreview200 {
  'matrix:image:size'!: number;
  'og:image'!: string;
}
export class ResponseGetUrlPreview429 {
  errcode!: string;
  error!: string;
}
export class ResponseGetContentThumbnail429 {
  errcode!: string;
  error!: string;
}
export class ResponseUploadContent200 {
  content_uri!: string;
}
export class ResponseUploadContent429 {
  errcode!: string;
  error!: string;
}
