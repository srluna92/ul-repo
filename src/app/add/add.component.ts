import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators/map';
import {startWith} from 'rxjs/operators/startWith';
import { FireService, FormService } from '../service/service-index';
import { forEach } from '@firebase/util';
import { Gear } from '../model/gear';
import { Lists } from '../model/lists';
import { Material } from '../model/material';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {

  ng = new Gear();
  materials = new Array<Material>();
  matName = new Array<string>();

  group: FormGroup;

  weights = new Array<string>();
  wVal = new Array<string>();
  companies: string[];
  types: string[];

  constructor(
    private fireService: FireService,
    private formService: FormService
  ) { }

  addItem(): void {
    const gear = new Array<Gear>();
    for (const i in this.materials) {
      if (this.matName[i] && this.materials[i]) {
        this.ng.material = this.matName[i];
        this.ng.price = this.materials[i].price;
        this.ng.url = this.materials[i].url;
        this.ng.weight = this.materials[i].weight;
        gear.push(this.ng);
      }
    }
    this.fireService.addGear(gear, false);
  }

  newMaterial() {
    this.materials.push(new Material());
  }

  ngOnInit() {
    this.group = this.formService.newItemForm();
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
    this.materials.push(new Material());
  }
}
