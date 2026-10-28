import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { TokenStore } from '../token-store';
import { Sticker, STICKER_PACKAGES, stickerImage } from '../models/stickers';

@Component({
  selector: 'app-send-message',
  imports: [FormsModule],
  templateUrl: './send-message.component.html',
  styleUrl: './send-message.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class SendMessageComponent implements OnInit {
  private readonly http = inject(HttpClient);
  private readonly router = inject(Router);
  private readonly tokens = inject(TokenStore);

  readonly packages = STICKER_PACKAGES;
  readonly image = stickerImage;
  readonly message = signal('');
  readonly selected = signal<Sticker>(STICKER_PACKAGES[0].stickers[0]);
  readonly status = signal<'idle' | 'sending' | 'sent' | 'error'>('idle');

  ngOnInit(): void {
    if (!this.tokens.token()) {
      void this.router.navigate(['/login']);
    }
  }

  send(): void {
    const message = this.message().trim();
    if (!message || this.status() === 'sending') {
      return;
    }

    const body = new URLSearchParams({
      message,
      stickerPackageId: String(this.selected().packageId),
      stickerId: String(this.selected().id),
    });
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.tokens.token()}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    });

    this.status.set('sending');
    this.http.post(environment.notifyApiUrl, body.toString(), { headers }).subscribe({
      next: () => {
        this.status.set('sent');
        this.message.set('');
      },
      error: () => this.status.set('error'),
    });
  }
}
