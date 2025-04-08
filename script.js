function timer(time, container) {
    const minutes = Math.floor(time / 60); // Calculate minutes
    const seconds = time % 60; // Calculate remaining seconds
    container.textContent = `${minutes}:${seconds.toString()}`;
}

function pomodoro(container, timeGiven) {
    let time = timeGiven; // 25 minutes in seconds
    const interval = setInterval(() => {
        if (time <= 0) {
            clearInterval(interval); // Stop the timer when it reaches 0
            return;
        }
        time -= 1;
        timer(time, container);
    }, 1000); // Interval time should be a number
    return interval
}

function initializePomodoro() {
    const clock = document.getElementById("clock");
    const startBtn = document.getElementById("startBtn");
    const stopBtn = document.getElementById("stopBtn");
    const resetBtn = document.getElementById("resetBtn");
    let time = 1500;
    let interval = null; // Declare `interval` as a local variable

    startBtn.addEventListener("click", () => {
        if (!interval) { // Prevent multiple intervals from being created
            interval = pomodoro(clock, time);
        }
    });

    stopBtn.addEventListener("click", () => {
        if(interval){
            clearInterval(interval); // Stop the timer
            interval = null;

            const [minutes, seconds] = clock.textContent.split(":").map(Number);
            time = minutes * 60 + seconds; // Convert back to seconds
        }
    })

    resetBtn.addEventListener("click", () => {
        clearInterval(interval);
        interval = null; // Reset the interval
        time = 1500
        clock.textContent = "25:00"; // Reset to initial time
    });
}
initializePomodoro()