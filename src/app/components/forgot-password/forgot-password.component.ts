import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PatientService } from 'src/app/services/patient.service';
import { PasswordResetRequest } from 'src/app/models/password-reset-request.model';
import { Router } from '@angular/router';
import { AlertDialogComponent } from '../alert-dialog/alert-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css'],
  animations: [
    trigger('slideIn', [
      state('void', style({ transform: 'translateX(100%)' })),
      state('*', style({ transform: 'translateX(0)' })),
      transition(':enter', animate('300ms cubic-bezier(0.68, -0.55, 0.27, 1.55)'))
    ]),
    trigger('slideOut', [
      state('*', style({ transform: 'translateX(0)' })),
      state('void', style({ transform: 'translateX(-100%)' })),
      transition(':leave', animate('300ms cubic-bezier(0.68, -0.55, 0.27, 1.55)'))
    ])
  ]
})
export class ForgotPasswordComponent {
  hidePassword = true; // Initially, password is hidden
  showForgotPasswordForm = true; // Initialize it to true to show the initial form
  showOTPForm = false;
  showResetPasswordForm = false;
  isLoading = false;
  private username = '';
  private otp = 0;
  private otpAttempt = 5;

  constructor(private snackBar: MatSnackBar, private patService: PatientService, private router: Router, private dialog: MatDialog) {}

  showAlert(error: any) {
    const dialogRef = this.dialog.open(AlertDialogComponent, {
      width: '400px',
      data: error,
    });

    setTimeout(() => {
      dialogRef.close();
    }, 5000);
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 10000 // Show snackbar for 10 seconds
    });
  }

  togglePasswordVisibility() {
    this.hidePassword = !this.hidePassword;
  }

  toggleOTPForm() {
    this.showForgotPasswordForm = !this.showForgotPasswordForm;
    setTimeout(() => {
      this.showOTPForm = !this.showOTPForm;
    }, 300);
  }
  
  toggleResetPasswordForm() {
    this.showOTPForm = !this.showOTPForm;
    setTimeout(() => {
      this.showResetPasswordForm = !this.showResetPasswordForm;
    }, 300);
  }

  undoToggleResetPasswordForm() {
    this.showResetPasswordForm = !this.showResetPasswordForm;
    setTimeout(() => {
      this.showOTPForm = !this.showOTPForm;
    }, 300);
    if(this.otpAttempt > 0) {
      this.otpAttempt -= 1;
    }
  }

  onForgotPasswordFormSubmit(forgotPasswordForm: NgForm) {
    if(forgotPasswordForm.valid) {
      const formData = forgotPasswordForm.value;
      this.isLoading = true;
      this.patService.forgotPassword(formData.username, formData.email).subscribe({
        next: (response) => {
          this.username = formData.username;
          this.openSnackBar(response, "OK");
          this.isLoading = false;
          this.toggleOTPForm();
        },
        error: (error) => {
          this.showAlert(error);
          this.isLoading = false;
        }
      });
    }
  }

  onOTPFormSubmit(otpForm: NgForm) {
    if(otpForm.valid) {
      const formData = otpForm.value;
      this.otp = formData.otp;
      this.toggleResetPasswordForm();
    }
  }

  onResetPasswordForm(resetPasswordForm: NgForm) {
    if(resetPasswordForm.valid && (resetPasswordForm.value.newPassword === resetPasswordForm.value.confirmPassword)) {
      const formData = resetPasswordForm.value;
      console.log(formData);
      this.isLoading = true;
      this.patService.changePassword(new PasswordResetRequest(this.username, formData.newPassword, this.otp)).subscribe({
        next: (response) => {
          this.openSnackBar(response, "OK");
          this.isLoading = false;
          this.router.navigate(['/login']);
        },
        error: (error) => {
          if (this.otpAttempt > 1 && error.error === "Invalid OTP.") {
            this.undoToggleResetPasswordForm();
            this.openSnackBar(this.otpAttempt + " attempt(s) remaining out of 5.", "OK");
          }
          else if (this.otpAttempt <= 1) {
            this.openSnackBar("Too many invalid attempts.", "OK");
            this.router.navigate(['/login']);
          }
          else if (error.error === "Expired OTP.") {
            this.router.navigate(['/login']);
          }
          this.showAlert(error);
          this.isLoading = false;
        }
      });
    }
    else {
      const error: {status: string, error: string} = { status: "Password Mismatch", error: "Double-check that the password in the 'New Password' field matches the one in the 'Confirm Password' field." };
      this.showAlert(error);
    }
  }
}