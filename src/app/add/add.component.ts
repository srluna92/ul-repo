import { Component, OnInit } from '@angular/core';
import { FormService } from '../service/form.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators/map';
import {startWith} from 'rxjs/operators/startWith';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {

  addGroup: FormGroup;
  companies: Observable<string[]>;
  types: string[];
  companiesList = ['Alabama', 'California'];
  ctrl = new FormControl();

  constructor(
    private formService: FormService
  ) { }

  ngOnInit() {
    this.addGroup = this.formService.newItemForm();
    this.companies = this.addGroup.controls['company'].valueChanges.pipe(
      startWith(''),
      map(v => {
        return this.companiesList.filter(o => o.toLowerCase().includes(v));
      })
    )
  }
  filter(c: string[], v: string): string[] {
    return c.filter(o =>
      o.toLowerCase().indexOf(v ? v.toLowerCase() : '') === 0);
  }

}
