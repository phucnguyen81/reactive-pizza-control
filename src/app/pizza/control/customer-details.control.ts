import {
  AbstractControl, FormControl, FormGroup, Validators
} from '@angular/forms';

import { Subscription } from 'rxjs';

import { PizzaValidators } from './pizza.validator';

export class CustomerDetailsControl extends FormGroup {
  readonly name = new FormControl('', [
    Validators.required
  ]);

  readonly email = new FormControl('', [
    Validators.required
  ]);

  readonly confirm = new FormControl('', [
    Validators.required,
    PizzaValidators.valueMatch(this.email, 'Email'),
  ]);

  readonly phone = new FormControl('', [
    Validators.required,
  ]);

  readonly address = new FormControl('', [
    Validators.required,
    Validators.minLength(3),
  ]);

  readonly postcode = new FormControl('', [
    Validators.required,
    Validators.minLength(3),
  ]);

  constructor() {
    super({});
    this.registerControl('name', this.name);
    this.registerControl('email', this.email);
    this.registerControl('confirm', this.confirm);
    this.registerControl('phone', this.phone);
    this.registerControl('address', this.address);
    this.registerControl('postcode', this.postcode);
  }

  subscribe(): Subscription {
    return this.email.valueChanges.subscribe(() => {
      this.confirm.updateValueAndValidity();
    });
  }
}
