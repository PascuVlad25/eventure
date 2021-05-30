import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LocalStorageItems } from '../utils';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = localStorage.getItem(LocalStorageItems.Token);

        if (token) {
            const cloned = req.clone({
                headers: req.headers.set('Authorization',
                    'Bearer ' + token)
            });

            return next.handle(cloned);
        }
        else {
            return next.handle(req.clone({
                headers: req.headers.delete('Referer')
            }));
        }
    }
}