// script.js

// Select elements
const taskInput = document.getElementById('task-input');
const addTaskBtn = document.getElementById('add-task-btn');
const taskList = document.getElementById('task-list');

// Event listeners
addTaskBtn.addEventListener('click', addTask);
taskList.addEventListener('click', handleTaskClick);
document.addEventListener('DOMContentLoaded', loadTasksFromStorage);

// Functions
function addTask() {
  const taskText = taskInput.value.trim();
  if (!taskText) {
    alert('Please enter a task!');
    return;
  }

  const taskItem = createTaskItem(taskText);
  taskList.appendChild(taskItem);
  saveTaskToStorage(taskText);
  taskInput.value = '';
}

function handleTaskClick(e) {
  if (e.target.tagName === 'BUTTON') {
    const taskItem = e.target.parentElement;
    removeTaskFromStorage(taskItem.textContent);
    taskItem.remove();
  } else if (e.target.tagName === 'LI') {
    e.target.classList.toggle('completed');
  }
}

function createTaskItem(taskText) {
  const taskItem = document.createElement('li');
  taskItem.className = 'task-item';
  taskItem.textContent = taskText;

  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = 'Delete';
  taskItem.appendChild(deleteBtn);

  return taskItem;
}

function saveTaskToStorage(task) {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.push(task);
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasksFromStorage() {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.forEach((task) => {
    const taskItem = createTaskItem(task);
    taskList.appendChild(taskItem);
  });
}

function removeTaskFromStorage(task) {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  const updatedTasks = tasks.filter((t) => t !== task);
  localStorage.setItem('tasks', JSON.stringify(updatedTasks));
}
