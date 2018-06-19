import {
  Event,
  MessageEventType,
  StateEventType,
  CreateRoomEvent,
  MessageEventMessgae,
  MemberEvent
} from './client-server/events';
import { handleCreateRoom } from './createRoomHandler';
import { handleMessage } from './messageHandler';
import { handleMember } from './memberHandler';

export function processEvent(ev: Event) {
  // console.log(key, ts, kind, ev);
  switch (ev.type) {
    case MessageEventType.redaction:
      break;
    case MessageEventType.message:
      return handleMessage(Object.assign(new MessageEventMessgae(), ev));
    case MessageEventType.feedback:
      break;
    case MessageEventType.call_invite:
      break;
    case MessageEventType.call_candidates:
      break;
    case MessageEventType.call_answer:
      break;
    case MessageEventType.call_hangup:
      break;
    case StateEventType.aliases:
      break;
    case StateEventType.canonical_alias:
      break;
    case StateEventType.create:
      return handleCreateRoom(Object.assign(new CreateRoomEvent(), ev));
    case StateEventType.join_rules:
      break;
    case StateEventType.member:
      return handleMember(Object.assign(new MemberEvent(), ev));
    case StateEventType.power_levels:
      break;
    case StateEventType.name:
      break;
    case StateEventType.topic:
      break;
    case StateEventType.avatar:
      break;
    case StateEventType.pinned_events:
      break;
  }
  return false;
}
