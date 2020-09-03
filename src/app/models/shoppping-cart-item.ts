import {Product} from './../models/product';

export class ShoppingCartItem{
    totalPrice: any;
    
    constructor(public productId: string, public quantity: number){

    }
    //get totalPrice(){ return this.product.price * this.quantity;}
}