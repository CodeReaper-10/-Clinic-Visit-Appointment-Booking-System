import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ServiceDetails } from '../models/service-details.model';
import { ClinicDetails } from '../models/clinic-details.model';
import { Appointment } from '../models/appointment.model';

@Injectable({
  providedIn: 'root'
})
export class SchedulingService {
  private baseUrl = "http://localhost:8084/schedule";

  constructor(private http: HttpClient) {}

  private getHeaders() {
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${localStorage.getItem('jwt')}`)
      .set('Username', `${localStorage.getItem('username')}`);
    return headers;
  }
  
  public getServices() {
    return this.http.get<Array<ServiceDetails>>(this.baseUrl + '/services', { headers: this.getHeaders() });
  }
  
  public getClinics() {
    return this.http.get<Array<ClinicDetails>>(this.baseUrl + '/clinics', { headers: this.getHeaders() });
  }
  
  public getAppointments() {
    return this.http.get<Array<Appointment>>(this.baseUrl + '/get-appointments/' + localStorage.getItem('username'), { headers: this.getHeaders() });
  }
  
  public bookAppointment(appointment: Appointment) {
    return this.http.post<Appointment>(this.baseUrl + '/book-appointment', appointment, { headers: this.getHeaders() });
  }

  public changeAppointmentStatus(appointment: Appointment) {
    return this.http.put<string>(this.baseUrl + '/change-status', appointment, { headers: this.getHeaders(), responseType: 'text' as 'json' });
  }
}