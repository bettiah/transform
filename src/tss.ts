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
import {
  IsDefined,
  IsNotEmpty,
  IsInstance,
  Allow,
  ValidateNested,
  IsString,
  IsInt,
  IsBoolean,
  IsArray
} from 'class-validator';
import { Type } from 'class-transformer';

export class ResponseThirdPartyIdentifier {
  @IsString() address?: string;

  @IsString() medium?: string;
}
export class ResponseGetAccount3PIDs200 {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ResponseThirdPartyIdentifier)
  threepids?: ResponseThirdPartyIdentifier[];
}
export class ThreePidCredentials {
  @IsDefined()
  @IsString()
  client_secret?: string;

  @IsDefined()
  @IsString()
  id_server?: string;

  @IsDefined()
  @IsString()
  sid?: string;
}
export class Post3PIDsBody {
  @IsBoolean() bind?: boolean;

  @IsDefined()
  @ValidateNested()
  @Type(() => ThreePidCredentials)
  three_pid_creds?: ThreePidCredentials;
}
export class AuthenticationData {
  @IsString() session?: string;

  @IsDefined()
  @IsString()
  type?: string;
}
export class DeactivateAccountBody {
  @IsDefined()
  @ValidateNested()
  @Type(() => AuthenticationData)
  auth?: AuthenticationData;
}
export class Flows {
  @IsDefined()
  @IsArray()
  @IsString({ each: true })
  stages?: string[];
}
export class ResponseAuthenticationResponse {
  @IsArray()
  @IsString({ each: true })
  completed?: string[];

  @IsDefined()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Flows)
  flows?: Flows[];

  params?: any;

  @IsString() session?: string;
}
export class ResponseDeactivateAccount429 {
  @IsDefined()
  @IsString()
  errcode?: string;

  @IsString() error?: string;
}
export class ChangePasswordBody {
  @IsDefined()
  @ValidateNested()
  @Type(() => AuthenticationData)
  auth?: AuthenticationData;

  @IsDefined()
  @IsString()
  new_password?: string;
}
export class ResponseChangePassword429 {
  @IsDefined()
  @IsString()
  errcode?: string;

  @IsString() error?: string;
}
export class ResponseGetTokenOwner200 {
  @IsDefined()
  @IsString()
  user_id?: string;
}
export class ResponseGetTokenOwner401 {
  @IsDefined()
  @IsString()
  errcode?: string;

  @IsString() error?: string;
}
export class ResponseGetTokenOwner403 {
  @IsDefined()
  @IsString()
  errcode?: string;

  @IsString() error?: string;
}
export class ResponseGetTokenOwner429 {
  @IsDefined()
  @IsString()
  errcode?: string;

  @IsString() error?: string;
}
export class ResponseGetWhoIs200 {
  devices?: any;

  @IsString() user_id?: string;
}
export class StateEvent {
  content?: any;

  @IsString() state_key?: string;

  @IsString() type?: string;
}
export class Invite3pid {
  @IsDefined()
  @IsString()
  address?: string;

  @IsDefined()
  @IsString()
  id_server?: string;

  @IsDefined()
  @IsString()
  medium?: string;
}
export class CreateRoomBody {
  creation_content?: any;

  @IsBoolean() guest_can_join?: boolean;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => StateEvent)
  initial_state?: StateEvent[];

  @IsArray()
  @IsString({ each: true })
  invite?: string[];

  @IsDefined()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Invite3pid)
  invite_3pid?: Invite3pid[];

  @IsBoolean() is_direct?: boolean;

  @IsString() name?: string;

  @IsString() preset?: string;

  @IsString() room_alias_name?: string;

  @IsString() topic?: string;

  @IsString() visibility?: string;
}
export class ResponseCreateRoom200 {
  @IsString() room_id?: string;
}
export class DeleteDevicesBody {
  @IsDefined()
  @ValidateNested()
  @Type(() => AuthenticationData)
  auth?: AuthenticationData;

  @IsDefined()
  @IsArray()
  @IsString({ each: true })
  devices?: string[];
}
export class ResponseDevice {
  @IsDefined()
  @IsString()
  device_id?: string;

  @IsString() display_name?: string;

  @IsString() last_seen_ip?: string;

  @IsInt() last_seen_ts?: number;
}
export class ResponseGetDevices200 {
  @IsDefined()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ResponseDevice)
  devices?: ResponseDevice[];
}
export class UpdateDeviceBody {
  @IsString() display_name?: string;
}
export class DeleteDeviceBody {
  @IsDefined()
  @ValidateNested()
  @Type(() => AuthenticationData)
  auth?: AuthenticationData;
}
export class ResponseGetRoomIdByAlias200 {
  @IsString() room_id?: string;

  @IsArray()
  @IsString({ each: true })
  servers?: string[];
}
export class SetRoomAliasBody {
  @IsString() room_id?: string;
}
export class ResponseUnsignedData {
  @IsInt() age?: number;

  redacted_because?: any;

  @IsString() transaction_id?: string;
}
export class ResponseEvent {
  content?: any;

  @IsDefined()
  @IsString()
  type?: string;
}
export class ResponseGetEvents200 {
  @IsDefined()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ResponseEvent)
  chunk?: ResponseEvent[];

  @IsString() end?: string;

  @IsString() start?: string;
}
export class ResponseSigned {
  @IsDefined()
  @IsString()
  mxid?: string;

  @IsDefined() signatures?: any;

  @IsDefined()
  @IsString()
  token?: string;
}
export class ResponseInvite {
  @IsDefined()
  @IsString()
  display_name?: string;

  @IsDefined()
  @ValidateNested()
  @Type(() => ResponseSigned)
  signed?: ResponseSigned;
}
export class ResponseEventContent {
  @IsString() avatar_url?: string;

  displayname?: any;

  @IsBoolean() is_direct?: boolean;

  @IsDefined()
  @IsString()
  membership?: string;

  @IsDefined()
  @ValidateNested()
  @Type(() => ResponseInvite)
  third_party_invite?: ResponseInvite;
}
export class ResponseStrippedState {
  @IsDefined() content?: any;

  @IsDefined()
  @IsString()
  state_key?: string;

  @IsDefined()
  @IsString()
  type?: string;
}
export class ResponseInviteEvent {
  content?: any;

  @IsDefined()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ResponseStrippedState)
  invite_room_state?: ResponseStrippedState[];

  @IsString() state_key?: string;

  @IsString() type?: string;
}
export class ResponseRoomEvent {
  @IsDefined()
  @IsString()
  event_id?: string;

  @IsDefined() origin_server_ts?: number;

  @IsDefined()
  @IsString()
  room_id?: string;

  @IsDefined()
  @IsString()
  sender?: string;

  @ValidateNested()
  @Type(() => ResponseUnsignedData)
  unsigned?: ResponseUnsignedData;
}
export class ResponsePaginationChunk {
  @IsDefined()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ResponseRoomEvent)
  chunk?: ResponseRoomEvent[];

  @IsDefined()
  @IsString()
  end?: string;

  @IsDefined()
  @IsString()
  start?: string;
}
export class ResponseStateEvent {
  prev_content?: any;

  @IsDefined()
  @IsString()
  state_key?: string;
}
export class ResponseRoomInfo {
  @IsDefined()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ResponseEvent)
  account_data?: ResponseEvent[];

  @IsString() membership?: string;

  @IsDefined()
  @ValidateNested()
  @Type(() => ResponsePaginationChunk)
  messages?: ResponsePaginationChunk;

  @IsDefined()
  @IsString()
  room_id?: string;

  @IsDefined()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ResponseStateEvent)
  state?: ResponseStateEvent[];

  @IsString() visibility?: string;
}
export class ResponseInitialSync200 {
  @IsDefined()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ResponseEvent)
  account_data?: ResponseEvent[];

  @IsDefined()
  @IsString()
  end?: string;

  @IsDefined()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ResponseEvent)
  presence?: ResponseEvent[];

  @IsDefined()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ResponseRoomInfo)
  rooms?: ResponseRoomInfo[];
}
export class Signed {
  @IsDefined()
  @IsString()
  mxid?: string;

  @IsDefined()
  @IsString()
  sender?: string;

  @IsDefined() signatures?: any;

  @IsDefined()
  @IsString()
  token?: string;
}
export class ThirdPartySigned {
  @IsDefined()
  @IsString()
  mxid?: string;

  @IsDefined()
  @IsString()
  sender?: string;

  @IsDefined() signatures?: any;

  @IsDefined()
  @IsString()
  token?: string;
}
export class JoinRoomBody {
  @IsDefined()
  @ValidateNested()
  @Type(() => ThirdPartySigned)
  third_party_signed?: ThirdPartySigned;
}
export class ResponseJoinRoom429 {
  @IsDefined()
  @IsString()
  errcode?: string;

  @IsString() error?: string;
}
export class ResponseGetJoinedRooms200 {
  @IsDefined()
  @IsArray()
  @IsString({ each: true })
  joined_rooms?: string[];
}
export class ResponseGetKeysChanges200 {
  @IsArray()
  @IsString({ each: true })
  changed?: string[];

  @IsArray()
  @IsString({ each: true })
  left?: string[];
}
export class ClaimKeysBody {
  @IsDefined() one_time_keys?: any;

  @IsInt() timeout?: number;
}
export class ResponseClaimKeys200 {
  failures?: any;

  one_time_keys?: any;
}
export class QueryKeysBody {
  @IsDefined() device_keys?: any;

  @IsInt() timeout?: number;

  @IsString() token?: string;
}
export class ResponseQueryKeys200 {
  device_keys?: any;

  failures?: any;
}
export class DeviceKeys {
  @IsDefined()
  @IsArray()
  @IsString({ each: true })
  algorithms?: string[];

  @IsDefined()
  @IsString()
  device_id?: string;

  @IsDefined() keys?: any;

  @IsDefined() signatures?: any;

  @IsDefined()
  @IsString()
  user_id?: string;
}
export class UploadKeysBody {
  @IsDefined()
  @ValidateNested()
  @Type(() => DeviceKeys)
  device_keys?: DeviceKeys;

  one_time_keys?: any;
}
export class ResponseUploadKeys200 {
  @IsDefined() one_time_key_counts?: any;
}
export class LoginBody {
  @IsString() address?: string;

  @IsString() device_id?: string;

  @IsString() initial_device_display_name?: string;

  @IsString() medium?: string;

  @IsString() password?: string;

  @IsString() token?: string;

  @IsDefined()
  @IsString()
  type?: string;

  @IsString() user?: string;
}
export class ResponseLogin200 {
  @IsString() access_token?: string;

  @IsString() device_id?: string;

  @IsString() home_server?: string;

  @IsString() user_id?: string;
}
export class ResponseLogin429 {
  @IsDefined()
  @IsString()
  errcode?: string;

  @IsString() error?: string;
}
export class ResponseUnsigned {
  @IsInt() age?: number;

  prev_content?: any;

  redacted_because?: any;

  @IsString() transaction_id?: string;
}
export class ResponseNotification {
  @IsDefined()
  @IsArray()
  actions?: any[];

  @IsDefined()
  @ValidateNested()
  @Type(() => ResponseEvent)
  event?: ResponseEvent;

  @IsString() profile_tag?: string;

  @IsDefined()
  @IsBoolean()
  read?: boolean;

  @IsDefined()
  @IsString()
  room_id?: string;

  @IsDefined()
  @IsInt()
  ts?: number;
}
export class ResponseGetNotifications200 {
  @IsString() next_token?: string;

  @IsDefined()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ResponseNotification)
  notifications?: ResponseNotification[];
}
export class ModifyPresenceListBody {
  @IsArray()
  @IsString({ each: true })
  drop?: string[];

  @IsArray()
  @IsString({ each: true })
  invite?: string[];
}
export class ResponseModifyPresenceList429 {
  @IsDefined()
  @IsString()
  errcode?: string;

  @IsString() error?: string;
}
export class ResponseGetPresence200 {
  @IsBoolean() currently_active?: boolean;

  @IsInt() last_active_ago?: number;

  @IsDefined()
  @IsString()
  presence?: string;

  status_msg?: any;
}
export class SetPresenceBody {
  @IsDefined()
  @IsString()
  presence?: string;

  @IsString() status_msg?: string;
}
export class ResponseSetPresence429 {
  @IsDefined()
  @IsString()
  errcode?: string;

  @IsString() error?: string;
}
export class ResponseGetUserProfile200 {
  @IsString() avatar_url?: string;

  @IsString() displayname?: string;
}
export class ResponseGetAvatarUrl200 {
  @IsString() avatar_url?: string;
}
export class SetAvatarUrlBody {
  @IsString() avatar_url?: string;
}
export class ResponseSetAvatarUrl429 {
  @IsDefined()
  @IsString()
  errcode?: string;

  @IsString() error?: string;
}
export class ResponseGetDisplayName200 {
  @IsString() displayname?: string;
}
export class SetDisplayNameBody {
  @IsString() displayname?: string;
}
export class ResponseSetDisplayName429 {
  @IsDefined()
  @IsString()
  errcode?: string;

  @IsString() error?: string;
}
export class ResponsePublicRoomsChunk {
  @IsArray()
  @IsString({ each: true })
  aliases?: string[];

  @IsString() avatar_url?: string;

  @IsString() canonical_alias?: string;

  @IsDefined()
  @IsBoolean()
  guest_can_join?: boolean;

  @IsString() name?: string;

  @IsDefined() num_joined_members?: number;

  @IsDefined()
  @IsString()
  room_id?: string;

  @IsString() topic?: string;

  @IsDefined()
  @IsBoolean()
  world_readable?: boolean;
}
export class ResponseGetPublicRooms200 {
  @IsDefined()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ResponsePublicRoomsChunk)
  chunk?: ResponsePublicRoomsChunk[];

  @IsString() next_batch?: string;

  @IsString() prev_batch?: string;

  total_room_count_estimate?: number;
}
export class Filter {
  @IsInt() limit?: number;

  @IsArray()
  @IsString({ each: true })
  not_senders?: string[];

  @IsArray()
  @IsString({ each: true })
  not_types?: string[];

  @IsArray()
  @IsString({ each: true })
  senders?: string[];

  @IsArray()
  @IsString({ each: true })
  types?: string[];
}
export class QueryPublicRoomsBody {
  @ValidateNested()
  @Type(() => Filter)
  filter?: Filter;

  limit?: number;

  @IsString() since?: string;
}
export class ResponseQueryPublicRooms200 {
  @IsDefined()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ResponsePublicRoomsChunk)
  chunk?: ResponsePublicRoomsChunk[];

  @IsString() next_batch?: string;

  @IsString() prev_batch?: string;

  total_room_count_estimate?: number;
}
export class ResponsePusherData {
  @IsString() url?: string;
}
export class ResponsePusher {
  @IsString() app_display_name?: string;

  @IsString() app_id?: string;

  @ValidateNested()
  @Type(() => ResponsePusherData)
  data?: ResponsePusherData;

  @IsString() device_display_name?: string;

  @IsString() kind?: string;

  @IsString() lang?: string;

  @IsString() profile_tag?: string;

  @IsString() pushkey?: string;
}
export class ResponseGetPushers200 {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ResponsePusher)
  pushers?: ResponsePusher[];
}
export class PusherData {
  @IsString() url?: string;
}
export class PostPusherBody {
  @IsDefined()
  @IsString()
  app_display_name?: string;

  @IsDefined()
  @IsString()
  app_id?: string;

  @IsBoolean() append?: boolean;

  @IsDefined()
  @ValidateNested()
  @Type(() => PusherData)
  data?: PusherData;

  @IsDefined()
  @IsString()
  device_display_name?: string;

  @IsDefined()
  @IsString()
  kind?: string;

  @IsDefined()
  @IsString()
  lang?: string;

  @IsString() profile_tag?: string;

  @IsDefined()
  @IsString()
  pushkey?: string;
}
export class ResponsePostPusher429 {
  @IsDefined()
  @IsString()
  errcode?: string;

  @IsString() error?: string;
}
export class ResponsePushCondition {
  @IsString() is?: string;

  @IsString() key?: string;

  @IsDefined()
  @IsString()
  kind?: string;

  @IsString() pattern?: string;
}
export class ResponsePushRule {
  @IsDefined()
  @IsArray()
  actions?: any[];

  @IsDefined()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ResponsePushCondition)
  conditions?: ResponsePushCondition[];

  @IsDefined()
  @IsBoolean()
  default?: boolean;

  @IsDefined()
  @IsBoolean()
  enabled?: boolean;

  @IsString() pattern?: string;

  @IsDefined()
  @IsString()
  rule_id?: string;
}
export class ResponseRuleset {
  @IsDefined()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ResponsePushRule)
  content?: ResponsePushRule[];

  @IsDefined()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ResponsePushRule)
  override?: ResponsePushRule[];

  @IsDefined()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ResponsePushRule)
  room?: ResponsePushRule[];

  @IsDefined()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ResponsePushRule)
  sender?: ResponsePushRule[];

  @IsDefined()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ResponsePushRule)
  underride?: ResponsePushRule[];
}
export class ResponseGetPushRules200 {
  @IsDefined()
  @ValidateNested()
  @Type(() => ResponseRuleset)
  global?: ResponseRuleset;
}
export class PushCondition {
  @IsString() is?: string;

  @IsString() key?: string;

  @IsDefined()
  @IsString()
  kind?: string;

  @IsString() pattern?: string;
}
export class SetPushRuleBody {
  @IsDefined()
  @IsArray()
  @IsString({ each: true })
  actions?: string[];

  @IsDefined()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PushCondition)
  conditions?: PushCondition[];

  @IsString() pattern?: string;
}
export class ResponseSetPushRule429 {
  @IsDefined()
  @IsString()
  errcode?: string;

  @IsString() error?: string;
}
export class SetPushRuleActionsBody {
  @IsDefined()
  @IsArray()
  @IsString({ each: true })
  actions?: string[];
}
export class SetPushRuleEnabledBody {
  @IsDefined()
  @IsBoolean()
  enabled?: boolean;
}
export class RegisterBody {
  @IsDefined()
  @ValidateNested()
  @Type(() => AuthenticationData)
  auth?: AuthenticationData;

  @IsBoolean() bind_email?: boolean;

  @IsString() device_id?: string;

  @IsString() initial_device_display_name?: string;

  @IsString() password?: string;

  @IsString() username?: string;
}
export class ResponseRegister200 {
  @IsString() access_token?: string;

  @IsString() device_id?: string;

  @IsString() home_server?: string;

  @IsString() user_id?: string;
}
export class ResponseRegister429 {
  @IsDefined()
  @IsString()
  errcode?: string;

  @IsString() error?: string;
}
export class ResponseCheckUsernameAvailability200 {
  @IsBoolean() available?: boolean;
}
export class ResponseCheckUsernameAvailability429 {
  @IsDefined()
  @IsString()
  errcode?: string;

  @IsString() error?: string;
}
export class BanBody {
  @IsString() reason?: string;

  @IsDefined()
  @IsString()
  user_id?: string;
}
export class ResponseGetEventContext200 {
  @IsString() end?: string;

  @IsDefined()
  @ValidateNested()
  @Type(() => ResponseRoomEvent)
  event?: ResponseRoomEvent;

  @IsDefined()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ResponseRoomEvent)
  events_after?: ResponseRoomEvent[];

  @IsDefined()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ResponseRoomEvent)
  events_before?: ResponseRoomEvent[];

  @IsString() start?: string;

  @IsDefined()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ResponseStateEvent)
  state?: ResponseStateEvent[];
}
export class ResponseForgetRoom429 {
  @IsDefined()
  @IsString()
  errcode?: string;

  @IsString() error?: string;
}
export class InviteBy3PIDBody {
  @IsDefined()
  @IsString()
  address?: string;

  @IsDefined()
  @IsString()
  id_server?: string;

  @IsDefined()
  @IsString()
  medium?: string;
}
export class ResponseInviteBy3PID429 {
  @IsDefined()
  @IsString()
  errcode?: string;

  @IsString() error?: string;
}
export class InviteUserBody {
  @IsDefined()
  @IsString()
  user_id?: string;
}
export class ResponseInviteUser429 {
  @IsDefined()
  @IsString()
  errcode?: string;

  @IsString() error?: string;
}
export class JoinRoomByIdBody {
  @IsDefined()
  @ValidateNested()
  @Type(() => ThirdPartySigned)
  third_party_signed?: ThirdPartySigned;
}
export class ResponseJoinRoomById429 {
  @IsDefined()
  @IsString()
  errcode?: string;

  @IsString() error?: string;
}
export class ResponseGetJoinedMembersByRoom200 {
  joined?: any;
}
export class KickBody {
  @IsString() reason?: string;

  @IsDefined()
  @IsString()
  user_id?: string;
}
export class ResponseLeaveRoom429 {
  @IsDefined()
  @IsString()
  errcode?: string;

  @IsString() error?: string;
}
export class ResponseMemberEvent {
  content?: any;

  @IsDefined()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ResponseStrippedState)
  invite_room_state?: ResponseStrippedState[];

  @IsString() state_key?: string;

  @IsString() type?: string;
}
export class ResponseGetMembersByRoom200 {
  @IsDefined()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ResponseMemberEvent)
  chunk?: ResponseMemberEvent[];
}
export class ResponseGetRoomEvents200 {
  @IsArray() chunk?: any[];

  @IsString() end?: string;

  @IsString() start?: string;
}
export class ResponsePostReceipt429 {
  @IsDefined()
  @IsString()
  errcode?: string;

  @IsString() error?: string;
}
export class RedactEventBody {
  @IsString() reason?: string;
}
export class ResponseRedactEvent200 {
  @IsString() event_id?: string;
}
export class ResponseSendMessage200 {
  @IsString() event_id?: string;
}
export class ResponseSetRoomState200 {
  @IsString() event_id?: string;
}
export class ResponseSetRoomStateWithKey200 {
  @IsString() event_id?: string;
}
export class SetTypingBody {
  @IsInt() timeout?: number;

  @IsDefined()
  @IsBoolean()
  typing?: boolean;
}
export class ResponseSetTyping429 {
  @IsDefined()
  @IsString()
  errcode?: string;

  @IsString() error?: string;
}
export class UnbanBody {
  @IsDefined()
  @IsString()
  user_id?: string;
}
export class EventContext {
  @IsInt() after_limit?: number;

  @IsInt() before_limit?: number;

  @IsBoolean() include_profile?: boolean;
}
export class Group {
  @IsString() key?: string;
}
export class Groupings {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Group)
  group_by?: Group[];
}
export class RoomEvents {
  @ValidateNested()
  @Type(() => EventContext)
  event_context?: EventContext;

  filter?: any;

  @ValidateNested()
  @Type(() => Groupings)
  groupings?: Groupings;

  @IsBoolean() include_state?: boolean;

  @IsArray()
  @IsString({ each: true })
  keys?: string[];

  @IsString() order_by?: string;

  @IsDefined()
  @IsString()
  search_term?: string;
}
export class Categories {
  @IsDefined()
  @ValidateNested()
  @Type(() => RoomEvents)
  room_events?: RoomEvents;
}
export class SearchBody {
  @IsDefined()
  @ValidateNested()
  @Type(() => Categories)
  search_categories?: Categories;
}
export class ResponseEventContext {
  @IsString() end?: string;

  @IsDefined()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ResponseEvent)
  events_after?: ResponseEvent[];

  @IsDefined()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ResponseEvent)
  events_before?: ResponseEvent[];

  profile_info?: any;

  @IsString() start?: string;
}
export class ResponseResult {
  @IsDefined()
  @ValidateNested()
  @Type(() => ResponseEventContext)
  context?: ResponseEventContext;

  rank?: number;

  @IsDefined()
  @ValidateNested()
  @Type(() => ResponseEvent)
  result?: ResponseEvent;
}
export class ResponseRoomEventResults {
  count?: number;

  groups?: any;

  @IsString() next_batch?: string;

  @IsDefined()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ResponseResult)
  results?: ResponseResult[];

  state?: any;
}
export class ResponseCategories {
  @IsDefined()
  @ValidateNested()
  @Type(() => ResponseRoomEventResults)
  room_events?: ResponseRoomEventResults;
}
export class ResponseResults {
  @IsDefined()
  @ValidateNested()
  @Type(() => ResponseCategories)
  search_categories?: ResponseCategories;
}
export class ResponseSearch429 {
  @IsDefined()
  @IsString()
  errcode?: string;

  @IsString() error?: string;
}
export class SendToDeviceBody {
  messages?: any;
}
export class ResponseAccountData {
  @IsDefined()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ResponseEvent)
  events?: ResponseEvent[];
}
export class ResponsePresence {
  @IsDefined()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ResponseEvent)
  events?: ResponseEvent[];
}
export class ResponseRooms {
  invite?: any;

  join?: any;

  leave?: any;
}
export class ResponseSync200 {
  @IsDefined()
  @ValidateNested()
  @Type(() => ResponseAccountData)
  account_data?: ResponseAccountData;

  device_lists?: any;

  @IsString() next_batch?: string;

  @IsDefined()
  @ValidateNested()
  @Type(() => ResponsePresence)
  presence?: ResponsePresence;

  @ValidateNested()
  @Type(() => ResponseRooms)
  rooms?: ResponseRooms;

  to_device?: any;
}
export class RoomEventFilter {
  @IsBoolean() contains_url?: boolean;

  @IsArray()
  @IsString({ each: true })
  not_rooms?: string[];

  @IsArray()
  @IsString({ each: true })
  rooms?: string[];

  @IsInt() limit?: number;

  @IsArray()
  @IsString({ each: true })
  not_senders?: string[];

  @IsArray()
  @IsString({ each: true })
  not_types?: string[];

  @IsArray()
  @IsString({ each: true })
  senders?: string[];

  @IsArray()
  @IsString({ each: true })
  types?: string[];
}
export class RoomFilter {
  @ValidateNested()
  @Type(() => RoomEventFilter)
  account_data?: RoomEventFilter;

  @ValidateNested()
  @Type(() => RoomEventFilter)
  ephemeral?: RoomEventFilter;

  @IsBoolean() include_leave?: boolean;

  @IsArray()
  @IsString({ each: true })
  not_rooms?: string[];

  @IsArray()
  @IsString({ each: true })
  rooms?: string[];

  @ValidateNested()
  @Type(() => RoomEventFilter)
  state?: RoomEventFilter;

  @ValidateNested()
  @Type(() => RoomEventFilter)
  timeline?: RoomEventFilter;
}
export class DefineFilterBody {
  @ValidateNested()
  @Type(() => Filter)
  account_data?: Filter;

  @IsArray()
  @IsString({ each: true })
  event_fields?: string[];

  @IsString() event_format?: string;

  @ValidateNested()
  @Type(() => Filter)
  presence?: Filter;

  @ValidateNested()
  @Type(() => RoomFilter)
  room?: RoomFilter;
}
export class ResponseDefineFilter200 {
  @IsString() filter_id?: string;
}
export class ResponseFilter {
  @IsInt() limit?: number;

  @IsArray()
  @IsString({ each: true })
  not_senders?: string[];

  @IsArray()
  @IsString({ each: true })
  not_types?: string[];

  @IsArray()
  @IsString({ each: true })
  senders?: string[];

  @IsArray()
  @IsString({ each: true })
  types?: string[];
}
export class ResponseRoomEventFilter {
  @IsBoolean() contains_url?: boolean;

  @IsArray()
  @IsString({ each: true })
  not_rooms?: string[];

  @IsArray()
  @IsString({ each: true })
  rooms?: string[];

  @IsInt() limit?: number;

  @IsArray()
  @IsString({ each: true })
  not_senders?: string[];

  @IsArray()
  @IsString({ each: true })
  not_types?: string[];

  @IsArray()
  @IsString({ each: true })
  senders?: string[];

  @IsArray()
  @IsString({ each: true })
  types?: string[];
}
export class ResponseRoomFilter {
  @ValidateNested()
  @Type(() => ResponseRoomEventFilter)
  account_data?: ResponseRoomEventFilter;

  @ValidateNested()
  @Type(() => ResponseRoomEventFilter)
  ephemeral?: ResponseRoomEventFilter;

  @IsBoolean() include_leave?: boolean;

  @IsArray()
  @IsString({ each: true })
  not_rooms?: string[];

  @IsArray()
  @IsString({ each: true })
  rooms?: string[];

  @ValidateNested()
  @Type(() => ResponseRoomEventFilter)
  state?: ResponseRoomEventFilter;

  @ValidateNested()
  @Type(() => ResponseRoomEventFilter)
  timeline?: ResponseRoomEventFilter;
}
export class ResponseGetFilter200 {
  @ValidateNested()
  @Type(() => ResponseFilter)
  account_data?: ResponseFilter;

  @IsArray()
  @IsString({ each: true })
  event_fields?: string[];

  @IsString() event_format?: string;

  @ValidateNested()
  @Type(() => ResponseFilter)
  presence?: ResponseFilter;

  @ValidateNested()
  @Type(() => ResponseRoomFilter)
  room?: ResponseRoomFilter;
}
export class ResponseGetRoomTags200 {
  tags?: any;
}
export class SearchUserDirectoryBody {
  limit?: number;

  @IsDefined()
  @IsString()
  search_term?: string;
}
export class ResponseUser {
  @IsString() avatar_url?: string;

  @IsString() display_name?: string;

  @IsDefined()
  @IsString()
  user_id?: string;
}
export class ResponseSearchUserDirectory200 {
  @IsDefined()
  @IsBoolean()
  limited?: boolean;

  @IsDefined()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ResponseUser)
  results?: ResponseUser[];
}
export class ResponseSearchUserDirectory429 {
  @IsDefined()
  @IsString()
  errcode?: string;

  @IsString() error?: string;
}
export class ResponseGetTurnServer200 {
  @IsDefined()
  @IsString()
  password?: string;

  @IsDefined()
  @IsInt()
  ttl?: number;

  @IsDefined()
  @IsArray()
  @IsString({ each: true })
  uris?: string[];

  @IsDefined()
  @IsString()
  username?: string;
}
export class ResponseGetTurnServer429 {
  @IsDefined()
  @IsString()
  errcode?: string;

  @IsString() error?: string;
}
export class ResponseGetContent429 {
  @IsDefined()
  @IsString()
  errcode?: string;

  @IsString() error?: string;
}
export class ResponseGetContentOverrideName429 {
  @IsDefined()
  @IsString()
  errcode?: string;

  @IsString() error?: string;
}
export class ResponseGetUrlPreview200 {
  'matrix:image:size': number;

  @IsString() 'og:image': string;
}
export class ResponseGetUrlPreview429 {
  @IsDefined()
  @IsString()
  errcode?: string;

  @IsString() error?: string;
}
export class ResponseGetContentThumbnail429 {
  @IsDefined()
  @IsString()
  errcode?: string;

  @IsString() error?: string;
}
export class ResponseUploadContent200 {
  @IsDefined()
  @IsString()
  content_uri?: string;
}
export class ResponseUploadContent429 {
  @IsDefined()
  @IsString()
  errcode?: string;

  @IsString() error?: string;
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
