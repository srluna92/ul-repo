import { Component, OnInit } from '@angular/core';
import { FormService } from '../service/form.service';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators/map';
import {startWith} from 'rxjs/operators/startWith';
import { FireService } from '../service/fire.service';
import { IdService } from '../service/id.service';
import { forEach } from '@firebase/util';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {

  addGroup: FormGroup;
  companies: Observable<string[]>;
  types: Observable<string[]>;
  weights: Observable<string[]>;
  g: any;

  constructor(
    private formService: FormService,
    private fireService: FireService,
    private idService: IdService
  ) { }

  addItem(): void {
    let newItem = true;
    const filteredGear = this.fireService.gear.getValue().filter(f => {
      return f.name === this.g.name && f.company === this.g.company;
    });
    for (const i in filteredGear) {
      if (filteredGear[i].material === this.g.material) {
        newItem = false;
        break;
      }
    }

    // if (!newItem) {
    //   this.g.id = this.idService.createId(this.fireService.gear.getValue().length);
    //   this.fireService.addGear(this.g);
    // }
  }

  ngOnInit() {
    this.addGroup = this.formService.newItemForm();
    this.companies = this.addGroup.controls['company'].valueChanges.pipe(
      startWith(''),
      map(v => this.filter(this.fireService.lists.companies.getValue(), v))
    );
    this.types = this.addGroup.controls['type'].valueChanges.pipe(
      startWith(''),
      map(v => this.filter(this.fireService.lists.types.getValue(), v))
    );
    this.weights = this.addGroup.controls['weights'].valueChanges.pipe(
      startWith(''),
      map(v => this.filter(this.fireService.lists.weights.getValue(), v))
    );
  }
  filter(c: string[], v: string): string[] {
    return c ? c.filter(o => o.toLowerCase().indexOf(v ? v.toLowerCase() : '')) : null;
  }

}
