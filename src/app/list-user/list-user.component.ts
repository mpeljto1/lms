import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {UserService} from "../service/user.service";
import {User} from "../model/user.model";
import {Globals } from '../model/Globals';
import { DataTablesModule } from 'angular-datatables';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css']
})
export class ListUserComponent implements OnInit {

  dtOptions: DataTables.Settings = {};
  users: User[];
  dtTrigger: Subject<any> = new Subject();

  constructor(private router: Router, private userService: UserService, private globals:Globals) { }

  ngOnInit() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5
    };
    this.globals.title = "List of users";
    this.userService.getUsers()
    .subscribe(data => {
      this.users = data;
      this.dtTrigger.next();
    });
  }

  deleteUser(user: User) : void {
    this.userService.deleteUser(user.id)
    .subscribe(data => {
      this.users = this.users.filter(u => u!= user);
    })
  };

  editUser(user:User) : void {
    localStorage.removeItem('editUserId');
    localStorage.setItem('editUserId', user.id.toString());
    this.router.navigate(['admin-panel/edit-user']);
    this.globals.title = "Edit user : " + user.firstName + " " + user.lastName;
  }

  addUser() : void {
    this.router.navigate(['admin-panel/add-user']);
    this.globals.title = "Add new user";
  }

  goToAdminPanel() : void {
    this.router.navigate(['admin-panel']);
  }

}
