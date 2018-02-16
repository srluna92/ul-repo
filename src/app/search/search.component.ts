import { Component, OnInit } from '@angular/core';
import { FireService } from '../service/fire.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  companies: string[];
  types: string[];
  gear: any[];
  s: any = {};

  columnHeader = [ 'company', 'type', 'name', 'weight', 'material' ];

  constructor(
    private fireService: FireService
  ) { }

  ngOnInit() {
    this.fireService.lists.companies.asObservable().subscribe(c => this.companies = c);
    this.fireService.lists.types.asObservable().subscribe(t => this.types = t);
    this.fireService.gear.asObservable().subscribe(g => this.gear = g);
    this.fireService.getGear();
    this.fireService.getCompanies();
    this.fireService.getTypes();
  }

}
