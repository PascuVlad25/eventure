import { Component, OnInit } from '@angular/core';
import { AuthenticationService, User, UserService } from 'src/app/domain/authentication';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  public currentUser: User;

  constructor(private userService: UserService, private authService: AuthenticationService) { }

  public ngOnInit(): void {
    this.currentUser = this.userService.getCurrentUserDetails();
  }

  public getUserFullName(): string {
    return `${this.currentUser.firstName} ${this.currentUser.lastName}`;
  }

  public logout(): void {
    this.authService.logout();
  }
}
