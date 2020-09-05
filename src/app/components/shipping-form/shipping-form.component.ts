import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Router } from '@angular/router';
import { OrderService } from 'src/app/shared/services/order.service';
import { ShoppingCartItem } from 'src/app/models/shoppping-cart-item';
import { Order } from 'src/app/models/order';
import { ShoppingCart } from 'src/app/models/shopping-cart';

@Component({
  selector: 'shipping-form',
  templateUrl: './shipping-form.component.html',
  styleUrls: ['./shipping-form.component.scss']
})
export class ShippingFormComponent implements OnInit, OnDestroy {
  @Input('cart') cart :ShoppingCart;

  shipping ;
  Usersubsciption: Subscription;
  userId: string;
  constructor(  private auth: AuthService, private router: Router, private orderService: OrderService) { }

  ngOnInit() {
    this.Usersubsciption = this.auth.user$.subscribe(user => this.userId = user.uid);

  }

  async  placeOrder() {
    console.log('placeOrder', this.cart );
    let order = new Order(this.userId,this.shipping, this.cart);
    let result = await this.orderService.storeOrder(order);
    this.router.navigate(['/order-success', result.id]);

  }

  ngOnDestroy() {
    this.Usersubsciption.unsubscribe();
  }

}
