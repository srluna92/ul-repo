import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'multifilter'
})
export class MultifilterPipe implements PipeTransform {

  transform(items: Array<any>, filter: {[key: string]: any}): Array<any> {
    return filter && items ? items.filter(i => {
      return Object.keys(filter).find(k => i[k].includes(filter[k]));
    }) : items;
  }

}
