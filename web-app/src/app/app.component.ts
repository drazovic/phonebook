import { Component } from '@angular/core';
import { Subscription } from 'rxjs';

import { AuthService } from './auth/auth.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent {
    isAuthenticated: boolean;
    subscription: Subscription;

    constructor(private authService: AuthService) {}

    ngOnInit() {
        this.authService.autoLogin();
        this.subscription = this.authService.user.subscribe((user) => {
            this.isAuthenticated = !!user;
        });
    }

    onLogout() {
        this.authService.logout();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
