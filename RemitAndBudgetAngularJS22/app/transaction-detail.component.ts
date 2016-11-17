
import {Component, OnInit} from "@angular/core";
import {ActivatedRoute, Params} from "@angular/router";
/**
 * Created by jaype on 11/15/2016.
 */



@Component({
  moduleId: module.id,
  selector: 'transaction-detail',
  templateUrl:'transaction-detail.component.html'
})
export class TransactionDetailComponent implements OnInit{
  id: string;
constructor(private route: ActivatedRoute){


}

ngOnInit()
{

  this.route.params.forEach((params: Params) => {
    let id = +params['id'];
    this.id = id.toString();
    //this.heroService.getHero(id).then(hero => this.hero = hero);
  });
}

edit()
{


}





}
