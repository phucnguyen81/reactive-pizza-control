import { FormGroup } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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

  constructor(private readonly httpClient: HttpClient) {
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
    const order = this.value;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
      })
    };
    this.httpClient.post<string>('/api/new-order/', order, httpOptions)
      .subscribe(
        response => console.log(response),
        error => console.error(error),
        () => console.log('complete', order),
      );
  }

}
