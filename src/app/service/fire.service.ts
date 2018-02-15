import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { FirebaseFirestore } from '@firebase/firestore-types';

@Injectable()
export class FireService {
  gear = new BehaviorSubject<any>(null);
  types = new BehaviorSubject<string[]>([]);
  weights = new BehaviorSubject<string[]>(null);
  companies = new BehaviorSubject<string[]>([]);

  constructor(
    private fire: AngularFirestore,
  ) { }

  getCompanies(): void {
    this.fire.collection('companies').valueChanges().subscribe((c: string[]) => this.companies.next(c));
  }
  getTypes(): void {
    this.fire.collection('types').valueChanges().subscribe((t: string[]) => this.types.next(t));
  }
  getWeights(): void {
    this.fire.collection('weights').valueChanges().subscribe((w: string[]) => this.weights.next(w));
  }
  getGear(): void {
    if (!this.gear.getValue()) {
      this.fire.collection('gear').valueChanges().subscribe(g => {
        this.gear.next(g);
      });
    }
  }

}
