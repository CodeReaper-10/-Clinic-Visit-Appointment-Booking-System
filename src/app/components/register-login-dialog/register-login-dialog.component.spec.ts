import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterLoginDialogComponent } from './register-login-dialog.component';
import { MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

describe('RegisterLoginDialogComponent', () => {
  let component: RegisterLoginDialogComponent;
  let fixture: ComponentFixture<RegisterLoginDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ 
        MatIconModule
      ],
      declarations: [ RegisterLoginDialogComponent ],
      providers: [ { provide: MatDialogRef, useValue: {} } ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterLoginDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});