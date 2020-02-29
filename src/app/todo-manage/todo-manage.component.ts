import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-todo-manage',
  templateUrl: './todo-manage.component.html',
  styleUrls: ['./todo-manage.component.scss']
})
export class TodoManageComponent implements OnInit {
  todoListForm = new FormGroup({
    topic: new FormControl(''),
    description: new FormControl('')
  });

  todoList = [];
  isAdd = true;
  selectItem: number;
  constructor() { }

  ngOnInit() {
  }

  add() {
    this.todoList.push(this.todoListForm.getRawValue());
    this.resetForm();
  }

  edit(rowIndex: number) {
    this.todoListForm.setValue(this.todoList[rowIndex]);
    this.isAdd = false;
    this.selectItem = rowIndex;
  }

  update() {
    this.isAdd = true;

    this.todoList[this.selectItem].topic = this.todoListForm.controls.topic.value;
    this.todoList[this.selectItem].description = this.todoListForm.controls.description.value;

    this.resetForm();
  }

  resetForm() {
    this.todoListForm.controls.topic.reset('');
    this.todoListForm.controls.description.reset('');
  }

  remove(index) {
    this.todoList.splice(index , 1);
    this.resetForm();

  }
}
