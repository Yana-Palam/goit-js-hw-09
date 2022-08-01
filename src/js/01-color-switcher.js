//Refs
const refs = {
  btnStart: document.querySelector('[data-start]'),
  btnStop: document.querySelector('[data-stop]'),
};
let timerId = null;

//Listener
refs.btnStart.addEventListener('click', onBtnStart);
refs.btnStop.addEventListener('click', onBtnStop);

//Functions
function onBtnStart() {
  refs.btnStart.disabled = true;
  timerId = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
}
function onBtnStop() {
  refs.btnStart.disabled = false;
  clearInterval(timerId);
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
