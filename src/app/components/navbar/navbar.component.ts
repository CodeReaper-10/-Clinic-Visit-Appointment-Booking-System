import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ProfileDetailsComponent } from '../profile-details/profile-details.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { PatientService } from 'src/app/services/patient.service';
import { PatientDetails } from 'src/app/models/patient-details.model';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { AlertDialogComponent } from '../alert-dialog/alert-dialog.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isSmallScreen = false;
  patientDetails = new PatientDetails('', '', '', '', '', '', '');
  patientFirstName = '';
  logoPath = '../../../assets/logo/medical-appointment.png';

  constructor(private dialog: MatDialog, private snackBar: MatSnackBar, private breakpointObserver: BreakpointObserver, private patService: PatientService, private authService: AuthenticationService) {}

  ngOnInit() {
    this.breakpointObserver.observe([Breakpoints.XSmall]).subscribe(
      result => {
        this.isSmallScreen = result.matches;
      }
    );

    this.patService.getPatient().subscribe({
      next: (response) => {
        this.patientDetails = response;
        this.patientFirstName = response.firstName;
      },
      error: (error) => {
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

  onLogout() {
    this.authService.logout();
  }

  openDeleteProfileConfirmationDialog(): void {
    const dialogRef: MatDialogRef<any> = this.dialog.open(ConfirmationDialogComponent, {
      width: '300px',
      data: {
        title: "Are you sure you want to delete your profile?",
        content: "This action cannot be undone. We will still retain your appointment history."
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'confirm') {
        this.patService.deletePatient().subscribe({
          next: (response) => {
            this.onLogout();
            this.openSnackBar(response, "OK");
          },
          error: (error) => {
            this.showAlert(error); //To be replaced with Angular Material
          }
        });
      }
    });
  }

  openProfileDetailsDialog(): void {
    const dialogRef: MatDialogRef<any> = this.dialog.open(ProfileDetailsComponent, {
      width: '400px',
      data: this.patientDetails
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'delete') {
        this.openDeleteProfileConfirmationDialog();
      }
    });
  }
}