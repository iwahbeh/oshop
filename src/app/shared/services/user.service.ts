import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { User } from '../../models/user';
import { AppUser } from './../../models/app-user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor( private db: AngularFirestore) { }

  usersCollection = this.db.collection('/users/');
  save(user: User){
    this.usersCollection.doc<User>(user.uid).set(user);
    console.log('saving completed');
  }

 

  get(userId){
    console.log('getting ',userId);
    
    return this.usersCollection.doc<AppUser>(`/${userId}`).valueChanges()
  }
    
}
