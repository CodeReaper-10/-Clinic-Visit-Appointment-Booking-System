import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PatientDetails } from 'src/app/models/patient-details.model';

@Component({
  selector: 'app-profile-details',
  templateUrl: './profile-details.component.html',
  styleUrls: ['./profile-details.component.css']
})
export class ProfileDetailsComponent {
  showGender: string;
  constructor(private dialogRef: MatDialogRef<ProfileDetailsComponent>, @Inject(MAT_DIALOG_DATA) public profile: PatientDetails) {
    if(profile.gender === 'M') {
      this.showGender = "Male";
    }
    else if(profile.gender === 'F') {
      this.showGender = "Female";
    }
    else {
      this.showGender = "Unknown";
    }
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  onDeleteClick(): void {
    // User clicked delete, close the dialog with 'delete' result
    this.dialogRef.close('delete');
  }
}