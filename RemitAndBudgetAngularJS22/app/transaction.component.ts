import { Component, OnInit } from '@angular/core';
import { TransactionService } from './transaction.service';
import { HttpClient } from './http-client.service';
import { Transaction } from './transaction';
import { Router } from '@angular/router';
import constants = require('./constants');
import { AuthenticationNotifyService } from './authentication-notify.service';

@Component({
    selector: 'transaction',
    moduleId: module.id,
    templateUrl: 'transaction.component.html',
    providers: [TransactionService,
        HttpClient]

})
export class TransactionComponent implements OnInit
{
    transactions: Transaction[];
    constructor(private transactionService: TransactionService,
        private router: Router,
        private authenticationNotifyService: AuthenticationNotifyService) { }

    ngOnInit(): void {
        this.transactionService.getTransactions().then((transactions) => {
            this.transactions = transactions
        });

        let isLoggedIn = sessionStorage.getItem(constants.tokenKey) != null;
        this.authenticationNotifyService.publishAuthenticationChange(isLoggedIn);
    }

    showDetails(transactionInfo: Transaction)
    {
      this.router.navigate(['/transaction-detail', transactionInfo.transactionInfoId]);
    }

}
