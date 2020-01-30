import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PizzaAppComponent } from './pizza-app.component';

const routes: Routes = [{ path: '', component: PizzaAppComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PizzaAppRoutingModule { }
