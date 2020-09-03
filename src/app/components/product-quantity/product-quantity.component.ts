import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../../models/product'
import { ShoppingCartService } from './../../shared/services/shopping-cart.service';
import { ShoppingCart } from '../../models/shopping-cart';

@Component({
  selector: 'product-quantity',
  templateUrl: './product-quantity.component.html',
  styleUrls: ['./product-quantity.component.scss']
})
export class ProductQuantityComponent implements OnInit {

  @Input('product') product: Product;
  @Input('shopping-cart') shoppingCart:ShoppingCart;
  
  constructor(private cartService: ShoppingCartService) { }
  ngOnInit() {
    console.log('ProductQuantityComponent',this.product);
    
  }

  addToCart() {
    this.cartService.addToCart(this.product);
  }

  removeFromCart(){
    this.cartService.removeFromCart(this.product);
  }

  
}
