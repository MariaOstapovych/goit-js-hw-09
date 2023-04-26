const bodyEl = document.querySelector("body");
const buttonStart = document.querySelector('button[data-start]');
const buttonStop = document.querySelector('button[data-stop]');
let timer = null;


function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}


buttonStart.addEventListener("click", () => {
  buttonStart.setAttribute("disabled", "true");
  buttonStop.removeAttribute("disabled", "true");
  timer = setInterval(() => {
      const randomColor = getRandomHexColor();
    bodyEl.style.backgroundColor = randomColor;
    
  }, 1000);
});


buttonStop.addEventListener("click", () => {
  buttonStart.removeAttribute("disabled", "true");
  buttonStop.setAttribute("disabled", "true");
  clearInterval(timer);
});
