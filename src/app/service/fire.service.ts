import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { FirebaseFirestore } from '@firebase/firestore-types';
import { AuthService } from './auth.service';
import { Lists } from '../model/lists';
import { Gear } from '../model/gear';
import { Discount } from '../model/discount';
import { forEach } from '@firebase/util';

@Injectable()
export class FireService {
  gear = new BehaviorSubject<Gear[]>(null);
  packs = new BehaviorSubject<any>(null);
  lists = new Lists();
  packCount = new BehaviorSubject<any>(null);
  discounts = new BehaviorSubject<Discount[]>(null);

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
      this.fire.collection('lists').doc('weight').valueChanges().subscribe((w: any) => this.lists.weights.next(w));
    }
  }
  getGear(): void {
    if (!this.gear.getValue()) {
      this.fire.collection('gear').valueChanges().subscribe((g: any) => this.gear.next(g));
    }
  }
  getPacks(): void {
    this.fire.collection('users').doc(this.auth.user.getValue().email).collection('packs').valueChanges()
      .subscribe(p => this.packs.next(p));
  }
  getPacksCount(): void {
    this.fire.collection('users').valueChanges().subscribe(c => this.packCount.next(c.length));
  }
  getDiscounts(): void {
    this.fire.collection('discounts').valueChanges().subscribe((d: any) => this.discounts.next(d));
  }

  addGear(gear: Gear[], m?: boolean): void {
    forEach(gear, g => this.fire.collection('gear').doc(g.name).set(JSON.parse(JSON.stringify(g)), {merge: m}));
  }
  addPack(p: any, m?: boolean): void {
    this.fire.collection('users').doc(this.auth.user.getValue().email).collection('packs').doc(p.name).set(p, {merge: m});
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
  addDiscount(d: Discount): void {
    this.fire.collection('discounts').doc(d.name).set(JSON.parse(JSON.stringify(d)));
  }
}
