import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Router } from '@angular/router';
import { TokenStorage } from './token.storage';
import { Observable } from 'rxjs';

@Injectable()
export class Interceptor implements HttpInterceptor {

  constructor(private token: TokenStorage, private router: Router) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log(this.token.getToken());
    if (this.token.getToken() != null) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${this.token.getToken()}`
        }
      });
    }
    return next.handle(request);
  }
}