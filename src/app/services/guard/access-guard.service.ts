import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

export const CustomersGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  let token: string | null = localStorage.getItem('token');
  if (token) {
    let jwtHelp = new JwtHelperService();
    if (!jwtHelp.isTokenExpired(token)) {
      return true;
    }
  }
  inject(Router).navigate(['login']);
  return false;
}
