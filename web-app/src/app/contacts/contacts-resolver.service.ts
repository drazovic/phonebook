import { Injectable } from '@angular/core';
import {
    ActivatedRouteSnapshot,
    Resolve,
    RouterStateSnapshot,
} from '@angular/router';

import { DataStorageService } from '../shared/data-storage.service';
import { ContactsService } from './contacts.service';
import { Contact } from './interfaces';

@Injectable({
    providedIn: 'root',
})
export class ContactsResolverService implements Resolve<Contact[]> {
    constructor(
        private dataStorageService: DataStorageService,
        private contactsService: ContactsService
    ) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const contacts = this.contactsService.getContacts();

        if (contacts.length === 0) {
            return this.dataStorageService.fetchContacts();
        } else {
            return contacts;
        }
    }
}
