import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const clientGuardGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const etat = localStorage.getItem('state');
  if (etat == "connectedUser") {
    return true;
  }
  else {
    router.navigate(['/home'])
    return false;
  }
};
