import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../service/user.service";
import {first} from "rxjs/operators";
import {Router} from "@angular/router";

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  addForm: FormGroup;
  submitted: boolean = false;

  constructor(private formBuilder: FormBuilder, private router: Router, private userService: UserService) { }

  ngOnInit() {
    this.addForm = this.formBuilder.group({
      id: [],
      firstName: ['',[Validators.required, Validators.minLength(3), Validators.pattern('^[a-zšđčćžA-ZŠĐČĆŽ]+$')]],
      lastName: ['', [Validators.required, Validators.minLength(3), Validators.pattern('^[a-zšđčćžA-ZŠĐČĆŽ]+$')]],
      address: ['', [Validators.required, Validators.pattern('^(?:[A-ZŠĐČĆŽa-zšđčćž]+)(?:[A-ZŠĐČĆŽa-zšđčćž0-9 _]*)$')]],
      gender: ['', [Validators.required, Validators.pattern('^[mf]$')]],
      phone: ['', Validators.required],
      password: ['', Validators.required],
      username: ['',Validators.required],
      role: ['', [Validators.required, Validators.pattern('^(user|admin)$')]]
    });
  }

  onSubmit() {
    this.submitted = true;
    if(this.addForm.invalid) {
      return;
    }
    this.userService.createUser(this.addForm.value)
    .subscribe(data => {
      this.router.navigate(['list-user']);
    });
  }

}
