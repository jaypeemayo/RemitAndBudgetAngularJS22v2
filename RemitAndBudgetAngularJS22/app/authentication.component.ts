import { Component, Input } from '@angular/core';
import { AuthenticationService } from './authentication.service';
import { Router } from '@angular/router';
import { AuthenticationNotifyService } from './authentication-notify.service';
import constants = require('./constants');

@Component({
    moduleId: module.id,
    selector: "authentication",
    templateUrl: 'authentication.component.html',
    providers: [AuthenticationService]
})
export class AuthenticationComponent {

    constructor(private authenticationService: AuthenticationService,
        private router: Router,
        private authenticationNotifyService: AuthenticationNotifyService) { }

    userName: string = 'oyams90';
    password: string = '123456';
    token: string;
    onLogin() {
       
        this.authenticationService.login(this.userName, this.password)

            .then(token => {
                console.log(token);
                sessionStorage.setItem(constants.tokenKey, token);
                this.authenticationNotifyService.publishAuthenticationChange(true);
                this.router.navigate(['/dashboard']);
            })
            .catch(reason => { alert(reason); })
    }   
}