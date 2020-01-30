import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { transition, style, animate, trigger } from '@angular/animations';
import { FormArray } from '@angular/forms';

import { PizzaAppControl } from './control/pizza-app.control';
import { PizzaAppOutput } from './control/pizza-app.io';

export const DROP_ANIMATION = trigger('drop', [
  transition(':enter', [
    style({ transform: 'translateY(-200px)', opacity: 0 }),
    animate('300ms cubic-bezier(1.000, 0.000, 0.000, 1.000)', style({ transform: 'translateY(0)', opacity: 1 }))
  ]),
  transition(':leave', [
    style({ transform: 'translateY(0)', opacity: 1 }),
    animate('200ms cubic-bezier(1.000, 0.000, 0.000, 1.000)', style({ transform: 'translateY(-200px)', opacity: 0 }))
  ])
]);

@Component({
  selector: 'pizza-viewer',
  animations: [DROP_ANIMATION],
  styleUrls: ['view/pizza-viewer.component.scss'],
  templateUrl: 'view/pizza-viewer.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PizzaViewerComponent {
  @Input()
  input: PizzaAppOutput;

  @Input()
  control: PizzaAppControl;

  get activePizza(): number {
    return this.input.activePizza;
  }

  get pizzas(): FormArray {
    return this.control.pizzas;
  }
}
