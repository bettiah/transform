import {
  MaxLength,
  Length,
  IsInt,
  IsDefined,
  IsIn,
  Equals,
  ValidateNested
} from 'class-validator';

// 2 types of RoomEvents : State Events or Message Events

export enum MessageEventType {
  redaction = 'm.room.redaction', // 10.5.7, 6.5.1.1
  message = 'm.room.message', // 11.2.1.1
  feedback = 'm.room.message.feedback', // 11.2.1.2
  //call events
  invite = 'm.call.invite', // 11.3.1.1
  candidates = 'm.call.candidates', // 11.3.1.2
  answer = 'm.call.answer', // 11.3.1.3
  hangup = 'm.call.hangup' // 11.3.1.4
}

// State Events have : state_key
export enum StateEventType {
  aliases = 'm.room.aliases',
  canonical_alias = 'm.room.canonical_alias',
  create = 'm.room.create',
  join_rules = 'm.room.join_rules',
  member = 'm.room.member',
  power_levels = 'm.room.power_levels',
  name = 'm.room.name',
  topic = 'm.room.topic',
  avatar = 'm.room.avatar',
  pinned_events = 'm.room.pinned_events'
}

// m.room.message type
export enum MsgType {
  text = 'm.text',
  emote = 'm.emote',
  notice = 'm.notice',
  image = 'm.image',
  file = 'm.file',
  location = 'm.location',
  video = 'm.video',
  audio = 'm.audio'
}

// generic event class
interface EventContent {
  [key: string]: any;
}
type EventType = StateEventType | MessageEventType | string;

export class Event {
  content?: EventContent; //	The fields in this object will vary depending on the type of event. When interacting with the REST API, this is the HTTP body.
  type!: EventType; //	Required. The type of event. This SHOULD be namespaced similar to Java package naming conventions e.g. 'com.example.subdomain.event.type'}
  [key: string]: any; // other k-v
}

export class RoomEvent {
  @ValidateNested() content?: EventContent; //	The fields in this object will vary depending on the type of event. When interacting with the REST API, this is the HTTP body.

  type!: EventType; //	Required. The type of event. This SHOULD be namespaced similar to Java package naming conventions e.g. 'com.example.subdomain.event.type'}

  // @Length(10, 256) // this is set later
  event_id!: string; //	Required. The globally unique event identifier.

  @Length(5, 256)
  room_id!: string; //	Required. The ID of the room associated with this event.

  @Length(5, 256)
  sender!: string; //	Required. Contains the fully-qualified ID of the user who sent this event.

  @IsInt() origin_server_ts!: number; //	Required. Timestamp in milliseconds on originating homeserver when this event was sent.

  unsigned?: UnsignedData; //	Contains optional extra information about the event.
}

//
// State Events
//
export class StateEvent extends RoomEvent {
  prev_content?: EventContent; //	Optional. The previous content for this event. If there is no previous content, this key will be missing.
  state_key!: string; //	Required. A unique key which defines the overwriting semantics for this piece of room state. This value is often a zero-length string. The presence of this key makes this event a State Event. The key MUST NOT start with '_'.
}

// 10.5.1
export class AliasEventContent {
  aliases!: [string]; //	Required. A list of room aliases.
}
// 10.5.2
export class CanonicalAliasEventContent {
  aliases!: string; //	Required. The canonical alias.
}
// 10.5.3
export class CreateRoomEventContent {
  creator!: string; // Required. The user_id of the room creator. This is set by the homeserver.
  'm.federate': boolean; // Whether users on other servers can join this room. Defaults to true if key does not exist.
}
export class CreateRoomEvent extends StateEvent {
  content!: CreateRoomEventContent;
}

// 10.5.4
export class JoinRulesEventContent {
  join_rule!: 'public' | 'knock' | 'invite' | 'private'; //Required. The type of rules used for users wishing to join this room
}
// 10.5.5
export class MemberEventContent {
  avatar_url?: string; //	The avatar URL for this user, if any. This is added by the homeserver.
  displayname?: string; // or null	The display name for this user, if any. This is added by the homeserver.
  membership?: 'invite' | 'join' | 'knock' | 'leave' | 'ban'; //	Required. The membership state of the user
  is_direct?: boolean; //	Flag indicating if the room containing this event was created with the intention of being a direct chat. See Direct Messaging.
  third_party_invite?: Invite;
}
export class Invite {
  display_name!: string; //	Required. A name which can be displayed to represent the user instead of their third party identifier
  signed!: Signed; //	Required. A block of content which has been signed, which servers can use to verify the event. Clients should ignore this.
}
export class Signed {
  mxid!: string; //	Required. The invited matrix user ID. Must be equal to the user_id property of the event.
  signatures!: Signatures; //	Required. A single signature from the verifying server, in the format specified by the Signing Events section of the server-server API.
  token!: string; //	Required. The token property of the containing third_party_invite object.
}
export class Signatures {
  [key: string]: any;
}
// 10.5.6
export class PowerLevelsEventContent {
  ban!: number; //	The level required to ban a user. Defaults to 50 if unspecified.
  events!: { string: number }; //The level required to send specific event types. This is a mapping from event type to power level required.
  events_default!: number; //	The default level required to send message events. Can be overridden by the events key. Defaults to 0 if unspecified.
  invite!: number; //	The level required to invite a user. Defaults to 50 if unspecified.
  kick!: number; //	The level required to kick a user. Defaults to 50 if unspecified.
  redact!: number; //	The level required to redact an event. Defaults to 50 if unspecified.
  state_default!: number; //	The default level required to send state events. Can be overridden by the events key. Defaults to 50 if unspecified, but 0 if there is no m.room.power_levels event at all.
  users!: { string: number }; //The power levels for specific users. This is a mapping from user_id to power level for that user.
  users_default!: number; //	The default power level for every user in the room, unless their user_id is mentioned in the users key. Defaults to 0 if unspecified.
}
// 10.5.7
export class RedactionEventContent {
  reason?: string; // The reason for the redaction, if any.
}

export class UnsignedData {
  age?: number; //	The time in milliseconds that has elapsed since the event was sent. This field is generated by the local homeserver, and may be incorrect if the local time on at least one of the two servers is out of sync, which can cause the age to either be negative or greater than it actually is.
  redacted_because?: Event; //	Optional. The event that redacted this event, if any.
  transaction_id?: string; //	The client-supplied transaction ID, if the client being given the event is the same one which sent it.
}

// 11.2.1.1
// export class MessageEventContent {
//   body!: string; //	Required. The textual representation of this message.
//   msgtype!: MsgType; //	Required. The type of message, e.g. m.image, m.text
// }

// 11.2.1.2
export class FeedbackEventContent {
  @IsDefined() target_event_id!: string; //	Required. The event that this feedback is related to.
  @IsIn(['delivered', 'read'])
  type!: 'delivered' | 'read'; //	Required. The type of feedback
}

// 11.2.1.3
export class NameEventContent {
  name!: string; //Required. The name of the room. This MUST NOT exceed 255 bytes.
}
// 11.2.1.4
export class TopicEventContent {
  topic!: string; //	Required. The topic text.
}
// 11.2.1.5
export class AvatarEventContent {
  info?: ImageInfo; //	Metadata about the image referred to in url.
  url!: string; //	Required. The URL to the image.
}
export class ImageInfo {
  h?: number; //	The height of the image in pixels.
  w?: number; //	The width of the image in pixels.
  mimetype?: string; //	The mimetype of the image, e.g. image/jpeg.
  size?: number; //	Size of the image in bytes.
  thumbnail_url?: string; //	The URL to a thumbnail of the image.
  thumbnail_info?: ThumbnailInfo; //	Metadata about the image referred to in thumbnail_url.
}
export class ThumbnailInfo {
  h?: number; //	The height of the image in pixels.
  w?: number; //	The width of the image in pixels.
  mimetype?: string; //	The mimetype of the image, e.g. image/jpeg.
  size?: number; //	Size of the image in bytes.
}
// 11.2.1.6
export class PinnedEventContent {
  pinned!: [string]; // Required. An ordered list of event IDs to pin.
}

//
// Message Events
//

// 11.2.1.7.1
export class TextEventContent {
  @IsDefined() body!: string; //	Required. The body of the message.
  @Equals(MsgType.text) msgtype!: string; //	Required.
}
// 11.2.1.7.2
export class EmoteEventContent {
  @IsDefined() body!: string; //	Required. The emote action to perform.
  @Equals(MsgType.emote) msgtype!: string; //	Required.
}
// 11.2.1.7.3
export class NoticeEventContent {
  @IsDefined() body!: string; //	Required. The notice text to send.
  @Equals(MsgType.notice) msgtype!: string; //	Required.
}
// 11.2.1.7.4
export class ImageEventContent {
  @IsDefined() body!: string; //	Required. A textual representation of the image. This could be the alt text of the image, the filename of the image, or some kind of content description for accessibility e.g. 'image attachment'.
  info?: ImageInfo; //	Metadata about the image referred to in url.
  @Equals(MsgType.image) msgtype!: string; //	Required. Must be 'm.image'.
  url!: string; //	Required. The URL to the image.
}
// 11.2.1.7.5
export class FileEventContent {
  @IsDefined() body!: string; //	Required. A human-readable description of the file. This is recommended to be the filename of the original upload.
  filename!: string; //	Required. The original filename of the uploaded file.
  info?: FileInfo; //	Information about the file referred to in url.
  @Equals(MsgType.file) msgtype!: string; //	Required. Must be 'm.file'.
  url!: string; //	Required. The URL to the file.
}
export class FileInfo {
  mimetype?: string; // The mimetype of the file e.g. application/msword.
  size?: number; // The size of the file in bytes.
  thumbnail_url?: string; // The URL to the thumbnail of the file.
  thumbnail_info?: ThumbnailInfo; // Metadata about the image referred to in thumbnail_url.
}
// 11.2.1.7.6
export class LocationEventContent {
  @IsDefined() body!: string; //	Required. A description of the location e.g. 'Big Ben, London, UK', or some kind of content description for accessibility e.g. 'location attachment'.
  geo_uri!: string; //	Required. A geo URI representing this location.
  @Equals(MsgType.location) msgtype!: string; //	Required. Must be 'm.location'.
  info!: LocationInfo; //
}
export class LocationInfo {
  thumbnail_url?: string; //	The URL to a thumbnail of the location being represented.
  thumbnail_info?: ThumbnailInfo; //	Metadata about the image referred to in thumbnail_url.
}
// 11.2.1.7.7
export class VideoEventContent {
  @IsDefined() body!: string; //	Required. A description of the video e.g. 'Gangnam style', or some kind of content description for accessibility e.g. 'video attachment'.
  info!: VideoInfo; //	Metadata about the video clip referred to in url.
  @Equals(MsgType.video) msgtype!: string; //	Required. Must be 'm.video'.
  url!: string; //	Required. The URL to the video clip.
}
export class VideoInfo {
  duration?: number; //	The duration of the video in milliseconds.
  h?: number; //	The height of the video in pixels.
  w?: number; //	The width of the video in pixels.
  mimetype?: string; //	The mimetype of the video e.g. video/mp4.
  size?: number; //	The size of the video in bytes.
  thumbnail_url?: string; //	The URL to an image thumbnail of the video clip.
  thumbnail_info?: ThumbnailInfo; //	Metadata about the image referred to in thumbnail_url.
}
// 11.2.1.7.8
export class AudioEventContent {
  body?: string; //	Required. A description of the audio e.g. 'Bee Gees - Stayin' Alive', or some kind of content description for accessibility e.g. 'audio attachment'.
  info?: AudioInfo; //	Metadata for the audio clip referred to in url.
  msgtype?: MsgType.audio; //	Required. Must be 'm.audio'.
  url?: string; //	Required. The URL to the audio clip.
}
export class AudioInfo {
  duration?: number; //	The duration of the audio in milliseconds.
  mimetype?: string; //	The mimetype of the audio e.g. audio/aac.
  size?: number; //	The size of the audio clip in bytes.
}

export type StateEventContent =
  | NameEventContent
  | TopicEventContent
  | AvatarEventContent
  | PinnedEventContent
  | AliasEventContent
  | CanonicalAliasEventContent
  | CreateRoomEventContent
  | JoinRulesEventContent
  | MemberEventContent
  | PowerLevelsEventContent;

export type MessageEventContent =
  | TextEventContent
  | EmoteEventContent
  | NoticeEventContent
  | ImageEventContent
  | FileEventContent
  | LocationEventContent
  | VideoEventContent
  | AudioEventContent
  | FeedbackEventContent
  | RedactionEventContent;
