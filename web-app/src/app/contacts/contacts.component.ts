import { Component, OnInit } from '@angular/core';
import {
    MatDialog,
    MatDialogConfig,
    MatDialogRef,
} from '@angular/material/dialog';
import { DataStorageService } from '../shared/data-storage.service';
import { EditContactComponent } from './edit-contact/edit-contact.component';
import { EditContactDialogData } from './interfaces';

@Component({
    selector: 'app-contacts',
    templateUrl: './contacts.component.html',
    styleUrls: ['./contacts.component.scss'],
})
export class ContactsComponent implements OnInit {
    dialogRef: MatDialogRef<EditContactComponent> | null;

    constructor(
        private dialog: MatDialog,
        private dataStorageService: DataStorageService
    ) {}

    ngOnInit(): void { }

    onAddContact() {
        const dialogData: EditContactDialogData = {
            isEditMode: false,
            title: 'New contact',
        };
        this.openDialog(dialogData);
    }

    onEditContact($event: any) {
        const dialogData: EditContactDialogData = {
            isEditMode: false,
            title: 'New contact',
            // contact:
        };
        console.log($event);
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
                console.log(result);
                if (!result.contact) {
                    return;
                }

                if (result.isEditMode) {
                    this.dataStorageService.updateContact(result.contact);
                } else {
                    this.dataStorageService.storeNewContact(result.contact);
                }
            });
    }
}
