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
import { IsDefined, IsInstance, Allow } from 'class-validator';

export class ResponseThirdPartyIdentifier {
  address?: string;
  medium?: string;
}
export class ResponseGetAccount3PIDs200 {
  threepids?: ResponseThirdPartyIdentifier[];
}
export class ThreePidCredentials {
  @IsDefined() client_secret?: string;
  @IsDefined() id_server?: string;
  @IsDefined() sid?: string;
}
export class Post3PIDsBody {
  bind?: boolean;
  @IsDefined() three_pid_creds?: ThreePidCredentials;
}
export class AuthenticationData {
  session?: string;
  @IsDefined() type?: string;
}
export class DeactivateAccountBody {
  @IsDefined() auth?: AuthenticationData;
}
export class Flows {
  @IsDefined() stages?: string[];
}
export class ResponseAuthenticationResponse {
  completed?: string[];
  @IsDefined() flows?: Flows[];
  params?: any;
  session?: string;
}
export class ResponseDeactivateAccount429 {
  @IsDefined() errcode?: string;
  error?: string;
}
export class ChangePasswordBody {
  @IsDefined() auth?: AuthenticationData;
  @IsDefined() new_password?: string;
}
export class ResponseChangePassword429 {
  @IsDefined() errcode?: string;
  error?: string;
}
export class ResponseGetTokenOwner200 {
  @IsDefined() user_id?: string;
}
export class ResponseGetTokenOwner401 {
  @IsDefined() errcode?: string;
  error?: string;
}
export class ResponseGetTokenOwner403 {
  @IsDefined() errcode?: string;
  error?: string;
}
export class ResponseGetTokenOwner429 {
  @IsDefined() errcode?: string;
  error?: string;
}
export class ResponseGetWhoIs200 {
  devices?: any;
  user_id?: string;
}
export class StateEvent {
  content?: any;
  state_key?: string;
  type?: string;
}
export class Invite3pid {
  @IsDefined() address?: string;
  @IsDefined() id_server?: string;
  @IsDefined() medium?: string;
}
export class CreateRoomBody {
  creation_content?: any;
  guest_can_join?: boolean;
  initial_state?: StateEvent[];
  invite?: string[];
  @IsDefined() invite_3pid?: Invite3pid[];
  is_direct?: boolean;
  name?: string;
  preset?: string;
  room_alias_name?: string;
  topic?: string;
  visibility?: string;
}
export class ResponseCreateRoom200 {
  room_id?: string;
}
export class DeleteDevicesBody {
  @IsDefined() auth?: AuthenticationData;
  @IsDefined() devices?: string[];
}
export class ResponseDevice {
  @IsDefined() device_id?: string;
  display_name?: string;
  last_seen_ip?: string;
  last_seen_ts?: number;
}
export class ResponseGetDevices200 {
  @IsDefined() devices?: ResponseDevice[];
}
export class UpdateDeviceBody {
  display_name?: string;
}
export class DeleteDeviceBody {
  @IsDefined() auth?: AuthenticationData;
}
export class ResponseGetRoomIdByAlias200 {
  room_id?: string;
  servers?: string[];
}
export class SetRoomAliasBody {
  room_id?: string;
}
export class ResponseUnsignedData {
  age?: number;
  redacted_because?: any;
  transaction_id?: string;
}
export class ResponseEvent {
  content?: any;
  @IsDefined() type?: string;
}
export class ResponseGetEvents200 {
  @IsDefined() chunk?: ResponseEvent[];
  end?: string;
  start?: string;
}
export class ResponseSigned {
  @IsDefined() mxid?: string;
  @IsDefined() signatures?: any;
  @IsDefined() token?: string;
}
export class ResponseInvite {
  @IsDefined() display_name?: string;
  @IsDefined() signed?: ResponseSigned;
}
export class ResponseEventContent {
  avatar_url?: string;
  displayname?: any;
  is_direct?: boolean;
  @IsDefined() membership?: string;
  @IsDefined() third_party_invite?: ResponseInvite;
}
export class ResponseStrippedState {
  @IsDefined() content?: any;
  @IsDefined() state_key?: string;
  @IsDefined() type?: string;
}
export class ResponseInviteEvent {
  content?: any;
  @IsDefined() invite_room_state?: ResponseStrippedState[];
  state_key?: string;
  type?: string;
}
export class ResponseRoomEvent {
  @IsDefined() event_id?: string;
  @IsDefined() origin_server_ts?: number;
  @IsDefined() room_id?: string;
  @IsDefined() sender?: string;
  unsigned?: ResponseUnsignedData;
}
export class ResponsePaginationChunk {
  @IsDefined() chunk?: ResponseRoomEvent[];
  @IsDefined() end?: string;
  @IsDefined() start?: string;
}
export class ResponseStateEvent {
  prev_content?: any;
  @IsDefined() state_key?: string;
}
export class ResponseRoomInfo {
  @IsDefined() account_data?: ResponseEvent[];
  membership?: string;
  @IsDefined() messages?: ResponsePaginationChunk;
  @IsDefined() room_id?: string;
  @IsDefined() state?: ResponseStateEvent[];
  visibility?: string;
}
export class ResponseInitialSync200 {
  @IsDefined() account_data?: ResponseEvent[];
  @IsDefined() end?: string;
  @IsDefined() presence?: ResponseEvent[];
  @IsDefined() rooms?: ResponseRoomInfo[];
}
export class Signed {
  @IsDefined() mxid?: string;
  @IsDefined() sender?: string;
  @IsDefined() signatures?: any;
  @IsDefined() token?: string;
}
export class ThirdPartySigned {
  @IsDefined() mxid?: string;
  @IsDefined() sender?: string;
  @IsDefined() signatures?: any;
  @IsDefined() token?: string;
}
export class JoinRoomBody {
  @IsDefined() third_party_signed?: ThirdPartySigned;
}
export class ResponseJoinRoom429 {
  @IsDefined() errcode?: string;
  error?: string;
}
export class ResponseGetJoinedRooms200 {
  @IsDefined() joined_rooms?: string[];
}
export class ResponseGetKeysChanges200 {
  changed?: string[];
  left?: string[];
}
export class ClaimKeysBody {
  @IsDefined() one_time_keys?: any;
  timeout?: number;
}
export class ResponseClaimKeys200 {
  failures?: any;
  one_time_keys?: any;
}
export class QueryKeysBody {
  @IsDefined() device_keys?: any;
  timeout?: number;
  token?: string;
}
export class ResponseQueryKeys200 {
  device_keys?: any;
  failures?: any;
}
export class DeviceKeys {
  @IsDefined() algorithms?: string[];
  @IsDefined() device_id?: string;
  @IsDefined() keys?: any;
  @IsDefined() signatures?: any;
  @IsDefined() user_id?: string;
}
export class UploadKeysBody {
  @IsDefined() device_keys?: DeviceKeys;
  one_time_keys?: any;
}
export class ResponseUploadKeys200 {
  @IsDefined() one_time_key_counts?: any;
}
export class LoginBody {
  address?: string;
  device_id?: string;
  initial_device_display_name?: string;
  medium?: string;
  password?: string;
  token?: string;
  @IsDefined() type?: string;
  user?: string;
}
export class ResponseLogin200 {
  access_token?: string;
  device_id?: string;
  home_server?: string;
  user_id?: string;
}
export class ResponseLogin429 {
  @IsDefined() errcode?: string;
  error?: string;
}
export class ResponseUnsigned {
  age?: number;
  prev_content?: any;
  redacted_because?: any;
  transaction_id?: string;
}
export class ResponseNotification {
  @IsDefined() actions?: any[];
  @IsDefined() event?: ResponseEvent;
  profile_tag?: string;
  @IsDefined() read?: boolean;
  @IsDefined() room_id?: string;
  @IsDefined() ts?: number;
}
export class ResponseGetNotifications200 {
  next_token?: string;
  @IsDefined() notifications?: ResponseNotification[];
}
export class ModifyPresenceListBody {
  drop?: string[];
  invite?: string[];
}
export class ResponseModifyPresenceList429 {
  @IsDefined() errcode?: string;
  error?: string;
}
export class ResponseGetPresence200 {
  currently_active?: boolean;
  last_active_ago?: number;
  @IsDefined() presence?: string;
  status_msg?: any;
}
export class SetPresenceBody {
  @IsDefined() presence?: string;
  status_msg?: string;
}
export class ResponseSetPresence429 {
  @IsDefined() errcode?: string;
  error?: string;
}
export class ResponseGetUserProfile200 {
  avatar_url?: string;
  displayname?: string;
}
export class ResponseGetAvatarUrl200 {
  avatar_url?: string;
}
export class SetAvatarUrlBody {
  avatar_url?: string;
}
export class ResponseSetAvatarUrl429 {
  @IsDefined() errcode?: string;
  error?: string;
}
export class ResponseGetDisplayName200 {
  displayname?: string;
}
export class SetDisplayNameBody {
  displayname?: string;
}
export class ResponseSetDisplayName429 {
  @IsDefined() errcode?: string;
  error?: string;
}
export class ResponsePublicRoomsChunk {
  aliases?: string[];
  avatar_url?: string;
  canonical_alias?: string;
  @IsDefined() guest_can_join?: boolean;
  name?: string;
  @IsDefined() num_joined_members?: number;
  @IsDefined() room_id?: string;
  topic?: string;
  @IsDefined() world_readable?: boolean;
}
export class ResponseGetPublicRooms200 {
  @IsDefined() chunk?: ResponsePublicRoomsChunk[];
  next_batch?: string;
  prev_batch?: string;
  total_room_count_estimate?: number;
}
export class Filter {
  limit?: number;
  not_senders?: string[];
  not_types?: string[];
  senders?: string[];
  types?: string[];
}
export class QueryPublicRoomsBody {
  filter?: Filter;
  limit?: number;
  since?: string;
}
export class ResponseQueryPublicRooms200 {
  @IsDefined() chunk?: ResponsePublicRoomsChunk[];
  next_batch?: string;
  prev_batch?: string;
  total_room_count_estimate?: number;
}
export class ResponsePusherData {
  url?: string;
}
export class ResponsePusher {
  app_display_name?: string;
  app_id?: string;
  data?: ResponsePusherData;
  device_display_name?: string;
  kind?: string;
  lang?: string;
  profile_tag?: string;
  pushkey?: string;
}
export class ResponseGetPushers200 {
  pushers?: ResponsePusher[];
}
export class PusherData {
  url?: string;
}
export class PostPusherBody {
  @IsDefined() app_display_name?: string;
  @IsDefined() app_id?: string;
  append?: boolean;
  @IsDefined() data?: PusherData;
  @IsDefined() device_display_name?: string;
  @IsDefined() kind?: string;
  @IsDefined() lang?: string;
  profile_tag?: string;
  @IsDefined() pushkey?: string;
}
export class ResponsePostPusher429 {
  @IsDefined() errcode?: string;
  error?: string;
}
export class ResponsePushCondition {
  is?: string;
  key?: string;
  @IsDefined() kind?: string;
  pattern?: string;
}
export class ResponsePushRule {
  @IsDefined() actions?: any[];
  @IsDefined() conditions?: ResponsePushCondition[];
  @IsDefined() default?: boolean;
  @IsDefined() enabled?: boolean;
  pattern?: string;
  @IsDefined() rule_id?: string;
}
export class ResponseRuleset {
  @IsDefined() content?: ResponsePushRule[];
  @IsDefined() override?: ResponsePushRule[];
  @IsDefined() room?: ResponsePushRule[];
  @IsDefined() sender?: ResponsePushRule[];
  @IsDefined() underride?: ResponsePushRule[];
}
export class ResponseGetPushRules200 {
  @IsDefined() global?: ResponseRuleset;
}
export class PushCondition {
  is?: string;
  key?: string;
  @IsDefined() kind?: string;
  pattern?: string;
}
export class SetPushRuleBody {
  @IsDefined() actions?: string[];
  @IsDefined() conditions?: PushCondition[];
  pattern?: string;
}
export class ResponseSetPushRule429 {
  @IsDefined() errcode?: string;
  error?: string;
}
export class SetPushRuleActionsBody {
  @IsDefined() actions?: string[];
}
export class SetPushRuleEnabledBody {
  @IsDefined() enabled?: boolean;
}
export class RegisterBody {
  @IsDefined() auth?: AuthenticationData;
  bind_email?: boolean;
  device_id?: string;
  initial_device_display_name?: string;
  password?: string;
  username?: string;
}
export class ResponseRegister200 {
  access_token?: string;
  device_id?: string;
  home_server?: string;
  user_id?: string;
}
export class ResponseRegister429 {
  @IsDefined() errcode?: string;
  error?: string;
}
export class ResponseCheckUsernameAvailability200 {
  available?: boolean;
}
export class ResponseCheckUsernameAvailability429 {
  @IsDefined() errcode?: string;
  error?: string;
}
export class BanBody {
  reason?: string;
  @IsDefined() user_id?: string;
}
export class ResponseGetEventContext200 {
  end?: string;
  @IsDefined() event?: ResponseRoomEvent;
  @IsDefined() events_after?: ResponseRoomEvent[];
  @IsDefined() events_before?: ResponseRoomEvent[];
  start?: string;
  @IsDefined() state?: ResponseStateEvent[];
}
export class ResponseForgetRoom429 {
  @IsDefined() errcode?: string;
  error?: string;
}
export class InviteBy3PIDBody {
  @IsDefined() address?: string;
  @IsDefined() id_server?: string;
  @IsDefined() medium?: string;
}
export class ResponseInviteBy3PID429 {
  @IsDefined() errcode?: string;
  error?: string;
}
export class InviteUserBody {
  @IsDefined() user_id?: string;
}
export class ResponseInviteUser429 {
  @IsDefined() errcode?: string;
  error?: string;
}
export class JoinRoomByIdBody {
  @IsDefined() third_party_signed?: ThirdPartySigned;
}
export class ResponseJoinRoomById429 {
  @IsDefined() errcode?: string;
  error?: string;
}
export class ResponseGetJoinedMembersByRoom200 {
  joined?: any;
}
export class KickBody {
  reason?: string;
  @IsDefined() user_id?: string;
}
export class ResponseLeaveRoom429 {
  @IsDefined() errcode?: string;
  error?: string;
}
export class ResponseMemberEvent {
  content?: any;
  @IsDefined() invite_room_state?: ResponseStrippedState[];
  state_key?: string;
  type?: string;
}
export class ResponseGetMembersByRoom200 {
  @IsDefined() chunk?: ResponseMemberEvent[];
}
export class ResponseGetRoomEvents200 {
  chunk?: any[];
  end?: string;
  start?: string;
}
export class ResponsePostReceipt429 {
  @IsDefined() errcode?: string;
  error?: string;
}
export class RedactEventBody {
  reason?: string;
}
export class ResponseRedactEvent200 {
  event_id?: string;
}
export class ResponseSendMessage200 {
  event_id?: string;
}
export class ResponseSetRoomState200 {
  event_id?: string;
}
export class ResponseSetRoomStateWithKey200 {
  event_id?: string;
}
export class SetTypingBody {
  timeout?: number;
  @IsDefined() typing?: boolean;
}
export class ResponseSetTyping429 {
  @IsDefined() errcode?: string;
  error?: string;
}
export class UnbanBody {
  @IsDefined() user_id?: string;
}
export class EventContext {
  after_limit?: number;
  before_limit?: number;
  include_profile?: boolean;
}
export class Group {
  key?: string;
}
export class Groupings {
  group_by?: Group[];
}
export class RoomEvents {
  event_context?: EventContext;
  filter?: any;
  groupings?: Groupings;
  include_state?: boolean;
  keys?: string[];
  order_by?: string;
  @IsDefined() search_term?: string;
}
export class Categories {
  @IsDefined() room_events?: RoomEvents;
}
export class SearchBody {
  @IsDefined() search_categories?: Categories;
}
export class ResponseEventContext {
  end?: string;
  @IsDefined() events_after?: ResponseEvent[];
  @IsDefined() events_before?: ResponseEvent[];
  profile_info?: any;
  start?: string;
}
export class ResponseResult {
  @IsDefined() context?: ResponseEventContext;
  rank?: number;
  @IsDefined() result?: ResponseEvent;
}
export class ResponseRoomEventResults {
  count?: number;
  groups?: any;
  next_batch?: string;
  @IsDefined() results?: ResponseResult[];
  state?: any;
}
export class ResponseCategories {
  @IsDefined() room_events?: ResponseRoomEventResults;
}
export class ResponseResults {
  @IsDefined() search_categories?: ResponseCategories;
}
export class ResponseSearch429 {
  @IsDefined() errcode?: string;
  error?: string;
}
export class SendToDeviceBody {
  messages?: any;
}
export class ResponseAccountData {
  @IsDefined() events?: ResponseEvent[];
}
export class ResponsePresence {
  @IsDefined() events?: ResponseEvent[];
}
export class ResponseRooms {
  invite?: any;
  join?: any;
  leave?: any;
}
export class ResponseSync200 {
  @IsDefined() account_data?: ResponseAccountData;
  device_lists?: any;
  next_batch?: string;
  @IsDefined() presence?: ResponsePresence;
  rooms?: ResponseRooms;
  to_device?: any;
}
export class RoomEventFilter {
  contains_url?: boolean;
  not_rooms?: string[];
  rooms?: string[];
  limit?: number;
  not_senders?: string[];
  not_types?: string[];
  senders?: string[];
  types?: string[];
}
export class RoomFilter {
  account_data?: RoomEventFilter;
  ephemeral?: RoomEventFilter;
  include_leave?: boolean;
  not_rooms?: string[];
  rooms?: string[];
  state?: RoomEventFilter;
  timeline?: RoomEventFilter;
}
export class DefineFilterBody {
  account_data?: Filter;
  event_fields?: string[];
  event_format?: string;
  presence?: Filter;
  room?: RoomFilter;
}
export class ResponseDefineFilter200 {
  filter_id?: string;
}
export class ResponseFilter {
  limit?: number;
  not_senders?: string[];
  not_types?: string[];
  senders?: string[];
  types?: string[];
}
export class ResponseRoomEventFilter {
  contains_url?: boolean;
  not_rooms?: string[];
  rooms?: string[];
  limit?: number;
  not_senders?: string[];
  not_types?: string[];
  senders?: string[];
  types?: string[];
}
export class ResponseRoomFilter {
  account_data?: ResponseRoomEventFilter;
  ephemeral?: ResponseRoomEventFilter;
  include_leave?: boolean;
  not_rooms?: string[];
  rooms?: string[];
  state?: ResponseRoomEventFilter;
  timeline?: ResponseRoomEventFilter;
}
export class ResponseGetFilter200 {
  account_data?: ResponseFilter;
  event_fields?: string[];
  event_format?: string;
  presence?: ResponseFilter;
  room?: ResponseRoomFilter;
}
export class ResponseGetRoomTags200 {
  tags?: any;
}
export class SearchUserDirectoryBody {
  limit?: number;
  @IsDefined() search_term?: string;
}
export class ResponseUser {
  avatar_url?: string;
  display_name?: string;
  @IsDefined() user_id?: string;
}
export class ResponseSearchUserDirectory200 {
  @IsDefined() limited?: boolean;
  @IsDefined() results?: ResponseUser[];
}
export class ResponseSearchUserDirectory429 {
  @IsDefined() errcode?: string;
  error?: string;
}
export class ResponseGetTurnServer200 {
  @IsDefined() password?: string;
  @IsDefined() ttl?: number;
  @IsDefined() uris?: string[];
  @IsDefined() username?: string;
}
export class ResponseGetTurnServer429 {
  @IsDefined() errcode?: string;
  error?: string;
}
export class ResponseGetContent429 {
  @IsDefined() errcode?: string;
  error?: string;
}
export class ResponseGetContentOverrideName429 {
  @IsDefined() errcode?: string;
  error?: string;
}
export class ResponseGetUrlPreview200 {
  'matrix:image:size': number;
  'og:image': string;
}
export class ResponseGetUrlPreview429 {
  @IsDefined() errcode?: string;
  error?: string;
}
export class ResponseGetContentThumbnail429 {
  @IsDefined() errcode?: string;
  error?: string;
}
export class ResponseUploadContent200 {
  @IsDefined() content_uri?: string;
}
export class ResponseUploadContent429 {
  @IsDefined() errcode?: string;
  error?: string;
}

@JsonController('/_matrix/client/r0')
export class MatrixController {
  @Get('/account/3pid')
  async getAccount3PIDs() {
    throw new HttpError(501);
  }
  @Post('/account/3pid')
  async post3PIDs(
    @Body({ required: true })
    body: Post3PIDsBody
  ) {
    throw new HttpError(501);
  }
  @Post('/account/deactivate')
  async deactivateAccount(
    @Body({ required: true })
    body: DeactivateAccountBody
  ) {
    throw new HttpError(501);
  }
  @Post('/account/password')
  async changePassword(
    @Body({ required: true })
    body: ChangePasswordBody
  ) {
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
  async createRoom(
    @Body({ required: true })
    body: CreateRoomBody
  ) {
    throw new HttpError(501);
  }
  @Post('/delete_devices')
  async deleteDevices(
    @Body({ required: true })
    body: DeleteDevicesBody
  ) {
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
    @Body({ required: true })
    body: UpdateDeviceBody
  ) {
    throw new HttpError(501);
  }
  @Delete('/devices/{deviceId}')
  async deleteDevice(
    @Param('deviceId') deviceId: string,
    @Body({ required: true })
    body: DeleteDeviceBody
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
    @Body({ required: true })
    body: SetRoomAliasBody
  ) {
    throw new HttpError(501);
  }
  @Delete('/directory/room/{roomAlias}')
  async deleteRoomAlias(@Param('roomAlias') roomAlias: string) {
    throw new HttpError(501);
  }
  @Get('/events')
  async getEvents(
    @QueryParam('from') from: string,
    @QueryParam('timeout') timeout: number
  ) {
    throw new HttpError(501);
  }
  @Get('/events/{eventId}')
  async getOneEvent(@Param('eventId') eventId: string) {
    throw new HttpError(501);
  }
  @Get('/initialSync')
  async initialSync(
    @QueryParam('limit') limit: number,
    @QueryParam('archived') archived: boolean
  ) {
    throw new HttpError(501);
  }
  @Post('/join/{roomIdOrAlias}')
  async joinRoom(
    @Param('roomIdOrAlias') roomIdOrAlias: string,
    @Body({ required: true })
    body: JoinRoomBody
  ) {
    throw new HttpError(501);
  }
  @Get('/joined_rooms')
  async getJoinedRooms() {
    throw new HttpError(501);
  }
  @Get('/keys/changes')
  async getKeysChanges(
    @QueryParam('from', { required: true })
    from: string,
    @QueryParam('to', { required: true })
    to: string
  ) {
    throw new HttpError(501);
  }
  @Post('/keys/claim')
  async claimKeys(
    @Body({ required: true })
    body: ClaimKeysBody
  ) {
    throw new HttpError(501);
  }
  @Post('/keys/query')
  async queryKeys(
    @Body({ required: true })
    body: QueryKeysBody
  ) {
    throw new HttpError(501);
  }
  @Post('/keys/upload')
  async uploadKeys(
    @Body({ required: true })
    body: UploadKeysBody
  ) {
    throw new HttpError(501);
  }
  @Post('/login')
  async login(
    @Body({ required: true })
    body: LoginBody
  ) {
    throw new HttpError(501);
  }
  @Post('/logout')
  async logout() {
    throw new HttpError(501);
  }
  @Get('/notifications')
  async getNotifications(
    @QueryParam('from') from: string,
    @QueryParam('limit') limit: number,
    @QueryParam('only') only: string
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
    @Body({ required: true })
    body: ModifyPresenceListBody
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
    @Body({ required: true })
    body: SetPresenceBody
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
    @Body({ required: true })
    body: SetAvatarUrlBody
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
    @Body({ required: true })
    body: SetDisplayNameBody
  ) {
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
  ) {
    throw new HttpError(501);
  }
  @Post('/publicRooms')
  async queryPublicRooms(
    @QueryParam('server', { required: true })
    server: string,
    @Body({ required: true })
    body: QueryPublicRoomsBody
  ) {
    throw new HttpError(501);
  }
  @Get('/pushers')
  async getPushers() {
    throw new HttpError(501);
  }
  @Post('/pushers/set')
  async postPusher(
    @Body({ required: true })
    body: PostPusherBody
  ) {
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
    @QueryParam('before') before: string,
    @QueryParam('after') after: string,
    @Body({ required: true })
    body: SetPushRuleBody
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
    @Body({ required: true })
    body: SetPushRuleActionsBody
  ) {
    throw new HttpError(501);
  }
  @Put('/pushrules/{scope}/{kind}/{ruleId}/enabled')
  async setPushRuleEnabled(
    @Param('scope') scope: string,
    @Param('kind') kind: string,
    @Param('ruleId') ruleId: string,
    @Body({ required: true })
    body: SetPushRuleEnabledBody
  ) {
    throw new HttpError(501);
  }
  @Post('/register')
  async register(
    @QueryParam('kind') kind: string,
    @Body({ required: true })
    body: RegisterBody
  ) {
    throw new HttpError(501);
  }
  @Get('/register/available')
  async checkUsernameAvailability(
    @QueryParam('username', { required: true })
    username: string
  ) {
    throw new HttpError(501);
  }
  @Post('/rooms/{roomId}/ban')
  async ban(
    @Param('roomId') roomId: string,
    @Body({ required: true })
    body: BanBody
  ) {
    throw new HttpError(501);
  }
  @Get('/rooms/{roomId}/context/{eventId}')
  async getEventContext(
    @Param('roomId') roomId: string,
    @Param('eventId') eventId: string,
    @QueryParam('limit', { required: true })
    limit: number
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
    @Body({ required: true })
    body: InviteBy3PIDBody
  ) {
    throw new HttpError(501);
  }
  @Post('/rooms/{roomId}/invite ')
  async inviteUser(
    @Param('roomId') roomId: string,
    @Body({ required: true })
    body: InviteUserBody
  ) {
    throw new HttpError(501);
  }
  @Post('/rooms/{roomId}/join')
  async joinRoomById(
    @Param('roomId') roomId: string,
    @Body({ required: true })
    body: JoinRoomByIdBody
  ) {
    throw new HttpError(501);
  }
  @Get('/rooms/{roomId}/joined_members')
  async getJoinedMembersByRoom(@Param('roomId') roomId: string) {
    throw new HttpError(501);
  }
  @Post('/rooms/{roomId}/kick')
  async kick(
    @Param('roomId') roomId: string,
    @Body({ required: true })
    body: KickBody
  ) {
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
    @QueryParam('from', { required: true })
    from: string,
    @QueryParam('to') to: string,
    @QueryParam('dir', { required: true })
    dir: string,
    @QueryParam('limit', { required: true })
    limit: number,
    @QueryParam('filter', { required: true })
    filter: string
  ) {
    throw new HttpError(501);
  }
  @Post('/rooms/{roomId}/receipt/{receiptType}/{eventId}')
  async postReceipt(
    @Param('roomId') roomId: string,
    @Param('receiptType') receiptType: string,
    @Param('eventId') eventId: string,
    @Body({ required: true })
    body: any
  ) {
    throw new HttpError(501);
  }
  @Put('/rooms/{roomId}/redact/{eventId}/{txnId}')
  async redactEvent(
    @Param('roomId') roomId: string,
    @Param('eventId') eventId: string,
    @Param('txnId') txnId: string,
    @Body({ required: true })
    body: RedactEventBody
  ) {
    throw new HttpError(501);
  }
  @Put('/rooms/{roomId}/send/{eventType}/{txnId}')
  async sendMessage(
    @Param('roomId') roomId: string,
    @Param('eventType') eventType: string,
    @Param('txnId') txnId: string,
    @Body({ required: true })
    body: any
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
    @Body({ required: true })
    body: any
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
    @Body({ required: true })
    body: any
  ) {
    throw new HttpError(501);
  }
  @Put('/rooms/{roomId}/typing/{userId}')
  async setTyping(
    @Param('userId') userId: string,
    @Param('roomId') roomId: string,
    @Body({ required: true })
    body: SetTypingBody
  ) {
    throw new HttpError(501);
  }
  @Post('/rooms/{roomId}/unban')
  async unban(
    @Param('roomId') roomId: string,
    @Body({ required: true })
    body: UnbanBody
  ) {
    throw new HttpError(501);
  }
  @Post('/search')
  async search(
    @QueryParam('next_batch', { required: true })
    nextBatch: string,
    @Body({ required: true })
    body: SearchBody
  ) {
    throw new HttpError(501);
  }
  @Put('/sendToDevice/{eventType}/{txnId}')
  async sendToDevice(
    @Param('eventType') eventType: string,
    @Param('txnId') txnId: string,
    @Body({ required: true })
    body: SendToDeviceBody
  ) {
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
  ) {
    throw new HttpError(501);
  }
  @Put('/user/{userId}/account_data/{type}')
  async setAccountData(
    @Param('userId') userId: string,
    @Param('type') type: string,
    @Body({ required: true })
    body: any
  ) {
    throw new HttpError(501);
  }
  @Post('/user/{userId}/filter')
  async defineFilter(
    @Param('userId') userId: string,
    @Body({ required: true })
    body: DefineFilterBody
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
    @Body({ required: true })
    body: any
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
    @Body({ required: true })
    body: any
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
  async searchUserDirectory(
    @Body({ required: true })
    body: SearchUserDirectoryBody
  ) {
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
  async getUrlPreview(
    @QueryParam('url', { required: true })
    url: string,
    @QueryParam('ts', { required: true })
    ts: number
  ) {
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
  ) {
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
  ) {
    throw new HttpError(501);
  }
}
