import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Appointment } from 'src/app/models/appointment.model';

@Component({
  selector: 'app-appointment-details',
  templateUrl: './appointment-details.component.html',
  styleUrls: ['./appointment-details.component.css']
})
export class AppointmentDetailsComponent {
  constructor(private dialogRef: MatDialogRef<AppointmentDetailsComponent>, @Inject(MAT_DIALOG_DATA) public appointment: Appointment) { }

  closeDialog(): void {
    this.dialogRef.close();
  }
}