const refs = {
  body: document.querySelector('body'),
  buttonStart: document.querySelector('button[data-start]'),
  buttonStop: document.querySelector('button[data-stop]'),
};
let intervalId = null;

refs.buttonStart.addEventListener('click', onStartHandler);
refs.buttonStop.addEventListener('click', onStopHandler);

function onButtonStopDisable() {
  refs.buttonStop.disabled = true;
}
onButtonStopDisable();

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, '0')}`;
}

function onStartHandler() {
  intervalId = setInterval(onBodyColorChange, 1000);
  refs.buttonStart.disabled = true;
  refs.buttonStop.disabled = false;
}

function onStopHandler() {
  clearInterval(intervalId);
  refs.buttonStart.disabled = false;
  onButtonStopDisable();
}

function onBodyColorChange() {
  refs.body.style.background = getRandomHexColor();
}
