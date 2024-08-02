// Faça a lógica referente as tarefas aqui!

const addBtn = document.getElementById("add-task");
const taskList = document.getElementById("tasks");
const taskInput = document.getElementById("new-task");

taskInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        event.preventDefault();
        addBtn.click();
    }
});

// Adiciona a tarefa ao clicar no botão
document.getElementById("add-task").addEventListener("click", () => {
    const taskInput = document.getElementById("new-task");
    const taskContent = taskInput.value.trim();
    if (taskContent) {
        addTask(taskContent);
        taskInput.value = "";
    }
});

// Função para adicionar uma nova tarefa
function addTask(taskContent) {
    const taskList = document.querySelector(".tasks-list ol");
    const task = document.createElement("li");
    
    task.innerHTML = `${taskContent} <img class="delete-btn" src="./assets/images/trash.svg" alt="Delete Task">`;
    taskList.appendChild(task);

    // Salva as tarefas no localStorage
    saveTasks();
    updateListeners(); // Atualiza os listeners de exclusão
}

// Função para adicionar listeners aos botões de exclusão
function addDeleteListeners() {
    const delBtns = document.querySelectorAll(".delete-btn");
    delBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            const taskSelected = btn.closest('li');
            if (taskSelected) {
                taskSelected.remove();
                saveTasks(); // Salva a lista atualizada
            }
        });
    });
}


