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
  HeaderParam,
  UnauthorizedError
} from 'routing-controllers';

import * as dto from './types';
import { User } from '../model';

@JsonController('')
export class MatrixClientR0Pushrules {
  @Get('/_matrix/client/r0/pushrules/')
  async getPushRules(
    @CurrentUser() user?: User
  ): Promise<dto.GetPushRulesResponse | any> {
    return {
      device: {},
      global: {
        content: [
          {
            default: true,
            pattern: 'w1',
            enabled: true,
            rule_id: '.m.rule.contains_user_name',
            actions: [
              'notify',
              { set_tweak: 'sound', value: 'default' },
              { set_tweak: 'highlight' }
            ]
          }
        ],
        override: [
          {
            default: true,
            enabled: false,
            conditions: [],
            rule_id: '.m.rule.master',
            actions: ['dont_notify']
          },
          {
            default: true,
            enabled: true,
            conditions: [
              {
                pattern: 'm.notice',
                kind: 'event_match',
                key: 'content.msgtype'
              }
            ],
            rule_id: '.m.rule.suppress_notices',
            actions: ['dont_notify']
          },
          {
            default: true,
            enabled: true,
            conditions: [
              { pattern: 'm.room.member', kind: 'event_match', key: 'type' },
              {
                pattern: 'invite',
                kind: 'event_match',
                key: 'content.membership'
              },
              {
                pattern: '@w1:my.matrix.host',
                kind: 'event_match',
                key: 'state_key'
              }
            ],
            rule_id: '.m.rule.invite_for_me',
            actions: [
              'notify',
              { set_tweak: 'sound', value: 'default' },
              { set_tweak: 'highlight', value: false }
            ]
          },
          {
            default: true,
            enabled: true,
            conditions: [
              { pattern: 'm.room.member', kind: 'event_match', key: 'type' }
            ],
            rule_id: '.m.rule.member_event',
            actions: ['dont_notify']
          },
          {
            default: true,
            enabled: true,
            conditions: [{ kind: 'contains_display_name' }],
            rule_id: '.m.rule.contains_display_name',
            actions: [
              'notify',
              { set_tweak: 'sound', value: 'default' },
              { set_tweak: 'highlight' }
            ]
          },
          {
            default: true,
            enabled: true,
            conditions: [
              { pattern: '@room', kind: 'event_match', key: 'content.body' },
              { kind: 'sender_notification_permission', key: 'room' }
            ],
            rule_id: '.m.rule.roomnotif',
            actions: ['notify', { set_tweak: 'highlight', value: true }]
          }
        ],
        sender: [],
        room: [],
        underride: [
          {
            default: true,
            enabled: true,
            conditions: [
              { pattern: 'm.call.invite', kind: 'event_match', key: 'type' }
            ],
            rule_id: '.m.rule.call',
            actions: [
              'notify',
              { set_tweak: 'sound', value: 'ring' },
              { set_tweak: 'highlight', value: false }
            ]
          },
          {
            default: true,
            enabled: true,
            conditions: [
              { kind: 'room_member_count', is: '2' },
              { pattern: 'm.room.message', kind: 'event_match', key: 'type' }
            ],
            rule_id: '.m.rule.room_one_to_one',
            actions: [
              'notify',
              { set_tweak: 'sound', value: 'default' },
              { set_tweak: 'highlight', value: false }
            ]
          },
          {
            default: true,
            enabled: true,
            conditions: [
              { kind: 'room_member_count', is: '2' },
              { pattern: 'm.room.encrypted', kind: 'event_match', key: 'type' }
            ],
            rule_id: '.m.rule.encrypted_room_one_to_one',
            actions: [
              'notify',
              { set_tweak: 'sound', value: 'default' },
              { set_tweak: 'highlight', value: false }
            ]
          },
          {
            default: true,
            enabled: true,
            conditions: [
              { pattern: 'm.room.message', kind: 'event_match', key: 'type' }
            ],
            rule_id: '.m.rule.message',
            actions: ['notify', { set_tweak: 'highlight', value: false }]
          },
          {
            default: true,
            enabled: true,
            conditions: [
              { pattern: 'm.room.encrypted', kind: 'event_match', key: 'type' }
            ],
            rule_id: '.m.rule.encrypted',
            actions: ['notify', { set_tweak: 'highlight', value: false }]
          }
        ]
      }
    };
    // throw new HttpError(501);
  }
}
