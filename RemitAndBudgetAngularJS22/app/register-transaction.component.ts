import { Component, OnInit } from '@angular/core';
import { TransactionService } from './transaction.service';
import { Transaction } from './transaction';
import { HttpClient } from './http-client.service';
import constants = require('./constants');
import { AuthenticationNotifyService } from './authentication-notify.service';

@Component({
    moduleId: module.id,
    templateUrl: 'register-transaction.component.html',
    //templateUrl: 'register-transaction-orig.component.html',
    selector: 'register-transaction',
    providers: [TransactionService,
                HttpClient,
                AuthenticationNotifyService]
})
export class RegisterTransactionComponent implements OnInit {
    errorAmount: string;
    transaction: Transaction;
    message: string;

    constructor(private transactionService: TransactionService,
        private authenticationNotifyService: AuthenticationNotifyService) {
        this.transaction = new Transaction();
    }

    ngOnInit(): void {
        var isLoggedIn = sessionStorage.getItem(constants.tokenKey) != null;
        this.authenticationNotifyService.publishAuthenticationChange(isLoggedIn);
    }

    //for register-transaction
    //template driven.
    submitForm(formValue: any) {
      this.transactionService.addTransaction(formValue.value);
      this.message = `addTransaction + ${this.transaction.action} + ${this.transaction.amount} + ${this.transaction.month} + ${this.transaction.description}`;
      console.log(`addTransaction + ${this.transaction.action} + ${this.transaction.amount} + ${this.transaction.month} + ${this.transaction.description}`);
    }

    //for register-transaction-orig
    addTransaction(): void
    {
        this.transactionService.addTransaction(this.transaction); //issue, does not invoke the web api.
        this.message = `addTransaction + ${this.transaction.action} + ${this.transaction.amount} + ${this.transaction.month} + ${this.transaction.description}`;
        console.log(`addTransaction + ${this.transaction.action} + ${this.transaction.amount} + ${this.transaction.month} + ${this.transaction.description}`);
    }

}
