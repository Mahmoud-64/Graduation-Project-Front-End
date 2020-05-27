import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Route, Router, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from './service/user.service';
import { Role } from './models/role.enum';
import { tap, map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {
  constructor(
    private router: Router,
    private userService: UserService
  ){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

        if (!this.userService.loggedIn()) {
            this.router.navigate(['login']);
            return false;
        }

      return this.userService.hasRole().pipe(map(data=>{
          const role = route.data.role as Role;
          console.log("trrrrrrry1", role, !data);
          if (role!=data) {
              this.router.navigateByUrl('/error403');
              return false;
          }
          return true;
        }));
  }
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {

      if (!this.userService.loggedIn()) {
          return false;
      };
      return this.userService.hasRole().pipe(map(data=>{
          const role = route.data.role as Role;
          if (role && !data) {
            console.log("trrrrrrry2", role, data);
              return false;
          }
          return true;
      }));
  }
}
