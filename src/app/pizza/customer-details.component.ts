import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';

import { PizzaAppControl } from './control/pizza-app.control';
import { PizzaAppOutput } from './control/pizza-app.io';
import { CustomerDetailsControl } from './control/customer-details.control';
import { PizzaValidators } from './control/pizza.validator';

@Component({
  selector: 'app-customer-details',
  templateUrl: 'view/customer-details.component.html',
  styleUrls: ['view/customer-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomerDetailsComponent {
  @Input()
  input: PizzaAppOutput;

  @Input()
  control: PizzaAppControl;

  get details(): CustomerDetailsControl { return this.control.details; }
  get name(): FormControl { return this.details.name; }
  get nameError(): string { return this.error(this.name); }
  get email(): FormControl { return this.details.email; }
  get emailError(): string { return this.error(this.email); }
  get confirm(): FormControl { return this.details.confirm; }
  get confirmError(): string { return this.error(this.confirm); }
  get phone(): FormControl { return this.details.phone; }
  get phoneError(): string { return this.error(this.phone); }
  get address(): FormControl { return this.details.address; }
  get addressError(): string { return this.error(this.address); }
  get postcode(): FormControl { return this.details.postcode; }
  get postcodeError(): string { return this.error(this.postcode); }

  private error(control: AbstractControl): string {
    return PizzaValidators.error(control);
  }
}
