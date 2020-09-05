import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Product } from './../../models/product';
import { first } from 'rxjs/operators';
import {ShoppingCart} from './../../models/shopping-cart'
import { ShoppingCartItem } from './../../models/shoppping-cart-item';
import { Observable } from 'rxjs';
import { CartUtils } from '../utils/cart-utils';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {


  constructor(private afs: AngularFirestore) { }


  async getCart() {
    let cartId = await this.getOrCreateCartId();
    console.log('getCart()',cartId);
    return this.afs.collection('shopping-carts').doc(cartId).collection<ShoppingCartItem>('items').valueChanges();
  }

  private async getOrCreateCartId() {
    let cartId = localStorage.getItem('cartId');
    if (cartId) return cartId;

    let cart = await this.create();
    localStorage.setItem('cartId', cart.id);
    return cart.id;
  }

  private create() {
    console.log('createing cart');
    return this.afs.collection("shopping-carts").add({
      dateCreated: new Date()
    }).then(
      x=> {
        console.log('created',x.id);
        return x;
      }
    )
  }


  getshopcart(){
    const cartRef =  this.afs.collection('shopping-carts').doc<ShoppingCart>('kvp1e9UII7LBGtnpvQLH').collection<ShoppingCartItem>('items').valueChanges(); // this.afs.collection('shopping-carts').doc('L18J2hBZkGpMJBpBiDrc').collection('items').valueChanges({ idField: 'key' });

    cartRef.subscribe(
      (carts) => {
        console.log('Xgetshopcart',carts);
      
    for ( let x of carts){
      console.log(x.quantity);
    }
     }
    );
  }


  private getItem(cartId: string, productId: string) {
    return this.afs.doc('shopping-carts/' + cartId + '/items/' + productId);
  }

 async clearCart(){
    let cart$ = await this.getCart();
    let shoppingCart$ = CartUtils.getCartObservable(cart$);
    shoppingCart$.subscribe(
      cart => {
        console.log(cart);
        cart.items.forEach( item => {
          console.log(item);
          this.updateItemQuantity(item.product, 0);
        })
       
      }
    );
  }

  async addToCart(product: Product) {
    this.updateItemQuantity(product,+1)

  }

  async removeFromCart(product: Product) {
    this.updateItemQuantity(product,-1)
  }

  async updateItemQuantity(product: Product, number:number) {
   console.log('updateItemQuantity', product);
    let cartId = await this.getOrCreateCartId();
    let item$ = this.getItem(cartId, product.key);
    console.log('updateItemQuantity', item$);
    item$.valueChanges().pipe(first()).subscribe(
      (item: { quantity: number }) => {
       
        let quantity = (((item) &&  item.quantity ) || 0) + number;
        console.log('updateItemQuantity', quantity,'-',number);
        if (quantity === 0  || number ===0)  
        item$.delete();
        else
        item$.set({product,  quantity: quantity })
      }
    )
  }
}



