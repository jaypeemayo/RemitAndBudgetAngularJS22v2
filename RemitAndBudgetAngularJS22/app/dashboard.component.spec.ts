import {TestBed, ComponentFixture, async} from "@angular/core/testing";
import {DashboardComponent} from "./dashboard.component";
import {TransactionService} from "./transaction.service";
import {Transaction} from "./transaction";
/**
 * Created by jaype on 12/3/2016.
 */


  let fixture: ComponentFixture<DashboardComponent>;
  let componentInstance: DashboardComponent;
  let transactionService: TransactionService;
  let spy: jasmine.Spy;
  let transactions: Transaction[];
  describe('dashboard',()=>{
    let transaction = new Transaction()
    transaction.transactionInfoId = 1;
    let transaction2 = new Transaction()
    transaction.transactionInfoId = 2;
    transactions = [transaction, transaction2]


    beforeEach(async( ()=>{
     TestBed.configureTestingModule({
       declarations:[DashboardComponent],
       providers:[TransactionService],

     }).compileComponents();//to compile css and template url.

      fixture = TestBed.createComponent(DashboardComponent); //get fixture
      componentInstance = fixture.componentInstance; //get instance
      transactionService = fixture.debugElement.injector.get(TransactionService);

      spy = spyOn(transactionService, 'getTransactions')
        .and.returnValue(Promise.resolve(transactions));

    }));

    it('get transaction return',()=>{

      fixture.detectChanges();


    });

    it('get transaction return', async(() => {
      fixture.detectChanges();
      fixture.whenStable().then(() => { // wait for async getQuote
        fixture.detectChanges();        // update view with quote
        expect(el.textContent).toBe(testQuote);
      });
    }));



  });

