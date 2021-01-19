import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';

import { ContactsService } from '../contacts/contacts.service';
import { environment } from 'src/environments/environment';
import { Contact } from '../contacts/contact.model';

@Injectable({
    providedIn: 'root',
})
export class DataStorageService {
    constructor(
        private http: HttpClient,
        private contactsService: ContactsService
    ) {}

    storeNewContact(contact: Contact) {
        this.http
            .post(`${environment.apiUrl}/contacts`, contact)
            .subscribe((contact) => {
                console.log(contact);
            });
    }

    updateContact(contact: Contact) {
        this.http
            .patch(`${environment.apiUrl}/contacts/${contact.id}`, contact)
            .subscribe((contact) => {
                console.log(contact);
            });
    }

    deleteContact(contactId: number) {
        this.http
            .delete(`${environment.apiUrl}/contacts/${contactId}`)
            .subscribe((contact) => {
                console.log(contact);
            });
    }

    fetchContacts() {
        return this.http
            .get<Contact[]>(`${environment.apiUrl}/contacts`)
            .subscribe((contacts) => {
                this.contactsService.setContacts(contacts);
            });
    }
}
