import {
  Component, OnInit, OnDestroy, ChangeDetectionStrategy
} from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Subscription } from 'rxjs';

import { PizzaAppControl } from './control/pizza-app.control';
import { PizzaAppOutput } from './control/pizza-app.io';

@Component({
  selector: 'pizza-app',
  templateUrl: 'view/pizza-app.component.html',
  styleUrls: ['view/pizza-app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PizzaAppComponent implements OnInit, OnDestroy {
  readonly title = 'pizza-creator';

  readonly control = new PizzaAppControl(this.httpClient);

  get input(): PizzaAppOutput { return this.control.output; }

  private readonly subscription = new Subscription();

  constructor(private readonly httpClient: HttpClient) {}

  ngOnInit(): void {
    this.subscription.add(this.control.subscribe());
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
