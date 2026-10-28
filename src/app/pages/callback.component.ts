import { ChangeDetectionStrategy, Component, inject, input, OnInit, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { TokenStore } from '../token-store';

@Component({
  selector: 'app-callback',
  template: `
    @if (error()) {
      <p class="alert error">{{ error() }}</p>
    } @else {
      <p class="alert">Authorizing…</p>
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class CallbackComponent implements OnInit {
  private readonly http = inject(HttpClient);
  private readonly router = inject(Router);
  private readonly tokens = inject(TokenStore);

  /** Query parameters bound by the router. */
  readonly code = input<string>();
  readonly state = input<string>();
  readonly error = signal('');

  ngOnInit(): void {
    const expectedState = sessionStorage.getItem('oauth-state');
    sessionStorage.removeItem('oauth-state');
    if (!this.code() || !this.state() || this.state() !== expectedState) {
      void this.router.navigate(['/login']);
      return;
    }

    this.http
      .post<{ access_token: string }>(environment.tokenExchangeUrl, {
        code: this.code(),
        redirect_uri: environment.redirectUri,
      })
      .subscribe({
        next: ({ access_token }) => {
          this.tokens.token.set(access_token);
          void this.router.navigate(['/send-message']);
        },
        error: () => this.error.set('登入失敗，請再試一次。'),
      });
  }
}
