// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { By }              from '@angular/platform-browser';
// import { DebugElement }    from '@angular/core';
//
// import { BannerComponent } from './app.banner.component';
//
//
// let comp:    BannerComponent;
// let fixture: ComponentFixture<BannerComponent>;
// let de:      DebugElement;
// let el:      HTMLElement;
//
// describe('BannerComponent', () => {
//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       declarations: [ BannerComponent ], // declare the test component
//     });
//
//     fixture = TestBed.createComponent(BannerComponent);
//
//     comp = fixture.componentInstance; // BannerComponent test instance
//
//     // query for the title <h1> by CSS element selector
//     de = fixture.debugElement.query(By.css('h1'));
//     el = de.nativeElement;
//
//   });
// });



import {TestBed} from "@angular/core/testing";
import {BannerComponent} from "./app.banner.component";
import {AppComponent} from "./app.component";
describe('TEst', ()=>{
  beforeEach(()=>{
    TestBed.configureTestingModule({
      declarations:[AppComponent]
    });

    let fixture = TestBed.createComponent(AppComponent);
    let instnace = fixture.componentInstance;
    instnace.logOut();
  });


});
