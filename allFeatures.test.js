/**
 * @jest-environment jsdom
 */
 import TaskList from "./src/tasksList.js";
 import App from "./src/app.js";
 //local Storage
 describe("update Status in local storage", () => {
   test("update task description", () => {
     const taskList = new TaskList();
     taskList.addNewTask("New Task");
     taskList.updateTaskDescription(1, "edited task");
     expect(taskList.getDescription(1)).toBe("edited task");
   });
 
   test("update task completed status", () => {
     const taskList = new TaskList();
     taskList.addNewTask("New Task");
     taskList.updateTaskStatus(1, true);
     expect(taskList.getStatus(1)).toBeTruthy();
   });
 
   test("Clear all completed from Local Storage", () => {
     window.localStorage.clear();
     const taskList = new TaskList();
     taskList.addNewTask("New Task1");
     taskList.addNewTask("New Task2");
     taskList.updateTaskStatus(1, true);
     taskList.clearAllCompleted();
     const size = taskList.taskListArray.length;
     expect(size).toBe(1);
   });
 });
 
 describe("update status in the DOM", () => {
   test("updates task description in the DOM", () => {
     window.localStorage.clear();
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
     app.taskList.addNewTask("item 1");
     app.taskList.addNewTask("item 2");
     app.taskList.addNewTask("item 3");
     app.taskList.addNewTask("item 4");
     app.displayTaskCards();
     app.taskList.updateTaskDescription(2, "edit item 2");
     app.displayTaskCards();
     const tasks = document.body.querySelectorAll(".row-task");
     const description = tasks[1].querySelector(".task-description").value;
     expect(description).toBe("edit item 2");
   });
 
   test("update task completed (Checkbox is checked)", () => {
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
     app.taskList.addNewTask("Item 1");
     app.taskList.addNewTask("Item 2");
     app.taskList.addNewTask("Item 3");
     app.taskList.addNewTask("Item 4");
     app.displayTaskCards();
     app.taskList.updateTaskStatus(1, true);
     app.displayTaskCards();
     const tasks = document.body.querySelectorAll(".row-task");
     const status = tasks[0].querySelector(".check").checked;
     expect(status).toBeTruthy();
   });
 
   test("Clear all completed from the DOM", () => {
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
     app.taskList.addNewTask("Item 1");
     app.taskList.addNewTask("Item 2");
     app.taskList.addNewTask("Item 3");
     app.taskList.addNewTask("Item 4");
     app.displayTaskCards();
     app.taskList.updateTaskStatus(1, true);
     app.taskList.updateTaskStatus(3, true);
     app.displayTaskCards();
     app.taskList.clearAllCompleted();
     app.displayTaskCards();
     const tasksCardCount = document.body.querySelectorAll(".row-task").length;
     expect(tasksCardCount).toBe(2);
   });
 });