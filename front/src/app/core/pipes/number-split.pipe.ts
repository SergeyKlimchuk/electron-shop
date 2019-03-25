import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'numberSplit'
})
export class NumberSplitPipe implements PipeTransform {

  transform(value: number, args?: any): any {
    let str = '';
    const valueAsString = String(value);
    for (let i = 0; i < valueAsString.length / 3; i++) {
      if (i !== 0) {
        str = ' ' + str;
      }
      const start = i * 3 + 3;
      let count = 3;
      if (start + 3 > valueAsString.length) {
        count -= start - valueAsString.length;
      }
      str = valueAsString.substr(-start, count) + str;
    }
    return str;
  }

}
