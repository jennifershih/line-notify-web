import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  template: `
    <h1>LINE Notify Web</h1>
    <p class="notice">
      LINE Notify ended on 31 March 2025, so this app can no longer send messages. It is kept as a
      portfolio sample of an OAuth flow in Angular.
    </p>
    <main><router-outlet /></main>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {}
