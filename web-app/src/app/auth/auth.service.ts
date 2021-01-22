import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, throwError } from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { ApiResponse } from '../api-response.model';

import { User } from './user.model';

export interface AuthData {
    token: string;
    email: string;
    expiresAt: number;
    ID: string;
}

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    user = new BehaviorSubject<User | null>(null);
    private tokenExpirationTimer: any;

    constructor(private http: HttpClient, private router: Router) {}

    signup(email: string, password: string) {
        return this.http
            .post<ApiResponse<AuthData>>(`${environment.apiUrl}/users/signup`, {
                email: email,
                password: password,
            })
            .pipe(
                map((response) => {
                    if (!response.status) {
                        throw response.message;
                    } else {
                        return response;
                    }
                }),
                tap(this.handleAuthentication.bind(this))
            );
    }

    login(email: string, password: string) {
        return this.http
            .post<ApiResponse<AuthData>>(`${environment.apiUrl}/users/login`, {
                email: email,
                password: password,
            })
            .pipe(
                map((response) => {
                    if (!response.status) {
                        throw response.message;
                    } else {
                        return response;
                    }
                }),
                tap(this.handleAuthentication.bind(this))
            );
    }

    autoLogin() {
        const stringifiedUserData = localStorage.getItem('userData');
        if (!stringifiedUserData) {
            return;
        }

        const userData: {
            email: string;
            id: string;
            _token: string;
            _tokenExpirationDate: string;
        } = JSON.parse(stringifiedUserData);
        const loadedUser = new User(
            userData.email,
            userData.id,
            userData._token,
            new Date(userData._tokenExpirationDate)
        );

        if (loadedUser.token) {
            this.user.next(loadedUser);
            const expirationDuration =
                new Date(userData._tokenExpirationDate).getTime() -
                new Date().getTime();
            this.autoLogout(expirationDuration);
        }
    }

    logout() {
        this.user.next(null);
        this.router.navigate(['/auth']);
        localStorage.removeItem('userData');
        if (this.tokenExpirationTimer) {
            clearTimeout(this.tokenExpirationTimer);
        }
    }

    private autoLogout(expirationDuration: number) {
        this.tokenExpirationTimer = setTimeout(() => {
            this.logout();
        }, expirationDuration);
    }

    private handleAuthentication(response: ApiResponse<AuthData>) {
        const data = response.data;

        const expirationTimestamp = data.expiresAt * 1000;
        const expirationDate = new Date(expirationTimestamp);
        const user = new User(data.email, data.ID, data.token, expirationDate);

        this.user.next(user);
        this.autoLogout(expirationTimestamp);
        localStorage.setItem('userData', JSON.stringify(user));
    }
}
