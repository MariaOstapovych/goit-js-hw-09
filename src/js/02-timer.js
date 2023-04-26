import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

import Notiflix from 'notiflix';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const datetimePicker = document.querySelector("#datetime-picker");
const startButton = document.querySelector('button[data-start]');
const days = document.querySelector('.value[data-days]');
const hours = document.querySelector('.value[data-hours]');
const minutes = document.querySelector('.value[data-minutes]');
const seconds = document.querySelector('.value[data-seconds]');

startButton.setAttribute("disabled", "true");


const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];
    const currentDate = new Date();
    if (selectedDate < currentDate) {
        Notiflix.Notify.failure("Please choose a date in the future");
        return;
    } 
    startButton.removeAttribute("disabled", "true");
  }
};

flatpickr(datetimePicker, options);


startButton.addEventListener("click", () => { 
  const targetDate = new Date(datetimePicker.value)
  startButton.setAttribute("disabled", "true");
    const timer = setInterval(() => {
        const now = new Date();
        const timeInSeconds = targetDate.getTime() - now.getTime();
        const timeLeft = convertMs(timeInSeconds);
        console.log(timeLeft);
   
        days.textContent = addLeadingZero(timeLeft.days);
        hours.textContent = addLeadingZero(timeLeft.hours);
        minutes.textContent = addLeadingZero(timeLeft.minutes);
        seconds.textContent = addLeadingZero(timeLeft.seconds);

        
        if (timeInSeconds < 0) {
            clearInterval(timer);
            days.textContent = '00';
            hours.textContent = '00';
            minutes.textContent = '00';
            seconds.textContent = '00';
        }
    }, 1000)
})


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

function addLeadingZero(value) {
return value.toString().padStart(2, '0');
}