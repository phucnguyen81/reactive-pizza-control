import { FormArray } from '@angular/forms';

import {
  Observable, Subject, BehaviorSubject, Subscription, merge
} from 'rxjs';
import {
  startWith, map, scan, distinctUntilChanged
} from 'rxjs/operators';

import { PizzaControl } from './pizza.control';
import { PizzasViewInput, PizzasViewOutput } from './pizzas-view.io';

/**
 * Represent the dynamic list of selected pizzas. Pizzas
 * can be added, removed and modified.
 */
export class PizzasViewControl extends FormArray {

  readonly prices = {
    small: { base: 9.99, toppings: 0.69 },
    medium: { base: 12.99, toppings: 0.99 },
    large: { base: 16.99, toppings: 1.29 }
  };

  get pizzaControls(): PizzaControl[] {
    return this.controls as PizzaControl[];
  }

  private readonly total$: Observable<PizzasViewInput> =
    this.valueChanges.pipe(
      startWith(this.value),
      map(value => {
        const price = value.reduce((prev: number, next: any) => {
          const price = this.prices[next.size];
          return prev + price.base + (price.toppings * next.toppings.length);
        }, 0);
        return price;
      }),
      map(total => ({total}))
    );

  private readonly togglePizzaSubject = new Subject<number>();
  private readonly togglePizza$: Observable<PizzasViewInput> =
    this.togglePizzaSubject.pipe(
      // -1 here means close all pizzas
      scan<number, number>(
        (prev, curr) => (curr === prev ? -1 : curr), 0
      ),
      map<number, PizzasViewInput>(openPizza => {
        if (~openPizza) { return {openPizza, activePizza: openPizza}; }
        else { return {openPizza}; }
      })
    );

  readonly output$: Observable<PizzasViewOutput> = merge(
    this.total$, this.togglePizza$
  ).pipe(
    scan<PizzasViewInput, PizzasViewOutput>(
      (output, input) => ({...output, ...input}),
      new PizzasViewOutput()
    )
  );

  private readonly outputSubject = new BehaviorSubject<PizzasViewOutput>(
    new PizzasViewOutput()
  );

  get output(): PizzasViewOutput {
    return this.outputSubject.value;
  }

  constructor() {
    super([new PizzaControl()]);
  }

  subscribe(): Subscription {
    return this.output$.pipe(
      distinctUntilChanged()
    ).subscribe(
      this.outputSubject
    )
  }

  addPizza() {
    this.push(new PizzaControl());
    this.togglePizza(this.pizzaControls.length - 1);
  }

  removePizza(index: number) {
    this.removeAt(index);
    this.togglePizza(Math.min(index, this.pizzaControls.length - 1));
  }

  togglePizza(index: number): void {
    this.togglePizzaSubject.next(index);
  }

}
