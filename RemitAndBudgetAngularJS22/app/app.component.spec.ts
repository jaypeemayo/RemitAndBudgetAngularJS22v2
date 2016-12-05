
 import {TestBed, ComponentFixture, async, inject} from "@angular/core/testing";
 import {AppComponent} from "./app.component";
 import {NO_ERRORS_SCHEMA} from "@angular/core";
 import {Router, NavigationExtras} from "@angular/router";
 import constants = require('./constants');
 import {AuthenticationNotifyService} from "./authentication-notify.service";

 describe('AppComponent',()=>{
   let fixture: ComponentFixture<AppComponent>;
   let componentInstance: AppComponent;
   let authenticationNotifyService: AuthenticationNotifyService;

   beforeEach(async(()=>{
     TestBed.configureTestingModule({
       declarations: [AppComponent],
       schemas:      [ NO_ERRORS_SCHEMA ], //to ignore router outlet errors
       providers:[AuthenticationNotifyService,
         {provide:Router, useClass: RouterStub}]
     }).compileComponents();

   }));

   beforeEach(()=>{
      fixture = TestBed.createComponent(AppComponent)
      componentInstance = fixture.componentInstance;
      authenticationNotifyService = fixture.debugElement.injector.get(AuthenticationNotifyService);
     }
   );

   it('logout',()=>{
     sessionStorage.setItem(constants.tokenKey,'dummyToken');
     expect(sessionStorage.getItem(constants.tokenKey)).toContain('dummyToken', "sessionStorage contain dummyToken.");
     componentInstance.logOut();
     expect(componentInstance.isLoggedIn).toBe(false, "isLoggedIn must be false");
     expect(sessionStorage.getItem(constants.tokenKey)).toBe(null, "sessionStorage must be cleared.");
   });

   it('logout navigates to login', inject([Router],(router:Router) =>{
     const spy = spyOn(router,'navigate');
     componentInstance.logOut();
     const navArgs = spy.calls.first().args[0];
     expect(navArgs).toContain('/login', 'must navigate to login window');
   }));

   it('ngOnInit set isLoggedIn true from sessionStorage',()=>{
     sessionStorage.setItem(constants.tokenKey, 'dummyToken');
     fixture.detectChanges();
     expect(componentInstance.isLoggedIn).toBe(true, 'isLoggedIn must be true if sessionStorage has value');
   });

   it('ngOnInit set isLoggedIn false from sessionStorage',()=>{
     sessionStorage.clear();
     fixture.detectChanges();
     expect(componentInstance.isLoggedIn).toBe(false, 'isLoggedIn must be true if sessionStorage has value');
   });

   it('AuthenticationNotifyService is triggered true', ()=>{
     authenticationNotifyService.publishAuthenticationChange(true);
     expect(componentInstance.isLoggedIn).toBe(true, 'isLoggedIn must be set to true by publishAuthenticationChange')
   });

   it('AuthenticationNotifyService is triggered false', ()=>{
     authenticationNotifyService.publishAuthenticationChange(false);
     expect(componentInstance.isLoggedIn).toBe(false, 'isLoggedIn must be set to true by publishAuthenticationChange')
   });

 } );

 class RouterStub {
   navigateByUrl(url: string) { return url; }
   navigate(commands: any[], extras?: NavigationExtras) { }
 }




