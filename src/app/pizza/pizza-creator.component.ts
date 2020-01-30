import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { FormArray } from '@angular/forms';

import { PizzaAppControl } from './control/pizza-app.control';
import { PizzasViewControl } from './control/pizzas-view.control';
import { PizzaControl } from './control/pizza.control';
import { PizzaAppOutput } from './control/pizza-app.io';

@Component({
  selector: 'pizza-creator',
  templateUrl: 'view/pizza-creator.component.html',
  styleUrls: ['view/pizza-creator.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PizzaCreatorComponent {
  @Input()
  input: PizzaAppOutput;

  @Input()
  control: PizzaAppControl;

  get openPizza(): number { return this.input.openPizza; }
  get pizzas(): PizzasViewControl { return this.control.pizzas; }
  get pizzaControls(): PizzaControl[] { return this.pizzas.pizzaControls; }

  addPizza(): void { this.pizzas.addPizza(); }
  removePizza(index: number): void { this.pizzas.removePizza(index); }
  togglePizza(index: number): void { this.pizzas.togglePizza(index); }
}
