import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

//Refs
const refs = {
  inputData: document.querySelector('#datetime-picker'),
  btnStart: document.querySelector('[data-start]'),
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0].getTime() - Date.now() < 0) {
      Notify.failure('Please choose a date in the future');
    } else {
      btnDisabled(false);
    }
  },
};

const flatPickr = flatpickr(refs.inputData, options);

//Listener
refs.btnStart.addEventListener('click', onBtnStartClick);

//Functions
function onBtnStartClick() {
  const timerId = setInterval(() => {
    const deltaTime = flatPickr.selectedDates[0].getTime() - Date.now();

    if (deltaTime < 1000) {
      clearInterval(timerId);
      return;
    }
    const convertTime = convertMs(deltaTime);
    updateTime(convertTime);
    btnDisabled(true);
  }, 1000);
}

function updateTime({ days, hours, minutes, seconds }) {
  refs.days.textContent = days;
  refs.hours.textContent = hours;
  refs.minutes.textContent = minutes;
  refs.seconds.textContent = seconds;
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;
  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function btnDisabled(val) {
  refs.btnStart.disabled = val;
}
