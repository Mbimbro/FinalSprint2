class TaskManager {
  constructor() {
      this.tasks = [];
      this.currentId = 1;
  }

  addTask(name, description, assignedTo, dueDate, status) {
      this.tasks.push({
          id: this.currentId++,
          name: name,
          description: description,
          assignedTo: assignedTo,
          dueDate: dueDate,
          status: status,
      });
  }

  deleteTask(id) {
      const taskIndex = this.tasks.findIndex(task => task.id === id);
      if (taskIndex !== -1) {
          this.tasks.splice(taskIndex, 1);
      }
  }

  updateTask(id, updatedTask) {
      const task = this.tasks.find(task => task.id === id);
      if (task) {
          task.name = updatedTask.name;
          task.description = updatedTask.description;
          task.assignedTo = updatedTask.assignedTo;
          task.dueDate = updatedTask.dueDate;
          task.status = updatedTask.status;
      }
  }

  render() {
      const taskListContainer = document.getElementById('task-list');
      taskListContainer.innerHTML = '';

      this.tasks.forEach(task => {
          const row = document.createElement('tr');
          row.innerHTML = `
  <td>${task.name}</td>
  <td>${task.description}</td>
  <td>${task.assignedTo}</td>
  <td>${task.dueDate}</td>
  <td>${task.status}</td>
  <td>
    <button class="edit-button" data-task-id="${task.id}">Edit</button>
    <button class="delete-button" data-task-id="${task.id}">Delete</button>
  </td>
`;

          taskListContainer.appendChild(row);
      });
  }
}

const taskManager = new TaskManager();

const taskForm = document.getElementById('task-form');
const addTaskButton = document.getElementById('add-task-btn');
const updateTaskButton = document.getElementById('update-task-btn');
const cancelUpdateButton = document.getElementById('cancel-update-btn');
const taskListContainer = document.getElementById('task-list');

let isEditMode = false;
let currentTaskId = null;

function resetForm() {
  taskForm.reset();
  isEditMode = false;
  currentTaskId = null;
  updateTaskButton.style.display = 'none';
  cancelUpdateButton.style.display = 'none';
  addTaskButton.style.display = 'block';
}

function addTask(event) {
  event.preventDefault();

  const nameInput = document.getElementById('task-name');
  const descriptionInput = document.getElementById('task-description');
  const assignedToInput = document.getElementById('assigned-to');
  const dueDateInput = document.getElementById('due-date');
  const statusInput = document.getElementById('status');

  const name = nameInput.value.trim();
  const description = descriptionInput.value.trim();
  const assignedTo = assignedToInput.value.trim();
  const dueDate = dueDateInput.value;
  const status = statusInput.value;

  if (name === '' || name.length > 8) {
      alert('Task Name must not be empty and should not exceed 8 characters.');
      return;
  } else if (description === '' || description.length > 15) {
      alert('Add some relevant description and not longer than 15 characters.');
      return;
  } else if (assignedTo === '' || assignedTo.length > 8) {
      alert('Assigned To field must not be empty and should not exceed 8 characters.');
      return;
  }

  if (isEditMode) {
      taskManager.updateTask(currentTaskId, { name, description, assignedTo, dueDate, status });
  } else {
      taskManager.addTask(name, description, assignedTo, dueDate, status);
  }

  resetForm();
  taskManager.render();
}

//update task

function updateTask() {
  const nameInput = document.getElementById('task-name');
  const descriptionInput = document.getElementById('task-description');
  const assignedToInput = document.getElementById('assigned-to');
  const dueDateInput = document.getElementById('due-date');
  const statusInput = document.getElementById('status');

  const name = nameInput.value.trim();
  const description = descriptionInput.value.trim();
  const assignedTo = assignedToInput.value.trim();
  const dueDate = dueDateInput.value;
  const status = statusInput.value;

  if (name === '' || name.length > 8) {
      alert('Task Name must not be empty and should not exceed 8 characters.');
      return;
  } else if (description === '' || description.length > 15) {
      alert('Add some relevant description and not longer than 15 characters.');
      return;
  } else if (assignedTo === '' || assignedTo.length > 8) {
      alert('Assigned To field must not be empty and should not exceed 8 characters.');
      return;
  }

  const updatedTask = {
      name: name,
      description: description,
      assignedTo: assignedTo,
      dueDate: dueDate,
      status: status,
  };

  taskManager.updateTask(currentTaskId, updatedTask);
  resetForm();
  taskManager.render();
}

function editTask(taskId) {
  const task = taskManager.tasks.find(task => task.id === taskId);
  if (task) {
      const nameInput = document.getElementById('task-name');
      const descriptionInput = document.getElementById('task-description');
      const assignedToInput = document.getElementById('assigned-to');
      const dueDateInput = document.getElementById('due-date');
      const statusInput = document.getElementById('status');

      nameInput.value = task.name;
      descriptionInput.value = task.description;
      assignedToInput.value = task.assignedTo;
      dueDateInput.value = task.dueDate;
      statusInput.value = task.status;

      isEditMode = true;
      currentTaskId = taskId;

      updateTaskButton.style.display = 'block';
      cancelUpdateButton.style.display = 'block';
      addTaskButton.style.display = 'none';
  }
}

function deleteTask(taskId) {
  taskManager.deleteTask(taskId);
  resetForm();
  taskManager.render();
}

taskForm.addEventListener('submit', addTask);

taskListContainer.addEventListener('click', function (event) {
  const target = event.target;

  if (target.classList.contains('edit-button')) {
      const taskId = parseInt(target.getAttribute('data-task-id'));
      editTask(taskId);
  } else if (target.classList.contains('delete-button')) {
      const taskId = parseInt(target.getAttribute('data-task-id'));
      deleteTask(taskId);
  }
});

cancelUpdateButton.addEventListener('click', function () {
  resetForm();
});
updateTaskButton.addEventListener('click', updateTask);

taskManager.render();

