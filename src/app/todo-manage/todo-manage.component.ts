import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-todo-manage',
  templateUrl: './todo-manage.component.html',
  styleUrls: ['./todo-manage.component.scss']
})
export class TodoManageComponent implements OnInit {
  todoForm: FormGroup = new FormGroup({
    topic: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
  });
  todoList = [];
  isAdd = true;
  selectedTodoItem: number;

  constructor() { }

  ngOnInit() {
  }

  add() {
    this.todoList.push(this.todoForm.getRawValue());
    this.reset();
  }

  edit(index: number) {
    this.isAdd = false;
    // const topic = this.todoList[index].topic;
    // const description = this.todoList[index].description;
    // this.todoForm.controls.topic.setValue(topic);
    // this.todoForm.controls.description.setValue(description);
    this.todoForm.setValue(this.todoList[index]);
    this.selectedTodoItem = index;
  }

  update() {
    this.isAdd = true;
    this.todoList[this.selectedTodoItem] = this.todoForm.getRawValue();
    this.reset();
  }

  remove(index: number) {
    this.isAdd = true;
    delete this.todoList[index];
    this.todoList = this.todoList.filter(e => e);
    this.reset();
  }

  reset() {
    this.todoForm.controls.topic.reset('');
    this.todoForm.controls.description.reset('');
  }

}
