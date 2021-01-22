export interface Contact {
    name: string;
    email: string;
    phone: number;
    ID?: number;
}

export interface EditContactDialogData {
    title: string;
    isEditMode: Boolean;
    contact?: Contact;
}

export interface FormValues {
    name: string | undefined;
    email: string | undefined;
    phone: number | undefined;
}
