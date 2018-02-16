import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { FirebaseFirestore } from '@firebase/firestore-types';
import { AuthService } from './auth.service';
import { Lists } from '../model/lists';

@Injectable()
export class FireService {
  gear = new BehaviorSubject<any>(null);
  packs = new BehaviorSubject<any>(null);
  lists = new Lists();

  constructor(
    private fire: AngularFirestore,
    private auth: AuthService
  ) { }

  getCompanies(): void {
    if (!this.lists.companies.getValue()) {
      this.fire.collection('lists').doc('companies').valueChanges().subscribe((c: any) => this.lists.companies.next(c.list));
    }
  }
  getTypes(): void {
    if (!this.lists.types.getValue()) {
      this.fire.collection('lists').doc('types').valueChanges().subscribe((t: any) => this.lists.types.next(t.list));
    }
  }
  getWeights(): void {
    if (!this.lists.weights.getValue()) {
      this.fire.collection('lists').doc('weight').valueChanges().subscribe((w: any) => this.lists.weights.next(w.list));
    }
  }
  getGear(): void {
    if (!this.gear.getValue()) {
      this.fire.collection('gear').valueChanges().subscribe(g => {
        this.gear.next(g);
      });
    }
  }
  getPacks(): void {
    this.fire.collection('packs').doc(this.auth.user.getValue().name).collection('packs').valueChanges().subscribe(p => {
      this.packs.next(p);
    });
  }

  addGear(g: any): void {
    this.fire.collection('gear').doc(g.name).set(g);
  }
  addPack(p: any): void {
    this.fire.collection('packs').doc(this.auth.user.getValue().name).collection('packs').doc(p.name).set(p);
  }
  addType(s: string[]): void {
    this.fire.collection('lists').doc('types').update({list: s});
  }
  addCompany(c: string[]): void {
    this.fire.collection('lists').doc('companies').update({list: c});
  }
  addWeights(w: string[]): void {
    this.fire.collection('lists').doc('weights').update({list: w});
  }

}
