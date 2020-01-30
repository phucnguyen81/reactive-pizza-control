import { FormGroup, FormControl, Validators } from '@angular/forms';

export class PizzaControl extends FormGroup {
  readonly size = new FormControl('small', Validators.required);
  readonly toppings = new FormControl([]);

  constructor() {
    super({});
    this.addControl('size', this.size);
    this.addControl('toppings', this.toppings);
  }
}
