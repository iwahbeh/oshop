import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../../models/product';
import { ShoppingCartService } from './../../shared/services/shopping-cart.service';
import { ShoppingCart } from '././../../models/shopping-cart';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent implements OnInit {
  @Input('product') product: Product;
  @Input('show-actions') showActions = true;
  @Input('shopping-cart') shoppingCart: ShoppingCart;
  constructor(private cartService: ShoppingCartService) { }
  ngOnInit(): void {
  //  console.log('ProductCardComponent',this.shoppingCart);

  }

  addToCart() {
    this.cartService.addToCart(this.product);
  }

  



}