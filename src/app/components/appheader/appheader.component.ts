import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import {TokenStorage} from '../../service/token.storage';

@Component({
  selector: 'app-appheader',
  templateUrl: './appheader.component.html',
  styleUrls: ['./appheader.component.css']
})
export class AppheaderComponent implements OnInit {

  constructor(private router:Router, private token:TokenStorage) { }

  ngOnInit() {
  }

  signOut() {
    this.token.signOut();
    this.router.navigate(['']);
  }

}
