import { ChangeDetectionStrategy, Component } from '@angular/core';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-login',
  template: `<a class="button" [href]="authorizeUrl">登入 LINE</a>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class LoginComponent {
  readonly authorizeUrl = buildAuthorizeUrl(crypto.randomUUID());
}

/** https://notify-bot.line.me/doc/en/ — OAuth2 authorize endpoint. */
export function buildAuthorizeUrl(state: string): string {
  sessionStorage.setItem('oauth-state', state);
  const params = new URLSearchParams({
    response_type: 'code',
    client_id: environment.lineClientId,
    redirect_uri: environment.redirectUri,
    scope: 'notify',
    state,
  });
  return `https://notify-bot.line.me/oauth/authorize?${params}`;
}
