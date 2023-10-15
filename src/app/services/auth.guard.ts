import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthenticationService } from './authentication.service';

export const AuthGuard: CanActivateFn = async (route, state) => {
  const authService = inject(AuthenticationService);
  const router = inject(Router)
  const authenticated = await authService.isAuthenticated();
  if (authenticated) {
    return true;
  }
  else {
    router.navigate(['/']);
    return false;
  }
};