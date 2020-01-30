import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { PizzaAppComponent } from './pizza-app.component';
import { PizzaAppModule } from './pizza-app.module';

const TOPPINGS = [
  'anchovy', 'bacon', 'basil', 'chili', 'mozzarella', 'mushroom',
  'olive', 'onion', 'pepper', 'pepperoni', 'sweetcorn', 'tomato',
];

const DETAILS_FIELD_NAMES = [
  'name', 'email', 'confirm', 'address', 'postcode', 'phone'
];

describe('PizzaAppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        BrowserAnimationsModule,
        PizzaAppModule,
      ],
    }).compileComponents();
  }));

  it('should create the component', () => {
    const fixture = TestBed.createComponent(PizzaAppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'pizza-creator'`, () => {
    const fixture = TestBed.createComponent(PizzaAppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('pizza-creator');
  });

  it('should have all details form fields', () => {
    const fixture = TestBed.createComponent(PizzaAppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;

    const form = compiled.querySelector('form');
    expect(form).toBeTruthy();

    DETAILS_FIELD_NAMES.forEach(name => {
      const field = form.querySelector(`input[name=${name}]`);
      expect(field).toBeTruthy();
    });
  });

  it('should show pizza-viewer', () => {
    const fixture = TestBed.createComponent(PizzaAppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('[name=pizza-viewer]')).toBeTruthy();
  });

  it('should start with one pizza header', () => {
    const fixture = TestBed.createComponent(PizzaAppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    const pizzas = compiled.querySelectorAll('[name=pizza-creator-header]');
    expect(pizzas).toBeTruthy();
    expect(pizzas.length).toEqual(1);
  });

  it('should start with pizza creator open', () => {
    const fixture = TestBed.createComponent(PizzaAppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    const pizzaCreator = compiled.querySelector('[name=pizza-creator-header]');
    expect(pizzaCreator).toBeTruthy();
    const displayStyle = getComputedStyle(pizzaCreator).display;
    expect(displayStyle).toEqual('block');
  });

  it('should hide pizza creator if the header is clicked on', () => {
    const fixture = TestBed.createComponent(PizzaAppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;

    const firstPizza = compiled.querySelector('[name=pizza-creator-header]');
    firstPizza.click();
    fixture.detectChanges();

    const pizzaCreator = compiled.querySelector('[name=pizza-creator-body]');
    expect(pizzaCreator).toBeTruthy();
    const displayStyle = getComputedStyle(pizzaCreator).display;
    expect(displayStyle).toEqual('none');
  });

  it('should start with small pizza pize', () => {
    const fixture = TestBed.createComponent(PizzaAppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    const activeSmallPizza = compiled.querySelector(
      '[name=pizza-size-section] [name=size][value=small]'
    );
    expect(activeSmallPizza).toBeTruthy();
  });

  it('should show a button to add pizza', () => {
    const fixture = TestBed.createComponent(PizzaAppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    const button = compiled.querySelector('button[name=add-pizza]');
    expect(button).toBeTruthy();
    expect(button.innerText).toBeTruthy();
  });

  it('should show two pizzas if add-pizza button is clicked on', () => {
    const fixture = TestBed.createComponent(PizzaAppComponent);
    fixture.detectChanges();

    const compiled = fixture.debugElement.nativeElement;
    const button = compiled.querySelector('button[name=add-pizza]');
    expect(button).toBeTruthy();
    button.click();
    fixture.detectChanges();

    const pizzas = compiled.querySelectorAll(
      '[name=pizza-creator-header]'
    );
    expect(pizzas).toBeTruthy();
    expect(pizzas.length).toEqual(2);
  });

  it('should add padding to medium pizza if activated', () => {
    const fixture = TestBed.createComponent(PizzaAppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;

    const sizeMedium = compiled.querySelector(
      '[name=size][value=medium]'
    );
    expect(sizeMedium).toBeTruthy();
    sizeMedium.click();
    fixture.detectChanges();

    const mediumPlate = compiled.querySelector(
      '[name=size][value=medium] ~ [name=pizza-size-plate]'
    );
    expect(mediumPlate).toBeTruthy();
    const padding = getComputedStyle(mediumPlate).padding;
    expect(padding).toEqual('6px');
  });

  it('should add padding to large pizza if activated', () => {
    const fixture = TestBed.createComponent(PizzaAppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;

    const sizeLarge = compiled.querySelector(
      '[name=size][value=large]'
    );
    expect(sizeLarge).toBeTruthy();
    sizeLarge.click();
    fixture.detectChanges();

    const largePlate = compiled.querySelector(
      '[name=size][value=large] ~ [name=pizza-size-plate]'
    );
    expect(largePlate).toBeTruthy();
    const padding = getComputedStyle(largePlate).padding;
    expect(padding).toEqual('6px');
  });

  it('should have all toppings shown', () => {
    const fixture = TestBed.createComponent(PizzaAppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;

    TOPPINGS.forEach(toppingName => {
      const topping = compiled.querySelector(
        `[name=pizza-topping] [name=${toppingName}]`
      );
      expect(topping).toBeTruthy();
    });
  });

  it('should add toppings if they are clicked on', () => {
    const fixture = TestBed.createComponent(PizzaAppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;

    TOPPINGS.forEach(toppingName => {
      const topping = compiled.querySelector(
        `[name=pizza-topping] [name=${toppingName}]`
      );
      expect(topping).toBeTruthy();
      topping.click();
      fixture.detectChanges();

      const pizzaSummary = compiled.querySelector(
        '[name=pizza-summary-toppings]'
      );
      expect(pizzaSummary).toBeTruthy();
      expect(pizzaSummary.innerText.toLowerCase())
        .toContain(toppingName.toLowerCase());
    });
  });

  it('should change total price if toppings are added', () => {
    const fixture = TestBed.createComponent(PizzaAppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;

    const totalPrice = compiled.querySelector(
      '[name=pizza-summary-total-price]'
    );
    expect(totalPrice).toBeTruthy();
    const initialTotalPrice = totalPrice.innerText;

    const topping = compiled.querySelector(
      `[name=pizza-topping] [name=${TOPPINGS[0]}]`
    );
    expect(topping).toBeTruthy();
    topping.click();
    fixture.detectChanges();

    expect(totalPrice.innerText).not.toEqual(initialTotalPrice);
  });

});
