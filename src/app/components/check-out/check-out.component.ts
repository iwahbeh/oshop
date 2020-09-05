import { Component, OnInit, OnDestroy } from '@angular/core';
import { ShoppingCartService } from 'src/app/shared/services/shopping-cart.service';
import { CartUtils } from 'src/app/shared/utils/cart-utils';
import { ShoppingCart } from 'src/app/models/shopping-cart';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.scss']
})
export class CheckOutComponent implements OnInit {
  cart$: Observable<ShoppingCart>;
  constructor(
    private cartService: ShoppingCartService) { }

  async ngOnInit() {

    let cartTemp$ = await this.cartService.getCart();
    this.cart$ = CartUtils.getCartObservable(cartTemp$);
  }
}
