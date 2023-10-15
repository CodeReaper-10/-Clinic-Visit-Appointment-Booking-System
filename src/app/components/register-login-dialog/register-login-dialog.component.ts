import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-register-login-dialog',
  templateUrl: './register-login-dialog.component.html',
  styleUrls: ['./register-login-dialog.component.css']
})
export class RegisterLoginDialogComponent {
  constructor(public dialogRef: MatDialogRef<RegisterLoginDialogComponent>) {}

  onRegisterClick(): void {
    this.dialogRef.close('register');
  }

  onLoginClick(): void {
    this.dialogRef.close('login');
  }
}