import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable, BehaviorSubject } from 'rxjs';
import { LoginService } from '../../services/login.service';

@Injectable({
  providedIn: 'root',
})
export class OnlyLoggedInUsersGuard implements CanActivate {
  public isLoggedIn$: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(private loginService: LoginService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean | UrlTree> | boolean | UrlTree {
    this.loginService.getLoggedInStatus().subscribe((status: boolean) => {
      this.isLoggedIn$.next(status);
    });
    if (this.isLoggedIn$.getValue()) {
      return true;
    } else {
      this.router.navigate(['']);
      return false;
    }
  }
}
