import { Component, OnInit } from '@angular/core';
import { AuthenticationNotifyService } from './authentication-notify.service';
import constants = require('./constants');
import { TransactionService } from './transaction.service';
import { Transaction } from './transaction';
import { HttpClient } from './http-client.service';
import {Route, Router} from "@angular/router";

@Component({
    moduleId: module.id,
    selector: 'dashboard',
    templateUrl: 'dashboard.component.html',
    providers: [AuthenticationNotifyService,
                TransactionService,
                HttpClient],
    styleUrls: ['dashboard.component.css']

})
export class DashboardComponent implements OnInit {
    transactions: Transaction[];

    constructor(private transactionService: TransactionService,
        private authenticationNotifyService: AuthenticationNotifyService,
        private router: Router) { }

    ngOnInit(): void {
        this.transactionService.getTransactions().then((transactions) => {
            this.transactions = transactions
        })

        var isLoggedIn = sessionStorage.getItem(constants.tokenKey) != null;
        this.authenticationNotifyService.publishAuthenticationChange(isLoggedIn);
    }

    gotoDetail(transaction:Transaction){

      this.router.navigate(['/transaction-detail', transaction.transactionInfoId])
    }
}




