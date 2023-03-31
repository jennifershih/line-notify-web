import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  // https://notify-bot.line.me/doc/en/
  private lineLoginUrl = 'https://notify-bot.line.me/oauth/authorize';
  private lineLoginResponseType = 'code';
  private lineLoginClientId = 'H43VXIzhiLi5jAEYE2dim5';
  private lineLoginRedirectUri = 'http://localhost:4200/callback';
  private lineLoginScope = 'notify';
  private lineLoginState = 'random-string-here';
  lineLoginHref = `${this.lineLoginUrl}?response_type=${this.lineLoginResponseType}&client_id=${this.lineLoginClientId}&redirect_uri=${this.lineLoginRedirectUri}&scope=${this.lineLoginScope}&state=${this.lineLoginState}`;
}
