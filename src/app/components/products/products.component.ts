import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from '../../shared/services/product.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../models/product';
import { switchMap } from 'rxjs/operators';
import { ShoppingCartService } from '../../shared/services/shopping-cart.service';
import { Subscription } from 'rxjs';
import { CartUtils } from './../../shared/utils/cart-utils';
import { ShoppingCart } from '././../../models/shopping-cart';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit, OnDestroy {

  products: Product[] = [];
  Filteredproducts: Product[] = [];
  category: string;
  cart;
  cart$
  shoppingCart: ShoppingCart;
  subscirption: Subscription;
  shoppingCart$: any;

  constructor(route: ActivatedRoute,
    productService: ProductService,
    private cartService: ShoppingCartService) {

    cartService.getshopcart();

    productService.getAll()
      .pipe(switchMap(products => {
        this.products = products;
        return route.queryParamMap;
      }))
      .subscribe(
        params => {
          this.category = params.get('category');
          this.Filteredproducts = (this.category) ?
            this.products.filter(p => p.category === this.category) :
            this.products;
        }
      )



  }


  async ngOnInit() {
    this.subscirption = (await this.cartService.getCart()).subscribe(
      cart => {
        this.cart = cart;

      });

    this.cart$ = await this.cartService.getCart();
    this.subscirption = this.cart$.subscribe();

    this.shoppingCart$ = CartUtils.getCartObservable(this.cart$);
    this.shoppingCart$.subscribe(cart => {
      this.shoppingCart = cart;
      console.log('catching,', this.shoppingCart);
    });
  }



  ngOnDestroy() {
    this.subscirption.unsubscribe();
  }

}
