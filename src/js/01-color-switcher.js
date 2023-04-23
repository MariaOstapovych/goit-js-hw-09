const bodyEl = document.querySelector("body");
const buttonStart = document.querySelector('button[data-start]');
const buttonStop = document.querySelector('button[data-stop]');
let timer = null;


function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}


buttonStart.addEventListener("click", () => {
  timer = setInterval(() => {
      const randomColor = getRandomHexColor();
      bodyEl.style.backgroundColor = randomColor;
  }, 1000);
});


buttonStop.addEventListener("click", () => {
  clearInterval(timer);
});
