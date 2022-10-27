import { renderTaskToUl } from "./controllers/controller.js";
import { Task } from "./models/models.js";
import { emptyCheck } from "./validate/validate.js";

const TASKLIST = "TASKLIST";

let contentTaskList = [];
// let completeTask = [];

// covert data from local
let dataJSON = localStorage.getItem(TASKLIST);

if (dataJSON) {
  let dataRaw = JSON.parse(dataJSON);
  contentTaskList = dataRaw.map((item) => {
    return new Task(item.content, item.status, item.id);
  });
  renderTaskToUl(contentTaskList);
}

// save data to local
let saveLocalStorage = () => {
  let taskListJSON = JSON.stringify(contentTaskList);
  localStorage.setItem(TASKLIST, taskListJSON);
};

let addNewTask = () => {
  document.getElementById("addItem").addEventListener("click", () => {
    let newTaskContent = document.getElementById("newTask").value.toLowerCase();
    if (emptyCheck(newTaskContent)) {
      let newTask = new Task(newTaskContent, "pending");
      contentTaskList.push(newTask);
      renderTaskToUl(contentTaskList);
      saveLocalStorage();
    }
  });
};
addNewTask();

let completeChanged = (index) => {
  contentTaskList[index].status = "done";
  renderTaskToUl(contentTaskList);
  saveLocalStorage();
};
window.completeChanged = completeChanged;

let deleteTask = (index) => {
  contentTaskList.splice(index, 1);
  renderTaskToUl(contentTaskList);
  saveLocalStorage();
};
window.deleteTask = deleteTask;

let sortTaskNameAZ = () => {
  contentTaskList.sort(compare);
  renderTaskToUl(contentTaskList);
  saveLocalStorage();
};
window.sortTaskNameAZ = sortTaskNameAZ;

let sortTaskNameZA = () => {
  contentTaskList.reverse();
  renderTaskToUl(contentTaskList);
  saveLocalStorage();
};
window.sortTaskNameZA = sortTaskNameZA;
