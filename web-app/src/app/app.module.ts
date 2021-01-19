import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AlertComponent } from './shared/alert/alert.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialogModule } from '@angular/material/dialog';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ContactsComponent } from './contacts/contacts.component';
import { ContactListComponent } from './contacts/contact-list/contact-list.component';
import { AuthComponent } from './auth/auth.component';
import { NavComponent } from './nav/nav.component';
import { HttpClientModule } from '@angular/common/http';
import { LoadingSpinnerComponent } from './shared/loading-spinner/loading-spinner.component';
import { EditContactComponent } from './contacts/edit-contact/edit-contact.component';

@NgModule({
    declarations: [
        AppComponent,
        ContactsComponent,
        AuthComponent,
        AlertComponent,
        LoadingSpinnerComponent,
        NavComponent,
        ContactListComponent,
        EditContactComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        MatToolbarModule,
        MatIconModule,
        LayoutModule,
        MatButtonModule,
        MatSidenavModule,
        MatListModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatMenuModule,
        MatProgressSpinnerModule,
        MatDialogModule,
        MatToolbarModule,
    ],
    providers: [],
    bootstrap: [AppComponent],
    entryComponents: [EditContactComponent],
})
export class AppModule {}
