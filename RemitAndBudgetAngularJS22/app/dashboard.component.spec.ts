import {TestBed, ComponentFixture, async} from "@angular/core/testing";
import {DashboardComponent} from "./dashboard.component";
import {TransactionService} from "./transaction.service";
import {Transaction} from "./transaction";
import {HttpClient} from "./http-client.service";
import {Http, ConnectionBackend, RequestOptions, BaseRequestOptions} from "@angular/http";
import {MockBackend} from "@angular/http/testing";
import {NavigationExtras, Router} from "@angular/router";
import {AuthenticationNotifyService} from "./authentication-notify.service";
import constants = require('./constants');
/**
 * Created by jaype on 12/3/2016.
 */


  let fixture: ComponentFixture<DashboardComponent>;
  let componentInstance: DashboardComponent;
  let transactionService: TransactionService;
  let authenticationNotifyService: AuthenticationNotifyService;
  let spy: jasmine.Spy;
  let spyGetTransactions: jasmine.Spy;
  let transactions: Transaction[];

  describe('dashboard',()=>{
    let transaction = new Transaction()
    transaction.transactionInfoId = 1;
    let transaction2 = new Transaction()
    transaction.transactionInfoId = 2;
    transactions = [transaction, transaction2];

    beforeEach(async( ()=>{
     TestBed.configureTestingModule({
       declarations:[DashboardComponent],
       providers:[
         MockBackend, //for mocking http
         BaseRequestOptions, //for mocking http
         {
           provide: Http,
           useFactory: (backendInstance: MockBackend, defaultOptions: BaseRequestOptions) => {
             return new Http(backendInstance, defaultOptions);
           },
           deps: [MockBackend, BaseRequestOptions] //for mocking http
         },
         TransactionService,
         {provide:Router, useClass: RouterStub},
         AuthenticationNotifyService
       ],
     }).compileComponents();//to compile css and template url.
    }));

    beforeEach(()=>{
      fixture = TestBed.createComponent(DashboardComponent); //get fixture
      componentInstance = fixture.componentInstance; //get instance
      transactionService = fixture.debugElement.injector.get(TransactionService);

      spy = spyOn(transactionService, 'getTransactions')
        .and.returnValue(Promise.resolve(transactions));

      authenticationNotifyService = fixture.debugElement.injector.get(AuthenticationNotifyService);

      spyGetTransactions = spyOn(authenticationNotifyService, 'publishAuthenticationChange');
    });

    it('get transaction return and publishAuthenticationChange true', async(() => {

      sessionStorage.setItem(constants.tokenKey,'dummyToken'); //set token
      fixture.detectChanges();
      fixture.whenStable().then(() => { // wait for async getTransactions
        //fixture.detectChanges();        // update view with quote
        expect(componentInstance.transactions).toEqual(transactions);
        //expect(el.textContent).toBe(testQuote);


        expect(authenticationNotifyService.publishAuthenticationChange).toHaveBeenCalledWith(true); //since token is set,true must be passed to publishAuthenticationChange
      });
    }));

    it('get transaction return and publishAuthenticationChange false', async(() => {

      sessionStorage.clear();
      fixture.detectChanges();
      fixture.whenStable().then(() => { // wait for async getTransactions
        expect(componentInstance.transactions).toEqual(transactions);
        expect(authenticationNotifyService.publishAuthenticationChange).toHaveBeenCalledWith(false); //since token is set,false must be passed to publishAuthenticationChange
      });
    }));

  });

class RouterStub {
  navigateByUrl(url: string) { return url; }
  navigate(commands: any[], extras?: NavigationExtras) { }
}

