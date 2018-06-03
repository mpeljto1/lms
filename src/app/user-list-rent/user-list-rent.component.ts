import { Component, OnInit } from '@angular/core';
import { RentService } from "../service/rent.service";
import { Rent } from "../model/rent.model";
import { Globals } from '../model/Globals';
import { DataTablesModule } from 'angular-datatables';
import { Subject } from 'rxjs';
import { Router } from "@angular/router";
import { TokenStorage } from '../service/token.storage';
import { UserService } from '../service/user.service';
import { BookService } from '../service/book.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-user-list-rent',
  templateUrl: './user-list-rent.component.html',
  styleUrls: ['./user-list-rent.component.css']
})
export class UserListRentComponent implements OnInit {

  rents: Rent[];
  userNames: String;
  bookNames: any[];
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();

  constructor(private router: Router, private rentService: RentService, private globals: Globals,
    private token: TokenStorage, private userService: UserService, private bookService:BookService) {
    this.bookNames = [];
  }

  ngOnInit() {
    this.globals.title = "List of rented books"
    this.rentService.getRentsByUserId(Number(this.token.getUserId()))
      .subscribe(res => {
        this.rents = res;

        this.userService.getUserById(res[0].user)
          .subscribe(res => {
            this.userNames = res.firstName + " " + res.lastName;

            let bookObservable = new Array();
            let userBooks = new Array();
            for (let i = 0; i < this.rents.length; i++) {
              bookObservable.push(this.bookService.getBooksByIds(this.rents[i].rentedBooks));
              userBooks.push(this.rents[i].rentedBooks.length);
            }
            forkJoin(bookObservable).subscribe(
              res => {
                for (let i = 0; i < res.length; i++) {
                  this.bookNames.push(res[i]);
                }
                this.dtTrigger.next(); // last time table changes is here
              },
              error => console.log('Error: ', error)
            );
          })
      });
  }

}
