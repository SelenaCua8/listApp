import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  id: number;
  itemSub: TaskModel[] = [];
  private sub = new Subject<TaskModel[]>();
  item$ = this.sub.asObservable();

  constructor() {}

  private generateId() {
    return '-' + Math.random().toString(36).substring(2, 9);
  }

  add(newItem: TaskModel){
    this.get();
    newItem.id = this.generateId();
    this.itemSub.push(newItem);
    this.sub.next(this.itemSub);
    localStorage.setItem('item', JSON.stringify(this.itemSub));

  }

  get(){
    let listItems = JSON.parse(localStorage.getItem('item'));
    if(listItems == null){
      this.itemSub = [];
      this.sub.next{[]};
    }else{
      this.itemSub = listItems;
      this.sub.next(listItems);
    }
  }

}
