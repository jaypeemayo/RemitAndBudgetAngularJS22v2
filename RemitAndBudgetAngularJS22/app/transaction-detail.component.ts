
import {Component, OnInit} from "@angular/core";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {TransactionService} from "./transaction.service";
import {Transaction} from "./transaction";
import {HttpClient} from "./http-client.service";
/**
 * Created by jaype on 11/15/2016.
 */



@Component({
  moduleId: module.id,
  selector: 'transaction-detail',
  templateUrl:'transaction-detail.component.html',
  providers:[TransactionService, HttpClient]
})
export class TransactionDetailComponent implements OnInit {
  id: number;
  transaction: Transaction;

  constructor(private route: ActivatedRoute,
              private transactionService: TransactionService,
              private router: Router) {


  }

  ngOnInit() {
    this.route.params.forEach((params: Params) => {
      this.id = +params['id'];
      this.transactionService.getTransaction(this.id).then((response) => {
          this.transaction = response
        }
      );
    });
  }

  edit(): void {
    this.router.navigate(['/edit-transaction/', this.id.toString()]);

  }

  back(): void {
    this.router.navigate(['/transaction']);
  }

}
