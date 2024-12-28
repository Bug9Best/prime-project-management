import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  standalone: true,
  name: 'thcard'
})
export class ChaosThaiCardPipe implements PipeTransform {

  transform(value: string|null, ...args: any[]): any {
    if(!value) return value;
    if(value.length == 13) {
      let id1 = value.substr(0,1);
      let id2 = value.substr(1,4);
      let id3 = value.substr(5,5);
      let id4 = value.substr(10,2);
      let id5 = value.substr(12,1)

      return `${id1}-${id2}-${id3}-${id4}-${id5}`;
    }
    else return value;
  }

}
