import { Injectable } from '@angular/core';
import { LocalStorageItems } from 'src/app/shared/utils';
import { AuthResponse, User } from '../models';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    public getCurrentUserDetails(): User {
        return JSON.parse(localStorage.getItem(LocalStorageItems.CurrentUser));
    }

    public setCurrentUser(userDto: AuthResponse): void {
        const user = new User(
            userDto.id,
            userDto.firstName,
            userDto.lastName,
            new Date(userDto.birthday),
            userDto.city,
            userDto.country
        );
        localStorage.setItem(LocalStorageItems.CurrentUser, JSON.stringify(user));
    }

    public removeCurrentUser(): void {
        localStorage.removeItem(LocalStorageItems.CurrentUser);
    }
}
