export let renderTaskToUl = (taskList) => {
  let contentPending = "";
  let contentCompleted = "";

  taskList.forEach((item, index) => {
    if (item.status == "pending") {
      contentPending += `<li> ${capitalizeFirstLetter(`${item.content}`)}
        <div>
        <a class="buttons" onclick="deleteTask(${index})" href="#">
        <i class="fa fa-trash-alt fa-lg remove"></i>
        </a>
        <a class="buttons ${
          item.status
        }" onclick="completeChanged(${index})"href="#"><i class="fa fa-check-circle fa-lg complete"></i></a>
        </div>
        </li>`;
    } else {
      contentCompleted += `<li>${capitalizeFirstLetter(`${item.content}`)}
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

export let capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export let compare = (a, b) => {
  if (a.content < b.content) {
    return -1;
  }
  if (a.content > b.content) {
    return 1;
  }
  return 0;
};
window.compare = compare;
