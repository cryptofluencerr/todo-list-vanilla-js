//Selectors
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filter = document.querySelector(".filter-todo");

//Event Listeners
todoButton.addEventListener(
  "click", //Functions
  function addTodo(event) {
    event.preventDefault();
    //Todo DIV
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    //Create LI
    const newTodo = document.createElement("li");
    newTodo.classList.add("todo-list");
    newTodo.innerText = todoInput.value;
    todoDiv.appendChild(newTodo);
    //ADD TODO TO LOCAL STORAGE
    //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!CHECK!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    saveLocalTodos(todoInput.value);

    //CHECK MARK BUTTON
    const completedButton = document.createElement("button");
    completedButton.classList.add("complete-btn");
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    todoDiv.appendChild(completedButton);

    //TRASH BUTTON
    const trashButton = document.createElement("button");
    trashButton.classList.add("trash-btn");
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    todoDiv.appendChild(trashButton);

    //APPEND TODO LIST
    todoList.appendChild(todoDiv);

    //Clear Todo INPUT VALUE
    todoInput.value = "";
  }
);

todoList.addEventListener("click", function deleteCheck(e) {
  const item = e.target;
  //DELETE TODO
  if (item.classList[0] === "trash-btn") {
    const todo = item.parentElement;
    //ANIMATION
    todo.classList.add("fall");
    todo.addEventListener("transitionend", function () {
      todo.remove();
    });
  }
  //CHECK MARK
  if (item.classList[0] === "complete-btn") {
    const todo = item.parentElement;
    //TOGGLING BETWEEN class="completed"
    todo.classList.toggle("completed");
  }
});

filter.addEventListener("click", function (e) {
  const todos = todoList.childNodes;
  todos.forEach(function (todo) {
    switch (e.target.value) {
      //CHECKING WHETHER FILTER IS SELECTED FOR "ALL" || "COMPLETED" || "INCOMPLETE"
      case "all":
        todo.style.display = "flex"; //WHAT IS THIS CODE DOING
        break;
      case "completed":
        if (todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
      case "incomplete":
        if (!todo.classList.contains("completed")) {
          //what is the difference between
          // this code and if(todo.classList[0] != "completed")
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
    }
  });
});

function saveLocalTodos(todo) {
  //CHECK----HEY Do I already have things in local storage?
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos() {
  //!!!!!!!!!!!!!!!!!!!!!!!!!!!!UNDERSTAND!!!!!!!!!!!!!!!!!!!!!!
  //CHECK----HEY Do I already have things in local storage?
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  todos.forEach(function (todo) {
    //Todo DIV
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    //Create LI
    const newTodo = document.createElement("li");
    newTodo.classList.add("todo-list");
    newTodo.innerText = todoInput.value;
    todoDiv.appendChild(newTodo);
    //ADD TODO TO LOCAL STORAGE
    //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!CHECK!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    saveLocalTodos(todoInput.value);

    //CHECK MARK BUTTON
    const completedButton = document.createElement("button");
    completedButton.classList.add("complete-btn");
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    todoDiv.appendChild(completedButton);

    //TRASH BUTTON
    const trashButton = document.createElement("button");
    trashButton.classList.add("trash-btn");
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    todoDiv.appendChild(trashButton);

    //APPEND TODO LIST
    todoList.appendChild(todoDiv);
  });
}
