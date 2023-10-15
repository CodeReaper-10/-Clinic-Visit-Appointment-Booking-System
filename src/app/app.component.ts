import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'CVABS-PORTAL';

  constructor(private authService: AuthenticationService) {}

  ngOnInit(): void {
    // Re-initiate auto logout if page is refreshed
    const tokenExpiration = localStorage.getItem('tokenExpiration');
    if (tokenExpiration) {
      const expirationTime = parseInt(tokenExpiration, 10);
      this.authService.autoLogout(expirationTime);
    }
  }
}