import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './authentication.service'
import { Subscription } from 'rxjs/Subscription';
import { AuthenticationNotifyService } from './authentication-notify.service';
import constants = require('./constants');
import { Router } from '@angular/router';

@Component({
    moduleId: module.id,
    selector: 'my-app',
    templateUrl: 'app.component.html',
    providers: [AuthenticationNotifyService],
    styleUrls:['app.component.css']
})
export class AppComponent implements OnInit {
    isLoggedIn: boolean;
    subscription: Subscription;


    constructor(private authenticationNotifyService: AuthenticationNotifyService,
        private router: Router) {
        authenticationNotifyService.authenticationChangeEvent$.subscribe(
            isLoggedIn => {
                this.isLoggedIn = isLoggedIn;

                if (isLoggedIn == false) {
                    this.router.navigate(['login']);
                }
            });
    }

    ngOnInit() {
        this.isLoggedIn = sessionStorage.getItem(constants.tokenKey) != null;
    }

    logOut(): void {
        console.log("current token is" + sessionStorage.getItem(constants.tokenKey));
        sessionStorage.removeItem(constants.tokenKey) //"token" must be put to constant
        console.log("token is removed" + sessionStorage.getItem(constants.tokenKey));
        this.isLoggedIn = false;
        this.router.navigate(['/login']);
    }
}
