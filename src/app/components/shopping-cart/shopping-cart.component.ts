import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from './../../shared/services/shopping-cart.service';
import { CartUtils } from './../../shared/utils/cart-utils';
import { ShoppingCartItem } from '././../../models/shoppping-cart-item';
import { Observable } from 'rxjs';
import { ShoppingCart } from '././../../models/shopping-cart';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit {
  cart$;
  cartOb$: Observable<ShoppingCart>;
  shoppingCartItemCount;
  constructor(private cartService: ShoppingCartService) { }

  async ngOnInit() {
    this.cart$ = await this.cartService.getCart();
    this.cart$.subscribe(
      items => {
        this.shoppingCartItemCount = CartUtils.getCount(items)
      }
    );

    this.cartOb$ = CartUtils.getCartObservable(this.cart$);


  }

  clearCart() {
    this.cartService.clearCart();
  }
}
