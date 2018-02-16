import { BehaviorSubject } from 'rxjs/BehaviorSubject';

export class Lists {
  weights = new BehaviorSubject<string[]>(null);
  companies = new BehaviorSubject<string[]>(null);
  types = new BehaviorSubject<string[]>(null);
}
