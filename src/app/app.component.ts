import { Component } from '@angular/core';
import { AuthService } from './shared/services/auth.service';
import { Router } from '@angular/router';
import { UserService } from './shared/services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Ishop';

  constructor(private userServcie: UserService,
    public auth: AuthService, router: Router) {
    auth.user$.subscribe(user => {
      if (user) {
        let returnUrl = localStorage.getItem('returnUrl');
        if (returnUrl)
          router.navigateByUrl(returnUrl);
        else
          router.navigateByUrl("/");
      }
    });

  }
}


