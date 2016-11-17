import { Injectable } from '@angular/core';
import { HttpClient } from './http-client.service';
import { Transaction } from './transaction'
import {urlPrefix} from "./constants";


@Injectable()
export class TransactionService {
    constructor(private httpClient: HttpClient) { }
    getTransactions(): Promise<Transaction[]> {
        return this.httpClient.get(urlPrefix + '/api/TransactionInfoes').toPromise().
            then(response => {
            return response.json() as Transaction[];
        }).catch(this.handleError)
    }

    addTransaction(transaction: Transaction): Promise<Transaction[]>
    {
        var transactionInfo = { "transactionInfoId": 2018, "amount": "5", "month": "2016-11-20T16:00:00Z", "description": "12", "action": "Remitances", "userInfoId": 1 };
        return this.httpClient.post(urlPrefix + '/api/TransactionInfoes', transactionInfo).toPromise()
            .then(res => res.json().data)
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
}
