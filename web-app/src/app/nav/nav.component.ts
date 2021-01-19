import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { AuthService } from '../auth/auth.service';

@Component({
    selector: 'app-nav',
    templateUrl: './nav.component.html',
    styleUrls: ['./nav.component.scss'],
})
export class NavComponent implements OnInit, OnDestroy {
    isAuthenticated: boolean;
    subscription: Subscription;

    constructor(private authService: AuthService) {}

    ngOnInit() {
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
