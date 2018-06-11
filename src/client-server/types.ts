import {
  IsDefined,
  ValidateNested,
  IsString,
  IsInt,
  IsBoolean,
  IsArray,
  MaxLength,
  MinLength,
  IsOptional
} from 'class-validator';
import { Type } from 'class-transformer';
import { VisibilityType } from '../types';

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

  // @IsDefined()
  @IsString()
  type?: string;

  [key: string]: any;
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

export class Params {
  [key: string]: any;
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

  @ValidateNested()
  @Type(() => Params)
  params?: Params;

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

export class Devices {
  [key: string]: any;
}

export class ConnectionInfo {
  @IsString() ip?: string;

  last_seen?: number;

  @IsString() user_agent?: string;
}

export class SessionInfo {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ConnectionInfo)
  connections?: ConnectionInfo[];
}

export class DeviceInfo {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SessionInfo)
  sessions?: SessionInfo[];
}

export class GetWhoIsResponse {
  @ValidateNested()
  @Type(() => Devices)
  devices?: Devices;

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

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Invite3pid)
  invite_3pid?: Invite3pid[];

  @IsBoolean() is_direct?: boolean;

  @IsString() name?: string;

  @IsString() preset?: string;

  @IsString() room_alias_name?: string;

  @IsString() topic?: string;

  @IsString() visibility?: VisibilityType;
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

export class Unsigned {
  @IsInt() age?: number;

  prev_content?: any;

  redacted_because?: any;

  @IsString() transaction_id?: string;
}

export class EventResponse {
  @IsString() event_id?: string;

  @IsInt() origin_server_ts?: number;

  @IsDefined()
  @IsString()
  room_id?: string;

  @IsString() sender?: string;

  @ValidateNested()
  @Type(() => Unsigned)
  unsigned?: Unsigned;

  content?: any;

  @IsString() state_key?: string;

  @IsString() type?: string;
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

export class _EventResponse {
  content?: any;

  @IsDefined()
  @IsString()
  type?: string;
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
  @IsString() event_id?: string;

  @IsInt() origin_server_ts?: number;

  @IsDefined()
  @IsString()
  room_id?: string;

  @IsString() sender?: string;

  @ValidateNested()
  @Type(() => Unsigned)
  unsigned?: Unsigned;

  content?: any;

  @IsString() state_key?: string;

  @IsString() type?: string;
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
  @Type(() => _EventResponse)
  account_data?: _EventResponse[];

  @IsDefined()
  @ValidateNested()
  @Type(() => InviteEventResponse)
  invite?: InviteEventResponse;

  @IsDefined()
  @IsString()
  membership?: string;

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
  @Type(() => _EventResponse)
  account_data?: _EventResponse[];

  @IsDefined()
  @IsString()
  end?: string;

  @IsDefined()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => _EventResponse)
  presence?: _EventResponse[];

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
  @ValidateNested()
  @Type(() => Signed)
  signed?: Signed;
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

export class OneTimeKeys {
  [key: string]: any;
}

export class ClaimKeysBody {
  @IsDefined()
  @ValidateNested()
  @Type(() => OneTimeKeys)
  one_time_keys?: OneTimeKeys;

  @IsInt() timeout?: number;
}

export class Failures {
  [key: string]: any;
}

export class ClaimKeysResponse {
  @ValidateNested()
  @Type(() => Failures)
  failures?: Failures;

  @ValidateNested()
  @Type(() => OneTimeKeys)
  one_time_keys?: OneTimeKeys;
}

export class DeviceKeys {
  [key: string]: any;
}

export class QueryKeysBody {
  @IsDefined()
  @ValidateNested()
  @Type(() => DeviceKeys)
  device_keys?: DeviceKeys;

  @IsInt() timeout?: number;

  @IsString() token?: string;
}

export class UnsignedDeviceInfo {
  @IsString() device_display_name?: string;
}

export class __DeviceKeys {
  @ValidateNested()
  @Type(() => UnsignedDeviceInfo)
  unsigned?: UnsignedDeviceInfo;
}

export class QueryKeysResponse {
  @ValidateNested()
  @Type(() => DeviceKeys)
  device_keys?: DeviceKeys;

  @ValidateNested()
  @Type(() => Failures)
  failures?: Failures;
}

export class Keys {
  [key: string]: any;
}

export class Signatures {
  [key: string]: any;
}

export class ___DeviceKeys {
  @IsDefined()
  @IsArray()
  @IsString({ each: true })
  algorithms?: string[];

  @IsDefined()
  @IsString()
  device_id?: string;

  @IsDefined()
  @ValidateNested()
  @Type(() => Keys)
  keys?: Keys;

  @IsDefined()
  @ValidateNested()
  @Type(() => Signatures)
  signatures?: Signatures;

  @IsDefined()
  @IsString()
  user_id?: string;
}

export class UploadKeysBody {
  @IsDefined()
  @ValidateNested()
  @Type(() => ___DeviceKeys)
  device_keys?: ___DeviceKeys;

  @ValidateNested()
  @Type(() => OneTimeKeys)
  one_time_keys?: OneTimeKeys;
}

export class OneTimeKeyCounts {
  [key: string]: any;
}

export class UploadKeysResponse {
  @IsDefined()
  @ValidateNested()
  @Type(() => OneTimeKeyCounts)
  one_time_key_counts?: OneTimeKeyCounts;
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

export class __EventResponse {
  content?: any;

  @IsString() event_id?: string;

  @IsInt() origin_server_ts?: number;

  @IsString() sender?: string;

  @IsString() state_key?: string;

  @IsString() type?: string;

  @ValidateNested()
  @Type(() => UnsignedResponse)
  unsigned?: UnsignedResponse;
}

export class NotificationResponse {
  @IsDefined()
  @IsArray()
  actions?: any[];

  @IsDefined()
  @ValidateNested()
  @Type(() => __EventResponse)
  event?: __EventResponse;

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

export class PresenceEventResponse {
  content?: any;

  @IsDefined()
  @IsString()
  type?: string;
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
  @IsString() generic_search_term?: string;
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
  @IsOptional()
  @ValidateNested()
  @Type(() => AuthenticationData)
  auth?: AuthenticationData;

  @IsBoolean() bind_email?: boolean;

  @IsString() device_id?: string;

  @IsString() initial_device_display_name?: string;

  @MinLength(2)
  @MaxLength(20)
  @IsString()
  password?: string;

  @MinLength(2)
  @MaxLength(20)
  @IsString()
  username?: string;
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

export class _RoomInfoResponse {
  @IsDefined()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => _EventResponse)
  account_data?: _EventResponse[];

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

export class _ThirdPartySigned {
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

export class JoinRoomByIdBody {
  @IsDefined()
  @ValidateNested()
  @Type(() => _ThirdPartySigned)
  third_party_signed?: _ThirdPartySigned;
}

export class JoinRoomByIdResponse429 {
  @IsDefined()
  @IsString()
  errcode?: string;

  @IsString() error?: string;
}

export class Joined {
  [key: string]: any;
}

export class RoomMember {
  @IsString() avatar_url?: string;

  @IsString() display_name?: string;
}

export class GetJoinedMembersByRoomResponse {
  @ValidateNested()
  @Type(() => Joined)
  joined?: Joined;
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

export class Groups {
  [key: string]: any;
}

export class GroupValue {
  @IsString() next_batch?: string;

  @IsInt() order?: number;

  @IsArray()
  @IsString({ each: true })
  results?: string[];
}

export class ProfileInfo {
  [key: string]: any;
}

export class UserProfile {
  @IsString() avatar_url?: string;

  @IsString() displayname?: string;
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

  @ValidateNested()
  @Type(() => ProfileInfo)
  profile_info?: ProfileInfo;

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

export class State {
  [key: string]: any;
}

export class _StateEvent {
  prev_content?: any;

  @IsDefined()
  @IsString()
  state_key?: string;
}

export class RoomEventResultsResponse {
  count?: number;

  @ValidateNested()
  @Type(() => Groups)
  groups?: Groups;

  @IsString() next_batch?: string;

  @IsDefined()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ResultResponse)
  results?: ResultResponse[];

  @ValidateNested()
  @Type(() => State)
  state?: State;
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

export class Messages {
  [key: string]: any;
}

export class SendToDeviceBody {
  @ValidateNested()
  @Type(() => Messages)
  messages?: Messages;
}

export class AccountDataResponse {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => __EventResponse)
  events?: __EventResponse[];
}

export class PresenceResponse {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => __EventResponse)
  events?: __EventResponse[];
}

export class Invite {
  [key: string]: any;
}

export class Event {
  content?: any;

  @IsString() event_id?: string;

  @IsInt() origin_server_ts?: number;

  @IsString() sender?: string;

  @IsString() state_key?: string;

  @IsString() type?: string;

  @ValidateNested()
  @Type(() => Unsigned)
  unsigned?: Unsigned;
}

export class InviteState {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Event)
  events?: Event[];
}

export class InvitedRoom {
  @ValidateNested()
  @Type(() => InviteState)
  invite_state?: InviteState;
}

export class Join {
  [key: string]: any;
}

export class AccountData {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Event)
  events?: Event[];
}

export class Ephemeral {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Event)
  events?: Event[];
}

export class _State {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Event)
  events?: Event[];
}

export class Timeline {
  @IsBoolean() limited?: boolean;

  @IsString() prev_batch?: string;
}

export class UnreadNotificationCounts {
  @IsInt() highlight_count?: number;

  @IsInt() notification_count?: number;
}

export class JoinedRoom {
  @ValidateNested()
  @Type(() => AccountData)
  account_data?: AccountData;

  @ValidateNested()
  @Type(() => Ephemeral)
  ephemeral?: Ephemeral;

  @ValidateNested()
  @Type(() => _State)
  state?: _State;

  @ValidateNested()
  @Type(() => Timeline)
  timeline?: Timeline;

  @ValidateNested()
  @Type(() => UnreadNotificationCounts)
  unread_notifications?: UnreadNotificationCounts;
}

export class Leave {
  [key: string]: any;
}

export class LeftRoom {
  @ValidateNested()
  @Type(() => _State)
  state?: _State;

  @ValidateNested()
  @Type(() => Timeline)
  timeline?: Timeline;
}

export class RoomsResponse {
  @ValidateNested()
  @Type(() => Invite)
  invite?: Invite;

  @ValidateNested()
  @Type(() => Join)
  join?: Join;

  @ValidateNested()
  @Type(() => Leave)
  leave?: Leave;
}

export class SyncResponse {
  @ValidateNested()
  @Type(() => AccountDataResponse)
  account_data?: AccountDataResponse;

  device_lists?: any;

  @IsString() next_batch?: string;

  @ValidateNested()
  @Type(() => PresenceResponse)
  presence?: PresenceResponse;

  @ValidateNested()
  @Type(() => RoomsResponse)
  rooms?: RoomsResponse;

  to_device?: any;
}

export class _Filter {
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

export class RoomEventFilter {
  @IsBoolean() contains_url?: boolean;

  @IsArray()
  @IsString({ each: true })
  not_rooms?: string[];

  @IsArray()
  @IsString({ each: true })
  rooms?: string[];

  @IsString() generic_search_term?: string;
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
  @Type(() => _Filter)
  account_data?: _Filter;

  @IsArray()
  @IsString({ each: true })
  event_fields?: string[];

  @IsString() event_format?: string;

  @ValidateNested()
  @Type(() => _Filter)
  presence?: _Filter;

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

  @IsString() generic_search_term?: string;
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

export class LogoutResponse {}