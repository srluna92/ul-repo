import { Component, OnInit } from '@angular/core';
import { Discount } from '../model/discount';
import { FireService } from '../service/fire.service';
import { MultifilterPipe } from '../pipe/multifilter.pipe';

@Component({
  selector: 'app-discount',
  templateUrl: './discount.component.html',
  styleUrls: ['./discount.component.css']
})
export class DiscountComponent implements OnInit {

  dis = new  Discount();
  discounts: Discount[];
  filteredDiscounts: Discount[];
  companies: string[];
  filter: {};
  old = false;
  constructor(
    private fireService: FireService,
    private multifilter: MultifilterPipe
  ) { }

  addDiscount(): void {
    this.fireService.addDiscount(this.dis);
    if (!this.companies.includes(this.dis.company)) {
      this.companies.push(this.dis.company);
      this.fireService.addCompany(this.companies);
    }
  }

  filterDiscounts(name: string, value: string): void {
    if (name && name === 'end') {
      this.filteredDiscounts = this.discounts.filter(d => {
        return value ? new Date().getTime() <= new Date(d.end).getTime() : true;
      });
    } else if (name && value) {
      this.filter[name] = value;
    } else if (name && !value) {
      delete this.filter[name];
    } else {
      this.filteredDiscounts = this.multifilter.transform(this.discounts, this.filter);
    }
  }

  ngOnInit() {
    this.fireService.discounts.asObservable().subscribe(d => {
      this.discounts = d;
      this.filteredDiscounts = d ? d : [];
      if (d) {
        this.filterDiscounts('end', 'true');
      }
    });
    this.fireService.lists.companies.asObservable().subscribe(c => this.companies = c);
    this.fireService.getDiscounts();
    this.fireService.getCompanies();
  }

}
