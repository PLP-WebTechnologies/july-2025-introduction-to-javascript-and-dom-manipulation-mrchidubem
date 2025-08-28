// Part 1: JavaScript Basics - Variables and Conditionals
// Variable to count tasks
let taskCount = 0;

// Part 2: JavaScript Functions - Reusable code
// Function to add a new task
function addTask() {
  // Get the input field and its value
  const input = document.getElementById("taskInput");
  const taskText = input.value;

  // Check if input is empty (conditional)
  if (taskText === "") {
    alert("Please enter a task!");
    return; // Stop if empty
  }

  // Get the task list
  const taskList = document.getElementById("taskList");
  
  // Create a new list item
  const li = document.createElement("li");
  li.innerHTML = `
    <input type="checkbox" onclick="toggleDone(this)">
    <span>${taskText}</span>
  `;
  
  // Add the list item to the task list
  taskList.appendChild(li);
  
  // Increase task count
  taskCount++;
  
  // Clear the input field
  input.value = "";
}

// Function to mark a task as done or not
function toggleDone(checkbox) {
  // Get the text next to the checkbox
  const taskText = checkbox.nextElementSibling;
  
  // If checkbox is checked, mark as done; otherwise, remove done style
  if (checkbox.checked) {
    taskText.classList.add("done");
  } else {
    taskText.classList.remove("done");
  }
}

// Function to clear all completed tasks
function clearDoneTasks() {
  // Get the task list
  const taskList = document.getElementById("taskList");
  
  // Get all list items
  const tasks = taskList.getElementsByTagName("li");
  
  // Part 3: JavaScript Loops - Loop through tasks
  // Loop backward to avoid issues when removing items
  for (let i = tasks.length - 1; i >= 0; i--) {
    // Check if the task's checkbox is checked
    const checkbox = tasks[i].querySelector("input[type='checkbox']");
    if (checkbox.checked) {
      // Remove the task
      taskList.removeChild(tasks[i]);
      // Decrease task count
      taskCount--;
    }
  }
}

// Part 4: DOM Manipulation - Add interactivity
// DOM Interaction 1: Add task when pressing Enter key
document.getElementById("taskInput").addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    addTask(); // Call addTask function
  }
});

// DOM Interaction 2: Alert total tasks when page loads
document.addEventListener("DOMContentLoaded", function() {
  alert("Welcome! You have " + taskCount + " tasks.");
});

// DOM Interaction 3: Update task count display
function showTaskCount() {
  // Create or update a paragraph to show task count
  let counter = document.getElementById("taskCounter");
  if (!counter) {
    counter = document.createElement("p");
    counter.id = "taskCounter";
    document.querySelector(".container").appendChild(counter);
  }
  counter.textContent = "Tasks: " + taskCount;
}

// Call showTaskCount after adding or clearing tasks
const originalAddTask = addTask;
addTask = function() {
  originalAddTask();
  showTaskCount();
};

const originalClearDoneTasks = clearDoneTasks;
clearDoneTasks = function() {
  originalClearDoneTasks();
  showTaskCount();
};

// Initialize task count display on page load
showTaskCount();