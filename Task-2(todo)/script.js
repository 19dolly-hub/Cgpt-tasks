const todoApp = document.querySelector(".all-tasks");
const taskField = document.getElementById("task");
const deadlineF = document.getElementById("deadline");
const form = document.getElementById("form");
const openForm = document.getElementById("open-form");
const cancelBtn = document.getElementById("cancel");
const formWindow = document.getElementById("form-window");


// INITIALIZE LOCAL STORAGE AND TASKS ARRAY
let tasksArray = JSON.parse(localStorage.getItem("todos")) || [];

// INITIALIZE UI
renderTasks(tasksArray);


// POP-UP FORM WINDOW 
openForm.addEventListener("click", () => {
  formWindow.classList.remove("none");
  taskField.focus();
});


// CANCEL BUTTON IN FORM WINDOW
cancelBtn.addEventListener("click", () => {
  taskField.value = "";
  deadlineF.value = "";
  formWindow.classList.add("none");
});


// ADDING TASKS
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const task = taskField.value.trim();
  const deadline = deadlineF.value.trim();
  if (task !== "" && deadline !== "") {
    createTodo(task, deadline);
  }

  cancelBtn.click();
});


function createTodo(task, deadline) {
  // update tasksArray
  tasksArray = [
    {
      uniqueId: Date.now(),
      desc: task,
      dead: deadline,
      isDone: false,
    },
    ...tasksArray,
  ];
  
  localStorage.setItem("todos", JSON.stringify(tasksArray)); // set localstorage with updated array

  renderTasks(tasksArray); // render updated array in UI
}


function renderTasks(allTasks) {

  todoApp.innerHTML = ""; // clear old UI {tasks}

  // check if array is empty
  if (allTasks.length > 0) {

    // creating task UI for each task object in the array
    allTasks.forEach((obj, i) => {

      const div = document.createElement("div"); // parent div
      div.classList.add("task");
      div.id = i;

      const boxDiv = document.createElement("div"); // checkbox div
      boxDiv.classList.add("checkbox");
      boxDiv.innerHTML = `
        <svg class="${obj.isDone ? "none" : ""}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1rem"><path fill="#8d8d8d" d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20Z"></path></svg>
        <svg class="${obj.isDone ? "" : "none"}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1.1rem"><path fill="rgb(207, 0, 207)" d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20ZM11.0026 16L6.75999 11.7574L8.17421 10.3431L11.0026 13.1716L16.6595 7.51472L18.0737 8.92893L11.0026 16Z"></path></svg>
      `;

      const inputsDiv = document.createElement("div"); // inputs div
      inputsDiv.classList.add("inputs");

      const workInput = document.createElement("input");
      workInput.setAttribute("type", "text");
      workInput.setAttribute("value", `${obj.desc}`);
      workInput.setAttribute("placeholder", "To do");
      workInput.setAttribute("disabled", true);
      if (obj.isDone) {
        workInput.classList.add("done");
      }
      inputsDiv.appendChild(workInput);

      const deadlineInput = document.createElement("input");
      deadlineInput.classList.add("small");
      deadlineInput.setAttribute("type", "text");
      deadlineInput.setAttribute("value", `${obj.dead}`);
      deadlineInput.setAttribute("placeholder", "Till...");
      deadlineInput.setAttribute("disabled", true);
      inputsDiv.appendChild(deadlineInput);

      const controls = document.createElement("div"); // controls div
      controls.classList.add("controls");
      controls.innerHTML = `
        <button type="button" class="edit-btn ${obj.isDone ? "none" : ""}">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1.1rem"><path fill="#8d8d8d" d="M6.41421 15.89L16.5563 5.74786L15.1421 4.33365L5 14.4758V15.89H6.41421ZM7.24264 17.89H3V13.6474L14.435 2.21233C14.8256 1.8218 15.4587 1.8218 15.8492 2.21233L18.6777 5.04075C19.0682 5.43128 19.0682 6.06444 18.6777 6.45497L7.24264 17.89ZM3 19.89H21V21.89H3V19.89Z"></path></svg>
          <svg class="none" xmlns="http://www.w3.org/2000/svg" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" image-rendering="optimizeQuality" fill-rule="evenodd" clip-rule="evenodd" viewBox="0 0 379 511.54" width="0.88rem"><path fill="#8d8d8d" fill-rule="nonzero" d="M107.83 0h194.21c21.17 0 40.41 8.68 54.34 22.61C370.33 36.56 379 55.82 379 76.96v357.62c0 21.06-8.69 40.29-22.63 54.26l-.1.1c-13.97 13.93-33.19 22.6-54.23 22.6H107.83c-21.15 0-40.41-8.67-54.36-22.62-13.93-13.93-22.61-33.17-22.61-54.34V360.6h37.55v73.98c0 10.81 4.45 20.67 11.59 27.81 7.15 7.15 17.02 11.6 27.83 11.6h194.21c10.83 0 20.7-4.43 27.8-11.54 7.18-7.17 11.61-17.04 11.61-27.87V76.96c0-10.8-4.45-20.67-11.6-27.82-7.13-7.14-17-11.59-27.81-11.59H107.83c-10.84 0-20.7 4.44-27.84 11.58-7.14 7.13-11.58 17-11.58 27.83v73.96H30.86V76.96c0-21.17 8.66-40.42 22.6-54.36C67.4 8.66 86.65 0 107.83 0zm59.06 161.72 97.02 91.6-101.77 96.42-25.8-27.12 50.94-48.28L0 274.66v-37.39l192.03-.33-50.8-47.96 25.66-27.26z"/></svg>
        </button>
        <button type="button" unique-id="${obj.uniqueId}" class="delete-btn">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1.1rem"><path fill="#8d8d8d" d="M17 6H22V8H20V21C20 21.5523 19.5523 22 19 22H5C4.44772 22 4 21.5523 4 21V8H2V6H7V3C7 2.44772 7.44772 2 8 2H16C16.5523 2 17 2.44772 17 3V6ZM18 8H6V20H18V8ZM9 11H11V17H9V11ZM13 11H15V17H13V11ZM9 4V6H15V4H9Z"></path></svg>
        </button>
      `;

      div.appendChild(boxDiv);
      div.appendChild(inputsDiv);
      div.appendChild(controls);
      todoApp.appendChild(div);

    })
  } else {
    todoApp.textContent = "You have not added any tasks yet!";
  }

}


// ADDING CHECKBOX AND CONTROLS FUNCTIONALITIES
todoApp.addEventListener("click", (e) => {

  const elem = e.target;
  
  if (elem.className === "checkbox") {
    
    const id = e.target.parentElement.id;
    // toggle checkmark
    elem.children[0].classList.toggle("none");
    elem.children[1].classList.toggle("none");
    
    // toggle edit button
    elem.nextElementSibling.children[0].classList.toggle("done");
    elem.parentElement.children[2].children[0].classList.toggle("none");

    tasksArray[id].isDone = !tasksArray[id].isDone; // update tasks array {only particular object property}
    
    localStorage.setItem("todos", JSON.stringify(tasksArray)); // set localstorage with updated array
      
  }
  
  if (elem.className === "edit-btn ") {

    const parent = elem.parentElement; // controls div
    const id = parent.parentElement.id; // id of task div
    const inputsDiv = parent.previousElementSibling; // inputs div

    // toggle icon edit-save
    elem.children[0].classList.toggle("none");
    elem.children[1].classList.toggle("none");

    // toggle disable
    inputsDiv.children[0].toggleAttribute("disabled");
    inputsDiv.children[0].focus();
    inputsDiv.children[1].toggleAttribute("disabled");

    // update values in tasks array if task input is not empty
    if (inputsDiv.children[0].value !== "") {

      tasksArray[id].desc = inputsDiv.children[0].value;
      tasksArray[id].dead = inputsDiv.children[1].value;

      localStorage.setItem("todos", JSON.stringify(tasksArray)); // update tasks array in local storage
    }
    else {

      inputsDiv.children[0].value = tasksArray[id].desc; // else save as it is
    }
  }

  if (elem.className === "delete-btn") {

    const dataId = Number(elem.getAttribute("unique-id"));
    tasksArray = tasksArray.filter((obj) => obj.uniqueId !== dataId); // filter tasks array to delete task obj
    
    localStorage.setItem("todos", JSON.stringify(tasksArray)); // set localstorage with updated array

    renderTasks(tasksArray); // render updated array in UI
  }
 
});
