import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';


@Injectable()
export class AuthService2 {

  baseUrl: 'http://localhost:8080/email2sms/';

  constructor(private http: HttpClient) {
  }

  attemptAuth(ussername: string, password: string): Observable<any> {
    const credentials = {username: ussername, password: password};
    return this.http.post('https://localhost:8100/token/generate-token', credentials).pipe(
      catchError(error => { 
        return this.handleError(error);
      })
    );
  }

  attemptAuthGoogle(email_address:string):Observable<any> {
    const credentials = {email:email_address};
    return this.http.post('https://localhost:8100/token/generate-token-email', credentials).pipe(
      catchError(error => {
        return this.handleError(error);
      })
    );
  }

  handleError(error:HttpErrorResponse) {
    let errMsg = (error.message) ? error.message : error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.log(error);
    return throwError(error);
  }

}