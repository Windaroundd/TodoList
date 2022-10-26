import { Task } from "./models.js";

const TASKLIST = "TASKLIST";

let contentTaskList = [];
// let completeTask = [];

// covert data from local
let dataJSON = localStorage.getItem(TASKLIST);

let renderTaskToUl = (taskList) => {
  let contentPending = "";
  let contentCompleted = "";

  taskList.forEach((item, index) => {
    if (item.status == "pending") {
      contentPending += `<li>${item.content}
      <div>
      <a class="buttons" onclick="deleteTask(${index})" href="#"><i class="fa fa-trash-alt fa-lg remove"></i>
      </a>
      <a class="buttons ${item.status}" onclick="completeChanged(${index})"href="#"><i class="fa fa-check-circle fa-lg complete"></i></a>
      </div>
      </li>`;
    } else {
      contentCompleted += `<li>${item.content}
      <div>
      <a class="buttons" onclick="deleteTask(${index})" href="#"><i class="fa fa-trash-alt fa-lg remove"></i>
      </a>
      <span class="fa fa-check-circle fa-lg"> </span>
      </div>
      </li>`;
    }
  });
  document.getElementById("todo").innerHTML = contentPending;
  document.getElementById("completed").innerHTML = contentCompleted;
};

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
    let newTask = new Task(document.getElementById("newTask").value, "pending");
    contentTaskList.push(newTask);
    renderTaskToUl(contentTaskList);
    saveLocalStorage();
  });
};
addNewTask();

let completeChanged = (index) => {
  contentTaskList[index].status = "done";
  saveLocalStorage();
  renderTaskToUl(contentTaskList);
};
window.completeChanged = completeChanged;

let deleteTask = (index) => {
  contentTaskList.splice(index, 1);
  renderTaskToUl(contentTaskList);
  saveLocalStorage();
};
window.deleteTask = deleteTask;
