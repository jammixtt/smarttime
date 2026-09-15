const form = document.getElementById("taskForm");
const taskList = document.getElementById("taskList");

const username = localStorage.getItem("currentUser");

if (!username) {
    window.location.href = "login.html";
}

const taskKey = "tasks_" + username;

let tasks = JSON.parse(localStorage.getItem(taskKey)) || [];

form.addEventListener("submit", function(event) {

    event.preventDefault();

    const task = {
        name: document.getElementById("taskName").value,
        subject: document.getElementById("subject").value,
        date: document.getElementById("dueDate").value,
        priority: document.getElementById("priority").value,
        completed: false
    };

    tasks.push(task);

    saveTasks();

    form.reset();

    showTasks();
});

function saveTasks() {

    localStorage.setItem(
        taskKey,
        JSON.stringify(tasks)
    );
}

function showTasks() {

    taskList.innerHTML = "";

    tasks.forEach(function(task, index) {

        const div = document.createElement("div");

        div.className = "task";

        if (task.completed) {
            div.classList.add("completed");
        }

        div.innerHTML = `
            <p>งาน: ${task.name}</p>
            <p>วิชา: ${task.subject}</p>
            <p>วันส่ง: ${task.date}</p>
            <p>ความสำคัญ: ${task.priority}</p>

            <button onclick="completeTask(${index})">
                ${task.completed ? "ยกเลิก" : "เสร็จแล้ว"}
            </button>

            <button onclick="deleteTask(${index})">
                ลบ
            </button>
        `;

        taskList.appendChild(div);
    });
}

function completeTask(index) {

    tasks[index].completed = !tasks[index].completed;

    saveTasks();

    showTasks();
}

function deleteTask(index) {

    tasks.splice(index, 1);

    saveTasks();

    showTasks();
}

function checkReminder() {

    const today = new Date();

    today.setHours(0, 0, 0, 0);

    tasks.forEach(function(task) {

        if (task.completed) return;

        const dueDate = new Date(task.date);

        dueDate.setHours(0, 0, 0, 0);

        const difference = dueDate - today;

        const daysLeft =
            difference / (1000 * 60 * 60 * 24);

        if (daysLeft >= 0 && daysLeft <= 1) {

            alert(
                "Smart Time\nใกล้ถึงกำหนดส่งงาน: " +
                task.name
            );

        }
    });
}

showTasks();

checkReminder();