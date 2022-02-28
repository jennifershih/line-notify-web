import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-callback',
  templateUrl: './callback.component.html',
  styleUrls: ['./callback.component.scss']
})
export class CallbackComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const code = this.route.snapshot.queryParamMap.get('code');
    if (code == null) {
      this.router.navigate(['/login']);
      return;
    }

    const endpoint = 'http://localhost:8011/proxy/oauth/token';
    const params = new URLSearchParams();
    const contentType = 'application/x-www-form-urlencoded';
    params.append('grant_type', 'authorization_code');
    params.append('code', code);
    params.append('redirect_uri', 'http://localhost:4200/callback');
    params.append('client_id', 'H43VXIzhiLi5jAEYE2dim5');
    params.append('client_secret', '9H1suHxpZgABAC8BCExjpFh4suRGFXqqxbDraw1GzZy');

    fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': contentType },
      body: params,
    }).then((response) => {
      return response.json();
    }).catch((error) => {
      console.error(error);
    }).then((json) => {
      const accessToken = json.access_token;
      this.router.navigate(['/send-message'], { queryParams: { access_token: accessToken } });
    })
  }
}
