import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthComponent } from './auth/auth.component';
import { AuthGard } from './auth/auth.gard';
import { ContactsResolverService } from './contacts/contacts-resolver.service';
import { ContactsComponent } from './contacts/contacts.component';

const routes: Routes = [
    { path: '', redirectTo: '/contacts', pathMatch: 'full' },
    {
        path: 'auth',
        component: AuthComponent,
    },
    {
        path: 'contacts',
        component: ContactsComponent,
        canActivate: [AuthGard],
        resolve: [ContactsResolverService],
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
