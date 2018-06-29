import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Rent } from '../model/rent.model';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class RentService {
    constructor(private http: HttpClient) { }
    baseUrl: string = 'https://localhost:8200/api/rents';

    getRents() {
        return this.http.get<Rent[]>(this.baseUrl);
    }

    getRentsById(id: number) {
        return this.http.get<Rent>(this.baseUrl + '/' + id);
    }

    getNumberOfIssuedBooks(from:string, to:string) {
        return this.http.get<Rent[]>(this.baseUrl  + '/' + 'issuedBooks/from/' + from + '/to/' + to);
    }

    getNumberOfReturnedBooks(from:string, to:string) {
        return this.http.get<Rent[]>(this.baseUrl  + '/' + 'returnedBooks/from/' + from + '/to/' + to);
    }

    getRentsByUserId(id:number) {
        return this.http.get<Rent[]>(this.baseUrl + '/user/' + id);
    }

    rentBook(rent: Rent) {
        return this.http.post(this.baseUrl,rent);
    }

    returnABook(rent: Rent) {
        return this.http.post(this.baseUrl + '/return-rented',rent);
    }

    getUnreturnedRents() {
        return this.http.get<Rent[]>(this.baseUrl + "/un-returned");
    }
}