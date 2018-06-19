// map of queue name to timeline
export class QueueTimelines {
  [room_id: string]: { timeline: string; membership: string };
}

export const enum LoginType {
  password = 'm.login.password',
  recaptcha = 'm.login.recaptcha',
  oauth2 = 'm.login.oauth2',
  email = 'm.login.email.identity',
  token = 'm.login.token',
  dummy = 'm.login.dummy'
}

export const enum VisibilityType {
  public = 'public',
  private = 'private'
}

export const enum ErrorTypes {
  // standard
  M_FORBIDDEN = 'M_FORBIDDEN', //	Forbidden access, e.g. joining a room without permission, failed login.
  M_UNKNOWN_TOKEN = 'M_UNKNOWN_TOKEN', // The access token specified was not recognised.
  M_BAD_JSON = 'M_BAD_JSON', //	Request contained valid JSON, but it was malformed in some way, e.g. missing required keys, invalid values for keys.
  M_NOT_JSON = 'M_NOT_JSON', //	Request did not contain valid JSON.
  M_NOT_FOUND = 'M_NOT_FOUND', //	No resource was found for this request.
  M_LIMIT_EXCEEDED = 'M_LIMIT_EXCEEDED', // Too many requests have been sent in a short period of time. Wait a while then try again.

  M_USER_IN_USE = 'M_USER_IN_USE', //	Encountered when trying to register a user ID which has been taken.
  M_INVALID_USERNAME = 'M_INVALID_USERNAME', //  Encountered when trying to register a user ID which is not valid.
  M_ROOM_IN_USE = 'M_ROOM_IN_USE', //	Sent when the room alias given to the createRoom API is already in use.
  M_INVALID_ROOM_STATE = 'M_INVALID_ROOM_STATE', // 	Sent when the intial state given to the createRoom API is invalid.
  M_BAD_PAGINATION = 'M_BAD_PAGINATION', // 	Encountered when specifying bad pagination query parameters.
  M_THREEPID_IN_USE = 'M_THREEPID_IN_USE', // 	Sent when a threepid given to an API cannot be used because the same threepid is already in use.
  M_THREEPID_NOT_FOUND = 'M_THREEPID_NOT_FOUND', // 	Sent when a threepid given to an API cannot be used because no record matching the threepid was found.
  M_SERVER_NOT_TRUSTED = 'M_SERVER_NOT_TRUSTED' // 	The client's request used a third party server, eg. ID server, that this server does not trust.
}
