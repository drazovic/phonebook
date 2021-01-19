import {
    AfterViewInit,
    Component,
    EventEmitter,
    OnInit,
    Output,
    ViewChild,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';

import { Contact } from '../contact.model';
import { ContactsService } from '../contacts.service';

@Component({
    selector: 'app-contact-list',
    templateUrl: './contact-list.component.html',
    styleUrls: ['./contact-list.component.scss'],
})
export class ContactListComponent implements AfterViewInit, OnInit {
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    dataSource: MatTableDataSource<Contact>;
    displayedColumns = ['id', 'name', 'phoneNumber', 'delete'];

    subscription: Subscription;

    @Output() rowClicked = new EventEmitter<Object>();

    constructor(private contactsService: ContactsService) {}

    ngOnInit() {
        this.subscription = this.contactsService.contactsChanged.subscribe(
            (contacts) => {
                this.dataSource = new MatTableDataSource(contacts);
            }
        );
    }

    onRowClicked(row: any) {
        console.log(row);
        this.rowClicked.emit(row);
    }

    ngAfterViewInit() {
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
    }
}
