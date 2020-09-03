import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(
    private afs: AngularFirestore,
  ) { }


  getAll() { 
   let x$ =  this.afs.collection('categories',ref => ref.orderBy('name','asc')).valueChanges({idField: 'categoryID'});
   return x$;
  }
}
