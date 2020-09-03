import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Product} from '../../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {


  constructor(
    private afs: AngularFirestore,
  ) { }

  create(product) {
    console.log('saving', product);
    return this.afs.collection('products').add(product);
  }

  getAll() {
    return this.afs.collection<Product>('products').valueChanges({ idField: 'key' });
  }
  get(productId) {
    return this.afs.collection('products').doc<Product>(productId).valueChanges();
  }

  update(productId, prodcut){
   return  this.afs.collection('products').doc(productId).update(prodcut);
  }

  delete(productId) {
    console.log('delte', productId)
    return  this.afs.collection('products').doc(productId).delete();
  }
}
