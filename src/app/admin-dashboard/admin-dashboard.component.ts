import { Component, OnInit } from '@angular/core';
import {Globals } from '../model/Globals';
import { UserService } from '../service/user.service';
import { BookService } from '../service/book.service';
import { RentService } from '../service/rent.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {

  totalBooksNumber = 0;
  totalMembersNumber = 0;
  booksIssuedToday = 0;
  booksIssuedYesterday = 0;
  booksIssuedLastWeek = 0;
  booksIssuedLastMonth = 0;
  newBooksToday = 0;
  newBooksYesterday = 0;
  newBooksLastWeek = 0;
  newBooksLastMonth = 0;
  newUsersToday = 0;
  newUsersYesterday = 0;
  newUsersLastWeek = 0;
  newUsersLastMonth = 0;
  booksReturnedToday = 0;
  booksReturnedYesterday = 0;
  booksReturnedLastWeek = 0;
  booksReturnedLastMonth = 0;

  constructor(private globals:Globals, private userService:UserService, private bookService:BookService,
  private rentService:RentService, private datePipe:DatePipe) { }

  ngOnInit() {
    this.globals.title = "Welcome to Dashboard";
    this.bookService.getBooks()
    .subscribe(res => {
        this.totalBooksNumber = res.length;
    });

    this.userService.getUsers()
    .subscribe(res => {
      this.totalMembersNumber = res.length;
    });

    // number of issued books today
    let today = new Date();
    let from = this.datePipe.transform(today,'yyyy-MM-dd');

    let tomorrow =  new Date(today.setDate(today.getDate() + 1));
    let to = this.datePipe.transform(tomorrow,'yyyy-MM-dd');

    this.rentService.getNumberOfIssuedBooks(from,to)
    .subscribe(res => {
      this.booksIssuedToday = res;
    });

    this.bookService.getBooksByDateCreated(from,to)
    .subscribe(res => {
      this.newBooksToday = res.length;
    });

    this.userService.getUsersByDateCreated(from,to)
    .subscribe(res => {
      this.newUsersToday = res.length;
    });

    this.rentService.getNumberOfReturnedBooks(from,to)
    .subscribe(res => {
      this.booksReturnedToday = res.length;
    });

    // number of issued books last day
    today = new Date();
    to = this.datePipe.transform(today,'yyyy-MM-dd');

    let yesterday =  new Date(today.setDate(today.getDate() - 1));
    from = this.datePipe.transform(yesterday,'yyyy-MM-dd');
   
    this.rentService.getNumberOfIssuedBooks(from,to)
    .subscribe(res => {
      this.booksIssuedYesterday = res;
    });

    this.bookService.getBooksByDateCreated(from,to)
    .subscribe(res => {
      this.newBooksYesterday = res.length;
    });

    this.userService.getUsersByDateCreated(from,to)
    .subscribe(res => {
      this.newUsersYesterday = res.length;
    });

    this.rentService.getNumberOfReturnedBooks(from,to)
    .subscribe(res => {
      this.booksReturnedYesterday = res.length;
    });

    // number of issued books last week
    today = new Date();
    to = this.datePipe.transform(today,'yyyy-MM-dd');

    let week =  new Date(today.setDate(today.getDate() - 7));
    from = this.datePipe.transform(week,'yyyy-MM-dd');
   
    this.rentService.getNumberOfIssuedBooks(from,to)
    .subscribe(res => {
      this.booksIssuedLastWeek = res;
    });

    this.bookService.getBooksByDateCreated(from,to)
    .subscribe(res => {
      this.newBooksLastWeek = res.length;
    });

    this.userService.getUsersByDateCreated(from,to)
    .subscribe(res => {
      this.newUsersLastWeek = res.length;
    });

    this.rentService.getNumberOfReturnedBooks(from,to)
    .subscribe(res => {
      this.booksReturnedLastWeek = res.length;
    });

    // number of issued books last month
    today = new Date();
    to = this.datePipe.transform(today,'yyyy-MM-dd');

    let month =  new Date(today.setDate(today.getDate() - 30));
    from = this.datePipe.transform(month,'yyyy-MM-dd');

    this.rentService.getNumberOfIssuedBooks(from,to)
    .subscribe(res => {
      this.booksIssuedLastMonth = res;
    });

    this.bookService.getBooksByDateCreated(from,to)
    .subscribe(res => {
      this.newBooksLastMonth = res.length;
    });

    this.userService.getUsersByDateCreated(from,to)
    .subscribe(res => {
      this.newUsersLastMonth = res.length;
    });

    this.rentService.getNumberOfReturnedBooks(from,to)
    .subscribe(res => {
      this.booksReturnedLastMonth = res.length;
    });
    
  }

}
