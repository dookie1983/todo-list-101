import { Component } from '@angular/core';
import { TodoManageComponent } from './todo-manage.component';
import { FormGroup } from '@angular/forms';
import { cpus } from 'os';

describe('Todo Manage Component', () => {
  let component;
  beforeEach(() => {
    component = new TodoManageComponent();
  });
  it('should create Todo Manage Component', () => {
    expect(component instanceof TodoManageComponent).toBe(true);
  });

  it('should create todoListForm', () => {
    expect(component.todoListForm instanceof FormGroup).toBe(true);
  });

  it('should create fields topic and description in todolist form', () => {
    expect(component.todoListForm.controls.topic.value).toEqual('');
    expect(component.todoListForm.controls.description.value).toEqual('');
  });

  it('should create default todoList', () => {
    expect(component.todoList).toEqual([]);
  });

  it('should init isAdd to be true', () => {
    expect(component.isAdd).toBe(true);
  });

  describe('add', () => {
    it('should add item to todoList when click add button', () => {
      component.todoListForm.controls.topic.setValue('topic1');
      component.todoListForm.controls.description.setValue('description1');

      component.add();

      expect(component.todoList).toEqual([{ topic: 'topic1', description: 'description1' }]);
    });

    it('should add topic2 to todo list when click add button', () => {
      component.todoListForm.controls.topic.setValue('topic2');
      component.todoListForm.controls.description.setValue('description2');

      component.add();

      expect(component.todoList).toEqual([{ topic: 'topic2', description: 'description2' }]);
    });

    it('should add 2 items to todoList when click add button 2 times', () => {
      component.todoListForm.controls.topic.setValue('topic1');
      component.todoListForm.controls.description.setValue('desc1');

      component.add();

      component.todoListForm.controls.topic.setValue('topic2');
      component.todoListForm.controls.description.setValue('desc2');

      component.add();

      expect(component.todoList).toEqual([
        { topic: 'topic1', description: 'desc1' },
        { topic: 'topic2', description: 'desc2' }
      ]);
    });

    it('should clear fields in todoForm after click add button', () => {
      spyOn(component, 'resetForm');
      component.todoListForm.controls.topic.setValue('topic1');
      component.todoListForm.controls.description.setValue('desc1');

      component.add();

      expect(component.resetForm).toHaveBeenCalled();
    });
  });

  describe('resetForm', () => {
    it('should clear fields in todoForm after click button', () => {
      component.todoListForm.controls.topic.setValue('topic1');
      component.todoListForm.controls.description.setValue('desc1');

      component.resetForm();

      expect(component.todoListForm.controls.topic.value).toEqual('');
      expect(component.todoListForm.controls.description.value).toEqual('');
    });

  });

  describe('edit', () => {
    beforeEach(() => {
      component.todoList = [{
        topic: 'topic1',
        description: 'description1'
      },
      {
        topic: 'topic2',
        description: 'description2'
      }];
    });

    it('should set isAdd to be false', () => {
      component.isAdd = true;

      component.edit(0);

      expect(component.isAdd).toBe(false);
    });

    it('should set selected item to form', () => {
      component.todoListForm.controls.topic.setValue('');
      component.todoListForm.controls.description.setValue('');

      component.edit(0);

      expect(component.todoListForm.controls.topic.value).toEqual('topic1');
      expect(component.todoListForm.controls.description.value).toEqual('description1');

    });

    it('should set item selected index 1 to form', () => {
      component.todoListForm.controls.topic.setValue('topic1');
      component.todoListForm.controls.description.setValue('description1');

      component.edit(1);

      expect(component.todoListForm.controls.topic.value).toEqual('topic2');
      expect(component.todoListForm.controls.description.value).toEqual('description2');
    });

    it('should set selectItem when click edit button', () => {
      component.selectItem = null;

      component.edit(1);

      expect(component.selectItem).toBe(1);
    });
  });

  describe('update', () => {
    it('should set isAdd to be true', () => {
      component.isAdd = false;
      component.todoList = [{ topic: 'topic1', description: 'description1' }];

      component.selectItem = 0;

      component.update();

      expect(component.isAdd).toBe(true);
    });

    it('should clear form after update', () => {
      spyOn(component, 'resetForm');
      component.todoList = [{ topic: 'topic1', description: 'description1' }];

      component.selectItem = 0;

      component.todoListForm.controls.topic.setValue('topic1');
      component.todoListForm.controls.description.setValue('desc1');

      component.update();

      expect(component.resetForm).toHaveBeenCalled();
    });

    it('should update value to todoList', () => {
      component.todoList = [{ topic: 'topic1', description: 'description1' }];
      component.todoListForm.controls.topic.setValue('topicUpdate');
      component.todoListForm.controls.description.setValue('descriptionUpdate');

      component.selectItem = 0;

      component.update();

      expect(component.todoList).toEqual([{
        topic: 'topicUpdate',
        description: 'descriptionUpdate'
      }]);
    });

    it('should update todoList index 1 when selectItem is 1', () => {
      component.todoList = [{
        topic: 'topic1',
        description: 'description1'
      },
      {
        topic: 'topic2',
        description: 'description2'
      }];
      component.todoListForm.controls.topic.setValue('topicUpdate');
      component.todoListForm.controls.description.setValue('descriptionUpdate');

      component.selectItem = 1;

      component.update();

      expect(component.todoList[0]).toEqual({
        topic: 'topic1',
        description: 'description1'
      });
      expect(component.todoList[1]).toEqual({
        topic: 'topicUpdate',
        description: 'descriptionUpdate'
      });
    });


  });
  describe('remove', () => {
    beforeEach(() => {
      component.todoList = [{topic: 'topic1', description: 'desc1'},
      {topic: 'topic2', description: 'desc2'}];
    });
    it('should remove item by index from todoList after click remove button', () => {

      component.remove(0);

      expect(component.todoList.length).toEqual(1);
      expect(component.todoList).toEqual([{topic: 'topic2', description:'desc2'}]);

    });
    it('should reset todoList form', () => {
      spyOn(component, 'resetForm');
      component.remove(0);
      expect(component.resetForm).toHaveBeenCalled();
    });
  });
});
