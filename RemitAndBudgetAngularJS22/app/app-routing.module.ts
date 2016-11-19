import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthenticationComponent } from './authentication.component';
import { DashboardComponent } from './dashboard.component';
import { TransactionComponent } from './transaction.component';
import { RegisterTransactionComponent } from './register-transaction.component';
import { TransactionDetailComponent} from './transaction-detail.component';
import { EditTransactionComponent} from './edit-transaction.component';
const routes: Routes =
    [{
        path: 'login',
        component: AuthenticationComponent
    },
    {
        path: 'dashboard',
        component: DashboardComponent
    },
    {
        path: 'transaction',
        component: TransactionComponent
    },
    {
      path: 'register-transaction',
      component: RegisterTransactionComponent,

    },
    {
      path: 'transaction-detail/:id',
      component: TransactionDetailComponent
    },
    {
      path: 'edit-transaction/:id',
      component: EditTransactionComponent
    },
    {
        path: '',
        redirectTo: '/login',
        pathMatch: 'full'
    }];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]

})
export class AppRoutingModule {
}
