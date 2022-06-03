const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');
const body = document.querySelector('body');
let timerId = null;

stopBtn.disabled = true;

startBtn.addEventListener('click', () => {
  if ((startBtn.disabled = true)) {
    stopBtn.disabled = false;
  }
  timerId = setInterval(() => {
    body.style.backgroundColor = getRandomHexColor();
  }, 1000);
});

stopBtn.addEventListener('click', () => {
  if ((stopBtn.disabled = true)) {
    startBtn.disabled = false;
  }
  clearInterval(timerId);
});

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
