import { Component, OnInit } from '@angular/core';
import { Globals } from '../model/Globals';
import { BookService } from '../service/book.service';


@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {

  availableBooks: any[];
  

  constructor(private globals:Globals, private bookService:BookService) { }

  ngOnInit() {
    this.globals.title= "Welcome to Dashboard";
    this.bookService.getAvailableBooks()
    .subscribe(res => {
      this.availableBooks =res;
    })
  }

}
