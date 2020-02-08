import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

import { PizzaAppControl } from './control/pizza-app.control';
import { PizzasViewControl } from './control/pizzas-view.control';
import { PizzaAppOutput } from './control/pizza-app.io';

@Component({
  selector: 'pizza-summary',
  styleUrls: ['view/pizza-summary.component.scss'],
  templateUrl: 'view/pizza-summary.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PizzaSummaryComponent {
  @Input()
  input: PizzaAppOutput;

  @Input()
  control: PizzaAppControl;

  get total(): string { return this.input.total.toFixed(2); }
  get form(): PizzaAppControl { return this.control; }
  get pizzas(): PizzasViewControl { return this.control.pizzas; }
  get prices(): any { return this.pizzas.prices; }

  submit(event: Event): void {
    event.preventDefault();
    this.control.createOrder();
  }
}
