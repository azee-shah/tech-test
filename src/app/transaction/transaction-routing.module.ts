import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { TransactionTableComponent } from "./transaction-table/transaction-table.component";

const routes: Routes = [
  {
    path: '',
    component: TransactionTableComponent,
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TransactionRoutingModule { }