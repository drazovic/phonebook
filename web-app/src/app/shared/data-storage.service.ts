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
        return this.http
            .post<ApiResponse<Contact>>(
                `${environment.apiUrl}/contacts`,
                contact
            )
            .pipe(
                map((response) => {
                    if (!response.status) {
                        throw response.message;
                    } else {
                        return response.data;
                    }
                }),
                tap((contact) => this.contactsService.addContact(contact))
            );
    }

    updateContact(contact: Contact) {
        return this.http
            .patch<ApiResponse<Contact>>(
                `${environment.apiUrl}/contacts/${contact.ID}`,
                contact
            )
            .pipe(
                map((response) => {
                    if (!response.status) {
                        throw response.message;
                    } else {
                        return response.data;
                    }
                }),
                tap((contact) => {
                    if (!contact.ID) {
                        return;
                    }
                    this.contactsService.updateContact(contact.ID, contact);
                })
            );
    }

    deleteContact(contactId: number) {
        return this.http
            .delete<ApiResponse<Contact>>(
                `${environment.apiUrl}/contacts/${contactId}`
            )
            .pipe(
                map((response) => {
                    if (!response.status) {
                        throw response.message;
                    } else {
                        return response.data;
                    }
                }),
                tap((contact) => this.contactsService.deleteContact(contactId))
            );
    }

    fetchContacts() {
        return this.http
            .get<ApiResponse<Contact[]>>(`${environment.apiUrl}/contacts`)
            .pipe(
                map((response) => {
                    if (!response.status) {
                        throw response.message;
                    } else {
                        return response.data;
                    }
                }),
                tap((contacts) => this.contactsService.setContacts(contacts))
            );
    }
}
