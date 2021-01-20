import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { Contact, EditContactDialogData } from '../interfaces';

const PHONE_NUMBER_REGEX = new RegExp(/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/);

@Component({
    selector: 'app-edit-contact',
    templateUrl: './edit-contact.component.html',
    styleUrls: ['./edit-contact.component.scss'],
})
export class EditContactComponent implements OnInit {
    contactForm: FormGroup;

    constructor(
        public dialogRef: MatDialogRef<EditContactComponent>,
        @Inject(MAT_DIALOG_DATA) public data: EditContactDialogData
    ) {}

    ngOnInit() {
        const initialName = this.data.isEditMode ? this.data.contact?.name : '';
        const initialEmail = this.data.isEditMode
            ? this.data.contact?.email
            : '';
        const initialPhone = this.data.isEditMode
            ? this.data.contact?.phone
            : '';

        this.contactForm = new FormGroup({
            name: new FormControl(initialName, [
                Validators.required,
                Validators.minLength(2),
            ]),
            email: new FormControl(initialEmail, [
                Validators.required,
                Validators.email,
            ]),
            phone: new FormControl(initialPhone, [
                Validators.required,
                Validators.pattern(PHONE_NUMBER_REGEX),
            ]),
        });
        console.log(this.data);
    }

    get contactFormControl() {
        return this.contactForm.controls;
    }

    save() {
        const contact: Contact = this.contactForm.value;
        const result: EditContactDialogData = {
            ...this.data,
            contact: contact,
        };
        this.dialogRef.close(result);
    }
}
