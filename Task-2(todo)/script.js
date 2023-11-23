let todosArr = localStorage.getItem("todos") || `[]`;
let tasksArray = JSON.parse(todosArr);
const todoApp = document.querySelector(".all-tasks");

const taskField = document.getElementById("task");
const deadlineF = document.getElementById("deadline");
const form = document.getElementById("form");


const open = document.getElementById("open-form");
open.addEventListener("click", () => {
  document.getElementById("form-window").classList.remove("none");
  taskField.click();
});

document.getElementById("cancel")
.addEventListener("click", () => {
  document.getElementById("form-window").classList.add("none");
});


renderTasks(tasksArray);

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const task = taskField.value;
  const deadline = deadlineF.value;
  createTodo(task, deadline);

  //clear
  taskField.value = "";
  deadlineF.value = "";
});

function createTodo(task, deadline) {
  tasksArray = [
    {
      uniqueId: Date.now(),
      desc: task,
      dead: deadline,
      isDone: false,
    },
    ...tasksArray,
  ];
  localStorage.setItem("todos", JSON.stringify(tasksArray));

  //refresh
  todosArr = localStorage.getItem("todos");
  tasksArray = JSON.parse(todosArr);

  renderTasks(tasksArray);
}

function renderTasks(allTasks) {

  todoApp.innerHTML = "";

  if (allTasks.length > 0) {
    allTasks.forEach((obj, i) => {
      const div = document.createElement("div");
      div.id = i;
      div.innerHTML = `
        <span class="checkbox">${obj.isDone ? "✅" : "☑️"}</span>
        <input type="text" value="${obj.desc}" disabled style="text-decoration:${obj.isDone ? "line-through" : "none"};"/>
        <input type="text" value="${obj.dead}" disabled />
        <button type="button" style="display:${obj.isDone ? "none" : "inline"};">Edit</button>
        <button type="button" unique-id="${obj.uniqueId}">Delete</button>
        `;
      todoApp.appendChild(div);
    });
  } else todoApp.textContent = "You have not added any tasks yet!";
}

todoApp.addEventListener("click", (e) => {
  const tag = e.target.tagName;
  const id = e.target.parentElement.id;

  if (tag === "SPAN") {
    tasksArray[id].isDone = !tasksArray[id].isDone;
    let check = tasksArray[id].isDone;

    if (check) {
      e.target.innerText = "✅";
      e.target.nextElementSibling.style.textDecoration = "line-through";
      e.target.parentElement.children[3].style.display = "none";
    } else {
      e.target.innerText = "☑️";
      e.target.nextElementSibling.style.textDecoration = "none";
      e.target.parentElement.children[3].style.display = "inline";
    }

    //refresh
    localStorage.setItem("todos", JSON.stringify(tasksArray));
    todosArr = localStorage.getItem("todos");
    tasksArray = JSON.parse(todosArr);
  }

  if (tag === "BUTTON") {
    if (e.target.innerText === "Edit") {
      e.target.parentElement.children[1].removeAttribute("disabled");
      e.target.parentElement.children[2].removeAttribute("disabled");
      e.target.textContent = "Save";
      return;
    }

    if (e.target.innerText === "Save") {
      if(e.target.parentElement.children[1].value !== "") tasksArray[id].desc = e.target.parentElement.children[1].value;
      tasksArray[id].dead = e.target.parentElement.children[2].value;

      //refresh
      localStorage.setItem("todos", JSON.stringify(tasksArray));
      todosArr = localStorage.getItem("todos");
      tasksArray = JSON.parse(todosArr);

      e.target.parentElement.children[1].setAttribute("disabled", true);
      e.target.parentElement.children[2].setAttribute("disabled", true);
      e.target.textContent = "Edit";
      return;
    }

    if (e.target.innerText === "Delete") {
      const dataId = Number(e.target.getAttribute("unique-id"));
      tasksArray = tasksArray.filter((obj) => obj.uniqueId !== dataId);

      //refresh
      localStorage.setItem("todos", JSON.stringify(tasksArray));
      todosArr = localStorage.getItem("todos");
      tasksArray = JSON.parse(todosArr);

      renderTasks(tasksArray);
    }
  }
});
