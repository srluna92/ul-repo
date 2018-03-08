import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { User } from '../model/user';

@Injectable()
export class AuthService {

  user = new BehaviorSubject<User>(new User());
  loginError = new BehaviorSubject<any>({});
  constructor() { }

  login(u: string, p: string): void {
    firebase.auth().signInWithEmailAndPassword(u, p).then(s => {
      this.user.next(s);
    }).catch(e => {
      this.loginError.next(e);
    });
  }
  newUser(u: string, p: string) {
    firebase.auth().createUserWithEmailAndPassword(u, p).then(s => {
      this.user.next(s);
    }).catch(e => {
      this.loginError.next(e);
    });
  }
  logout() {
    firebase.auth().signOut();
    this.user.next(new User());
  }
}
