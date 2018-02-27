import { Component, OnInit } from '@angular/core';
import { FireService } from '../service/fire.service';
import { Gear } from '../model/gear';
import { forEach } from '@firebase/util';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { MultifilterPipe } from '../pipe/multifilter.pipe';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  companies: string[];
  types: string[];
  gear: any[];
  filter = {};
  filteredGear: any[];

  constructor(
    private fireService: FireService,
    private multiFilterPipe: MultifilterPipe
  ) { }

  ngOnInit() {
    this.fireService.lists.companies.asObservable().subscribe(c => this.companies = c);
    this.fireService.lists.types.asObservable().subscribe(t => this.types = t);
    this.fireService.gear.asObservable().subscribe(g => {
      this.gear = g;
      forEach(this.gear, i => {
        this.gear[i].mat = this.get(this.gear[i], 'material', true);
        this.gear[i].w = this.gear[i].mat[0];
      });
      this.filteredGear = this.gear ? this.gear.slice() : [];
    });
    this.fireService.getGear();
    this.fireService.getCompanies();
    this.fireService.getTypes();
  }
  get(g: Gear, s: string, name?: boolean): Array<string> {
    const n = new Array<string>();
    if (!g.hasOwnProperty(s)) {
      return n;
    }
    for (const i in g[s]) {
      if (name) {
        n.push(i);
      } else if (g[s][i]) {
        n.push(g[s][i]);
      }
    }
    return n;
  }
  applyFilter(n: string, v: string, op?: string): void {
    if (!v && this.filter[n]) {
      delete this.filter[n];
    } else {
      this.filter[n] = v;
    }
    this.filteredGear = this.multiFilterPipe.transform(this.gear, this.filter, op);
  }
}
