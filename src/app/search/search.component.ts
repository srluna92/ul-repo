import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  companies: string[] = ['MLD', 'Katabatic'];
  types: string[];

  s: any = {};
  constructor() { }

  ngOnInit() {
  }

}
