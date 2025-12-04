import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'reverse',
  standalone: true
})
export class ReversePipe implements PipeTransform {

  // transform(value: unknown, ...args: unknown[]): unknown {
  //   return null;
  // }

  transform(value: string): string {
    return value.split('').reverse().join(''); // this will reverse our string. Not really usefull but just to understand logic.
  }

}
