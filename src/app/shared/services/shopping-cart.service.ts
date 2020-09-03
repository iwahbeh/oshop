import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Product } from './../../models/product';
import { first } from 'rxjs/operators';
import {ShoppingCart} from './../../models/shopping-cart'
import { ShoppingCartItem } from './../../models/shoppping-cart-item';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {


  constructor(private afs: AngularFirestore) { }


  async getCart() {
    let cartId = await this.getOrCreateCartId();
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
    return this.afs.collection("shopping-carts").add({
      dateCreated: new Date().getTime()
    })
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

 

  async addToCart(product: Product) {
    this.updateItemQuantity(product,+1)

  }

  async removeFromCart(product: Product) {
    this.updateItemQuantity(product,-1)
  }

 private async updateItemQuantity(product: Product, number:number) {
    let cartId = await this.getOrCreateCartId();
    let item$ = this.getItem(cartId, product.key);
    item$.valueChanges().pipe(first()).subscribe(
      (item: { quantity: number }) => {
        if (item) item$.update({ quantity: item.quantity + number })
        else item$.set({ product, quantity: 1 })
      }
    )
  }
}



