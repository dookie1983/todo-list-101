import { FormGroup, FormControl } from '@angular/forms';
import { TodoManageComponent } from './todo-manage.component';

describe('TodoManageComponent', () => {
  let component;
  beforeEach(() => {
    component = new TodoManageComponent();
  });

  it('should create todo form instance of FormGroup', () => {
    expect(component.todoForm instanceof FormGroup).toBe(true);
  });

  it('shuold default action is add', () => {
    expect(component.isAdd).toBe(true);
  })

  it('should create fields todo form', () => {
    expect(component.todoForm.controls.topic.value).toEqual('');
    expect(component.todoForm.get('topic').value).toEqual('');
    expect(component.todoForm.get('description').value).toEqual('');
  });

  it('should create default todo list', () => {
    expect(component.todoList).toEqual([]);
  });

  it('should invalid field toppic when input empty topic', () => {
    component.todoForm.controls.topic.setValue('');
    component.todoForm.controls.description.setValue('desc1');

    expect(component.todoForm.invalid).toBe(true);
  });

  it('should invalid field description when input empty topic', () => {
    component.todoForm.controls.topic.setValue('topic1');
    component.todoForm.controls.description.setValue('');

    expect(component.todoForm.invalid).toBe(true);
  });

  describe('add', () => {
    beforeEach(() => {
      spyOn(component, 'reset');
    });

    it('should see todos item within table when click add', () => {
      component.todoForm.controls.topic.setValue('topic1');
      component.todoForm.controls.description.setValue('desc1');

      component.add();

      expect(component.todoList).toEqual([{ topic: 'topic1', description: 'desc1' }]);
    });

    it('should see specific todo item of user input', () => {
      component.todoForm.controls.topic.setValue('topic2');
      component.todoForm.controls.description.setValue('desc2');

      component.add();

      expect(component.todoList).toEqual([{ topic: 'topic2', description: 'desc2' }]);
    });

    it('should 2 todo items when add second times', () => {
      component.todoForm.controls.topic.setValue('topic2');
      component.todoForm.controls.description.setValue('desc2');
      component.add();

      component.todoForm.controls.topic.setValue('topic2');
      component.todoForm.controls.description.setValue('desc2');
      component.add();

      expect(component.todoList).toEqual([
        { topic: 'topic2', description: 'desc2' },
        { topic: 'topic2', description: 'desc2' }
      ]);
    });

    it('should reset todo form', () => {
      component.add();
      expect(component.reset).toHaveBeenCalled();
    });
  });

  describe('reset', () => {
    it('should clear value in form when added', () => {
      component.todoForm.controls.topic.setValue('topic');
      component.todoForm.controls.description.setValue('desc1');

      component.reset();

      expect(component.todoForm.controls.topic.value).toEqual('');
      expect(component.todoForm.controls.description.value).toEqual('');
    });

    it('should not show error message when user added', () => {
      component.todoForm.controls.topic.markAsTouched();
      component.todoForm.controls.description.markAsTouched();

      component.reset();

      expect(component.todoForm.controls.topic.untouched).toBe(true);
      expect(component.todoForm.controls.description.untouched).toBe(true);
    });
  });

  describe('edit', () => {
    beforeEach(() => {
      component.todoList = [{ topic: 'topic paul', description: 'desc paul' }];
    });

    it('should set isAdd to be false', () => {
      component.isAdd = true;

      component.edit(0);

      expect(component.isAdd).toBe(false);
    });

    it('should set index of selected item', () => {
      component.selectedTodoItem = null;

      component.edit(0);

      expect(component.selectedTodoItem).toEqual(0);
    });

    it('should set value in todo from first row when click edit button', () => {
      component.todoList = [{ topic: 'topic paul', description: 'desc paul' }];
      component.todoForm.controls.topic.setValue('');
      component.todoForm.controls.description.setValue('');

      component.edit(0);

      expect(component.todoForm.controls.topic.value).toEqual('topic paul');
      expect(component.todoForm.controls.description.value).toEqual('desc paul');
    });

    it('should set value in todo from second row when click edit button', () => {
      component.todoList = [
        { topic: 'topic paul', description: 'desc paul' },
        { topic: 'topic kodookie', description: 'desc kodookie' },
      ];
      component.todoForm.controls.topic.setValue('');
      component.todoForm.controls.description.setValue('');

      component.edit(1);

      expect(component.todoForm.controls.topic.value).toEqual('topic kodookie');
      expect(component.todoForm.controls.description.value).toEqual('desc kodookie');
    });
  });

  describe('update', () => {
    beforeEach(() => {
      spyOn(component, 'reset');
      component.todoList = [{ topic: 'add topic', description: 'add desc' }];
    });

    it('should set isAdd to be true', () => {
      component.isAdd = false;

      component.update();

      expect(component.isAdd).toBe(true);
    });

    it('should update selected todo when click update', () => {
      component.todoList = [{ topic: 'add topic', description: 'add desc' }];
      component.selectedTodoItem = 0;
      component.todoForm.controls.topic.setValue('update topic');
      component.todoForm.controls.description.setValue('update desc');

      component.update();

      expect(component.todoList[0].topic).toEqual('update topic');
      expect(component.todoList[0].description).toEqual('update desc');
    });

    it('should update selected todo when click update', () => {
      component.todoList = [
        { topic: 'add topic', description: 'add desc' },
        { topic: 'add topic 2', description: 'add desc 2' }
      ];

      component.selectedTodoItem = 1;
      component.todoForm.controls.topic.setValue('update topic 2');
      component.todoForm.controls.description.setValue('update desc 2');

      component.update();

      expect(component.todoList[0].topic).toEqual('add topic');
      expect(component.todoList[0].description).toEqual('add desc');
      expect(component.todoList[1].topic).toEqual('update topic 2');
      expect(component.todoList[1].description).toEqual('update desc 2');
    });

    it('should reset todo form', () => {
      component.update();
      expect(component.reset).toHaveBeenCalled();
    });

  });

  describe('remove', () => {
    beforeEach(() => {
      spyOn(component, 'reset');
    });

    it('should set isAdd to be true', () => {
      component.isAdd = false;

      component.remove();

      expect(component.isAdd).toBe(true);
    });

    it('should delete selected item from todo table', () => {
      component.todoList = [{ topic: 'topic 1', description: 'desc 1' }];

      component.remove(0);

      expect(component.todoList).toEqual([]);
    });

    it('should delete second item form todo table when click remove second row', () => {
      component.todoList = [
        { topic: 'topic 1', description: 'desc 1' },
        { topic: 'topic 2', description: 'desc 2' }
      ];

      component.remove(1);

      expect(component.todoList).toEqual([{ topic: 'topic 1', description: 'desc 1' }]);
    });

    it('should delete first item form todo table when click remove first row', () => {
      component.todoList = [
        { topic: 'topic 1', description: 'desc 1' },
        { topic: 'topic 2', description: 'desc 2' }
      ];

      component.remove(0);

      expect(component.todoList).toEqual([{ topic: 'topic 2', description: 'desc 2' }]);
    });

    it('should reset todo form', () => {
      component.remove();
      expect(component.reset).toHaveBeenCalled();
    });
  });
});
