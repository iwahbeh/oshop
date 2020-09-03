import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { NgZone } from '@angular/core';
import { auth } from 'firebase';
import { Router, ActivatedRoute } from '@angular/router';
import { AngularFirestoreDocument, AngularFirestore } from '@angular/fire/firestore';
import { User } from '../../models/user';
import { AppUser } from '../../models/app-user';
import { Observable, from, NEVER } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userData: any;
  user$: Observable<User>;
  constructor(
    private afs: AngularFirestore,   // Inject Firestore service
    private afAuth: AngularFireAuth, // Inject Firebase auth service
    private router: Router,
    private route: ActivatedRoute,
    private ngZone: NgZone // NgZone service to remove outside scope warning

  ) {
    /* Saving user data in localstorage when 
       logged in and setting up null when logged out */
    this.user$ = this.afAuth.authState;
    this.user$.subscribe(userFrom => {
      if (userFrom) {
       return this.afs.doc<AppUser>(`users/${userFrom.uid}`).valueChanges()
        // this.userData = user;
        // localStorage.setItem('user', user.uid);
        //JSON.parse(localStorage.getItem('user'));
      } else {
        localStorage.setItem('user', null);
        //JSON.parse(localStorage.getItem('user'));
      }
    })




  }

  get appUser$(): Observable<AppUser> {
    return this.afAuth.authState.pipe(
      mergeMap(authState => {
        if (authState) {
          return from(this.afs.doc<AppUser>(`users/${authState.uid}`).valueChanges());
        } else {
          return NEVER;
        }
      })
    );
  }


  login() {

    let returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    if (returnUrl)
    localStorage.setItem('returnUrl', returnUrl);
    return this.AuthLogin(new auth.GoogleAuthProvider());

  }

  logout() {
    return this.afAuth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['/login']);
    })
  }

  // Auth logic to run auth providers
  AuthLogin(provider) {
    return this.afAuth.signInWithPopup(provider)
      .then((result) => {
        this.ngZone.run(() => {
          this.router.navigate(['/']);
        })
        this.SetUserData(result.user);
      }).catch((error) => {
        window.alert(error)
      })
  }

  /* Setting up user data when sign in with username/password, 
 sign up with username/password and sign in with social auth  
 provider in Firestore database using AngularFirestore + AngularFirestoreDocument service */
  /* Setting up user data when sign in with username/password, 
  sign up with username/password and sign in with social auth  
  provider in Firestore database using AngularFirestore + AngularFirestoreDocument service */
  SetUserData(user) {
   
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
    const userData: any = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified,
      lastLoggedInDt: new Date().toString()
    }
    return userRef.set(userData, {
      merge: true
    })
  }

}
