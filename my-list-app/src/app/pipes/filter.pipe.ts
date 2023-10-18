import { Pipe, PipeTransform } from '@angular/core';
import { TaskModel } from '../models/task.model';
import { ItemService } from '../services/item.service';

@Pipe({
  name: 'filterItems'
})
export class FilterPipe implements PipeTransform {

  transform(items: TaskModel[], filter: string): TaskModel[] {
    switch (filter) {
      case 'C':
        return items.filter( item => item.state);
        case 'P':
          return items.filter( item => !item.state);
          default:
            return items;
    }
  }

}
