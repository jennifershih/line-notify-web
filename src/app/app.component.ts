import { Component } from '@angular/core';
import { StickerPackage, stickerPackages } from 'src/shared/models/sticker-package';
import { Sticker } from '../shared/models/sticker';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  lineNotifyApi: string = 'http://localhost:8010/proxy/api/notify';
  lineAccessToken: string = '';
  message: string = '';
  stickerPackages: StickerPackage[] = stickerPackages;
  selectedSticker: Sticker = this.stickerPackages[0].stickers[0];

  handleStickerSelected(sticker: Sticker) {
    this.selectedSticker = sticker
  }

  generateDataBsTarget(stickerPackage: StickerPackage) {
    return `#${this.generateCollapseId(stickerPackage)}`
  }

  generateCollapseId(stickerPackage: StickerPackage) {
    return `sticker-package-${stickerPackage.id}-collapse`
  }

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