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
  M_ROOM_IN_USE = 'M_ROOM_IN_USE'
}
