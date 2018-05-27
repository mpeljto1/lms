import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {RentService} from "../service/rent.service";
import {Rent} from "../model/rent.model";
import {Globals } from '../model/Globals';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-list-rent',
  templateUrl: './list-rent.component.html',
  styleUrls: ['./list-rent.component.css']
})
export class ListRentComponent implements OnInit {

  rents: Rent[];
  userNames: String[];

  constructor(private router:Router, private rentService: RentService, private globals:Globals,
  private userService: UserService) { }

  ngOnInit() {
    this.globals.title="List of rents";
    this.rentService.getRents()
    .subscribe(data => {
      this.rents = data;
      for (let i = 0; i < 2; i++) {
        let user = this.getUserNameById(this.rents[i].user);
        //this.userNames.push(user);
        alert(user);
      }
    });
  }

  getUserNameById(id:number) {
    this.userService.getUserById(id)
    .subscribe(data => {
      return data.firstName + " " + data.lastName;
    });
  }
}
