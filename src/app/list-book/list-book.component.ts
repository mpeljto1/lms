import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {BookService} from "../service/book.service";
import {Book} from "../model/book.model";
import {Globals } from '../model/Globals';
import { DataTablesModule } from 'angular-datatables';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-list-book',
  templateUrl: './list-book.component.html',
  styleUrls: ['./list-book.component.css']
})
export class ListBookComponent implements OnInit {

  books: Book[];
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();

  constructor(private router: Router, private bookService: BookService, private globals:Globals) { }

  ngOnInit() {
    this.globals.title = "List of books";
    this.bookService.getBooks()
    .subscribe(data => {
      this.books = data;
      this.dtTrigger.next();
    });
  }

  deleteBook(book: Book) : void {
    this.bookService.deleteBook(book.id)
    .subscribe(data => {
      this.books = this.books.filter(u => u!= book);
    })
  };

  editBook(book:Book) : void {
    localStorage.removeItem('editBookId');
    localStorage.setItem('editBookId', book.id.toString());
    this.router.navigate(['edit-book']);
    this.globals.title = "Edit book : " + book.name;
  }

  addBook() : void {
    this.router.navigate(['add-book']);
    this.globals.title = "Add new book";
  }

}
