import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ShoppingCartService } from './shopping-cart.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private afs: AngularFirestore, private cartService: ShoppingCartService) { }

  async storeOrder(order){
    console.log('stroing order', order);
   let result = await  this.afs.collection('orders').add(JSON.parse(JSON.stringify(order)));
    this.cartService.clearCart();
    return result;
  }

  getOrders() { 
    return this.afs.collection('orders').valueChanges();
  }

  getOrdersByUser(userId: string) {
    return this.afs.collection('orders', ref => ref.where('userId', '==', userId)).valueChanges();
    
  }
}
