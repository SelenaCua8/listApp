
import { Component } from '@angular/core';
import { TaskModel } from 'src/app/models/task.model';
import { ItemService } from 'src/app/services/item.service';
import { FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  
})
export class FooterComponent  implements OnInit{

  items: TaskModel[] = [];
  txtInput: FormControl;

  constructor(private ItemService: ItemService)
  {
    this.txtInput = new FormControl('',
    [Validators.minLength(5),
    Validators.maxLength(35)]);
  }

  ngOnInit(): void{

  }

  save(){
    let newItem = {
      name: this.txtInput.value,
      state: false

    }
    if(this.txtInput.invalid || this.txtInput.value ==="")return;
    this.ItemService.add(newItem);
    this.txtInput.reset();

  }


}
