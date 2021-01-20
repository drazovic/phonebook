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

    @Output() rowClicked = new EventEmitter<Contact>();

    constructor(private contactsService: ContactsService) {}

    ngOnInit() {
        const contacts = this.contactsService.getContacts();
        this.dataSource = new MatTableDataSource<Contact>(contacts);
        this.subscription = this.contactsService.contactsChanged.subscribe(
            (contacts) => {
                this.dataSource = new MatTableDataSource<Contact>(contacts);
            }
        );
    }

    onRowClicked(contact: Contact) {
        this.rowClicked.emit(contact);
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
