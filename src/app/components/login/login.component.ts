import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { JwtRequest } from 'src/app/models/jwt-request.model';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  hidePassword = true;
  isLoading = false;
  constructor(private router: Router, private authService: AuthenticationService) {}

  onSubmit(loginForm: NgForm) {
    if (loginForm.valid) {
      const jwtRequest = new JwtRequest(loginForm.value.username, loginForm.value.password);
      this.isLoading = true;
      this.authService.login(jwtRequest).subscribe({
        next: (response) => {
          this.isLoading = false;
        },
        error: (error) => {
          this.authService.showAlert(error);
          this.isLoading = false;
        }
      });
    }
  }

  togglePasswordVisibility() {
    this.hidePassword = !this.hidePassword;
  }

  forgotPassword() {
    this.router.navigate(['/forgot-password']);
  }
}