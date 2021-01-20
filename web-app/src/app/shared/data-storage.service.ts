import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ContactsService } from '../contacts/contacts.service';
import { environment } from 'src/environments/environment';

import { ApiResponse } from '../api-response.model';
import { Contact } from '../contacts/interfaces';
import { map, tap } from 'rxjs/operators';

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
            .post<ApiResponse<Contact>>(
                `${environment.apiUrl}/contacts`,
                contact
            )
            .subscribe((response) => {
                console.log(response);

                if (!response.data.ID) {
                    return;
                }
                this.contactsService.addContact(response.data);
            });
    }

    updateContact(contact: Contact) {
        this.http
            .patch<ApiResponse<Contact>>(
                `${environment.apiUrl}/contacts/${contact.ID}`,
                contact
            )
            .subscribe((response) => {
                if (!response.data.ID) {
                    return;
                }
                this.contactsService.updateContact(
                    response.data.ID,
                    response.data
                );
            });
    }

    deleteContact(contactId: number) {
        this.http
            .delete<ApiResponse<Contact>>(
                `${environment.apiUrl}/contacts/${contactId}`
            )
            .subscribe((contact) => {
                this.contactsService.deleteContacts(contactId);
            });
    }

    fetchContacts() {
        return this.http
            .get<ApiResponse<Contact[]>>(`${environment.apiUrl}/contacts`)
            .pipe(
                map((response) => response.data),
                tap((contacts) => this.contactsService.setContacts(contacts))
            );
    }
}
