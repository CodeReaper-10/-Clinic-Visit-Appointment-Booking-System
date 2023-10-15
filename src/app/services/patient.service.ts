import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PatientDetails } from '../models/patient-details.model';
import { PasswordResetRequest } from '../models/password-reset-request.model';
import { catchError, of, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PatientService {
  private baseUrl = "http://localhost:8084/patient";
    
  private cachedProfile: any; //For client-side caching

  constructor(private http: HttpClient) {}

  private getHeaders() {
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${localStorage.getItem('jwt')}`)
      .set('Username', `${localStorage.getItem('username')}`);
    return headers;
  }
  
  public registerPatient(patientDetails: PatientDetails) {
    return this.http.post<string>(`${this.baseUrl}/register`, patientDetails, { headers: this.getHeaders(), responseType: 'text' as 'json' });
  }

  public getPatient() {
    if(this.cachedProfile) {
      return of(this.cachedProfile);
    }
    
    return this.http.get<PatientDetails>(this.baseUrl + '/profile/' + localStorage.getItem('username'), { headers: this.getHeaders() }).pipe(
      tap((profile) => {
        // Cache the data
        this.cachedProfile = profile;
      }),
      catchError((error) => {
        return throwError(() => error);
      })
    );
  }

  public updatePatient(patientDetails: PatientDetails) {
    return this.http.put<string>(this.baseUrl + '/update', patientDetails, { headers: this.getHeaders(), responseType: 'text' as 'json' }).pipe(
      tap(() => {
        // Invalidate the cached profile data when an update is made
        this.cachedProfile = null;
      }),
      catchError((error) => {
        // Handle the error when updating the profile
        return throwError(() => error);
      })
    );
  }
  
  public deletePatient() {
    return this.http.delete<string>(this.baseUrl + '/delete/' + localStorage.getItem('username'), { headers: this.getHeaders(), responseType: 'text' as 'json' }).pipe(
      tap(() => {
        // Invalidate the cached profile data when deleted
        this.cachedProfile = null;
      }),
      catchError((error) => {
        // Handle the error when deleting the profile
        console.error('Error deleting patient profile:', error);
        return throwError(() => error);
      })
    );
  }

  public forgotPassword(username: string, email: string) {
    const params = {
      username: username,
      email: email
    };
    return this.http.put<string>(this.baseUrl + '/forgot-password', null, { params: params, responseType: 'text' as 'json' });
  }

  public changePassword(passwordResetRequest: PasswordResetRequest) {
    return this.http.put<string>(this.baseUrl + '/change-password', passwordResetRequest, { responseType: 'text' as 'json' });
  }

  clearCachedProfile() {
    this.cachedProfile = null;
  }
}