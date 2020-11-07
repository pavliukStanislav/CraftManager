import { Injectable } from '@angular/core';
import { Router } from "@angular/router";
import firebase from 'firebase/app';
import { AngularFireAuth } from "@angular/fire/auth";

import { 
  AngularFirestore,
  AngularFirestoreDocument
} from "@angular/fire/firestore";

import { merge, Observable, of } from "rxjs";
import { switchMap } from "rxjs/operators";
import { User } from "./user.model";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: Observable<User>;
  user: Observable<firebase.User>

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router
  ) {
    this.user = this.afAuth.user
    this.user$ = this.afAuth.authState.pipe(
      switchMap(user => {
        if (user){
          return this.afs.doc<User>('users/${user.uid}').valueChanges()
        } else {
          return of (null);
        }
      })
    )
  }

  async googleSignIn(){
    const provider = new firebase.auth.GoogleAuthProvider();
    const credential = await this.afAuth.signInWithPopup(provider)
    this.router.navigate(['recipes']);
    return this.updateUserData(credential.user);
  }

  async emailSignIn(email, password){
    this.afAuth.signInWithEmailAndPassword(email, password)
      .then(() => this.router.navigate(['recipes']));
  }

  async emailSignUp(email, password){
    var currentUser;
    this.afAuth.createUserWithEmailAndPassword(email, password)
    .then((result) => currentUser = 
      {
        uid: result.user.uid,
        email: result.user.email,
        displayName: result.user.displayName,
        photoURL: result.user.photoURL
      })
      .then(() => this.router.navigate(['']));
  }

  async signOut(){
    this.afAuth.signOut();
    this.user$ = null;
    this.router.navigate(['']);
  }

  private updateUserData({uid, email, displayName, photoURL} :User){
    //set user data to firestore on login
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${uid}`);
    
    const data = {
      uid,
      email,
      displayName,
      photoURL
    };

    return userRef.set(data, { merge: true });
  }
}
