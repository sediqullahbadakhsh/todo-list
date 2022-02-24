/**
 * @jest-environment jsdom
 */
import TaskList from './src/tasksList.js';
import App from './src/app.js';

describe('localstorage', () => {
  test('Add', () => {
    const taskList = new TaskList();
    taskList.addNewTask('item 1');
    taskList.addNewTask('item 2');
    expect(taskList.taskListArray.length).toBe(2);
  });
  test('Delete', () => {
    const taskList = new TaskList();
    taskList.addNewTask('item 1');
    taskList.addNewTask('item 2');
    taskList.deleteTask(1);
    expect(taskList.taskListArray.length).toBe(1);
  });
});

describe('DOM manipulation', () => {
  test('Add to list', () => {
    document.body.innerHTML = `
         <template id="task-template" >
        <div class="row row-task">
          <div class="task">
            <input type="checkbox" class="check">
            <input class="task-description" type="text">
          </div>
          <div class="buttons">
             <button class='move-btn' type="button">../src/dots.png</button>
             <button class='delete-btn' type="button">&#128465;</button>
          </div>
        </div>
      </template>
      <div class="task-container">
      </div>
      `;
    const app = new App();
    app.taskList.addNewTask('item 1');
    app.taskList.addNewTask('item 2');
    app.taskList.addNewTask('item 3');
    app.taskList.addNewTask('item 4');
    app.displayTaskCards();
    const tasks = document.body.querySelectorAll('.row-task');
    expect(tasks.length).toBe(4);
  });

  test('remove from list', () => {
    document.body.innerHTML = `
     <template id="task-template" >
    <div class="row row-task">
      <div class="task">
        <input type="checkbox" class="check">
        <input class="task-description" type="text">
      </div>
      <div class="buttons">
         <button class='move-btn' type="button">../src/dots.png</button>
         <button class='delete-btn' type="button">&#128465;</button>
      </div>
    </div>
  </template>
  <div class="task-container">
  </div>
  `;
    window.localStorage.clear();
    const app = new App();
    app.taskList.addNewTask('item 1');
    app.taskList.addNewTask('item 2');
    app.taskList.addNewTask('item 3');
    app.taskList.addNewTask('item 4');
    app.taskList.deleteTask(2);
    app.taskList.deleteTask(3);
    app.displayTaskCards();
    const tasks = document.body.querySelectorAll('.row-task');
    expect(tasks.length).toBe(2);
  });
});