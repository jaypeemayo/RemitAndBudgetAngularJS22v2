import { Component, OnInit } from '@angular/core';
import { TransactionService } from './transaction.service';
import { Transaction } from './transaction';
import { HttpClient } from './http-client.service';
import constants = require('./constants');
import { AuthenticationNotifyService } from './authentication-notify.service';
import {Router} from "@angular/router";

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
        private authenticationNotifyService: AuthenticationNotifyService,
        private router: Router) {
        this.transaction = new Transaction();
    }

    ngOnInit(): void {
        var isLoggedIn = sessionStorage.getItem(constants.tokenKey) != null;
        this.authenticationNotifyService.publishAuthenticationChange(isLoggedIn);
    }

    //for register-transaction
    //template driven.
    submitForm(formValue: any) {
      this.transactionService.addTransaction(formValue.value).then(o=>{
        this.showAlert(o);
      });


    }

    //for register-transaction-orig
    addTransaction(): void
    {
        this.transactionService.addTransaction(this.transaction).then(o=>{
          this.showAlert(o);
        });
    }

    showAlert(o:boolean){

      if(o==true){
        alert('add sucessful.');
        this.router.navigate(['/transaction']);
      }
      else
      {
        alert('add unsuccessful.');
      }
    }

}
