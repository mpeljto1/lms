import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../service/user.service";
import {first} from "rxjs/operators";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

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
      email: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$')]],
      password: ['', Validators.required],
      username: ['',Validators.required],
      role: []
    });
  }

  onSubmit() {
    this.submitted = true;
    this.addForm.controls.role.setValue('user');
    if(this.addForm.invalid) {
      return;
    }
    this.userService.registerUser(this.addForm.value)
    .subscribe(data => {
      this.router.navigate(['/login']);
    });
  }

}
