import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { AppointmentDetailsComponent } from '../appointment-details/appointment-details.component';
import { Router } from '@angular/router';
import { ClinicDetails } from 'src/app/models/clinic-details.model';
import { SchedulingService } from 'src/app/services/scheduling.service';
import { Appointment } from 'src/app/models/appointment.model';
import { PatientService } from 'src/app/services/patient.service';
import { PatientDetails } from 'src/app/models/patient-details.model';
import { AlertDialogComponent } from '../alert-dialog/alert-dialog.component';
import { ServiceDetails } from 'src/app/models/service-details.model';
import { ServiceTime } from 'src/app/models/service-time.model';

@Component({
  selector: 'app-clinics',
  templateUrl: './clinics.component.html',
  styleUrls: ['./clinics.component.css']
})
export class ClinicsComponent implements OnInit {
  receivedServiceData!: ServiceDetails;
  isLoading = true;
  displayedColumns: String[] = ['clinicName', 'address', 'serviceTime', 'choose'];
  patientDetails = new PatientDetails('', '', '', '', '', '', '');
  clinics: Array<ClinicDetails> = [];
  //appointment!: Appointment;

  constructor(private dialog: MatDialog, private snackBar: MatSnackBar, private router: Router, private patService: PatientService, private schedService: SchedulingService) {}

  ngOnInit() {
    const navigationState = window.history.state;
    if (navigationState && navigationState.data) {
      this.receivedServiceData = navigationState.data;
    }

    this.schedService.getClinics().subscribe({
      next: (response) => {
        this.clinics = response.map(clinic => ({
          ...clinic,
          serviceTime: new ServiceTime(
            clinic.serviceTime.id,
            clinic.serviceTime.startDay,
            clinic.serviceTime.endDay,
            clinic.serviceTime.startTime,
            clinic.serviceTime.endTime
          )
        }));
        this.isLoading = false;
      },
      error: (error) => {
          this.isLoading = false;
          this.showAlert(error);
      }
  });
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

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 5000 // Show snackbar for 5 seconds
    });
  }

  openAppointmentDetailsDialog(appointment: Appointment): void {
    const dialogRef = this.dialog.open(AppointmentDetailsComponent, {
      width: '425px',
      data: appointment
    });
  }

  openAppointmentConfirmationDialog(clinic: ClinicDetails): void {
    const dialogRef: MatDialogRef<any> = this.dialog.open(ConfirmationDialogComponent, {
      width: '300px',
      data: {
        title: "Book appointment?",
        content: "Are you sure you want to book this appointment?"
      }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'confirm') {
        this.isLoading = true;
        this.patService.getPatient().subscribe({
          next: (response) => {
            this.patientDetails = response;
            this.schedService.bookAppointment(new Appointment(this.patientDetails.username, this.patientDetails.firstName, this.patientDetails.lastName, this.receivedServiceData, clinic, 'To be visited')).subscribe({
              next: (response) => {
                const serviceDetails = new ServiceDetails(response.serviceDetails.id, response.serviceDetails.serviceName, response.serviceDetails.description, response.serviceDetails.imageUrl);
                const serviceTime = new ServiceTime(response.clinicDetails.serviceTime.id, response.clinicDetails.serviceTime.startDay, response.clinicDetails.serviceTime.endDay, response.clinicDetails.serviceTime.startTime, response.clinicDetails.serviceTime.endTime);
                const clinicDetails = new ClinicDetails(response.clinicDetails.id, response.clinicDetails.clinicName, response.clinicDetails.address, serviceTime);
                const appointment = new Appointment(response.username, response.firstName, response.lastName, serviceDetails, clinicDetails, response.status, response.id);
                this.openAppointmentDetailsDialog(appointment);
                this.openSnackBar("Appointment booked successfully.", "OK");
                this.isLoading = false;
                this.router.navigate(['/home']);
              },
              error: (error) => {
                this.isLoading = false;
                this.showAlert(error);
              }
            });
          },
          error: (error) => {
            this.isLoading = false;
            this.showAlert(error);
          }
        });
      }
    });
  }
}