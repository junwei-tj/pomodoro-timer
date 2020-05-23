function startTimer(minutes, seconds) {
    const display = document.querySelector(".timer");

    let duration = minutes * 60 + seconds;
    let timer = setInterval(function() {
        let minutes = parseInt(duration / 60, 10); // get minutes and round to nearest int
        let seconds = parseInt(duration % 60, 10); // get seconds and round to nearest int

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;
        display.textContent = minutes + ":" + seconds;
        console.log(minutes + ":" + seconds);
        duration -= 1;
        
        if (duration < 0) {
            clearInterval(timer);
        }
    }, 1000);
}

function buttonPressed(button, controlButtons) {
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

const controlButtons = document.querySelectorAll(".control-buttons");
controlButtons.forEach(button => button.addEventListener("click", function() {
    buttonPressed(button, controlButtons);
}));

startTimer(0, 5);
