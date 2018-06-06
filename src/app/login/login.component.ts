import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { AuthService } from '../service/auth.service';
import { TokenStorage } from '../service/token.storage';
import { UserService } from '../service/user.service';
import {Observable} from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BookService } from '../service/book.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  submitted: boolean = false;
  invalidLogin: boolean = false;

  constructor(private formBuilder: FormBuilder, private router: Router, private authService: AuthService,
    private tokenStorage: TokenStorage, private userService: UserService, private http:HttpClient,
  private bookService: BookService) { }

  onSubmit() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }/*
    if(this.loginForm.controls.username.value == 'mirnes' && this.loginForm.controls.password.value == 'password') {
      this.router.navigate(['list-user']);
    } else {
      this.invalidLogin = true;
    } */
    this.authService.attemptAuth(this.loginForm.controls.username.value, this.loginForm.controls.password.value)
      .subscribe(data => {
        this.tokenStorage.saveToken(data.token);
        //console.log(data.token); dodati logiku da odredi jel admin ili user
        this.userService.getUserByUsername(this.loginForm.controls.username.value)
          .subscribe(res => {
            this.tokenStorage.saveUserId(res.id.toString());
            this.tokenStorage.saveRole(res.role.toLowerCase());
            if (res.role.toLowerCase() == 'admin') {
              this.router.navigate(['admin-panel']);
            } else {
              this.router.navigate(['user-panel']);
            }
          })
      },
      error => {
        let errMsg = (error.message) ? error.message : error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        alert(errMsg);
      }
    );

  }

  proba() {
    
    var headers = new HttpHeaders().set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJtcHV6aWMiLCJyb2xlIjoidXNlciIsImlzcyI6Imh0dHA6Ly9kZXZnbGFuLmNvbSIsImlhdCI6MTUyODE0NzA3NywiZXhwIjoxNTI4MTQ4ODc3fQ.dMtkkkoE7vR7lSoVAFgQs87m3gFKDHbTw7o5s81T3JA');
        var options =  {
            headers: headers
        };
    this.http.get('http://localhost:8000/api/books',options)
    .subscribe(res => {
      console.log(res);
    })
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

}
