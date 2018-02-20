import { Injectable } from '@angular/core';

const m = 100000000;
const x = 81654329;
const y = 43349769;

@Injectable()
export class IdService {

  constructor() { }

  createId(n: number): number {
    return (n * x) % m;
  }

}
