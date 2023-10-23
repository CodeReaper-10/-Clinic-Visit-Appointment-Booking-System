import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentDetailsComponent } from './appointment-details.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { Appointment } from 'src/app/models/appointment.model';

describe('AppointmentDetailsComponent', () => {
  let component: AppointmentDetailsComponent;
  let fixture: ComponentFixture<AppointmentDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppointmentDetailsComponent ],
      imports: [ MatIconModule ],
      providers: [ 
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: {
          firstName: 'Test',
          lastName: 'User',
          clinicDetails: {
            clinicName: 'Test Clinic',
            address: '123 Test St',
            serviceTime: {
              startDay: 'Monday',
              endDay: 'Friday',
              formattedStartTime: '9:00 AM',
              formattedEndTime: '5:00 PM'
            }
          },
          serviceDetails: {
            serviceName: 'Test Service'
          },
          status: 'Test Status'
        } as Appointment }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppointmentDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});