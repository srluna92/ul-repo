import { Component, OnInit } from '@angular/core';
import { FireService, IdService } from '../service/service-index';

@Component({
  selector: 'app-pack',
  templateUrl: './pack.component.html',
  styleUrls: ['./pack.component.css']
})
export class PackComponent implements OnInit {

  packs: any[];
  pack: any;
  constructor(
    private fireService: FireService,
    private idService: IdService
  ) { }

  add() {
    this.pack.id = this.idService.createId();
    this.fireService.addPack(this.pack, false);
  }
  ngOnInit() {
    this.fireService.packs.asObservable().subscribe(p => this.packs = p);
    this.fireService.getPacks();
  }

}
