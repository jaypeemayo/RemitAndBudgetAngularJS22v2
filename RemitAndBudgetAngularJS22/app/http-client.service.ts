//this wis act as interceptor in angular js 2

import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import constants = require('./constants');

@Injectable()
export class HttpClient {
    constructor(private http: Http) { }

    createAuthorizationHeader(headers: Headers) {
        var tokenKey = sessionStorage.getItem(constants.tokenKey);
        if (tokenKey) {
            headers.append('Authorization', 'Bearer ' + tokenKey);
        }
    }

    get(url: string) {
        let headers = new Headers();
        this.createAuthorizationHeader(headers);
        return this.http.get(url, {
            headers: headers
        });
    }

    post(url: string, data: any) {
        let headers = new Headers();
        this.createAuthorizationHeader(headers);
        return this.http.post(url, data, {
            headers: headers
        });
    }

    //post2(url: string, data: any) {
    //    let headers = new Headers();
    //    this.createAuthorizationHeader(headers);
    //    return this.http.post(url, data, {
    //        headers: headers
    //    }).toPromise()
    //        .then(res => res.json().data)
    //        .catch(this.handleError);

    //}

    //private handleError(error: any): Promise<any> {
    //    console.error('An error occurred', error); // for demo purposes only
    //    return Promise.reject(error.message || error);
    //}
}