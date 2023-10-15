import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtRequest } from '../models/jwt-request.model';
import { JwtResponse } from '../models/jwt-response.model';
import { Router } from '@angular/router';
import { PatientService } from './patient.service';
import { MatDialog } from '@angular/material/dialog';
import { AlertDialogComponent } from '../components/alert-dialog/alert-dialog.component';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private baseUrl = "http://localhost:8084/auth";
  authenticationStatus: boolean;

  constructor(private http: HttpClient, private router: Router, private patService: PatientService, private dialog: MatDialog) {
    this.authenticationStatus = false;
  }

  showAlert(error: any) {
    const dialogRef = this.dialog.open(AlertDialogComponent, {
      width: '400px',
      data: error,
    });

    setTimeout(() => {
      dialogRef.close();
    }, 5000);
  }

  login(jwtRequest: JwtRequest): Observable<any> {
    return this.http.post<JwtResponse>(`${this.baseUrl}/login`, jwtRequest).pipe(
      tap((response) => {
        localStorage.setItem('jwt', response.jwtToken);
        localStorage.setItem('username', response.username);
        localStorage.setItem('tokenExpiration', response.expirationTime.toString());
        this.autoLogout(response.expirationTime);
  
        // Cache profile soon after login succeeds
        this.patService.getPatient().subscribe({
          next: (response) => {},
          error: (error) => {
            this.showAlert(error);
          }
        });
        
        this.router.navigate(['/home']);
      })
    );
  }  

  logout() {
    localStorage.removeItem('jwt');
    localStorage.removeItem('username');
    localStorage.removeItem('tokenExpiration');
    this.patService.clearCachedProfile();
    this.router.navigate(['/']);
  }

  autoLogout(expirationTime: number) {
    const tokenValidity = expirationTime - Date.now();
    // console.log(tokenValidity);
    setTimeout(() => {
      this.logout();
      const error: {status: string, error: string} = { status: "Session Expiration", error: "Session expired. Please login again." };
      this.showAlert(error);
    }, tokenValidity); // Use -1790000 for testing auto logout so that the wait time becomes 10 seconds instead of the original valid through duration of 30 minutes (1800000 ms)
  }

  isAuthenticated() {
    const token = localStorage.getItem('jwt');
    this.authenticationStatus = !!token; // Return true if the token exists
    return new Promise((resolve, reject) => {
      resolve(this.authenticationStatus);
    });
  }
}