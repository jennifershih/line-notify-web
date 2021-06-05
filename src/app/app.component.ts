import { Component } from '@angular/core';
import { Sticker, stickers } from '../shared/models/sticker';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  lineNotifyApi: string = 'http://localhost:8010/proxy/api/notify';
  lineAccessToken: string = '';
  message: string = '';
  stickers: Sticker[] = stickers;
  selectedSticker: Sticker = this.stickers[0];

  handleSubmit() {
    const params = new URLSearchParams();
    params.append('message', this.message);
    params.append('stickerPackageId', `${this.selectedSticker.packageId}`);
    params.append('stickerId', `${this.selectedSticker.id}`);
    const authorization = `Bearer ${this.lineAccessToken}`;
    const contentType = 'application/x-www-form-urlencoded';

    fetch(this.lineNotifyApi, {
      method: 'POST',
      headers: {
        'Authorization': authorization,
        'Content-Type': contentType
      },
      body: params,
    }).then((response) => {
      return response.json();
    }).catch((error) => {
      console.error(error);
    }).then((json) => {
      console.log(json);
    })
  }
}