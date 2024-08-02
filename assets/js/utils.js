// Use esse arquivo para criar funções utilitárias

function saveTasks() {
    const tasks = Array.from(document.querySelectorAll(".tasks-list ol li")).map(li => li.innerHTML);
    localStorage.setItem("tasks", JSON.stringify(tasks));
};

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const taskList = document.querySelector(".tasks-list ol");

    tasks.forEach(taskHTML => {
        const task = document.createElement("li");

        task.innerHTML = taskHTML;
        taskList.appendChild(task);
    });

    updateListeners();
};

// Função para atualizar os listeners
function updateListeners() {
    addDeleteListeners();
}

// Carrega as tarefas quando a página é carregada
window.addEventListener("DOMContentLoaded", loadTasks);