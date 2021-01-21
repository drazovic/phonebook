import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatMenuModule } from '@angular/material/menu';

import { AppRoutingModule } from './app-routing.module';
import { ContactsModule } from './contacts/contacts.module';
import { SharedModule } from './shared/shared.module';

import { AuthInterseptorService } from './auth/auth-interceptor.service';

import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';

@NgModule({
    declarations: [AppComponent, AuthComponent],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        AppRoutingModule,
        MatMenuModule,
        SharedModule,
        ContactsModule,
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterseptorService,
            multi: true,
        },
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
