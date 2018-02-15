import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { User } from '../model/user';

@Injectable()
export class AuthService {

  user = new BehaviorSubject<User>(new User());
  loginError = new BehaviorSubject<any>({});
  constructor() { }

  login(u: string, p: string) {
    firebase.auth().signInWithEmailAndPassword(u, p).then(s => {
      console.log(s);
    }).catch(e => {
      console.log(e);
      this.loginError = e;
    });
  }
  newUser(u: string, p: string) {
    firebase.auth().createUserWithEmailAndPassword(u, p).then(s => {

    }).catch(e => {
      this.loginError = e;
    });
  }
  logout() {
    firebase.auth().signOut();
  }
}
