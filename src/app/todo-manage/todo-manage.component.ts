import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-todo-manage',
  templateUrl: './todo-manage.component.html',
  styleUrls: ['./todo-manage.component.scss']
})
export class TodoManageComponent implements OnInit {
  todoListForm: FormGroup = new FormGroup({
    topic: new FormControl(''),
    description: new FormControl('')
  });

  todoLists = [];
  isAdd = true;
  selectedItem: number;

  constructor() { }

  ngOnInit() {
  }

  add() {
    this.todoLists.push(this.todoListForm.getRawValue());

    this.todoListForm.controls.topic.reset('');
    this.todoListForm.controls.description.reset('');
  }

  edit(rowIndex: number) {
    this.todoListForm.controls.topic.setValue(this.todoLists[rowIndex].topic);
    this.todoListForm.controls.description.setValue(this.todoLists[rowIndex].description);

    this.isAdd = false;
    this.selectedItem = rowIndex;
  }

  update() {
    this.todoLists[this.selectedItem].topic = this.todoListForm.controls.topic.value;
    this.todoLists[this.selectedItem].description = this.todoListForm.controls.description.value;

    this.isAdd = true;
  }

}
