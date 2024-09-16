// Faça a lógica referente o cronômetro!
document.title = document.querySelector(".active-button").textContent;

const startBtn = document.getElementById('start');
const counter = document.getElementById("counter");

const modalityBtn = document.querySelectorAll('.modality');

let varPomodoroTimes = 0;
const pomodoroTimes = document.getElementById("pomodoro-times__number");

const audioAlarm = document.getElementById('alarm');
const audioClick = document.getElementById("clickSound");

let timer;
let isRunning = false;
let remainingTime = 0;

startBtn.addEventListener("click", () => {
    audioClick.play();
    if (isRunning) {
        clearInterval(timer);
        isRunning = false;
        startBtn.textContent = "Iniciar";
    } else {
        audioAlarm.pause();
        audioAlarm.currentTime = 0;

        let mode = document.querySelector(".active-button").textContent;

        if (remainingTime == 0) {
            remainingTime = selectModeTime(mode);
        } 
        startBtn.textContent = "Pausar";
        isRunning = true;
        startCounter(remainingTime);
    }
    startBtn.classList.toggle("toggle");
});

modalityBtn.forEach(button => {
    button.addEventListener("click", () => {
        document.title = button.textContent

        modalityBtn.forEach(buttonRm => {
            buttonRm.classList.remove("active-button");
        })
        button.classList.add("active-button");

        let mode = document.querySelector(".active-button").textContent;
        remainingTime = selectModeTime(mode);
        clearInterval(timer);
        isRunning = false;

        startBtn.textContent = "Iniciar";
        startBtn.classList.remove("toggle");

        let [minute, seconds] = updateCounter(remainingTime);
        counter.textContent = minute + ":" + seconds;
    });
});


function updateCounter(time) {
    let minutes = Math.floor(time / 60);
    let seconds = time % 60;
    let formattedSeconds = seconds.toString().padStart(2, '0');
    return [minutes, formattedSeconds, time - 1];
};

function selectModeTime(mode) {
    switch (mode.toLowerCase()) {
        case 'pomodoro':
            return duration = 25 * 60;
        case 'intervalo curto':
            return duration = 5 * 60;
        case 'intervalo longo':
            return duration = 15 * 60;
        default:
            console.log("[ERRO] Modo Desconhecido");
            return null;
    }
}

function startCounter(time) {
    let actualTime = time;

    timer = setInterval(() => {
        if (actualTime <= 0) {
            clearInterval(timer);
            counter.textContent = "00:00";
            isRunning = false;
            startBtn.textContent = "Iniciar";
            startBtn.classList.remove("toggle");

            audioAlarm.play();

            if (document.title === "Pomodoro") {
                varPomodoroTimes ++;
                pomodoroTimes.textContent = `${varPomodoroTimes}`;
            } 
            return;
        } 

        let [minutes, seconds, newTime] = updateCounter(actualTime);

        counter.textContent = minutes + ":" + seconds;
        actualTime = newTime;
        remainingTime = newTime;
        }, 1000);
    return;
}