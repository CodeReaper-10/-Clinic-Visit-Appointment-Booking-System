import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { RegisterLoginDialogComponent } from '../register-login-dialog/register-login-dialog.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent {
  constructor(private dialog: MatDialog, private router: Router) {}

  openRegisterLoginDialog(): void {
    const dialogRef: MatDialogRef<any> = this.dialog.open(RegisterLoginDialogComponent, {
      width: '300px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'register') {
        this.router.navigate(['/register']);
      }

      else if (result === 'login') {
        this.router.navigate(['/login']);
      }
    });
  }
}