import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import constants = require('./constants');

@Injectable()
export class AuthenticationNotifyService {
    
    private authenticationChangeEvent = new Subject<boolean>();
    authenticationChangeEvent$ = this.authenticationChangeEvent.asObservable();

    publishAuthenticationChange(isLoggedIn: boolean) {
        this.authenticationChangeEvent.next(isLoggedIn);
    }
}
