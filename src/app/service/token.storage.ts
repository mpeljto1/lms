import { Injectable } from '@angular/core';


const TOKEN_KEY = 'AuthToken';
const LOGGED_USER_ROLE = 'role';
const LOGGED_USER = 'id';

@Injectable()
export class TokenStorage {

  constructor() { }

  signOut() {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.removeItem(LOGGED_USER_ROLE);
    window.sessionStorage.removeItem(LOGGED_USER);
    window.sessionStorage.clear();
  }

  public saveToken(token: string) {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string {
    return sessionStorage.getItem(TOKEN_KEY);
  }

  public saveRole(role: string) {
    window.sessionStorage.removeItem(LOGGED_USER_ROLE);
    window.sessionStorage.setItem(LOGGED_USER_ROLE, role);
  }

  public getRole(): string {
    return sessionStorage.getItem(LOGGED_USER_ROLE);
  }

  public saveUserId(id:string) {
    window.sessionStorage.removeItem(LOGGED_USER);
    window.sessionStorage.setItem(LOGGED_USER, id);
  }

  public getUserId() {
    return sessionStorage.getItem(LOGGED_USER);
  }
}