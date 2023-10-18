import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { TaskModel } from '../models/task.model';
@Injectable({
  providedIn: 'root'
})
export class ItemService {

  id: number = 0; // Se le da un valor inicial a 'id'
  itemSub: TaskModel[] = [];
  private sub = new Subject<TaskModel[]>();
  item$ = this.sub.asObservable();

  private subFilter = new Subject<string>();
  codeFilter$ = this.subFilter.asObservable();

  constructor() {}

  private generateId() {
    return '-' + Math.random().toString(36).substring(2, 9);
  }

  add(newItem: TaskModel) {
    this.get();
    newItem.id = this.generateId();
    this.itemSub.push(newItem);
    this.sub.next(this.itemSub);
    localStorage.setItem('item', JSON.stringify(this.itemSub));
  }

  get() {
    let listItems = JSON.parse(localStorage.getItem('item') || 'null'); // Se maneja el caso de 'null'
    if (listItems == null) {
      this.itemSub = [];
      this.sub.next([]);
    } else {
      this.itemSub = listItems;
      this.sub.next(listItems);
    }
  }

  filter(code: string){
    this.subFilter.next(code);
  }
}
