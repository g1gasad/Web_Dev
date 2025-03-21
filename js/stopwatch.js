document.addEventListener('DOMContentLoaded', function() {
    const display = document.getElementById('display');
    const startStopButton = document.getElementById('startStop');
    const resetButton = document.getElementById('reset');

    let startTime;
    let elapsedTime = 0;
    let timerInterval;
    let isRunning = false;

    function formatTime(milliseconds) {
        let seconds = Math.floor(milliseconds / 1000);
        let minutes = Math.floor(seconds / 60);
        let hours = Math.floor(minutes / 60);

        hours = hours % 24;
        minutes = minutes % 60;
        seconds = seconds % 60;

        return (
            (hours < 10 ? '0' : '') + hours + ':' +
            (minutes < 10 ? '0' : '') + minutes + ':' +
            (seconds < 10 ? '0' : '') + seconds
        );
    }

    function updateDisplay() {
        display.textContent = formatTime(elapsedTime);
    }

    function startStop() {
        if (isRunning) {
            clearInterval(timerInterval);
            elapsedTime += Date.now() - startTime;
            startStopButton.textContent = 'Start';
        } else {
            startTime = Date.now();
            timerInterval = setInterval(() => {
                elapsedTime += Date.now() - startTime;
                startTime = Date.now();
                updateDisplay();
            }, 10);
            startStopButton.textContent = 'Stop';
        }
        isRunning = !isRunning;
    }

    function reset() {
        clearInterval(timerInterval);
        elapsedTime = 0;
        updateDisplay();
        isRunning = false;
        startStopButton.textContent = 'Start';
    }

    startStopButton.addEventListener('click', startStop);
    resetButton.addEventListener('click', reset);
});