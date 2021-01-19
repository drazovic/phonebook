import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

const PHONE_NUMBER_REGEX = new RegExp(/^\+(?:[0-9] ?){6,14}[0-9]$/);

@Component({
    selector: 'app-edit-contact',
    templateUrl: './edit-contact.component.html',
    styleUrls: ['./edit-contact.component.scss'],
})
export class EditContactComponent implements OnInit {
    newContactForm: FormGroup;

    phoneNumber: string;

    constructor(
        public dialogRef: MatDialogRef<EditContactComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {
        console.log('data = ', this.data);
    }

    ngOnInit() {
        this.newContactForm = new FormGroup({
            name: new FormControl('', [
                Validators.required,
                Validators.minLength(2),
                Validators.maxLength(30),
            ]),
            email: new FormControl('', [Validators.required, Validators.email]),
            phoneNumber: new FormControl('', [
                Validators.pattern(PHONE_NUMBER_REGEX),
            ]),
        });
    }

    save() {
        // const contact: Contact = {
        //   name: this.nameFormControl.value,
        //   email: this.emailFormControl.value,
        //   phoneNumber: this.phoneNumber,
        //   metadata: {
        //     created_at: new Date(),
        //     updated_at: new Date()
        //   }
        // };
        // const result: IContactDialogData = {
        //   method: Methods.POST,
        //   contact: contact
        // };
        // this.dialogRef.close(result);
    }

    delete() {
        // const result: IContactDialogData = {
        //   method: Methods.DELETE,
        //   contact: {name: 'asd', email: 'ycs'}
        // };
        // this.dialogRef.close(result);
    }
}
