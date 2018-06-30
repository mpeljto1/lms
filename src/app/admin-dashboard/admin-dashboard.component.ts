import { Component, OnInit } from '@angular/core';
import { Globals } from '../model/Globals';
import { UserService } from '../service/user.service';
import { BookService } from '../service/book.service';
import { RentService } from '../service/rent.service';
import { DatePipe } from '@angular/common';
import { TokenStorage } from '../service/token.storage';
import { Rent } from '../model/rent.model';
import { Book } from '../model/book.model';
import { forkJoin } from 'rxjs';
import { User } from '../model/user.model';
import { DataService } from '../service/data.service';
//import * as jsPDF from 'jspdf';
import * as html2canvas from "html2canvas";

declare var jsPDF: any;

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {

  loggedUser = "";
  totalBooksNumber = 0;
  totalMembersNumber = 0;
  nonReturnedBooks = 0;
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

  returnedBooks: Book[];
  userNames: String[];
  bookNames: any[];
  rents: Rent[];
  books: Book[];
  users: User[];

  constructor(private globals: Globals, private userService: UserService, private bookService: BookService,
    private rentService: RentService, private datePipe: DatePipe, private token: TokenStorage,
    private dataService: DataService) {
    this.returnedBooks = [];
    this.userNames = [];
    this.bookNames = [];
  }

  ngOnInit() {
    this.globals.title = "Welcome to Dashboard";

    this.userService.getUserById(Number(this.token.getUserId()))
      .subscribe(res => {
        this.dataService.changeMessage(res.firstName + " " + res.lastName);
        this.dataService.currentMessage.subscribe(message => this.loggedUser = message);
      });

    this.bookService.getBooks()
      .subscribe(res => {
        this.totalBooksNumber = res.length;
      });

    this.userService.getUsers()
      .subscribe(res => {
        this.totalMembersNumber = res.length;
      });

    this.rentService.getUnreturnedRents()
      .subscribe(res => {
        for (let index = 0; index < res.length; index++) {
          this.nonReturnedBooks += res[index].rentedBooks.length;
        }
      });
  }

  getTodayReport() {
    // number of issued books today
    let today = new Date();
    let from = this.datePipe.transform(today, 'yyyy-MM-dd');

    let tomorrow = new Date(today.setDate(today.getDate() + 1));
    let to = this.datePipe.transform(tomorrow, 'yyyy-MM-dd');

    this.rentService.getNumberOfIssuedBooks(from, to)
      .subscribe(res => {
        this.booksIssuedToday = res.length;
      });

    this.bookService.getBooksByDateCreated(from, to)
      .subscribe(res => {
        this.newBooksToday = res.length;
      });

    this.userService.getUsersByDateCreated(from, to)
      .subscribe(res => {
        this.newUsersToday = res.length;
      });

    this.rentService.getNumberOfReturnedBooks(from, to)
      .subscribe(res => {
        this.booksReturnedToday = res.length;
      });
  }

  getLastDayReport() {

    // number of issued books last day
    let today = new Date();
    let to = this.datePipe.transform(today, 'yyyy-MM-dd');

    let yesterday = new Date(today.setDate(today.getDate() - 1));
    let from = this.datePipe.transform(yesterday, 'yyyy-MM-dd');

    this.rentService.getNumberOfIssuedBooks(from, to)
      .subscribe(res => {
        this.booksIssuedYesterday = res.length;
      });

    this.bookService.getBooksByDateCreated(from, to)
      .subscribe(res => {
        this.newBooksYesterday = res.length;
      });

    this.userService.getUsersByDateCreated(from, to)
      .subscribe(res => {
        this.newUsersYesterday = res.length;
      });

    this.rentService.getNumberOfReturnedBooks(from, to)
      .subscribe(res => {
        this.booksReturnedYesterday = res.length;
      });
  }

  getLastWeekReport() {

    // number of issued books last week
    let today = new Date();
    let to = this.datePipe.transform(today, 'yyyy-MM-dd');

    let week = new Date(today.setDate(today.getDate() - 7));
    let from = this.datePipe.transform(week, 'yyyy-MM-dd');

    this.rentService.getNumberOfIssuedBooks(from, to)
      .subscribe(res => {
        this.booksIssuedLastWeek = res.length;
      });

    this.bookService.getBooksByDateCreated(from, to)
      .subscribe(res => {
        this.newBooksLastWeek = res.length;
      });

    this.userService.getUsersByDateCreated(from, to)
      .subscribe(res => {
        this.newUsersLastWeek = res.length;
      });

    this.rentService.getNumberOfReturnedBooks(from, to)
      .subscribe(res => {
        this.booksReturnedLastWeek = res.length;
      });
  }

  getLastMonthReport() {

    // number of issued books last month
    let today = new Date();
    let to = this.datePipe.transform(today, 'yyyy-MM-dd');

    let month = new Date(today.setDate(today.getDate() - 30));
    let from = this.datePipe.transform(month, 'yyyy-MM-dd');

    this.rentService.getNumberOfIssuedBooks(from, to)
      .subscribe(res => {
        this.booksIssuedLastMonth = res.length;
      });

    this.bookService.getBooksByDateCreated(from, to)
      .subscribe(res => {
        this.newBooksLastMonth = res.length;
      });

    this.userService.getUsersByDateCreated(from, to)
      .subscribe(res => {
        this.newUsersLastMonth = res.length;
      });

    this.rentService.getNumberOfReturnedBooks(from, to)
      .subscribe(res => {
        this.booksReturnedLastMonth = res.length;
      });
  }

  getReturnedBooks(period: string) {
    event.preventDefault();
    let to = "";
    let from = "";

    if (period == "today") {
      let today = new Date();
      from = this.datePipe.transform(today, 'yyyy-MM-dd');

      let tomorrow = new Date(today.setDate(today.getDate() + 1));
      to = this.datePipe.transform(tomorrow, 'yyyy-MM-dd');
    }
    else if (period == "yesterday") {
      let today = new Date();
      to = this.datePipe.transform(today, 'yyyy-MM-dd');

      let yesterday = new Date(today.setDate(today.getDate() - 1));
      from = this.datePipe.transform(yesterday, 'yyyy-MM-dd');
    }
    else if (period == "week") {
      let today = new Date();
      to = this.datePipe.transform(today, 'yyyy-MM-dd');

      let week = new Date(today.setDate(today.getDate() - 7));
      from = this.datePipe.transform(week, 'yyyy-MM-dd');
    }
    else if (period == "month") {
      let today = new Date();
      to = this.datePipe.transform(today, 'yyyy-MM-dd');

      let month = new Date(today.setDate(today.getDate() - 30));
      from = this.datePipe.transform(month, 'yyyy-MM-dd');
    }

    let booksId = new Array();
    this.rentService.getNumberOfReturnedBooks(from, to)
      .subscribe(resp => {
        /*
        for (let index = 0; index < resp.length; index++) {
          for (let j = 0; j < resp[index].rentedBooks.length; j++) {
            booksId.push(this.bookService.getBookById(resp[index].rentedBooks[j]));
          }        
        }
        forkJoin(booksId).subscribe(
          res => {
            for (let i = 0; i < res.length; i++) {
              this.returnedBooks.push(res[i]);
            }
          },
          error => console.log('Error: ', error)
        );*/

        this.rents = resp;
        let rents = resp;
        let observables = new Array();

        for (let i = 0; i < rents.length; i++) {
          observables.push(this.userService.getUserById(rents[i].user));
        }
        forkJoin(observables).subscribe(
          res => {
            for (let i = 0; i < res.length; i++) {
              this.userNames.push(res[i].firstName + " " + res[i].lastName);
            }
            //this.dtTrigger.next(); // last time table changes is here
          },
          error => console.log('Error: ', error)
        );
        // treba smisliti kako prikazati nazive knjiga ovo je presporo crasha
        let bookObservable = new Array();
        let userBooks = new Array();
        for (let i = 0; i < rents.length; i++) {
          bookObservable.push(this.bookService.getBooksByIds(rents[i].rentedBooks));
          userBooks.push(rents[i].rentedBooks.length);
        }
        forkJoin(bookObservable).subscribe(
          res => {
            for (let i = 0; i < res.length; i++) {
              this.returnedBooks.push(res[i]);
              this.bookNames.push(res[i]);
            }
          },
          error => console.log('Error: ', error)
        );
      });
  }

  getIssuedBooks(period: string) {
    event.preventDefault();
    let to = "";
    let from = "";

    if (period == "today") {
      let today = new Date();
      from = this.datePipe.transform(today, 'yyyy-MM-dd');

      let tomorrow = new Date(today.setDate(today.getDate() + 1));
      to = this.datePipe.transform(tomorrow, 'yyyy-MM-dd');
    }
    else if (period == "yesterday") {
      let today = new Date();
      to = this.datePipe.transform(today, 'yyyy-MM-dd');

      let yesterday = new Date(today.setDate(today.getDate() - 1));
      from = this.datePipe.transform(yesterday, 'yyyy-MM-dd');
    }
    else if (period == "week") {
      let today = new Date();
      to = this.datePipe.transform(today, 'yyyy-MM-dd');

      let week = new Date(today.setDate(today.getDate() - 7));
      from = this.datePipe.transform(week, 'yyyy-MM-dd');
    }
    else if (period == "month") {
      let today = new Date();
      to = this.datePipe.transform(today, 'yyyy-MM-dd');

      let month = new Date(today.setDate(today.getDate() - 30));
      from = this.datePipe.transform(month, 'yyyy-MM-dd');
    }

    let booksId = new Array();
    this.rentService.getNumberOfIssuedBooks(from, to)
      .subscribe(resp => {

        this.rents = resp;
        let rents = resp;
        let observables = new Array();

        for (let i = 0; i < rents.length; i++) {
          observables.push(this.userService.getUserById(rents[i].user));
        }
        forkJoin(observables).subscribe(
          res => {
            for (let i = 0; i < res.length; i++) {
              this.userNames.push(res[i].firstName + " " + res[i].lastName);
            }
          },
          error => console.log('Error: ', error)
        );

        let bookObservable = new Array();
        let userBooks = new Array();
        for (let i = 0; i < rents.length; i++) {
          bookObservable.push(this.bookService.getBooksByIds(rents[i].rentedBooks));
          userBooks.push(rents[i].rentedBooks.length);
        }
        forkJoin(bookObservable).subscribe(
          res => {
            for (let i = 0; i < res.length; i++) {
              this.returnedBooks.push(res[i]);
              this.bookNames.push(res[i]);
            }
          },
          error => console.log('Error: ', error)
        );
      });
  }

  getBooks(period: string) {

    event.preventDefault();
    let to = "";
    let from = "";

    if (period == "today") {
      let today = new Date();
      from = this.datePipe.transform(today, 'yyyy-MM-dd');

      let tomorrow = new Date(today.setDate(today.getDate() + 1));
      to = this.datePipe.transform(tomorrow, 'yyyy-MM-dd');
    }
    else if (period == "yesterday") {
      let today = new Date();
      to = this.datePipe.transform(today, 'yyyy-MM-dd');

      let yesterday = new Date(today.setDate(today.getDate() - 1));
      from = this.datePipe.transform(yesterday, 'yyyy-MM-dd');
    }
    else if (period == "week") {
      let today = new Date();
      to = this.datePipe.transform(today, 'yyyy-MM-dd');

      let week = new Date(today.setDate(today.getDate() - 7));
      from = this.datePipe.transform(week, 'yyyy-MM-dd');
    }
    else if (period == "month") {
      let today = new Date();
      to = this.datePipe.transform(today, 'yyyy-MM-dd');

      let month = new Date(today.setDate(today.getDate() - 30));
      from = this.datePipe.transform(month, 'yyyy-MM-dd');
    }

    this.bookService.getBooksByDateCreated(from, to)
      .subscribe(resp => {
        this.books = resp;
      });
  }

  getMembers(period: string) {

    event.preventDefault();
    let to = "";
    let from = "";

    if (period == "today") {
      let today = new Date();
      from = this.datePipe.transform(today, 'yyyy-MM-dd');

      let tomorrow = new Date(today.setDate(today.getDate() + 1));
      to = this.datePipe.transform(tomorrow, 'yyyy-MM-dd');
    }
    else if (period == "yesterday") {
      let today = new Date();
      to = this.datePipe.transform(today, 'yyyy-MM-dd');

      let yesterday = new Date(today.setDate(today.getDate() - 1));
      from = this.datePipe.transform(yesterday, 'yyyy-MM-dd');
    }
    else if (period == "week") {
      let today = new Date();
      to = this.datePipe.transform(today, 'yyyy-MM-dd');

      let week = new Date(today.setDate(today.getDate() - 7));
      from = this.datePipe.transform(week, 'yyyy-MM-dd');
    }
    else if (period == "month") {
      let today = new Date();
      to = this.datePipe.transform(today, 'yyyy-MM-dd');

      let month = new Date(today.setDate(today.getDate() - 30));
      from = this.datePipe.transform(month, 'yyyy-MM-dd');
    }

    this.userService.getUsersByDateCreated(from, to)
      .subscribe(resp => {
        this.users = resp;
      });
  }



  exportPDF(id : string) {
    var elem = document.getElementById(id);

    return html2canvas(elem).then(function (canvas) {
      var myImage = canvas.toDataURL("image/jpeg,1.0");

      // jspdf changes
      var pdf = new jsPDF('p', 'mm', 'a4');

      var imgWidth = (canvas.width * 20)/90;
      var imgHeight = (canvas.height * 20)/90;

      var width = pdf.internal.pageSize.width;
      var height = pdf.internal.pageSize.height;
      pdf.setFontSize(16);
      pdf.text(10, 10, "Report");
      pdf.addImage(myImage, 'JPEG', 0, 30, imgWidth, imgHeight); // 2: 19
      pdf.save('Download.pdf');
    }
    );
    /*
        //var doc = new jsPDF('p', 'pt');
        var doc = new jsPDF();
        var totalPagesExp = "{total_pages_count_string}";
    
        var elem = document.getElementById("list-user-table");
        var res = doc.autoTableHtmlToJson(elem);
    
        var pageContent = function (data) {
          // HEADER
          doc.setFontSize(20);
          doc.setTextColor(40);
          doc.setFontStyle('normal');
    
          doc.text("Škola", data.settings.margin.left + 15, 22);
    
          // FOOTER
          var str = "Page " + data.pageCount;
          // Total page number plugin only available in jspdf v1.0+
          if (typeof doc.putTotalPages === 'function') {
            str = str + " of " + totalPagesExp;
          }
          doc.setFontSize(10);
          var pageHeight = doc.internal.pageSize.height || doc.internal.pageSize.getHeight();
          doc.text(str, data.settings.margin.left, pageHeight - 10);
        };
    
        doc.autoTable(res.columns, res.data, {
          addPageContent: pageContent,
          margin: { top: 30 }
        });
    
        // Total page number plugin only available in jspdf v1.0+
        if (typeof doc.putTotalPages === 'function') {
          doc.putTotalPages(totalPagesExp);
      }
    
        doc.save("table.pdf");*/

  }

}
