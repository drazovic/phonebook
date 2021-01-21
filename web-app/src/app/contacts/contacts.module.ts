import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';

import { SharedModule } from '../shared/shared.module';

import { AuthGard } from '../auth/auth.gard';
import { ContactsResolverService } from './contacts-resolver.service';

import { ContactListComponent } from './contact-list/contact-list.component';
import { ContactsComponent } from './contacts.component';
import { EditContactComponent } from './edit-contact/edit-contact.component';


const routes: Routes = [
    {
        path: '',
        component: ContactsComponent,
        canActivate: [AuthGard],
        resolve: [ContactsResolverService],
    },
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        MatDialogModule,
        SharedModule,
    ],
    declarations: [
        ContactsComponent,
        ContactListComponent,
        EditContactComponent,
    ],
    exports: [RouterModule],
    entryComponents: [EditContactComponent],
})
export class ContactsModule {}
