import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { PizzaAppRoutingModule } from './pizza-app-routing.module';

import { PizzaAppComponent } from './pizza-app.component';
import { PizzaFormComponent } from './pizza-form.component';
import { PizzaCreatorComponent } from './pizza-creator.component';
import { PizzaSizeComponent } from './pizza-size.component';
import { PizzaToppingsComponent } from './pizza-toppings.component';
import { PizzaViewerComponent } from './pizza-viewer.component';
import { PizzaSummaryComponent } from './pizza-summary.component';
import { CustomerDetailsComponent } from './customer-details.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    PizzaAppRoutingModule,
  ],
  declarations: [
    PizzaAppComponent,
    PizzaFormComponent,
    PizzaCreatorComponent,
    PizzaSizeComponent,
    PizzaToppingsComponent,
    PizzaViewerComponent,
    PizzaSummaryComponent,
    CustomerDetailsComponent,
  ],
})
export class PizzaAppModule {}
