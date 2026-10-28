import { buildAuthorizeUrl } from './login.component';

describe('buildAuthorizeUrl', () => {
  it('builds the LINE authorize URL and remembers the state', () => {
    const url = new URL(buildAuthorizeUrl('abc'));
    expect(url.origin + url.pathname).toBe('https://notify-bot.line.me/oauth/authorize');
    expect(url.searchParams.get('response_type')).toBe('code');
    expect(url.searchParams.get('scope')).toBe('notify');
    expect(url.searchParams.get('state')).toBe('abc');
    expect(sessionStorage.getItem('oauth-state')).toBe('abc');
  });
});
