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

export class ThirdPartyIdentifierResponse {
  @IsString() address?: string;

  @IsString() medium?: string;
}
export class GetAccount3PIDsResponse {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ThirdPartyIdentifierResponse)
  threepids?: ThirdPartyIdentifierResponse[];
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
export class AuthenticationResponse {
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
export class DeactivateAccountResponse429 {
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
export class ChangePasswordResponse429 {
  @IsDefined()
  @IsString()
  errcode?: string;

  @IsString() error?: string;
}
export class GetTokenOwnerResponse {
  @IsDefined()
  @IsString()
  user_id?: string;
}
export class GetTokenOwnerResponse401 {
  @IsDefined()
  @IsString()
  errcode?: string;

  @IsString() error?: string;
}
export class GetTokenOwnerResponse403 {
  @IsDefined()
  @IsString()
  errcode?: string;

  @IsString() error?: string;
}
export class GetTokenOwnerResponse429 {
  @IsDefined()
  @IsString()
  errcode?: string;

  @IsString() error?: string;
}
export class GetWhoIsResponse {
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
export class CreateRoomResponse {
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
export class DeviceResponse {
  @IsDefined()
  @IsString()
  device_id?: string;

  @IsString() display_name?: string;

  @IsString() last_seen_ip?: string;

  @IsInt() last_seen_ts?: number;
}
export class GetDevicesResponse {
  @IsDefined()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DeviceResponse)
  devices?: DeviceResponse[];
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
export class SetRoomAliasBody {
  @IsString() room_id?: string;
}
export class GetRoomIdByAliasResponse {
  @IsString() room_id?: string;

  @IsArray()
  @IsString({ each: true })
  servers?: string[];
}
export class UnsignedDataResponse {
  @IsInt() age?: number;

  redacted_because?: any;

  @IsString() transaction_id?: string;
}
export class EventResponse {
  content?: any;

  @IsDefined()
  @IsString()
  type?: string;
}
export class GetEventsResponse {
  @IsDefined()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => EventResponse)
  chunk?: EventResponse[];

  @IsString() end?: string;

  @IsString() start?: string;
}
export class SignedResponse {
  @IsDefined()
  @IsString()
  mxid?: string;

  @IsDefined() signatures?: any;

  @IsDefined()
  @IsString()
  token?: string;
}
export class InviteResponse {
  @IsDefined()
  @IsString()
  display_name?: string;

  @IsDefined()
  @ValidateNested()
  @Type(() => SignedResponse)
  signed?: SignedResponse;
}
export class EventContentResponse {
  @IsString() avatar_url?: string;

  displayname?: any;

  @IsBoolean() is_direct?: boolean;

  @IsDefined()
  @IsString()
  membership?: string;

  @IsDefined()
  @ValidateNested()
  @Type(() => InviteResponse)
  third_party_invite?: InviteResponse;
}
export class StrippedStateResponse {
  @IsDefined() content?: any;

  @IsDefined()
  @IsString()
  state_key?: string;

  @IsDefined()
  @IsString()
  type?: string;
}
export class InviteEventResponse {
  content?: any;

  @IsDefined()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => StrippedStateResponse)
  invite_room_state?: StrippedStateResponse[];

  @IsString() state_key?: string;

  @IsString() type?: string;
}
export class RoomEventResponse {
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
  @Type(() => UnsignedDataResponse)
  unsigned?: UnsignedDataResponse;
}
export class PaginationChunkResponse {
  @IsDefined()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => RoomEventResponse)
  chunk?: RoomEventResponse[];

  @IsDefined()
  @IsString()
  end?: string;

  @IsDefined()
  @IsString()
  start?: string;
}
export class StateEventResponse {
  prev_content?: any;

  @IsDefined()
  @IsString()
  state_key?: string;
}
export class RoomInfoResponse {
  @IsDefined()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => EventResponse)
  account_data?: EventResponse[];

  @IsString() membership?: string;

  @IsDefined()
  @ValidateNested()
  @Type(() => PaginationChunkResponse)
  messages?: PaginationChunkResponse;

  @IsDefined()
  @IsString()
  room_id?: string;

  @IsDefined()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => StateEventResponse)
  state?: StateEventResponse[];

  @IsString() visibility?: string;
}
export class InitialSyncResponse {
  @IsDefined()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => EventResponse)
  account_data?: EventResponse[];

  @IsDefined()
  @IsString()
  end?: string;

  @IsDefined()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => EventResponse)
  presence?: EventResponse[];

  @IsDefined()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => RoomInfoResponse)
  rooms?: RoomInfoResponse[];
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
export class JoinRoomResponse429 {
  @IsDefined()
  @IsString()
  errcode?: string;

  @IsString() error?: string;
}
export class GetJoinedRoomsResponse {
  @IsDefined()
  @IsArray()
  @IsString({ each: true })
  joined_rooms?: string[];
}
export class GetKeysChangesResponse {
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
export class ClaimKeysResponse {
  failures?: any;

  one_time_keys?: any;
}
export class QueryKeysBody {
  @IsDefined() device_keys?: any;

  @IsInt() timeout?: number;

  @IsString() token?: string;
}
export class QueryKeysResponse {
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
export class UploadKeysResponse {
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
export class LoginResponse {
  @IsString() access_token?: string;

  @IsString() device_id?: string;

  @IsString() home_server?: string;

  @IsString() user_id?: string;
}
export class LoginResponse429 {
  @IsDefined()
  @IsString()
  errcode?: string;

  @IsString() error?: string;
}
export class UnsignedResponse {
  @IsInt() age?: number;

  prev_content?: any;

  redacted_because?: any;

  @IsString() transaction_id?: string;
}
export class NotificationResponse {
  @IsDefined()
  @IsArray()
  actions?: any[];

  @IsDefined()
  @ValidateNested()
  @Type(() => EventResponse)
  event?: EventResponse;

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
export class GetNotificationsResponse {
  @IsString() next_token?: string;

  @IsDefined()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => NotificationResponse)
  notifications?: NotificationResponse[];
}
export class ModifyPresenceListBody {
  @IsArray()
  @IsString({ each: true })
  drop?: string[];

  @IsArray()
  @IsString({ each: true })
  invite?: string[];
}
export class ModifyPresenceListResponse429 {
  @IsDefined()
  @IsString()
  errcode?: string;

  @IsString() error?: string;
}
export class SetPresenceBody {
  @IsDefined()
  @IsString()
  presence?: string;

  @IsString() status_msg?: string;
}
export class SetPresenceResponse429 {
  @IsDefined()
  @IsString()
  errcode?: string;

  @IsString() error?: string;
}
export class GetPresenceResponse {
  @IsBoolean() currently_active?: boolean;

  @IsInt() last_active_ago?: number;

  @IsDefined()
  @IsString()
  presence?: string;

  status_msg?: any;
}
export class GetUserProfileResponse {
  @IsString() avatar_url?: string;

  @IsString() displayname?: string;
}
export class SetAvatarUrlBody {
  @IsString() avatar_url?: string;
}
export class SetAvatarUrlResponse429 {
  @IsDefined()
  @IsString()
  errcode?: string;

  @IsString() error?: string;
}
export class GetAvatarUrlResponse {
  @IsString() avatar_url?: string;
}
export class SetDisplayNameBody {
  @IsString() displayname?: string;
}
export class SetDisplayNameResponse429 {
  @IsDefined()
  @IsString()
  errcode?: string;

  @IsString() error?: string;
}
export class GetDisplayNameResponse {
  @IsString() displayname?: string;
}
export class PublicRoomsChunkResponse {
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
export class GetPublicRoomsResponse {
  @IsDefined()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PublicRoomsChunkResponse)
  chunk?: PublicRoomsChunkResponse[];

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
export class QueryPublicRoomsResponse {
  @IsDefined()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PublicRoomsChunkResponse)
  chunk?: PublicRoomsChunkResponse[];

  @IsString() next_batch?: string;

  @IsString() prev_batch?: string;

  total_room_count_estimate?: number;
}
export class PusherDataResponse {
  @IsString() url?: string;
}
export class PusherResponse {
  @IsString() app_display_name?: string;

  @IsString() app_id?: string;

  @ValidateNested()
  @Type(() => PusherDataResponse)
  data?: PusherDataResponse;

  @IsString() device_display_name?: string;

  @IsString() kind?: string;

  @IsString() lang?: string;

  @IsString() profile_tag?: string;

  @IsString() pushkey?: string;
}
export class GetPushersResponse {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PusherResponse)
  pushers?: PusherResponse[];
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
export class PostPusherResponse429 {
  @IsDefined()
  @IsString()
  errcode?: string;

  @IsString() error?: string;
}
export class PushConditionResponse {
  @IsString() is?: string;

  @IsString() key?: string;

  @IsDefined()
  @IsString()
  kind?: string;

  @IsString() pattern?: string;
}
export class PushRuleResponse {
  @IsDefined()
  @IsArray()
  actions?: any[];

  @IsDefined()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PushConditionResponse)
  conditions?: PushConditionResponse[];

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
export class RulesetResponse {
  @IsDefined()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PushRuleResponse)
  content?: PushRuleResponse[];

  @IsDefined()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PushRuleResponse)
  override?: PushRuleResponse[];

  @IsDefined()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PushRuleResponse)
  room?: PushRuleResponse[];

  @IsDefined()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PushRuleResponse)
  sender?: PushRuleResponse[];

  @IsDefined()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PushRuleResponse)
  underride?: PushRuleResponse[];
}
export class GetPushRulesResponse {
  @IsDefined()
  @ValidateNested()
  @Type(() => RulesetResponse)
  global?: RulesetResponse;
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
export class SetPushRuleResponse429 {
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
export class RegisterResponse {
  @IsString() access_token?: string;

  @IsString() device_id?: string;

  @IsString() home_server?: string;

  @IsString() user_id?: string;
}
export class RegisterResponse429 {
  @IsDefined()
  @IsString()
  errcode?: string;

  @IsString() error?: string;
}
export class CheckUsernameAvailabilityResponse {
  @IsBoolean() available?: boolean;
}
export class CheckUsernameAvailabilityResponse429 {
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
export class GetEventContextResponse {
  @IsString() end?: string;

  @IsDefined()
  @ValidateNested()
  @Type(() => RoomEventResponse)
  event?: RoomEventResponse;

  @IsDefined()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => RoomEventResponse)
  events_after?: RoomEventResponse[];

  @IsDefined()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => RoomEventResponse)
  events_before?: RoomEventResponse[];

  @IsString() start?: string;

  @IsDefined()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => StateEventResponse)
  state?: StateEventResponse[];
}
export class ForgetRoomResponse429 {
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
export class InviteBy3PIDResponse429 {
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
export class InviteUserResponse429 {
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
export class JoinRoomByIdResponse429 {
  @IsDefined()
  @IsString()
  errcode?: string;

  @IsString() error?: string;
}
export class GetJoinedMembersByRoomResponse {
  joined?: any;
}
export class KickBody {
  @IsString() reason?: string;

  @IsDefined()
  @IsString()
  user_id?: string;
}
export class LeaveRoomResponse429 {
  @IsDefined()
  @IsString()
  errcode?: string;

  @IsString() error?: string;
}
export class MemberEventResponse {
  content?: any;

  @IsDefined()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => StrippedStateResponse)
  invite_room_state?: StrippedStateResponse[];

  @IsString() state_key?: string;

  @IsString() type?: string;
}
export class GetMembersByRoomResponse {
  @IsDefined()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => MemberEventResponse)
  chunk?: MemberEventResponse[];
}
export class GetRoomEventsResponse {
  @IsArray() chunk?: any[];

  @IsString() end?: string;

  @IsString() start?: string;
}
export class PostReceiptResponse429 {
  @IsDefined()
  @IsString()
  errcode?: string;

  @IsString() error?: string;
}
export class RedactEventBody {
  @IsString() reason?: string;
}
export class RedactEventResponse {
  @IsString() event_id?: string;
}
export class SendMessageResponse {
  @IsString() event_id?: string;
}
export class SetRoomStateResponse {
  @IsString() event_id?: string;
}
export class SetRoomStateWithKeyResponse {
  @IsString() event_id?: string;
}
export class SetTypingBody {
  @IsInt() timeout?: number;

  @IsDefined()
  @IsBoolean()
  typing?: boolean;
}
export class SetTypingResponse429 {
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
export class EventContextResponse {
  @IsString() end?: string;

  @IsDefined()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => EventResponse)
  events_after?: EventResponse[];

  @IsDefined()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => EventResponse)
  events_before?: EventResponse[];

  profile_info?: any;

  @IsString() start?: string;
}
export class ResultResponse {
  @IsDefined()
  @ValidateNested()
  @Type(() => EventContextResponse)
  context?: EventContextResponse;

  rank?: number;

  @IsDefined()
  @ValidateNested()
  @Type(() => EventResponse)
  result?: EventResponse;
}
export class RoomEventResultsResponse {
  count?: number;

  groups?: any;

  @IsString() next_batch?: string;

  @IsDefined()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ResultResponse)
  results?: ResultResponse[];

  state?: any;
}
export class CategoriesResponse {
  @IsDefined()
  @ValidateNested()
  @Type(() => RoomEventResultsResponse)
  room_events?: RoomEventResultsResponse;
}
export class ResultsResponse {
  @IsDefined()
  @ValidateNested()
  @Type(() => CategoriesResponse)
  search_categories?: CategoriesResponse;
}
export class SearchResponse429 {
  @IsDefined()
  @IsString()
  errcode?: string;

  @IsString() error?: string;
}
export class SendToDeviceBody {
  messages?: any;
}
export class AccountDataResponse {
  @IsDefined()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => EventResponse)
  events?: EventResponse[];
}
export class PresenceResponse {
  @IsDefined()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => EventResponse)
  events?: EventResponse[];
}
export class RoomsResponse {
  invite?: any;

  join?: any;

  leave?: any;
}
export class SyncResponse {
  @IsDefined()
  @ValidateNested()
  @Type(() => AccountDataResponse)
  account_data?: AccountDataResponse;

  device_lists?: any;

  @IsString() next_batch?: string;

  @IsDefined()
  @ValidateNested()
  @Type(() => PresenceResponse)
  presence?: PresenceResponse;

  @ValidateNested()
  @Type(() => RoomsResponse)
  rooms?: RoomsResponse;

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
export class DefineFilterResponse {
  @IsString() filter_id?: string;
}
export class FilterResponse {
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
export class RoomEventFilterResponse {
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
export class RoomFilterResponse {
  @ValidateNested()
  @Type(() => RoomEventFilterResponse)
  account_data?: RoomEventFilterResponse;

  @ValidateNested()
  @Type(() => RoomEventFilterResponse)
  ephemeral?: RoomEventFilterResponse;

  @IsBoolean() include_leave?: boolean;

  @IsArray()
  @IsString({ each: true })
  not_rooms?: string[];

  @IsArray()
  @IsString({ each: true })
  rooms?: string[];

  @ValidateNested()
  @Type(() => RoomEventFilterResponse)
  state?: RoomEventFilterResponse;

  @ValidateNested()
  @Type(() => RoomEventFilterResponse)
  timeline?: RoomEventFilterResponse;
}
export class GetFilterResponse {
  @ValidateNested()
  @Type(() => FilterResponse)
  account_data?: FilterResponse;

  @IsArray()
  @IsString({ each: true })
  event_fields?: string[];

  @IsString() event_format?: string;

  @ValidateNested()
  @Type(() => FilterResponse)
  presence?: FilterResponse;

  @ValidateNested()
  @Type(() => RoomFilterResponse)
  room?: RoomFilterResponse;
}
export class GetRoomTagsResponse {
  tags?: any;
}
export class SearchUserDirectoryBody {
  limit?: number;

  @IsDefined()
  @IsString()
  search_term?: string;
}
export class UserResponse {
  @IsString() avatar_url?: string;

  @IsString() display_name?: string;

  @IsDefined()
  @IsString()
  user_id?: string;
}
export class SearchUserDirectoryResponse {
  @IsDefined()
  @IsBoolean()
  limited?: boolean;

  @IsDefined()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UserResponse)
  results?: UserResponse[];
}
export class SearchUserDirectoryResponse429 {
  @IsDefined()
  @IsString()
  errcode?: string;

  @IsString() error?: string;
}
export class GetTurnServerResponse {
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
export class GetTurnServerResponse429 {
  @IsDefined()
  @IsString()
  errcode?: string;

  @IsString() error?: string;
}
export class GetVersionsResponse {
  @IsArray()
  @IsString({ each: true })
  versions?: string[];
}
export class GetContentResponse429 {
  @IsDefined()
  @IsString()
  errcode?: string;

  @IsString() error?: string;
}
export class GetContentOverrideNameResponse429 {
  @IsDefined()
  @IsString()
  errcode?: string;

  @IsString() error?: string;
}
export class GetUrlPreviewResponse {
  'matrix:image:size': number;

  @IsString() 'og:image': string;
}
export class GetUrlPreviewResponse429 {
  @IsDefined()
  @IsString()
  errcode?: string;

  @IsString() error?: string;
}
export class GetContentThumbnailResponse429 {
  @IsDefined()
  @IsString()
  errcode?: string;

  @IsString() error?: string;
}
export class UploadContentResponse {
  @IsDefined()
  @IsString()
  content_uri?: string;
}
export class UploadContentResponse429 {
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
