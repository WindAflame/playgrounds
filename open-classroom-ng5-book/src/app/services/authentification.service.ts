import { Injectable } from '@angular/core';
import * as firebase from 'firebase';


@Injectable()
export class AuthentificationService {

  constructor() { }

  createNewUser(email: string, password: string) {
    return new Promise(
      (res, rej) => {
        firebase.auth().createUserWithEmailAndPassword(email,password).then(
          () => { res(); }, 
          (err) => { rej(err); }
        );
      }
    );
  }

  signInUser(email: string, password: string){
    return new Promise(
      (res, rej) => {
        firebase.auth().signInWithEmailAndPassword(email,password).then(
          () => { res(); },
          (err) => { rej(err); }
        );
      }
    );
  }

  signOutUser(){ firebase.auth().signOut(); }
}