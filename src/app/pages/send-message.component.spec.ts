import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';
import SendMessageComponent from './send-message.component';
import { TokenStore } from '../token-store';

describe('SendMessageComponent', () => {
  let component: SendMessageComponent;
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting(), provideRouter([])],
    });
    TestBed.inject(TokenStore).token.set('token-123');
    component = TestBed.createComponent(SendMessageComponent).componentInstance;
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => http.verify());

  it('does not send an empty message', () => {
    component.send();
    http.expectNone(() => true);
  });

  it('sends the message and sticker with the bearer token', () => {
    component.message.set('Hello');
    component.send();

    const req = http.expectOne(() => true);
    expect(req.request.headers.get('Authorization')).toBe('Bearer token-123');
    const body = new URLSearchParams(req.request.body);
    expect(body.get('message')).toBe('Hello');
    expect(body.get('stickerPackageId')).toBe('446');
    req.flush({ status: 200 });

    expect(component.status()).toBe('sent');
    expect(component.message()).toBe('');
  });
});
