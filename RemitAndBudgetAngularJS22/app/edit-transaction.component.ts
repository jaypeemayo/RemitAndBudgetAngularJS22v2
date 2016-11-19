import {Component, OnInit} from "@angular/core";
import {FormGroup, FormBuilder, Validators} from "@angular/forms";
import {Router, ActivatedRoute, Params} from "@angular/router";
import {TransactionService} from "./transaction.service";
import {Transaction} from "./transaction";
import {HttpClient} from "./http-client.service";
/**
 * Created by jaype on 11/18/2016.
 */


@Component({
  selector:'edit-transaction',
  templateUrl: 'edit-transaction.component.html',
  moduleId: module.id,
  providers:[FormBuilder,
    TransactionService,
    HttpClient]
})
export class EditTransactionComponent implements OnInit{
  editForm: FormGroup;
  constructor(private formBuilder: FormBuilder,
  private router:Router,
  private transactionService: TransactionService,
  private  route: ActivatedRoute){}

  id:number;
  transaction:Transaction;
  ngOnInit(){

    this.route.params.forEach((params: Params) => {
      this.id = +params['id'];
      this.transactionService.getTransaction(this.id).then((response) => {
          this.transaction = response

        this.editForm =  this.formBuilder.group({action:[this.transaction.action, Validators.required],
          amount:[this.transaction.amount, Validators.required],
          month:[this.transaction.month, Validators.required],
          description:[this.transaction.description, Validators.required]});
        }
      );
    });


  }

  submitForm(formGroup:any){
      formGroup.value.transactionInfoId = this.id;
      this.transactionService.updateTransaction(this.id, formGroup.value as Transaction);

  }
  back():void
  {
    this.router.navigate(['/transaction']);
  }

}
