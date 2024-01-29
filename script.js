const todoListContainer = document.querySelector('.todo-list-container');
const form = document.querySelector('#form');
const newTodo = document.querySelector('#new-todo');
const author = document.querySelector('#author');
const addBtn = document.querySelector('#add-btn');
const sort = document.querySelector('#sort');

let todosList = [];

let updatedTodoId;

const listTodos = (todosList) => {
    todoListContainer.innerHTML = "";
    todosList.forEach((todo) => {
        let todoHtml;
        if (todo.completed){
        todoHtml = `
        <div class="todo completed" id=${todo.id}>
            <div>
                <input type="checkbox" id="check" class='check' checked>
            </div>
            <div class="main-todo">
                <div class="time-and-author">
                    <div id="time">${todo.created.toDateString()}</div>
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
        } else {
        todoHtml = `
        <div class="todo" id=${todo.id}>
            <div>
                <input type="checkbox" id="check" class='check'>
            </div>
            <div class="main-todo">
                <div class="time-and-author">
                    <div id="time">${todo.created.toDateString()}</div>
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
        }
      todoListContainer.innerHTML += todoHtml;
    });
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (newTodo.value !== "" && author.value !== "" && addBtn.innerText === 'Add') {
    let todo = {
      id: Date.now(),
      title: newTodo.value,
      author: author.value,
      created: new Date(),
      completed: false,
    };
    todosList.unshift(todo);
  } else if (newTodo.value !== "" && author.value !== "" && addBtn.innerText === 'Update'){
    todosList.forEach(x => {
        if (x.id.toString() === updatedTodoId){
            let todo = {
              id: x.id,
              title: newTodo.value,
              author: author.value,
              created: x.created,
              completed: false,
            };
            let index = todosList.indexOf(x);
            todosList.splice(index, 1, todo);
            addBtn.innerText = 'Add';
        }
    })
  }
  
  newTodo.value = "";
  author.value = "";
  listTodos(todosList);
});

const completeToggle = (todo) => {
    todosList.forEach(x => {
        if (x.id.toString() === todo.id){
            x.completed = !x.completed
            console.log(typeof(todo.id));
            console.log(typeof(x.id));
        }
        listTodos(todosList);
    })
}

const deletTodo = (todo) => {
    todosList = todosList.filter((x) => x.id.toString() !== todo.id);
    listTodos(todosList);
}

const editTodo = (todo) => {
    todosList.forEach(x => {
        if (x.id.toString() === todo.id){
            newTodo.value = todo.querySelector(".todo-title").innerText;
            author.value = todo.querySelector(".author-name").innerText;
            addBtn.innerText = "Update";
            updatedTodoId = x.id.toString();
        }
    })
}

const moveUpTodo = (todo) => {
    todosList.forEach(x => {
        if (x.id.toString() === todo.id){
            const index = todosList.indexOf(x);
            if (index !== 0){
                const newIndex = index - 1;
                todosList.splice(index, 1);
                todosList.splice(newIndex, 0, x);
            }
        }
        listTodos(todosList);
    })
}

const moveDownTodo = (todo) => {
    const index = todosList.findIndex(x => x.id.toString() === todo.id);
    if (index < todosList.length - 1) {
      const newIndex = index + 1;
        [todosList[index], todosList[newIndex]] = [todosList[newIndex], todosList[index]]
      listTodos(todosList);
    }
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
        case 'move-up':
            moveUpTodo(todo);
            break;
        case 'move-down':
            moveDownTodo(todo);
            break;
            
    }
})

sort.addEventListener('change', e => {
    e.preventDefault();
    let sortedArray= [];
    if (e.target.value === 'author'){
        sortedArray = todosList.slice().sort((a, b) => a.author.localeCompare(b.author));
        listTodos(sortedArray);
    } else if (e.target.value === 'date') {
        sortedArray = todosList.slice().sort((a, b) => b.created - a.created);
        listTodos(sortedArray);
    } else {
        listTodos(todosList);
    }
})

