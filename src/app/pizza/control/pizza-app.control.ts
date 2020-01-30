import { FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';

import { PizzaAppOutput } from './pizza-app.io';
import { CustomerDetailsControl } from './customer-details.control';
import { PizzasViewControl } from './pizzas-view.control';
import { PizzasViewOutput } from './pizzas-view.io';

export class PizzaAppControl extends FormGroup {
  readonly details = new CustomerDetailsControl();

  readonly pizzas = new PizzasViewControl();

  get output(): PizzaAppOutput {
    const pizzas: PizzasViewOutput = this.pizzas.output;
    return {
      total: pizzas.total,
      activePizza: pizzas.activePizza,
      openPizza: pizzas.openPizza,
    };
  }

  constructor() {
    super({});
    this.registerControl('details', this.details);
    this.registerControl('pizzas', this.pizzas);
  }

  subscribe(): Subscription {
    const subscription = new Subscription();
    subscription.add(this.details.subscribe());
    subscription.add(this.pizzas.subscribe());
    return subscription;
  }

  createOrder(): void {
    console.log(this.value);
  }
}
