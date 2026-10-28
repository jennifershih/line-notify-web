export const environment = {
  /** LINE Notify OAuth client id (public). */
  lineClientId: 'H43VXIzhiLi5jAEYE2dim5',
  redirectUri: 'http://localhost:4200/callback',
  /**
   * A small backend that exchanges the OAuth code for a token. The client
   * secret must never ship in front-end code, so it lives on that server.
   */
  tokenExchangeUrl: 'http://localhost:8011/oauth/token',
  notifyApiUrl: 'http://localhost:8010/proxy/api/notify',
};
