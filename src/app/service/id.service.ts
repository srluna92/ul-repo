import { Injectable } from '@angular/core';
import { FireService } from './fire.service';

const m = 100000000;
const x = 81654329;
const y = 43349769;

@Injectable()
export class IdService {

  constructor(
    private fireService: FireService
  ) { }

  createId(): number {
    return (this.fireService.packCount.getValue() * x) % m;
  }

}
