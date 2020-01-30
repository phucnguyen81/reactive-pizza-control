export class PizzasViewInput {
  activePizza?: number;
  openPizza?: number;
  total?: number;
}

export class PizzasViewOutput {
  activePizza: number = 0;
  openPizza: number = 0;
  total: number = 0;
}
