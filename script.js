const todoListContainer = document.querySelector('.todo-list-container');
const form = document.querySelector('#form');
const newTodo = document.querySelector('#new-todo');
const author = document.querySelector('#author');

const todosList = [];

const listTodos = () => {
    todoListContainer.innerHTML = "";
    todosList.forEach((todo) => {
        let todoHtml = `
        <div class="todo" id=${todo.id}>
            <div>
                <input type="checkbox" id="check" class='check'>
            </div>
            <div class="main-todo">
                <div class="time-and-author">
                    <div id="time">${todo.created}</div>
                    <div class="author-name">${todo.author}</div>
                </div>
                <div class="todo-title">${todo.title}</div>
            </div>
            <div class="move-todo">
                <span class="move-up material-symbols-outlined">move_up</span>
                <span class="move-down material-symbols-outlined">move_down</span>
            </div>
            <div class="action-todo">
                <span class="edit material-symbols-outlined">edit_note</span>
                <span class="delete material-symbols-outlined">delete</span>
            </div>
        </div>
        `;
      todoListContainer.innerHTML += todoHtml;
    });
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (newTodo.value !== "" && author.value !== "") {
    let todo = {
      id: Date.now(),
      title: newTodo.value,
      author: author.value,
      created: new Date().toDateString(),
      completed: false,
    };
    todosList.unshift(todo);
  }
  newTodo.value = "";
  author.value = "";
  listTodos();
});

const completeToggle = (todo) => {
    todo.classList.toggle('completed');
}

const deletTodo = (todo) => {
    todo.remove();
}

const editTodo = (todo) => {
    newTodo.value = todo.querySelector('.todo-title').innerText;
    author.value = todo.querySelector(".author-name").innerText;
}


todoListContainer.addEventListener('click', e => {
    e.preventDefault();
    let todo = e.target.parentNode.parentNode;
    let htmlEl = e.target.classList;
    switch (htmlEl[0]){
        case 'check':
            completeToggle(todo)
            break;
        case 'edit':
            editTodo(todo);
            break;
        case 'delete':
            deletTodo(todo);
            break;
    }
})


