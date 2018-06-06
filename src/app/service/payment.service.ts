import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Payment } from '../model/payment.model';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class PaymentService {
    constructor(private http: HttpClient) { }
    baseUrl: string = 'https://localhost:8300/api/payments';

    getPayments() {
        return this.http.get<Payment[]>(this.baseUrl);
    }
}