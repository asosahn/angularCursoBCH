import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'searchText'
})
export class SearchPipe implements PipeTransform {

  transform(value: any, searchText: string, prop?: any ): any {
    if (!searchText || searchText === '') {
      return value;
    }
    return value.filter(item => item[prop].match(RegExp(searchText, 'i')));
  }

}
