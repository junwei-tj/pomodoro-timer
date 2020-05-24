function buttonPressed(button) {
    // "holds" pressed button down while keeping other buttons "up"
    // resets all other buttons then "presses" passed in button
    controlButtons.forEach(eachButton => {
        if (eachButton !== button) {
            eachButton.style.boxShadow = "0px 6px rgb(235, 235, 235)";
            eachButton.style.transform = "translateY(0px)";
        }       
    });
    button.style.boxShadow = "0px 0px";
    button.style.transform = "translateY(6px)";
}

function displayCurrentSession() {
    sessions.forEach(session => {
        session.style.backgroundColor = "rgba(0, 0, 0, 0)"; 
    });
    sessions[timerStats.currentSession].style.backgroundColor = "rgba(0, 0, 0, 0.25)";
    resetTimer();
}

function newTimer() {    
    durationInSeconds -= 1; // deduct at the start as function is first called after 1000ms
    let minutes = parseInt(durationInSeconds / 60, 10); // get minutes and round to nearest int
    let seconds = parseInt(durationInSeconds % 60, 10); // get seconds and round to nearest int

    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;
    display.textContent = minutes + ":" + seconds;
    console.log(minutes + ":" + seconds);

    if (durationInSeconds <= 0) {
        clearInterval(timer);
        updateCount();
        nextSession();
        displayCurrentSession();
        buttonPressed(null);
    }
}

function stopTimer() {
    clearInterval(timer);
}

function resetTimer() {
    switch (timerStats.currentSession) {
        case 0:
            durationInSeconds = pomodoroDuration;
            break;
        case 1:
            durationInSeconds = shortBreakDuration;
            break;
        case 2:
            durationInSeconds = longBreakDuration;
            break;
        default:
            console.log("Error: resetTimer()");
            break;
    }
    let durationInMinutes = durationInSeconds/60;
    display.textContent = `${durationInMinutes < 10 ? "0"+durationInMinutes : durationInMinutes}:00`;
}

function updateCount() {
    switch (timerStats.currentSession) {
        case 0:
            timerStats.pomodoros += 1;
            const pomodoroCounter = document.querySelector("#pomodoro-counter");
            pomodoroCounter.textContent = timerStats.pomodoros;
            break;
        case 1:
            timerStats.shortBreaks += 1;
            break;
        case 2:
            timerStats.longBreaks += 1;
            break;
        default:
            console.log("Error: updateCount()");
            break;
    }
}

function nextSession() {
    switch (timerStats.currentSession) {
        case 0:
            if (timerStats.pomodoros > 0 && timerStats.pomodoros % 4 == 0) {
                timerStats.currentSession = 2;
            } else {
                timerStats.currentSession = 1;
            }
            break;
        case 1:
        case 2:
            timerStats.currentSession = 0;
            break;
        default:
            console.log("Error: nextSession()");
            break;
    }
}

function forceChosenSession(session) {
    switch (session.id) {
        case "pomodoro":
            timerStats.currentSession = 0;
            break;
        case "short-break":
            timerStats.currentSession = 1;
            break;
        case "long-break":
            timerStats.currentSession = 2;
            break;
    }
    stopTimer()
    displayCurrentSession();
}

const display = document.querySelector(".timer");
const sessions = document.querySelectorAll(".session-buttons");
let timerStats = {
    pomodoros: 0,
    shortBreaks: 0,
    longBreaks: 0,
    currentSession: 0,
}
sessions[timerStats.currentSession].style.backgroundColor = "rgba(0, 0, 0, 0.25)"; // initialize current session as pomodoro
sessions.forEach(session => session.addEventListener("click", () => {
    forceChosenSession(session);
}));

const controlButtons = document.querySelectorAll(".control-buttons");
controlButtons.forEach(button => button.addEventListener("click", function() {
    buttonPressed(button);
}));

let pomodoroDuration = 25*60;
let shortBreakDuration = 5*60;
let longBreakDuration = 15*60;
const saveButton = document.querySelector("#save-button");
saveButton.addEventListener("click", () => {
    pomodoroDuration = Number(document.querySelector("#pomodoro-duration").value) * 60;
    shortBreakDuration = Number(document.querySelector("#short-break-duration").value) * 60;
    longBreakDuration = Number(document.querySelector("#long-break-duration").value) * 60;
    alert("Saved");
    resetTimer();
})

let durationInSeconds;
let timer;
const startButton = document.querySelector("#start-button");
startButton.addEventListener("click", () => {
    switch (timerStats.currentSession) {
        case 0:
        default:
            durationInSeconds = pomodoroDuration;
            break;
        case 1:
            durationInSeconds = shortBreakDuration;
            break;
        case 2:
            durationInSeconds = longBreakDuration;
            break;
    }
    timer = setInterval(newTimer, 1000);
})
const stopButton = document.querySelector("#stop-button");
stopButton.addEventListener("click", stopTimer);
const resetButton = document.querySelector("#reset-button");
resetButton.addEventListener("click", resetTimer);