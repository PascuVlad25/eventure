import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/domain/authentication';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public username = 'vlad@eventure.com';
  public password = 'vlad';

  constructor(private authService: AuthenticationService, private router: Router) {
    console.log('Is logged in', this.authService.isAuthenticated());
  }

  public ngOnInit(): void {
  }

  public login(): void {
    this.authService.login(this.username, this.password).toPromise().then().catch(error => {
      console.log('Eroare autentificare');
    });
  }
}
