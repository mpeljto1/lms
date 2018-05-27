import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { RentService } from "../service/rent.service";
import { Rent } from "../model/rent.model";
import { Globals } from '../model/Globals';
import { UserService } from '../service/user.service';
import { BookService } from '../service/book.service';
import { DataTablesModule } from 'angular-datatables';
import { Subject } from 'rxjs';
import { Observable } from 'rxjs';
import { forkJoin } from 'rxjs';


@Component({
  selector: 'app-list-rent',
  templateUrl: './list-rent.component.html',
  styleUrls: ['./list-rent.component.css']
})
export class ListRentComponent implements OnInit {

  rents: Rent[];
  userNames: String[];
  bookNames: String[];
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();

  constructor(private router: Router, private rentService: RentService, private globals: Globals,
    private userService: UserService, private bookService: BookService) {
      this.userNames = [];
      this.bookNames = [];
     }

  ngOnInit() {
    this.globals.title = "List of rents";
    this.rentService.getRents()
      .subscribe(data => {
        this.rents = data;
        
        let observables = new Array();

        for (let i = 0; i < this.rents.length; i++) {
          observables.push(this.userService.getUserById(this.rents[i].user));
        }
        forkJoin(observables).subscribe(
          res => {
            for (let i = 0; i < res.length; i++) {
              this.userNames.push(res[i].firstName + " " + res[i].lastName);
            }
            this.dtTrigger.next(); // last time table changes is here
          },
          error => console.log('Error: ', error)
        );
      });
  }
}
