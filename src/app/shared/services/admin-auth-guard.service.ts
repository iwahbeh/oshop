import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { map, take, tap } from 'rxjs/operators';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuard implements CanActivate {

  constructor(private auth: AuthService, private userService: UserService,
    private router: Router) { }
  canActivate() {

    return this.auth.appUser$.pipe(
      map(appUser => {
        return appUser.isAdmin;
      }
      )
    );
  }
}
