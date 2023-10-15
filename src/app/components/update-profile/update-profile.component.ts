import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { PatientDetails } from 'src/app/models/patient-details.model';
import { PatientService } from 'src/app/services/patient.service';
import { AlertDialogComponent } from '../alert-dialog/alert-dialog.component';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.css']
})
export class UpdateProfileComponent {
  hidePassword = true; // Initially, password is hidden
  dobDate: Date | null = null;
  isLoading = false;
  genders: {id: String, value:String}[] = [
    {id:"M", value:"Male"},
    {id:"F", value:"Female"},
    {id:"U", value:"Prefer not to answer"}
  ];

  constructor(private snackBar: MatSnackBar, private router: Router, private patService: PatientService, private dialog: MatDialog) {}

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

  onSubmit(registrationForm: NgForm) {
    if (registrationForm.valid) {
      const formData = registrationForm.value;
      this.dobDate = formData.dob;
      // console.log(formData);
      if (this.dobDate !== null) {
        const datePipe = new DatePipe('en-US');
        const formattedDate = datePipe.transform(this.dobDate, 'MM-dd-yyyy')!;
        this.isLoading = true;
        this.patService.updatePatient(new PatientDetails(formData.firstName, formData.lastName, localStorage.getItem('username')!, formData.password, formData.email, formattedDate, formData.gender)).subscribe({
          next: (response) => {
            this.openSnackBar(response, "OK");
            this.router.navigate(['/home']);
            this.isLoading = true;
          },
          error: (error) => {
            this.isLoading = true;
            this.showAlert(error);
          }
        });
      }
    }
  }

  togglePasswordVisibility() {
    this.hidePassword = !this.hidePassword;
  }

  resetForm(form: NgForm) {
    form.resetForm(); // This resets the form controls
  }
}