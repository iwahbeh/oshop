import { Component, OnInit } from '@angular/core';
import { AuthService } from './../../shared/services/auth.service';
import { AppUser } from '././../../models/app-user';
import { ShoppingCartService } from './../../shared/services/shopping-cart.service';
import { Observable } from 'rxjs';
import { ShoppingCart } from '././../../models/shopping-cart';
import { ShoppingCartItem } from '././../../models/shoppping-cart-item';
import { CartUtils } from './../../shared/utils/cart-utils';


@Component({
  selector: 'bt-navbar',
  templateUrl: './bt-navbar.component.html',
  styleUrls: ['./bt-navbar.component.scss']
})
export class BtNavbarComponent implements OnInit {

  appUser: AppUser;
  isMenuCollapsed = true;
  shoppingCartItemCount;
  cart$: Observable<(ShoppingCartItem )[]>;

  constructor(
    private auth: AuthService, private cartService: ShoppingCartService
  ) {
    auth.appUser$.subscribe(appUser => this.appUser = appUser);
  }

  logout() {
    this.appUser = null;
    this.auth.logout();
  }

  async ngOnInit() {
    this.cart$ = await this.cartService.getCart();
  this.cart$.subscribe(
    items => {this.shoppingCartItemCount = CartUtils.getCount(items)
    }  
  )  
  }

}
