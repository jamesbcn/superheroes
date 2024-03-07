import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'safeDataSource'
})
export class SafeDataSourcePipe implements PipeTransform {
  transform(value: any): any {
    return value ? value : [];
  }
}
