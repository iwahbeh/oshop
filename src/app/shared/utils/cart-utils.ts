import { Observable } from "rxjs";
import { ShoppingCartItem } from '../../models/shoppping-cart-item'
import { map } from 'rxjs/operators';
import { ShoppingCart } from 'src/app/models/shopping-cart';

export class CartUtils {
    static shoppingCartItemCount: number;

    static getCount(cartItms: (ShoppingCartItem )[] ) {

        console.log('getshopcart', cartItms);
        this.shoppingCartItemCount = 0;
        for (let x of cartItms) {
            this.shoppingCartItemCount += x.quantity;
        }
        return this.shoppingCartItemCount;

    }

    static getCartObservable(cartItems: Observable<ShoppingCartItem[]>){
        return cartItems.pipe(map( items =>{
          
         let itemMap = new Map<string, ShoppingCartItem>();
            for (let  item of items){
                itemMap.set(item.productId,item);
            }
            
            return  new ShoppingCart(itemMap);
           

        }));

    }
          
}