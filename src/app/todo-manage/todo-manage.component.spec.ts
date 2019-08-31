import { Component } from '@angular/core';
import { TodoManageComponent } from './todo-manage.component';
import { FormGroup } from '@angular/forms';

describe('Todo Manage Component', () => {
  let component;
  beforeEach(() => {
    component = new TodoManageComponent();
  });
  it('should create todo list form instance of FormGroup', () => {

    expect(component.todoListForm instanceof FormGroup).toBe(true);
  });

  it('should create field of todo list form', () => {

    expect(component.todoListForm.controls.topic.value).toEqual('');
    expect(component.todoListForm.controls.description.value).toEqual('');
  });

  it('should create default list of todoList', () => {

    expect(component.todoLists).toEqual([]);
  });

  it('should init isAdd to be true', () => {
    expect(component.isAdd).toBe(true);
  });


  describe('add', () => {
    it('should add item to todoList when click add button', () => {
      component.todoListForm.controls.topic.setValue('topic1');
      component.todoListForm.controls.description.setValue('desc1');

      component.add();

      expect(component.todoLists).toEqual([{ topic: 'topic1', description: 'desc1' }]);
    });

    it('should add 2 items to todoList when add second times', () => {
      component.todoListForm.controls.topic.setValue('topic1');
      component.todoListForm.controls.description.setValue('desc1');

      component.add();

      component.todoListForm.controls.topic.setValue('topic2');
      component.todoListForm.controls.description.setValue('desc2');

      component.add();

      expect(component.todoLists[0]).toEqual({ topic: 'topic1', description: 'desc1' });
      expect(component.todoLists[1]).toEqual({ topic: 'topic2', description: 'desc2' });
    });

    it('should clear form after click add', () => {
      component.todoListForm.controls.topic.setValue('topic1');
      component.todoListForm.controls.description.setValue('desc1');

      component.add();

      expect(component.todoListForm.controls.topic.value).toEqual('');
      expect(component.todoListForm.controls.description.value).toEqual('');
    });
  });

  describe('edit', () => {
    beforeEach(() => {
      component.todoLists = [
        {
          topic: 'topic1',
          description: 'desc1'
        }
      ];
    });

    it('should set isAdd to false for show button edit', () => {
      component.isAdd = true;

      component.edit(0);

      expect(component.isAdd).toBe(false);
    });

    it('should binding value to form', () => {
      component.edit(0);

      expect(component.todoListForm.controls.topic.value).toEqual('topic1');
      expect(component.todoListForm.controls.description.value).toEqual('desc1');
    });

    it('should binding value todoList index 1 to form', () => {
      component.todoLists = [
        {
          topic: 'topic1',
          description: 'desc1'
        },
        {
          topic: 'topic2',
          description: 'desc2'
        }
      ];

      component.edit(1);

      expect(component.todoListForm.controls.topic.value).toEqual('topic2');
      expect(component.todoListForm.controls.description.value).toEqual('desc2');
    });

    it('should set selectedItem when click edit button', () => {

      component.edit(0);

      expect(component.selectedItem).toEqual(0);
    });
  });

  describe('update', () => {
    it('should set isAdd to be true when click update', () => {
      component.isAdd = false;
      component.todoLists = [{topic: 'topic', description: 'desc'}];
      component.selectedItem = 0;

      component.update();

      expect(component.isAdd).toBe(true);
    });

    it('should update todoList with form data select', () => {
      component.todoLists = [{topic: 'topic', description: 'desc'}];
      component.selectedItem = 0;

      component.todoListForm.controls.topic.setValue('topicUpdate');
      component.todoListForm.controls.description.setValue('descriptionUpdate');

      component.update();

      expect(component.todoLists[0].topic).toEqual('topicUpdate');
      expect(component.todoLists[0].description).toEqual('descriptionUpdate');
    });
  });
});
