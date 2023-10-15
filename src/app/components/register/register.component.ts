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
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  hidePassword = true; // Initially, password is hidden
  dobDate: Date | null = null;
  isLoading = false;
  genders: {id: String, value:String}[] = [
    {id:"M", value:"Male"},
    {id:"F", value:"Female"},
    {id:"U", value:"Prefer not to answer"}
  ];

  constructor(private router: Router, private snackBar: MatSnackBar, private patServ: PatientService, private dialog: MatDialog) {}

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
    if (registrationForm.valid && (registrationForm.value.password === registrationForm.value.confirmPassword)) {
      const formData = registrationForm.value;
      this.dobDate = formData.dob;
      if (this.dobDate !== null) {
        const datePipe = new DatePipe('en-US');
        const formattedDate = datePipe.transform(this.dobDate, 'MM-dd-yyyy')!;
        this.isLoading = true;
        this.patServ.registerPatient(new PatientDetails(formData.firstName, formData.lastName, formData.username, formData.password, formData.email, formattedDate, formData.gender)).subscribe({
          next: (response) => {
            this.router.navigate(['/login']);
            this.openSnackBar(response, "OK");
            this.isLoading = false;
          },
          error: (error) => {
            this.isLoading = false;
            this.showAlert(error);
          }
        });
      }
    }
    else {
      const error: {status: string, error: string} = { status: "Password Mismatch", error: "Double-check that the password in the 'Password' field matches the one in the 'Confirm Password' field." };
      this.showAlert(error);
      // alert("Double-check that the password in the 'Password' field matches the one in the 'Confirm Password' field.");
    }
  }

  togglePasswordVisibility() {
    this.hidePassword = !this.hidePassword;
  }

  resetForm(form: NgForm) {
    form.resetForm(); // This resets the form controls
  }
}