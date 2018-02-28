import { Pipe, PipeTransform } from '@angular/core';
import { forEach } from '@firebase/util';

const opReg = /[^=><]/g;
@Pipe({
  name: 'multifilter'
})
export class MultifilterPipe implements PipeTransform {

  transform(items: Array<any>, filter: {[key: string]: any}): Array<any> {
    return filter && items ? items.filter(i => {
      return !Object.keys(filter).find(k => {
        if (!filter[k].oper) {
          return !i[k].includes(filter[k].val);
        } else {
          if ('material|weight|load'.includes(k)) {
            let r = true;
            forEach(i.material, m => {
              if (('weight|load'.includes(k) && eval(i.material[m][k] + filter[k].oper + filter[k].val))
                || ('material'.includes(k) && m.includes(filter[k].val))) {
                r = false;
              }
            });
            return r;
          } else {
            return !eval(i[k] + filter[k].oper.replace(opReg, '') + filter[k].val);
          }
        }
      });
    }) : items;
  }
}
