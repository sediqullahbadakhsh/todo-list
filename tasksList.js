class TaskList {
  constructor() {
    this.taskListArray = this.loadDataFromStorage();
  }

  loadDataFromStorage() {
    this.taskListArray = JSON.parse(window.localStorage.getItem('TODOLIST'));
    if (!this.taskListArray) this.taskListArray = [];
    return this.taskListArray;
  }

  saveDataToStorage() {
    window.localStorage.setItem('TODOLIST', JSON.stringify(this.taskListArray));
  }

  addNewTask(description) {
    this.taskListArray.push({
      index: this.taskListArray.length + 1,
      completed: false,
      description,
    });
  }

  deleteTask(index) {
    this.taskListArray = this.taskListArray.filter((e) => e.index !== Number(index));
    this.#reorderIndexes();
  }

  updateTaskDescription(index, description) {
    this.taskListArray[index - 1].description = description;
    this.saveDataToStorage();
  }

  updateTaskStatus(index, status) {
    this.taskListArray[index - 1].completed = status;
    this.saveDataToStorage();
  }

  clearAllCompleted() {
    this.taskListArray = this.taskListArray.filter((e) => !e.completed);
    this.#reorderIndexes();
    this.saveDataToStorage();
  }

  getDescription(index) {
    return this.taskListArray[index - 1].description;
  }

  getStatus(index) {
    return this.taskListArray[index - 1].completed;
  }

  swapPositions(lID, rID) {
    let indexA = 0;
    let indexB = 0;
    for (let i = 0; i < this.taskListArray.length; i += 1) {
      if (this.taskListArray[i].index === Number(lID)) indexA = i;
      if (this.taskListArray[i].index === Number(rID)) indexB = i;
    }
    const tempo = this.taskListArray[indexA];
    this.taskListArray[indexA] = this.taskListArray[indexB];
    this.taskListArray[indexB] = tempo;
    this.#reorderIndexes();
    this.saveDataToStorage();
  }

  #reorderIndexes() {
    let index = 1;
    this.taskListArray.forEach((e) => {
      e.index = index;
      index += 1;
    });
  }
}

export default TaskList;