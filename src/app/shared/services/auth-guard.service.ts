import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private auth: AuthService ,
    private router: Router) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): 
  boolean | import("@angular/router").UrlTree 
  | Observable<boolean | import("@angular/router").UrlTree> 
  | Promise<boolean | import("@angular/router").UrlTree> {
  

    return this.auth.user$.pipe(map(User => {
      if (User) return true;
          
      this.router.navigate(["/login"],{  queryParams: {returnUrl: state.url}});
      return false;
    }));

   

  }
}
