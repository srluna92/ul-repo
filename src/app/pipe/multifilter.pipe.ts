import { Pipe, PipeTransform } from '@angular/core';

const opReg = /[^=><]/g;
@Pipe({
  name: 'multifilter'
})
export class MultifilterPipe implements PipeTransform {

  transform(items: Array<any>, filter: {[key: string]: any}, operator?: string): Array<any> {
    return filter && items ? items.filter(i => {
      return Object.keys(filter).find(k => {
        return !!operator ? eval(i[k] + operator.replace(opReg, '') + filter[k]) : i[k].includes(filter[k]);
      });
    }) : items;
  }
}
