import {
    AfterViewInit,
    Component,
    EventEmitter,
    OnDestroy,
    OnInit,
    Output,
    ViewChild,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { DataStorageService } from 'src/app/shared/data-storage.service';
import { AlertTypes } from 'src/app/shared/enums';

import { ContactsService } from '../contacts.service';
import { Contact } from '../interfaces';

@Component({
    selector: 'app-contact-list',
    templateUrl: './contact-list.component.html',
    styleUrls: ['./contact-list.component.scss'],
})
export class ContactListComponent implements AfterViewInit, OnInit, OnDestroy {
    dataSource: MatTableDataSource<Contact>;
    displayedColumns: string[] = [
        'position',
        'name',
        'email',
        'phone',
        'delete',
    ];
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    subscription: Subscription;

    error: string | null;
    errorAlertType = AlertTypes.ERROR;
    infoAlertType = AlertTypes.INFO;

    @Output() contactSelected = new EventEmitter<Contact>();

    constructor(
        private contactsService: ContactsService,
        private dataStorageService: DataStorageService
    ) {}

    ngOnInit() {
        const contacts = this.contactsService.getContacts();
        this.dataSource = new MatTableDataSource<Contact>(contacts);
        this.subscription = this.contactsService.contactsChanged.subscribe(
            (contacts) => {
                this.error = null;
                this.dataSource = new MatTableDataSource<Contact>(contacts);
            }
        );
    }

    onRowClicked(contact: Contact) {
        this.contactSelected.emit(contact);
    }

    onDelete(contact: Contact) {
        if (!contact.ID) {
            return;
        }
        this.dataStorageService.deleteContact(contact.ID).subscribe(
            () => {},
            (errorMessage) => {
                this.error = errorMessage;
            }
        );
    }

    ngAfterViewInit() {
        if (this.dataSource) {
            this.dataSource.sort = this.sort;
            this.dataSource.paginator = this.paginator;
        }
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
