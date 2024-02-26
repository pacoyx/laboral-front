import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  console.log('entro guard');

  const objLogin = JSON.parse(localStorage.getItem('laboral.ai')!);
  if (objLogin) {
    if (objLogin.token) {
      return true;
    }
    router.navigate(['/home']);
    return false;
  } else {
    router.navigate(['/home']);
    return false;
  }
};
