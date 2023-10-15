import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ServiceDetails } from 'src/app/models/service-details.model';
import { SchedulingService } from 'src/app/services/scheduling.service';
import { AlertDialogComponent } from '../alert-dialog/alert-dialog.component';

@Component({
  selector: 'app-medical-services',
  templateUrl: './medical-services.component.html',
  styleUrls: ['./medical-services.component.css']
})
export class MedicalServicesComponent implements OnInit {
  services: Array<ServiceDetails> = [];
  isLoading: boolean = true;

  constructor(private router: Router, private schedService: SchedulingService, private dialog: MatDialog) {}

  ngOnInit() {
    this.schedService.getServices().subscribe({
      next: (response) => {
        this.services = response;
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

  navigateToClinics(service: ServiceDetails) {
    this.router.navigate(['/clinics'], {
      state: { data: service }
    });
  }
}