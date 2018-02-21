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
  weights = new Array<string>();
  wVal = new Array<string>();
  companies = new Observable<string[]>();
  types = new Observable<string[]>();

  constructor(
    private fireService: FireService,
    private formService: FormService,
    private idService: IdService
  ) { }

  ngOnInit() {
    this.fireService.gear.asObservable().subscribe(g => this.gList = g);
    this.group = this.formService.newItemForm();
    this.fireService.lists.weights.asObservable().subscribe(w => {
      forEach(w, i => {
        this.weights.push(i);
        this.wVal.push(w[i]);
      });
    });
    this.fireService.getWeights();
    this.companies = this.group.controls['company'].valueChanges.pipe(
      startWith(''),
      map(c => this.filter(this.fireService.lists.companies.getValue(), c))
    );
    this.types = this.group.controls['type'].valueChanges.pipe(
      startWith(''),
      map(c => this.filter(this.fireService.lists.types.getValue(), c))
    );
  }
  filter(l: string[], v: string): string[] {
    return l ? l.filter(o => o ? o.toLowerCase().includes(v ? v.toLowerCase() : '') : null) : null;
  }
}
