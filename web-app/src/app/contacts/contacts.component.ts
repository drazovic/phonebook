import { Component, OnInit } from '@angular/core';
import {
    MatDialog,
    MatDialogConfig,
    MatDialogRef,
} from '@angular/material/dialog';
import { Observable, Subscription } from 'rxjs';

import { DataStorageService } from '../shared/data-storage.service';
import { AlertTypes } from '../shared/enums';
import { EditContactComponent } from './edit-contact/edit-contact.component';
import { Contact, EditContactDialogData } from './interfaces';

@Component({
    selector: 'app-contacts',
    templateUrl: './contacts.component.html',
    styleUrls: ['./contacts.component.scss'],
})
export class ContactsComponent implements OnInit {
    dialogRef: MatDialogRef<EditContactComponent> | null;
    error: string | null;
    alertType = AlertTypes.ERROR;

    constructor(
        private dialog: MatDialog,
        private dataStorageService: DataStorageService
    ) {}

    ngOnInit(): void {}

    onAddContact() {
        this.error = null;
        const dialogData: EditContactDialogData = {
            isEditMode: false,
            title: 'New',
        };
        this.openDialog(dialogData);
    }

    onEditContact(contact: Contact) {
        this.error = null;
        const dialogData: EditContactDialogData = {
            isEditMode: true,
            title: 'Edit',
            contact: contact,
        };
        this.openDialog(dialogData);
    }

    openDialog(dialogData: EditContactDialogData): void {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;
        dialogConfig.data = dialogData;

        this.dialogRef = this.dialog.open(EditContactComponent, dialogConfig);

        this.dialogRef
            .afterClosed()
            .subscribe((result: EditContactDialogData) => {
                if (!result.contact) {
                    return;
                }

                let contactObservable: Observable<Contact>;

                if (result.isEditMode) {
                    contactObservable = this.dataStorageService.updateContact(
                        result.contact
                    );
                } else {
                    contactObservable = this.dataStorageService.storeNewContact(
                        result.contact
                    );
                }

                contactObservable.subscribe(
                    () => {},
                    (errorMessage) => {
                        this.error = errorMessage;
                    }
                );
            });
    }
}
