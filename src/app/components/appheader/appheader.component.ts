import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import {TokenStorage} from '../../service/token.storage';
import { DataService } from '../../service/data.service';

@Component({
  selector: 'app-appheader',
  templateUrl: './appheader.component.html',
  styleUrls: ['./appheader.component.css']
})
export class AppheaderComponent implements OnInit {

  loggedUser : string;
  role : string;

  constructor(private router:Router, private token:TokenStorage, private dataService: DataService) { }

  ngOnInit() {
    this.dataService.currentMessage.subscribe(message => this.loggedUser = message);
    this.role = this.token.getRole();
  }

  signOut() {
    this.token.signOut();
    this.router.navigate(['']);
  }

}
