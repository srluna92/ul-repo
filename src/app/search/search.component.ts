import { Component, OnInit } from '@angular/core';
import { FireService } from '../service/fire.service';
import { Gear } from '../model/gear';
import { forEach } from '@firebase/util';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { MultifilterPipe } from '../pipe/multifilter.pipe';

const opReg = /[^=><]/g;
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
      this.filteredGear = g ? g : [];
    });
    this.fireService.getGear();
    this.fireService.getCompanies();
    this.fireService.getTypes();
  }
  applyFilter(n: string, v: string, op?: string, needsOp?: boolean): void {
    if (needsOp && !op) {
      return;
    }
    this.filter[n] = {
      val: v,
      oper: op && v ? op.replace(opReg, '') : null
    };
    this.filteredGear = this.multiFilterPipe.transform(this.gear, this.filter);
  }
}
