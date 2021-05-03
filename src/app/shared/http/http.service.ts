import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class HttpService {
    private config = {
        headers: new HttpHeaders().set('Content-Type', 'application/json')
    };
    private baseUrl = `https://${environment.serverAddress}/api`;

    constructor(private http: HttpClient){}

    public get<T>(url: string): Observable<T> {
        const getUrl = `${this.baseUrl}/${url}`;
        return this.http.get<T>(getUrl);
    }

    public post(url: string, body: any): Observable<any> {
        const postUrl = `${this.baseUrl}/${url}`;
        return this.http.post(postUrl, body, this.config);
    }

    public put<T>(url: string, body: T): Observable<T> {
        const putUrl = `${this.baseUrl}/${url}`;
        return this.http.put<T>(putUrl, body);
    }

    public delete(url: string) {
        const deleteUrl = `${this.baseUrl}/${url}`;
        return this.http.delete(deleteUrl);
    }
}
