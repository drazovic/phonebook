import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { Contact, EditContactDialogData } from '../interfaces';

const PHONE_NUMBER_REGEX = new RegExp(
    /^[+][0-9]{2,3}-[0-9]{2,3}-[0-9]{7,8}$/
);

type FormValues = {
    name: string | undefined;
    email: string | undefined;
    phone: number | undefined;
};

@Component({
    selector: 'app-edit-contact',
    templateUrl: './edit-contact.component.html',
    styleUrls: ['./edit-contact.component.scss'],
})
export class EditContactComponent implements OnInit {
    contactForm: FormGroup;
    initialFormValues: FormValues;
    isContactFormChanged: boolean;

    constructor(
        public dialogRef: MatDialogRef<EditContactComponent>,
        @Inject(MAT_DIALOG_DATA) public data: EditContactDialogData
    ) {}

    ngOnInit() {
        this.initialFormValues = this.generateInitialFromValues();

        this.contactForm = new FormGroup({
            name: new FormControl(this.initialFormValues.name, [
                Validators.required,
                Validators.minLength(2),
            ]),
            email: new FormControl(this.initialFormValues.email, [
                Validators.required,
                Validators.email,
            ]),
            phone: new FormControl(this.initialFormValues.phone, [
                Validators.required,
                Validators.pattern(PHONE_NUMBER_REGEX),
            ]),
        });

        this.contactForm.valueChanges.subscribe((changes) => {
            this.isContactFormChanged = this.isFormChanged(changes);
        });
    }

    generateInitialFromValues(): FormValues {
        const isEditMode = this.data.isEditMode;
        const initialName =
            isEditMode && this.data.contact
                ? this.data.contact.name
                : undefined;
        const initialEmail =
            isEditMode && this.data.contact
                ? this.data.contact.email
                : undefined;
        const initialPhone =
            isEditMode && this.data.contact
                ? this.data.contact.phone
                : undefined;

        return {
            name: initialName,
            email: initialEmail,
            phone: initialPhone,
        };
    }

    isFormChanged(newFormValues: FormValues) {
        return (
            newFormValues.name !== this.initialFormValues.name ||
            newFormValues.email !== this.initialFormValues.email ||
            newFormValues.phone !== this.initialFormValues.phone
        );
    }

    get contactFormControl() {
        return this.contactForm.controls;
    }

    save() {
        const contact: Contact = {
            ...this.data.contact,
            ...this.contactForm.value,
        };
        const result: EditContactDialogData = {
            ...this.data,
            contact: contact,
        };
        this.dialogRef.close(result);
    }
}
