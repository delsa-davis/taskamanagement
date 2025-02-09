document.addEventListener("DOMContentLoaded", function () {
    const taskList = document.getElementById("taskList");
    const taskInput = document.getElementById("taskInput");
    const addButton = document.querySelector(".add-btn");

    // Load tasks from local storage when the page loads
    loadTasks();

    function addTask() {
        let taskText = taskInput.value.trim();
        if (taskText === "") {
            alert("Please enter a task!");
            return;
        }

        // Create task object
        let task = { text: taskText, completed: false };

        // Add task to UI and save to local storage
        addTaskToUI(task);
        saveTask(task);

        // Clear input field
        taskInput.value = "";
    }

    function addTaskToUI(task) {
        let li = document.createElement("li");

        // Create checkbox
        let checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.classList.add("task-checkbox");
        checkbox.checked = task.completed;

        // Toggle completed state when checkbox is clicked
        checkbox.addEventListener("change", function () {
            task.completed = checkbox.checked;
            updateLocalStorage();
            taskTextSpan.classList.toggle("completed", task.completed);
        });

        // Create task text span
        let taskTextSpan = document.createElement("span");
        taskTextSpan.textContent = task.text;
        if (task.completed) {
            taskTextSpan.classList.add("completed");
        }

        // Create delete button
        let deleteBtn = document.createElement("button");
        deleteBtn.classList.add("delete-btn");
        deleteBtn.textContent = "X";

        // Remove task when clicking delete button
        deleteBtn.addEventListener("click", function () {
            li.remove();
            removeTask(task);
        });

        // Append elements to the list item
        li.appendChild(checkbox);
        li.appendChild(taskTextSpan);
        li.appendChild(deleteBtn);
        taskList.appendChild(li);
    }

    function saveTask(task) {
        let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        tasks.push(task);
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    function loadTasks() {
        let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        tasks.forEach(addTaskToUI);
    }

    function removeTask(taskToRemove) {
        let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        tasks = tasks.filter(task => task.text !== taskToRemove.text);
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    function updateLocalStorage() {
        let tasks = [];
        document.querySelectorAll("#taskList li").forEach(li => {
            let checkbox = li.querySelector("input");
            let taskText = li.querySelector("span").textContent;
            tasks.push({ text: taskText, completed: checkbox.checked });
        });
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    // Attach event listener to the button
    addButton.addEventListener("click", addTask);
});
