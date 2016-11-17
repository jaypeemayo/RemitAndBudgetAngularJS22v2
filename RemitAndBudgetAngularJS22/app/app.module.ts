import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http'; //for http requests
import { FormsModule } from '@angular/forms'; //for ngModel
import { HashLocationStrategy, LocationStrategy } from '@angular/common'; // to prevent error 404 when refresh.

import { AppComponent } from './app.component';
import { AuthenticationComponent } from './authentication.component';
import { AppRoutingModule } from './app-routing.module';
import { DashboardComponent } from './dashboard.component';
import { TransactionComponent } from './transaction.component';
import { RegisterTransactionComponent } from './register-transaction.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {TransactionDetailComponent} from "./transaction-detail.component";




@NgModule({
    imports: [BrowserModule,
                FormsModule,
                HttpModule,
                AppRoutingModule,
                NgbModule.forRoot()],
    declarations: [AppComponent,
                    AuthenticationComponent,
                    DashboardComponent,
                    TransactionComponent,
                    RegisterTransactionComponent, TransactionDetailComponent],
    providers: [{ provide: LocationStrategy, useClass: HashLocationStrategy }],
    bootstrap: [AppComponent]
})
export class AppModule { }
