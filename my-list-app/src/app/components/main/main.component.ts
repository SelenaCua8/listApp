import { Component, OnInit } from '@angular/core';
import { TaskModel } from 'src/app/models/task.model';
import { ItemService } from 'src/app/services/item.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html'
})
export class MainComponent implements OnInit {
  listItems: TaskModel[] = []; // Se agrega un valor inicial
  codeFilter: string = ''; // Se agrega un valor inicial
  title: string = ''; // Se agrega un valor inicial

  constructor(private itemService: ItemService) {} // Corregido el nombre de la variable itemService

  ngOnInit(): void {
    this.itemService.codeFilter$.subscribe(code => {
      this.codeFilter = code;
      this.changeTitle(code);
    });
    this.itemService.filter('A');

    this.itemService.item$.subscribe(data => this.listItems = data);
    this.itemService.get();
  }

  changeTitle(code: string): void {
    const All = "A", Completed = "C", Pendings = "P";
    if (code === All) this.title = "All";
    else if (code === Completed) this.title = "Completed";
    else this.title = "Pendings";
  }
}

