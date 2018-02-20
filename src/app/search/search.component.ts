import { Component, OnInit } from '@angular/core';
import { FireService } from '../service/fire.service';
import { Gear } from '../model/gear';
import { forEach } from '@firebase/util';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  companies: string[];
  types: string[];
  gear: any[];
  columnHeader = [ 'name', 'company', 'type', 'material', 'weight' ];

  constructor(
    private fireService: FireService
  ) { }

  ngOnInit() {
    this.fireService.lists.companies.asObservable().subscribe(c => this.companies = c);
    this.fireService.lists.types.asObservable().subscribe(t => this.types = t);
    this.fireService.gear.asObservable().subscribe(g => {
      this.gear = g;
      forEach(this.gear, i => {
        this.gear[i].mat = this.getMaterials(this.gear[i]);
        this.gear[i].w = this.gear[i].mat[0];
      });
    });
    this.fireService.getGear();
    this.fireService.getCompanies();
    this.fireService.getTypes();
  }
  getMaterials(g: Gear): Array<string> {
    const m = new Array<string>();
    forEach(g.weight, w => {
      m.push(w);
    });
    return m;
  }

}
