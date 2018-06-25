import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { AuthService2 } from '../service/auth.service';
import { TokenStorage } from '../service/token.storage';
import { UserService } from '../service/user.service';
import {Observable} from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BookService } from '../service/book.service';
import { AuthService, GoogleLoginProvider } from "angular5-social-login";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  submitted: boolean = false;
  invalidLogin: boolean = false;

  constructor(private formBuilder: FormBuilder, private router: Router, private authService: AuthService2,
    private tokenStorage: TokenStorage, private userService: UserService, private http:HttpClient,
  private bookService: BookService, private socialAuthService: AuthService) { }

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

  public signinWithGoogle () {
    
    let socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
  
    this.socialAuthService.signIn(socialPlatformProvider).then(
      (userData) => { //on success
         //this will return user data from google. What you need is a user token which you will send it to the server
         //this.sendToRestApiMethod(userData.idToken);
         console.log(userData);
         // add code that calls user-service to generate token then redirect
         let email = userData.email;
         this.authService.attemptAuthGoogle(email)
         .subscribe(data => {
           this.tokenStorage.saveToken(data.token);

           this.userService.getUserByEmail(email)
          .subscribe(res => {
            this.tokenStorage.saveUserId(res.id.toString());
            this.tokenStorage.saveRole(res.role.toLowerCase());
            if (res.role.toLowerCase() == 'admin') {
              this.router.navigate(['admin-panel']);
            } else {
              this.router.navigate(['user-panel']);
            }
          })
         })
      },
      error => {
        let errMsg = (error.message) ? error.message : error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        alert(errMsg);
      }
    );
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

}
