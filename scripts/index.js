const todos_list = document.querySelector('.todos_list');
const addButton = document.querySelector('.add-button');
const addInput = document.querySelector('.add-input');
const deleteModal = document.querySelector('.modal.delete');
const deleteModalCancelBtn = document.querySelector('.delete-modal-cancel');
const deleteModalConfirmBtn = document.querySelector('.delete-modal-confirm');
const editModal = document.querySelector('.modal.edit');
const editModalCancelBtn = document.querySelector('.edit-modal-cancel');
const editModalConfirmBtn = document.querySelector('.edit-modal-confirm');
const editInput = document.getElementById("editInput");


let selectedTodo;

const todos = [
  {
    content: "addInput.value 1",
    isCompleted: false
  },
  {
    content: "addInput.value 2",
    isCompleted: false
  }
];

function renderTodos() {
  todos_list.innerHTML = '';

  if (todos.length === 0) {
    todos_list.innerHTML = `<p class="empty">No Todos</p>`;
  }

  todos.forEach((todo, index) => {

    const todoEl = document.createElement('div');
    todoEl.classList.add('todo');

    const todoContent = document.createElement('p');
    todoContent.textContent = todo.content;

    const todoActionsEl = document.createElement('div');
    todoActionsEl.classList.add('actions');

    const todoEditBtn = document.createElement('button');
    todoEditBtn.setAttribute('data-index', index);

    todoEditBtn.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 32 32" data-index="${index}">
          <path fill="currentColor"
            d="M27.87 7.863L23.024 4.82l-7.89 12.566l4.843 3.04zM14.395 21.25l-.107 2.855l2.527-1.337l2.35-1.24l-4.673-2.936zM29.163 3.24L26.63 1.647a1.364 1.364 0 0 0-1.88.43l-1 1.588l4.843 3.042l1-1.586c.4-.64.21-1.483-.43-1.883zm-3.965 23.82c0 .275-.225.5-.5.5h-19a.5.5 0 0 1-.5-.5v-19a.5.5 0 0 1 .5-.5h13.244l1.884-3H5.698c-1.93 0-3.5 1.57-3.5 3.5v19c0 1.93 1.57 3.5 3.5 3.5h19c1.93 0 3.5-1.57 3.5-3.5V11.097l-3 4.776v11.19z" />
        </svg>
      `;
    const todoDeleteBtn = document.createElement('button');
    todoDeleteBtn.setAttribute('data-index', index);
    todoDeleteBtn.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" data-index="${index}">
        <g fill="none">
          <path
            d="M24 0v24H0V0zM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427c-.002-.01-.009-.017-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093c.012.004.023 0 .029-.008l.004-.014l-.034-.614c-.003-.012-.01-.02-.02-.022m-.715.002a.023.023 0 0 0-.027.006l-.006.014l-.034.614c0 .012.007.02.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z" />
          <path fill="currentColor"
            d="M14.28 2a2 2 0 0 1 1.897 1.368L16.72 5H20a1 1 0 1 1 0 2l-.003.071l-.867 12.143A3 3 0 0 1 16.138 22H7.862a3 3 0 0 1-2.992-2.786L4.003 7.07A1.01 1.01 0 0 1 4 7a1 1 0 0 1 0-2h3.28l.543-1.632A2 2 0 0 1 9.721 2zm3.717 5H6.003l.862 12.071a1 1 0 0 0 .997.929h8.276a1 1 0 0 0 .997-.929zM10 10a1 1 0 0 1 .993.883L11 11v5a1 1 0 0 1-1.993.117L9 16v-5a1 1 0 0 1 1-1m4 0a1 1 0 0 1 1 1v5a1 1 0 1 1-2 0v-5a1 1 0 0 1 1-1m.28-6H9.72l-.333 1h5.226z" />
        </g>
      </svg>
      `;
    todoActionsEl.appendChild(todoEditBtn);
    todoActionsEl.appendChild(todoDeleteBtn);

    todoDeleteBtn.addEventListener('click', showDeletePopup);

    todoEditBtn.addEventListener('click', showEditPopup)

    todoEl.appendChild(todoContent);
    todoEl.appendChild(todoActionsEl);

    todos_list.appendChild(todoEl);
  });
}

renderTodos();

addButton.addEventListener('click', (event) => {
  event.preventDefault();

  if (addInput.value === '') return console.log("You must provide a value");

  todos.push({
    content: addInput.value,
    isCompleted: false
  });

  renderTodos();

  addInput.value = '';
  addInput.focus();
});

function showDeletePopup(event) {
  selectedTodo = event.target.getAttribute('data-index');
  deleteModal.classList.add('open');
}

deleteModalCancelBtn.addEventListener('click', closeDeleteModal);

function closeDeleteModal() {
  deleteModal.classList.remove('open');
}

deleteModalConfirmBtn.addEventListener('click', handleDeleteTodo);

function handleDeleteTodo() {
  todos.splice(selectedTodo, 1);
  renderTodos();
  closeDeleteModal();
}

function showEditPopup(event) {
  selectedTodo = event.target.getAttribute('data-index');
  editModal.classList.add('open');
  editInput.value = todos[selectedTodo].content
  editInput.focus();
}

function closeEditModal() {
  editModal.classList.remove('open');
}

editModalCancelBtn.addEventListener('click', closeEditModal);

function saveTodo() {
  const newContent = editInput.value;
  todos[selectedTodo].content = newContent;
  closeEditModal();
  renderTodos();
}

editModalConfirmBtn.addEventListener('click', saveTodo);
