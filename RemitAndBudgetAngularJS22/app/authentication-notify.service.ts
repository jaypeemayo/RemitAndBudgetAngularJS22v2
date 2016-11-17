import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import constants = require('./constants');
import { TransactionService } from './transaction.service';
import { Router } from '@angular/router';

@Injectable()
export class AuthenticationNotifyService {
    
    private authenticationChangeEvent = new Subject<boolean>();
    authenticationChangeEvent$ = this.authenticationChangeEvent.asObservable();

    constructor(private router: Router){}

    publishAuthenticationChange(isLoggedIn: boolean) {
        this.authenticationChangeEvent.next(isLoggedIn);
    }
}