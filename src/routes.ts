import { MatrixClientR0Account3pid } from './_matrix.client.r0.account.3pid';
import { MatrixClientR0AccountDeactivate } from './_matrix.client.r0.account.deactivate';
import { MatrixClientR0AccountPassword } from './_matrix.client.r0.account.password';
import { MatrixClientR0AccountWhoami } from './_matrix.client.r0.account.whoami';
import { MatrixClientR0AdminWhoisUserId } from './_matrix.client.r0.admin.whois.{userId}';
import { MatrixClientR0CreateRoom } from './_matrix.client.r0.createRoom';
import { MatrixClientR0DeleteDevices } from './_matrix.client.r0.delete_devices';
import { MatrixClientR0Devices } from './_matrix.client.r0.devices';
import { MatrixClientR0DevicesDeviceId } from './_matrix.client.r0.devices.{deviceId}';
import { MatrixClientR0DirectoryRoomRoomAlias } from './_matrix.client.r0.directory.room.{roomAlias}';
import { MatrixClientR0Events } from './_matrix.client.r0.events';
import { MatrixClientR0EventsEventId } from './_matrix.client.r0.events.{eventId}';
import { MatrixClientR0InitialSync } from './_matrix.client.r0.initialSync';
import { MatrixClientR0JoinRoomIdOrAlias } from './_matrix.client.r0.join.{roomIdOrAlias}';
import { MatrixClientR0JoinedRooms } from './_matrix.client.r0.joined_rooms';
import { MatrixClientR0KeysChanges } from './_matrix.client.r0.keys.changes';
import { MatrixClientR0KeysClaim } from './_matrix.client.r0.keys.claim';
import { MatrixClientR0KeysQuery } from './_matrix.client.r0.keys.query';
import { MatrixClientR0KeysUpload } from './_matrix.client.r0.keys.upload';
import { MatrixClientR0Login } from './_matrix.client.r0.login';
import { MatrixClientR0Logout } from './_matrix.client.r0.logout';
import { MatrixClientR0Notifications } from './_matrix.client.r0.notifications';
import { MatrixClientR0PresenceListUserId } from './_matrix.client.r0.presence.list.{userId}';
import { MatrixClientR0PresenceUserIdStatus } from './_matrix.client.r0.presence.{userId}.status';
import { MatrixClientR0ProfileUserId } from './_matrix.client.r0.profile.{userId}';
import { MatrixClientR0ProfileUserIdAvatarUrl } from './_matrix.client.r0.profile.{userId}.avatar_url';
import { MatrixClientR0ProfileUserIdDisplayname } from './_matrix.client.r0.profile.{userId}.displayname';
import { MatrixClientR0PublicRooms } from './_matrix.client.r0.publicRooms';
import { MatrixClientR0Pushers } from './_matrix.client.r0.pushers';
import { MatrixClientR0PushersSet } from './_matrix.client.r0.pushers.set';
import { MatrixClientR0Pushrules } from './_matrix.client.r0.pushrules.';
import { MatrixClientR0PushrulesScopeKindRuleId } from './_matrix.client.r0.pushrules.{scope}.{kind}.{ruleId}';
import { MatrixClientR0PushrulesScopeKindRuleIdActions } from './_matrix.client.r0.pushrules.{scope}.{kind}.{ruleId}.actions';
import { MatrixClientR0PushrulesScopeKindRuleIdEnabled } from './_matrix.client.r0.pushrules.{scope}.{kind}.{ruleId}.enabled';
import { MatrixClientR0Register } from './_matrix.client.r0.register';
import { MatrixClientR0RegisterAvailable } from './_matrix.client.r0.register.available';
import { MatrixClientR0RoomsRoomIdBan } from './_matrix.client.r0.rooms.{roomId}.ban';
import { MatrixClientR0RoomsRoomIdContextEventId } from './_matrix.client.r0.rooms.{roomId}.context.{eventId}';
import { MatrixClientR0RoomsRoomIdEventEventId } from './_matrix.client.r0.rooms.{roomId}.event.{eventId}';
import { MatrixClientR0RoomsRoomIdForget } from './_matrix.client.r0.rooms.{roomId}.forget';
import { MatrixClientR0RoomsRoomIdInitialSync } from './_matrix.client.r0.rooms.{roomId}.initialSync';
import { MatrixClientR0RoomsRoomIdInvite } from './_matrix.client.r0.rooms.{roomId}.invite ';
import { MatrixClientR0RoomsRoomIdJoin } from './_matrix.client.r0.rooms.{roomId}.join';
import { MatrixClientR0RoomsRoomIdJoinedMembers } from './_matrix.client.r0.rooms.{roomId}.joined_members';
import { MatrixClientR0RoomsRoomIdKick } from './_matrix.client.r0.rooms.{roomId}.kick';
import { MatrixClientR0RoomsRoomIdLeave } from './_matrix.client.r0.rooms.{roomId}.leave';
import { MatrixClientR0RoomsRoomIdMembers } from './_matrix.client.r0.rooms.{roomId}.members';
import { MatrixClientR0RoomsRoomIdMessages } from './_matrix.client.r0.rooms.{roomId}.messages';
import { MatrixClientR0RoomsRoomIdReceiptReceiptTypeEventId } from './_matrix.client.r0.rooms.{roomId}.receipt.{receiptType}.{eventId}';
import { MatrixClientR0RoomsRoomIdRedactEventIdTxnId } from './_matrix.client.r0.rooms.{roomId}.redact.{eventId}.{txnId}';
import { MatrixClientR0RoomsRoomIdSendEventTypeTxnId } from './_matrix.client.r0.rooms.{roomId}.send.{eventType}.{txnId}';
import { MatrixClientR0RoomsRoomIdState } from './_matrix.client.r0.rooms.{roomId}.state';
import { MatrixClientR0RoomsRoomIdStateEventType } from './_matrix.client.r0.rooms.{roomId}.state.{eventType}';
import { MatrixClientR0RoomsRoomIdStateEventTypeStateKey } from './_matrix.client.r0.rooms.{roomId}.state.{eventType}.{stateKey}';
import { MatrixClientR0RoomsRoomIdTypingUserId } from './_matrix.client.r0.rooms.{roomId}.typing.{userId}';
import { MatrixClientR0RoomsRoomIdUnban } from './_matrix.client.r0.rooms.{roomId}.unban';
import { MatrixClientR0Search } from './_matrix.client.r0.search';
import { MatrixClientR0SendToDeviceEventTypeTxnId } from './_matrix.client.r0.sendToDevice.{eventType}.{txnId}';
import { MatrixClientR0Sync } from './_matrix.client.r0.sync';
import { MatrixClientR0UserUserIdAccountDataType } from './_matrix.client.r0.user.{userId}.account_data.{type}';
import { MatrixClientR0UserUserIdFilter } from './_matrix.client.r0.user.{userId}.filter';
import { MatrixClientR0UserUserIdFilterFilterId } from './_matrix.client.r0.user.{userId}.filter.{filterId}';
import { MatrixClientR0UserUserIdRoomsRoomIdAccountDataType } from './_matrix.client.r0.user.{userId}.rooms.{roomId}.account_data.{type}';
import { MatrixClientR0UserUserIdRoomsRoomIdTags } from './_matrix.client.r0.user.{userId}.rooms.{roomId}.tags';
import { MatrixClientR0UserUserIdRoomsRoomIdTagsTag } from './_matrix.client.r0.user.{userId}.rooms.{roomId}.tags.{tag}';
import { MatrixClientR0UserDirectorySearch } from './_matrix.client.r0.user_directory.search';
import { MatrixClientR0VoipTurnServer } from './_matrix.client.r0.voip.turnServer';
import { MatrixClientVersions } from './_matrix.client.versions';
import { MatrixMediaR0DownloadServerNameMediaId } from './_matrix.media.r0.download.{serverName}.{mediaId}';
import { MatrixMediaR0DownloadServerNameMediaIdFileName } from './_matrix.media.r0.download.{serverName}.{mediaId}.{fileName}';
import { MatrixMediaR0PreviewUrl } from './_matrix.media.r0.preview_url';
import { MatrixMediaR0ThumbnailServerNameMediaId } from './_matrix.media.r0.thumbnail.{serverName}.{mediaId}';
import { MatrixMediaR0Upload } from './_matrix.media.r0.upload';
export default [
  MatrixClientR0Account3pid,
  MatrixClientR0AccountDeactivate,
  MatrixClientR0AccountPassword,
  MatrixClientR0AccountWhoami,
  MatrixClientR0AdminWhoisUserId,
  MatrixClientR0CreateRoom,
  MatrixClientR0DeleteDevices,
  MatrixClientR0Devices,
  MatrixClientR0DevicesDeviceId,
  MatrixClientR0DirectoryRoomRoomAlias,
  MatrixClientR0Events,
  MatrixClientR0EventsEventId,
  MatrixClientR0InitialSync,
  MatrixClientR0JoinRoomIdOrAlias,
  MatrixClientR0JoinedRooms,
  MatrixClientR0KeysChanges,
  MatrixClientR0KeysClaim,
  MatrixClientR0KeysQuery,
  MatrixClientR0KeysUpload,
  MatrixClientR0Login,
  MatrixClientR0Logout,
  MatrixClientR0Notifications,
  MatrixClientR0PresenceListUserId,
  MatrixClientR0PresenceUserIdStatus,
  MatrixClientR0ProfileUserId,
  MatrixClientR0ProfileUserIdAvatarUrl,
  MatrixClientR0ProfileUserIdDisplayname,
  MatrixClientR0PublicRooms,
  MatrixClientR0Pushers,
  MatrixClientR0PushersSet,
  MatrixClientR0Pushrules,
  MatrixClientR0PushrulesScopeKindRuleId,
  MatrixClientR0PushrulesScopeKindRuleIdActions,
  MatrixClientR0PushrulesScopeKindRuleIdEnabled,
  MatrixClientR0Register,
  MatrixClientR0RegisterAvailable,
  MatrixClientR0RoomsRoomIdBan,
  MatrixClientR0RoomsRoomIdContextEventId,
  MatrixClientR0RoomsRoomIdEventEventId,
  MatrixClientR0RoomsRoomIdForget,
  MatrixClientR0RoomsRoomIdInitialSync,
  MatrixClientR0RoomsRoomIdInvite,
  MatrixClientR0RoomsRoomIdJoin,
  MatrixClientR0RoomsRoomIdJoinedMembers,
  MatrixClientR0RoomsRoomIdKick,
  MatrixClientR0RoomsRoomIdLeave,
  MatrixClientR0RoomsRoomIdMembers,
  MatrixClientR0RoomsRoomIdMessages,
  MatrixClientR0RoomsRoomIdReceiptReceiptTypeEventId,
  MatrixClientR0RoomsRoomIdRedactEventIdTxnId,
  MatrixClientR0RoomsRoomIdSendEventTypeTxnId,
  MatrixClientR0RoomsRoomIdState,
  MatrixClientR0RoomsRoomIdStateEventType,
  MatrixClientR0RoomsRoomIdStateEventTypeStateKey,
  MatrixClientR0RoomsRoomIdTypingUserId,
  MatrixClientR0RoomsRoomIdUnban,
  MatrixClientR0Search,
  MatrixClientR0SendToDeviceEventTypeTxnId,
  MatrixClientR0Sync,
  MatrixClientR0UserUserIdAccountDataType,
  MatrixClientR0UserUserIdFilter,
  MatrixClientR0UserUserIdFilterFilterId,
  MatrixClientR0UserUserIdRoomsRoomIdAccountDataType,
  MatrixClientR0UserUserIdRoomsRoomIdTags,
  MatrixClientR0UserUserIdRoomsRoomIdTagsTag,
  MatrixClientR0UserDirectorySearch,
  MatrixClientR0VoipTurnServer,
  MatrixClientVersions,
  MatrixMediaR0DownloadServerNameMediaId,
  MatrixMediaR0DownloadServerNameMediaIdFileName,
  MatrixMediaR0PreviewUrl,
  MatrixMediaR0ThumbnailServerNameMediaId,
  MatrixMediaR0Upload
];
