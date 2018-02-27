import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class GuardService implements CanActivate {

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (!this.authService.user.getValue().email) {
      this.router.navigateByUrl('/');
    }
    return !!this.authService.user.getValue();
  }
  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

}
