import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { HomeComponent } from './components/home/home.component';
import { MedicalServicesComponent } from './components/medical-services/medical-services.component';
import { ClinicsComponent } from './components/clinics/clinics.component';
import { AppointmentHistoryComponent } from './components/appointment-history/appointment-history.component';
import { UpdateProfileComponent } from './components/update-profile/update-profile.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { AuthGuard } from './services/auth.guard';

const routes: Routes = [
  { path: '', component: LandingPageComponent },
  { path: 'login', component: WelcomeComponent },
  { path: 'register', component: WelcomeComponent },
  { path: 'home', canActivate: [AuthGuard], component: HomeComponent },
  { path: 'medical-services', canActivate: [AuthGuard], component: MedicalServicesComponent },
  { path: 'clinics', canActivate: [AuthGuard], component: ClinicsComponent },
  { path: 'appointment-history', canActivate: [AuthGuard], component: AppointmentHistoryComponent },
  { path: 'update-profile', canActivate: [AuthGuard], component: UpdateProfileComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}