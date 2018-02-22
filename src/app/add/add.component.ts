import { Component, OnInit } from '@angular/core';
import { FormService } from '../service/form.service';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators/map';
import {startWith} from 'rxjs/operators/startWith';
import { FireService } from '../service/fire.service';
import { IdService } from '../service/id.service';
import { forEach } from '@firebase/util';
import { Gear } from '../model/gear';
import { Lists } from '../model/lists';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {

  g = new Gear();
  gList: Gear[];
  group: FormGroup;
  group2: FormGroup;
  weights = new Array<string>();
  wVal = new Array<string>();
  companies: string[];
  types: string[];

  constructor(
    private fireService: FireService,
    private formService: FormService,
    private idService: IdService
  ) { }

  addItem(): void {
    this.fireService.addGear(this.g, false);
  }

  ngOnInit() {
    this.fireService.gear.asObservable().subscribe(g => this.gList = g);
    this.group = this.formService.newItemForm();
    this.group2 = this.formService.newItemSecondary();
    this.fireService.lists.weights.asObservable().subscribe(w => {
      forEach(w, i => {
        this.weights.push(i);
        this.wVal.push(w[i]);
      });
    });
    this.fireService.lists.companies.asObservable().subscribe(c => this.companies = c);
    this.fireService.lists.types.asObservable().subscribe(t => this.types = t);
    this.fireService.getWeights();
    this.fireService.getTypes();
    this.fireService.getCompanies();
  }
}
