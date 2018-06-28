import { Component, OnInit } from '@angular/core';
import { Globals } from '../model/Globals';
import { BookService } from '../service/book.service';
import { TokenStorage } from '../service/token.storage';
import { DatePipe } from '@angular/common';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import { RentService } from '../service/rent.service';
import { Rent } from '../model/rent.model';
import {Router} from "@angular/router";
import { DataTablesModule } from 'angular-datatables';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {

  availableBooks: any[];
  rentForm: FormGroup;
  submitted: boolean = false;
  rentBookName="";
  dateIssued ="";
  rent:Rent;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();

  constructor(private globals:Globals, private bookService:BookService, private token:TokenStorage,
  private datePipe:DatePipe, private formBuilder: FormBuilder, private rentService:RentService,
private router:Router) { 
    this.rent = new Rent();
    this.rent.rentedBooks = [];
  }

  ngOnInit() {
    this.globals.title= "Welcome to Dashboard";
    
    this.rentForm = this.formBuilder.group({
      dateExpired: ['', [Validators.required, Validators.pattern('^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$')]],
      dateIssued: [''],
      book: ['']
    });

    this.bookService.getAvailableBooks()
    .subscribe(res => {
      this.availableBooks =res;
      this.dtTrigger.next();
    });
  }

  bookDetails(name:string, id:number) {
    event.preventDefault();
    this.rentBookName=name;
    let today = new Date();
    this.dateIssued = this.datePipe.transform(today,'yyyy-MM-dd');

    
    this.rent.user = Number(this.token.getUserId());
    this.rent.dateIssued = this.dateIssued;
    this.rent.dateReturned = null;
    this.rent.rentedBooks.push(id);

    //console.log(this.rent);
    //alert("Book id is:" + bookId + " while user id is: " + this.token.getUserId());
  }

  onSubmit() {
    this.submitted = true;
    let endDate = new Date(this.rentForm.controls.dateExpired.value);
    let startDate = new Date(this.dateIssued);
    
    if (endDate.getTime() < startDate.getTime()) {
      this.rentForm.controls['dateExpired'].setErrors({'incorrect':true});
    }
    if(this.rentForm.invalid) {
      return;
    }
    
    this.rent.expireDate =this.rentForm.controls.dateExpired.value;
    this.rentService.rentBook(this.rent)
    .subscribe(res => {
      $("button[data-dismiss=\"modal\"]").click();
      this.router.navigate(['user-panel/list-rent']);
    },
  error => {
    let errMsg = (error.message) ? error.message : error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    alert(error.error.message);
  })
    
  }
}
