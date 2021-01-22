import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { ApiResponse } from '../shared/types';
import { AuthData, AuthService } from './auth.service';
import { AlertTypes } from 'src/app/shared/enums';

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html',
    styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
    isLoginMode = true;
    isLoading = false;
    error: string | null;
    alertType = AlertTypes.ERROR;

    constructor(private authService: AuthService, private router: Router) {}

    ngOnInit(): void {}

    onSwitchMode() {
        this.error = null;
        this.isLoginMode = !this.isLoginMode;
    }

    onSubmit(form: NgForm) {
        this.error = null;

        if (!form.valid) {
            return;
        }

        const email = form.value.email;
        const password = form.value.password;

        let authObservable: Observable<ApiResponse<AuthData>>;

        this.isLoading = true;
        if (this.isLoginMode) {
            authObservable = this.authService.login(email, password);
        } else {
            authObservable = this.authService.signup(email, password);
        }

        authObservable.subscribe(
            (responseData) => {
                this.isLoading = false;
                this.router.navigate(['/contacts']);
            },
            (errorMessage) => {
                this.error = errorMessage;
                this.isLoading = false;
            }
        );

        form.reset();
    }

    onHandleError() {
        this.error = null;
    }
}
