  // TaskManager class for managing tasks
  class TaskManager {
    constructor() {
      this.tasks = [];
      this.currentId = 0;
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
  }
  const taskManager = new TaskManager();
  let currentTaskId = null; // Variable to store the ID of the currently selected task

  // Function to handle form submission
  function addTask(event) {
    event.preventDefault();

    // Get the form input values
    const nameInput = document.getElementById('task-name');
    const descriptionInput = document.getElementById('task-description');
    const assignedToInput = document.getElementById('assigned-to');
    const dueDateInput = document.getElementById('due-date');
    const statusInput = document.getElementById('status');

    // Validate the form input values
    // Code for validation...
    const name = nameInput.value.trim();
    const description = descriptionInput.value.trim();
    const assignedTo = assignedToInput.value.trim();
  
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
    if (currentTaskId === null) {
      // Add a new task
      taskManager.addTask(
        nameInput.value,
        descriptionInput.value,
        assignedToInput.value,
        dueDateInput.value,
        statusInput.value
      );
    } else {
      // Update an existing task
      taskManager.updateTask(
        currentTaskId,
        nameInput.value,
        descriptionInput.value,
        assignedToInput.value,
        dueDateInput.value,
        statusInput.value
      );

      // Reset the current task ID
      currentTaskId = null;
    }

    // Clear the form inputs
    nameInput.value = '';
    descriptionInput.value = '';
    assignedToInput.value = '';
    dueDateInput.value = '';
    statusInput.value = 'todo';

    // Change the button to "Add Task" mode
    document.getElementById('add-task-btn').style.display = 'block';
    document.getElementById('update-task-btn').style.display = 'none';

    // Render the tasks
    taskManager.render();
  }

  // Function to edit a task
  function editTask(taskId) {
    // Find the task in the task manager
    const task = taskManager.getTaskById(taskId);

    // Update the form inputs with task details
    document.getElementById('task-name').value = task.name;
    document.getElementById('task-description').value = task.description;
    document.getElementById('assigned-to').value = task.assignedTo;
    document.getElementById('due-date').value = task.dueDate;
    document.getElementById('status').value = task.status;

    // Set the current task ID
    currentTaskId = taskId;

    // Change the button to "Update Task" mode
    document.getElementById('add-task-btn').style.display = 'none';
    document.getElementById('update-task-btn').style.display = 'block';
  }

  // Function to delete a task
  function deleteTask(taskId) {
    taskManager.deleteTask(taskId);

    // Render the tasks
    taskManager.render();
  }

  // Add event listeners for edit and delete buttons
  document.getElementById('task-list').addEventListener('click', function(event) {
    const target = event.target;

    if (target.classList.contains('edit-button')) {
      const taskId = target.getAttribute('data-task-id');
      editTask(parseInt(taskId));
    } else if (target.classList.contains('delete-button')) {
      const taskId = target.getAttribute('data-task-id');
      deleteTask(parseInt(taskId));
    }
  });
