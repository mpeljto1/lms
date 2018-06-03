import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { Globals } from '../model/Globals';
import { DataTablesModule } from 'angular-datatables';
import { Payment } from '../model/payment.model';
import { PaymentService } from '../service/payment.service';
import { Subject } from 'rxjs';
import { Observable } from 'rxjs';
import { UserService } from '../service/user.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-list-payment',
  templateUrl: './list-payment.component.html',
  styleUrls: ['./list-payment.component.css']
})
export class ListPaymentComponent implements OnInit {

  payments: Payment[];
  userNames: String[];
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();

  constructor(private router:Router, private globals:Globals, private paymentService:PaymentService,
  private userService:UserService ) {
    this.userNames = [];
   }

  ngOnInit() {

    this.globals.title = "List of payments";
    this.paymentService.getPayments()
    .subscribe(res => {
      this.payments = res;

      let observables = new Array();

      for (let i = 0; i < this.payments.length; i++) {
        observables.push(this.userService.getUserById(this.payments[i].user));
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
