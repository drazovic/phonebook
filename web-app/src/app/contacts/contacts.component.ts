import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { EditContactComponent } from './edit-contact/edit-contact.component';

@Component({
    selector: 'app-contacts',
    templateUrl: './contacts.component.html',
    styleUrls: ['./contacts.component.scss'],
})
export class ContactsComponent implements OnInit {
    constructor(private dialog: MatDialog) {}

    ngOnInit(): void {}

    onAddContact() {
        this.openDialog();
    }
    
    onEditContact() {
        
    }

    openDialog(): void {
        const dialogConfig = new MatDialogConfig();

        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;

        this.dialog.open(EditContactComponent, dialogConfig);
    }

    // openAddDialogContainer(method?: Methods, contact?: Contact) {
    //     const dialogData: IContactDialogData = {
    //       method: method,
    //       contact: contact
    //     };
    //     this.dialogRef = this.dialog.open(MatContactDialogComponent, {
    //       panelClass: 'new-contact-dialog',
    //       data: dialogData
    //     });
    //     this.dialogAfterCloseSubscription = this.dialogRef
    //       .afterClosed()
    //       .subscribe((result: IContactDialogData) => {
    //         if (result) {
    //           const methodFromResult: Methods = result.method;
    //           const contactFromResult: Contact = result.contact;

    //           switch (methodFromResult) {
    //             case Methods.POST:
    //               // console.log('on post');
    //               // console.log('contact added -> ', result);
    //               this.add(contactFromResult);
    //               break;
    //             case Methods.DELETE:
    //               // console.log('on delete');
    //               this.remove(contactFromResult);
    //               break;
    //           }

    //         } else {
    //           this.onAddingNewContactCanceled.emit();
    //         }
    //       });
    //   }
}
