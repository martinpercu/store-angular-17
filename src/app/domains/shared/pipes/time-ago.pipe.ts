import { Pipe, PipeTransform } from '@angular/core';
import { formatDistanceToNow } from 'date-fns'

@Pipe({
  name: 'timeAgo',
  standalone: true
})
export class TimeAgoPipe implements PipeTransform {

  // transform(value: unknown, ...args: unknown[]): unknown {
  //   return null;
  // }

  transform(value: any): string {
    const date = new Date(value);
    return formatDistanceToNow((date), {
      addSuffix: true
    });
  }

}
