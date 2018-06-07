import { Component, OnInit } from '@angular/core';
import {UserService} from "../service/user.service";
import {Router} from "@angular/router";
import {User} from "../model/user.model";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {first} from "rxjs/operators";

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  user: User;
  editForm: FormGroup;
  submitted: boolean = false;
  constructor(private formBuilder: FormBuilder,private router: Router, private userService: UserService) { }

  ngOnInit() {
    let userId = localStorage.getItem("editUserId");
    if(!userId) {
      alert("Invalid action.")
      this.router.navigate(['admin-panel/list-user']);
      return;
    }
    this.editForm = this.formBuilder.group({
      id: [],
      firstName: ['',[Validators.required, Validators.minLength(3), Validators.pattern('^[a-zšđčćžA-ZŠĐČĆŽ]+$')]],
      lastName: ['', [Validators.required, Validators.minLength(3), Validators.pattern('^[a-zšđčćžA-ZŠĐČĆŽ]+$')]],
      address: ['', [Validators.required, Validators.pattern('^(?:[A-ZŠĐČĆŽa-zšđčćž]+)(?:[A-ZŠĐČĆŽa-zšđčćž0-9 _]*)$')]],
      gender: ['', [Validators.required, Validators.pattern('^[mf]$')]],
      phone: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$')]],
      password: ['', Validators.required],
      username: ['',Validators.required],
      role: ['', [Validators.required, Validators.pattern('^(user|admin)$')]]
    });
    this.userService.getUserById(+userId)
      .subscribe( data => {
        this.editForm.setValue(data);
      });
  }

  onSubmit() {
    this.submitted = true;
    if(this.editForm.invalid) {
      return;
    }
    this.userService.updateUser(this.editForm.value)
      .pipe(first())
      .subscribe(
        data => {
          this.router.navigate(['admin-panel/list-user']);
        },
        error => {
          alert(error);
        });
  }

}
