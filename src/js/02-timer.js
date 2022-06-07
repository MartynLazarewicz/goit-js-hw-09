import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

// Import of Notiflix library
import Notiflix from 'notiflix';
import 'notiflix/dist/notiflix-3.2.5.min.css';

// add helper class for querySelector

const qs = selector => document.querySelector(selector);

// Search for input and output elements
const startBtn = qs('button[data-start]');
const datepicker = qs('#datetime-picker');
const dataDays = qs('[data-days]');
const dataHours = qs('[data-hours]');
const dataMinutes = qs('[data-minutes]');
const dataSeconds = qs('[data-seconds]');

let timer = null;

disableBtn(startBtn);

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDate) {
    const currentDate = new Date();
    if (selectedDate[0] <= currentDate) {
      disableBtn(startBtn);
      Notiflix.Notify.failure('Please choose a date in the future');
    } else {
      unDisableBtn(startBtn);
    }
  },
};

flatpickr(datepicker, options);

startBtn.addEventListener('click', countdownTime);

function countdownTime() {
  timer = setInterval(() => {
    disableBtn(startBtn);

    const pickedDateMs = new Date(datepicker.value).getTime();
    const currentDateMs = new Date().getTime();
    const timeLeft = pickedDateMs - currentDateMs;

    const { days, hours, minutes, seconds } = convertMs(timeLeft);

    dataDays.innerHTML = Number(days).length < 2 ? addLeadingZero(days) : days;
    dataHours.innerHTML =
      Number(hours).length < 2 ? addLeadingZero(hours) : hours;
    dataMinutes.innerHTML =
      Number(minutes).length < 2 ? addLeadingZero(minutes) : minutes;
    dataSeconds.innerHTML =
      Number(seconds).length < 2 ? addLeadingZero(seconds) : seconds;

    if (timeLeft < 1000) {
      clearInterval(timer);
      unDisableBtn(startBtn);
    }
  }, 1000);
}

function addLeadingZero(value) {
  const stringValue = String(value);
  return stringValue.padStart(2, '0');
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function disableBtn(elem) {
  elem.disabled = true;
}

function unDisableBtn(elem) {
  elem.disabled = false;
}
