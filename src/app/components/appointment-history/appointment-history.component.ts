import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { AppointmentDetailsComponent } from '../appointment-details/appointment-details.component';
import { Appointment } from 'src/app/models/appointment.model';
import { SchedulingService } from 'src/app/services/scheduling.service';
import { AlertDialogComponent } from '../alert-dialog/alert-dialog.component';
import { ClinicDetails } from 'src/app/models/clinic-details.model';
import { ServiceTime } from 'src/app/models/service-time.model';
import { ServiceDetails } from 'src/app/models/service-details.model';

@Component({
  selector: 'app-appointment-history',
  templateUrl: './appointment-history.component.html',
  styleUrls: ['./appointment-history.component.css']
})
export class AppointmentHistoryComponent implements OnInit {
  selectedAppointmentId: number | null = null;
  noAppointmentHistory = true;
  isLoading = true;
  displayedColumns: String[] = ['clinicName', 'service', 'visitStatus', 'changeStatus'];
  appointments: Array<Appointment> = [];

  constructor(private dialog: MatDialog, private snackBar: MatSnackBar, private schedService: SchedulingService) {}

  ngOnInit() {
    this.schedService.getAppointments().subscribe({
      next: (response) => {
          this.noAppointmentHistory = false;
          this.appointments = response.map(appointment => ({
              ...appointment,
              clinicDetails: new ClinicDetails(
                  appointment.clinicDetails.id,
                  appointment.clinicDetails.clinicName,
                  appointment.clinicDetails.address,
                  new ServiceTime(
                      appointment.clinicDetails.serviceTime.id,
                      appointment.clinicDetails.serviceTime.startDay,
                      appointment.clinicDetails.serviceTime.endDay,
                      appointment.clinicDetails.serviceTime.startTime,
                      appointment.clinicDetails.serviceTime.endTime
                  )
              ),
              serviceDetails: new ServiceDetails(
                  appointment.serviceDetails.id,
                  appointment.serviceDetails.serviceName,
                  appointment.serviceDetails.description,
                  appointment.serviceDetails.imageUrl
              )
          }));
          this.isLoading = false;
      },
      error: (error) => {
          if(error.status === 404) {
            this.isLoading = false;
            this.noAppointmentHistory = true;
          }
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
  
  openChangeVisitStatusConfirmationDialog(appointment: Appointment): void {
    const dialogRef: MatDialogRef<any> = this.dialog.open(ConfirmationDialogComponent, {
      width: '300px',
      data: {
        title: "Are you sure you want to mark this appointment as 'Visited'?",
        content: "This action cannot be undone."
      }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'confirm') {
        this.selectedAppointmentId = appointment.id!;
        let updatedAppointment = { ...appointment, status: "Visited" };
        this.schedService.changeAppointmentStatus(updatedAppointment).subscribe({
          next: (response) => {
            this.selectedAppointmentId = null;
            appointment.status = "Visited";
            this.openSnackBar(response, "OK");
          },
          error: (error) => {
            this.selectedAppointmentId = null;
            this.showAlert(error);
          }
        });
      }
    });
  }

  openAppointmentDetailsDialog(event: Event, appointment: Appointment): void {
    const target = event.target as HTMLElement;
    const allowedClickElements = ['td', 'tr'];

    if (allowedClickElements.includes(target.tagName.toLowerCase())) {
      const dialogRef = this.dialog.open(AppointmentDetailsComponent, {
        width: '425px',
        data: appointment
      });
    }
  }
}