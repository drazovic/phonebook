import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { environment } from 'src/environments/environment';

import { User } from './user.model';

export interface AuthResponseData {
    data: {
        token: string;
        email: string;
        expiresIn: number;
        ID: string;
    };
    message: string;
    success: boolean;
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
            .post<AuthResponseData>(`${environment.apiUrl}/users/signup`, {
                email: email,
                password: password,
            })
            .pipe(
                catchError(this.handleError),
                tap(this.handleAuthentication.bind(this))
            );
    }

    login(email: string, password: string) {
        return this.http
            .post<AuthResponseData>(`${environment.apiUrl}/users/login`, {
                email: email,
                password: password,
            })
            .pipe(
                catchError(this.handleError),
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

    private handleAuthentication(response: AuthResponseData) {
        const data = response.data;
        const expirationDate = new Date(new Date().getTime() + data.expiresIn);
        const user = new User(data.email, data.ID, data.token, expirationDate);

        this.user.next(user);
        this.autoLogout(data.expiresIn * 1000);
        localStorage.setItem('userData', JSON.stringify(user));
    }

    private handleError(errorResponse: HttpErrorResponse) {
        let errorMessage = 'An error occured.';
        if (!errorResponse.error || !errorResponse.error.error) {
            throwError(errorMessage);
        }
        switch (errorResponse.error.error.message) {
            case 'EMAIL_EXISTS':
                errorMessage =
                    'The email address is already in use by another account.';
                break;
            case 'EMAIL_NOT_FOUND':
                errorMessage =
                    'There is no user record corresponding to this identifier. The user may have been deleted.';
                break;
            case 'INVALID_PASSWORD':
                errorMessage =
                    'The password is invalid or the user does not have a password.';
                break;
        }
        return throwError(errorMessage);
    }
}
