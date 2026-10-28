import { Injectable, signal } from '@angular/core';

/** Keeps the access token in memory only (never in the URL or storage). */
@Injectable({ providedIn: 'root' })
export class TokenStore {
  readonly token = signal<string | null>(null);
}
