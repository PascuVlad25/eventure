import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpService } from 'src/app/shared';
import { LocalStorageItems } from 'src/app/shared/utils';
import { AuthCredentials, AuthResponse } from '../models';
import { UserService } from './user.service';

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {
    private path = 'users/auth';

    constructor(private httpService: HttpService, private userService: UserService, private router: Router){}

    public login(email: string, password: string): Observable<void> {
        const credentials = new AuthCredentials(email, password);

        return this.httpService.post(this.path, credentials).pipe(
            map((response: AuthResponse) => {
                localStorage.setItem(LocalStorageItems.Token, response.token);
                this.userService.setCurrentUser(response);
                this.router.navigate(['']);
            })
        );
    }

    public logout(): void {
        localStorage.clear();
        this.router.navigate(['login']);
    }

    public isAuthenticated(): boolean {
        return localStorage.getItem(LocalStorageItems.Token) != null;
    }
}
