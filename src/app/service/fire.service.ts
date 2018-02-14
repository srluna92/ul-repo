import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { User } from '../model/user';
import { FirebaseFirestore } from '@firebase/firestore-types';
import * as firebase from 'firebase';

@Injectable()
export class FireService {
  gear = new BehaviorSubject<any>([]);
  user = new BehaviorSubject<User>(new User());

  constructor(
    private fire: AngularFirestore,
  ) { }

  login(u: string, p: string) {
    firebase.auth().signInWithEmailAndPassword(u, p).then(s => {
      console.log(s);
    }).catch(e => {
      console.log(e);
    });
  }

  newUser(u: string, p: string) {
    firebase.auth().createUserWithEmailAndPassword(u, p).then(s => {

    }).catch(e => {

    });
  }



  getGear(): void {
    this.gear.next(this.fire.collection('gear'));
  }

}
