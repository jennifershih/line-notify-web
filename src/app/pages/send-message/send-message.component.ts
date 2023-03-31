import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Sticker } from 'src/shared/models/sticker';
import {
  StickerPackage,
  stickerPackages,
} from 'src/shared/models/sticker-package';

@Component({
  selector: 'app-send-message',
  templateUrl: './send-message.component.html',
  styleUrls: ['./send-message.component.scss'],
})
export class SendMessageComponent implements OnInit {
  message: string = '';
  stickerPackages: StickerPackage[] = stickerPackages;
  selectedSticker: Sticker = this.stickerPackages[0].stickers[0];

  private lineAccessToken: string = '';

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    const accessToken = this.route.snapshot.queryParamMap.get('access_token');
    if (accessToken == null) {
      this.router.navigate(['/login']);
      return;
    }

    this.lineAccessToken = accessToken;
  }

  handleStickerSelected(sticker: Sticker) {
    this.selectedSticker = sticker;
  }

  generateDataBsTarget(stickerPackage: StickerPackage) {
    return `#${this.generateCollapseId(stickerPackage)}`;
  }

  generateCollapseId(stickerPackage: StickerPackage) {
    return `sticker-package-${stickerPackage.id}-collapse`;
  }

  handleSubmit() {
    const endpoint = 'http://localhost:8010/proxy/api/notify';
    const params = new URLSearchParams();
    const contentType = 'application/x-www-form-urlencoded';
    const authorization = `Bearer ${this.lineAccessToken}`;
    params.append('message', this.message);
    params.append('stickerPackageId', `${this.selectedSticker.packageId}`);
    params.append('stickerId', `${this.selectedSticker.id}`);

    fetch(endpoint, {
      method: 'POST',
      headers: {
        Authorization: authorization,
        'Content-Type': contentType,
      },
      body: params,
    })
      .then((response) => {
        return response.json();
      })
      .catch((error) => {
        console.error(error);
      })
      .then((json) => {
        console.log(json);
      });
  }
}
