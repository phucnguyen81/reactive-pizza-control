import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { PizzaAppControl } from './control/pizza-app.control';
import { PizzaAppOutput } from './control/pizza-app.io';

@Component({
  selector: 'pizza-form',
  styleUrls: ['view/pizza-form.component.scss'],
  templateUrl: 'view/pizza-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PizzaFormComponent {
  @Input()
  input: PizzaAppOutput;

  @Input()
  control: PizzaAppControl;

  get form(): PizzaAppControl { return this.control; }

  onSubmit(event) {
    event.stopPropagation();
    this.control.createOrder();
  }
}
