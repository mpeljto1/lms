import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Rent } from '../model/rent.model';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class RentService {
    constructor(private http: HttpClient) { }
    baseUrl: string = 'http://localhost:8200/api/rents';

    getRents() {
        return this.http.get<Rent[]>(this.baseUrl);
    }

    getRentsById(id: number) {
        return this.http.get<Rent>(this.baseUrl + '/' + id);
    }

    getNumberOfIssuedBooks(from:string, to:string) {
        return this.http.get<number>(this.baseUrl  + '/' + 'issuedBooks/from/' + from + '/to/' + to);
    }
}