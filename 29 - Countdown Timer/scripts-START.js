const timerDisplay = document.querySelector('.display__time-left');
const endTime = document.querySelector('.display__end-time');
const buttons = document.querySelectorAll('[data-time]');

let countdown;

function timer(seconds) {
    const now = Date.now();
    const then = now + seconds * 1000;

    clearInterval(countdown);
    displayTimeLeft(seconds);
    displayEndTime(then);

    countdown = setInterval(function() {
        const secondsLeft = Math.round((then - Date.now()) / 1000);

        if (secondsLeft < 0) {
            clearInterval(countdown);
            return;
        }

        displayTimeLeft(secondsLeft);
    }, 1000);
}

function displayTimeLeft(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    const display = `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;

    timerDisplay.textContent = display;
    document.title = display;
}

function displayEndTime(timestamp) {
    const end = new Date(timestamp);
    const hour = end.getHours();
    const minutes = end.getMinutes();
    endTime.textContent = `Be back at ${hour > 12 ? hour - 12 : hour}:${minutes < 10 ? '0' : ''}${minutes}`;
}

function startTimer() {
    timer(parseInt(this.dataset.time));
}

function formSubmit(e) {
    e.preventDefault();

    const mins = this.minutes.value;

    this.reset();
    timer(mins * 60);
}

buttons.forEach(b => b.addEventListener('click', startTimer));
document.customForm.addEventListener('submit', formSubmit);
