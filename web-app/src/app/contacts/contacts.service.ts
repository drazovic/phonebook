import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Contact } from './interfaces';

@Injectable({
    providedIn: 'root',
})
export class ContactsService {
    contactsChanged = new Subject<Contact[]>();

    private contacts: Contact[] = [];

    constructor() {}

    setContacts(contacts: Contact[]) {
        this.contacts = contacts;
        this.contactsChanged.next(this.contacts.slice());
    }

    getContacts() {
        return this.contacts.slice();
    }

    addContact(contact: Contact) {
        this.contacts.push(contact);
        this.contactsChanged.next(this.contacts.slice());
    }

    updateContact(id: number, updatedContact: Contact) {
        const contactIndex = this.contacts.findIndex(
            (contact) => contact.ID === id
        );
        this.contacts[contactIndex] = updatedContact;
        this.contactsChanged.next(this.contacts.slice());
    }

    deleteContact(id: number) {
        const contactIndex = this.contacts.findIndex(
            (contact) => contact.ID === id
        );
        this.contacts.splice(contactIndex, 1);
        this.contactsChanged.next(this.contacts.slice());
    }
}
