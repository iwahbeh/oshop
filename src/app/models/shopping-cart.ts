import { ShoppingCartItem } from "./shoppping-cart-item";
import { Product } from './../models/product';

export class ShoppingCart {


  items: ShoppingCartItem[] = [];
  DateCreated: Date;

  constructor(public itemMap: Map<string, ShoppingCartItem>) {
    itemMap.forEach(prod => {
      this.items.push(new ShoppingCartItem(prod.product, prod.quantity));
    }
    )
  }

  get totalPrice() {
    let sum = 0;
    this.items.forEach(prod => { sum += (prod.totalPrice) });
    return sum;
  }

  getQuantity(product: Product) {
    let item = this.items.find(prod => { return prod.product.key == product.key });
    return item ? item.quantity : 0;
  }

}