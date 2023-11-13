import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Report } from 'notiflix/build/notiflix-report-aio';
// import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  btnStart: document.querySelector('button[data-start]'),
  days: document.querySelector('.value[data-days]'),
  hours: document.querySelector('.value[data-hours]'),
  minutes: document.querySelector('.value[data-minutes]'),
  seconds: document.querySelector('.value[data-seconds]'),
};
onBtnStartDisable();

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];
    const currentDate = new Date();
    console.log(selectedDates[0]);

    if (currentDate > selectedDate) {
      onBtnStartDisable();
      Report.warning('Please, choose a date in the future!');
    } else {
      onBtnStartRemoveDisable();
    }
  },
};

const datePicker = flatpickr('#datetime-picker', options);

refs.btnStart.addEventListener('click', onBtnClickHendler);
function onBtnClickHendler() {
  onBtnStartDisable();
  Report.success('Timer started!)');
  const timerId = setInterval(() => {
    const datePicked = datePicker.selectedDates[0];
    const currentDate = new Date();
    const timeLeft = datePicked - currentDate;
    const timeLeftConverted = convertMs(timeLeft);

    refs.days.textContent = addFirstZero(timeLeftConverted.days);
    refs.hours.textContent = addFirstZero(timeLeftConverted.hours);
    refs.minutes.textContent = addFirstZero(timeLeftConverted.minutes);
    refs.seconds.textContent = addFirstZero(timeLeftConverted.seconds);

    if (timeLeft < 1000) {
      clearInterval(timerId);
      Report.success("It's time!");
    }
  }, 1000);
}

function onBtnStartDisable() {
  refs.btnStart.disabled = true;
}
function onBtnStartRemoveDisable() {
  refs.btnStart.disabled = false;
}

function addFirstZero(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
