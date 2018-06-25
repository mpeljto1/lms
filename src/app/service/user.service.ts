import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../model/user.model';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

@Injectable()
export class UserService {
    constructor(private http: HttpClient) { }
    baseUrl: string = 'https://localhost:8100/api/users';

    getUsers() {
        return this.http.get<User[]>(this.baseUrl);
    }

    getUserById(id: number) {
        return this.http.get<User>(this.baseUrl + '/' + id);
    }

    createUser(user:User) {
        return this.http.post(this.baseUrl, user);
    }

    updateUser(user:User) {
        return this.http.put(this.baseUrl + '/' + user.id, user);
    }

    deleteUser(id:number) {
        return this.http.delete(this.baseUrl + '/' + id);
    }

    getUsersByDateCreated(from:string, to:string) {
        return this.http.get<User[]>(this.baseUrl + '/dateCreated/from/' + from + '/to/' + to);
    }

    getUserByUsername(username:string) {
        return this.http.get<User>(this.baseUrl + '/username/' + username);
    }

    registerUser(user:User) {
        return this.http.post(this.baseUrl + '/register', user);
    }

    getUserByEmail(email:string) {
        return this.http.get<User>(this.baseUrl + '/email/' + email);
    }
}