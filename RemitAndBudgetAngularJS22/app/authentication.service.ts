import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Subject } from 'rxjs/Subject';



@Injectable()
export class AuthenticationService
{
    private headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    constructor(private http: Http) { }
    login(username: string, password: string): Promise<string> {
        const url = "/token";
        var data = "grant_type=password&username=" + username + "&password=" + password;
       
        return this.http.post(url, data, { headers: this.headers }).toPromise().then(response =>
        {
            console.log(response);
            return response.json().access_token;
        });
    }
}