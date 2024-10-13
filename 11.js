const loadText = document.querySelector(".loading-text");
const bg = document.querySelector(".bg");

let load = 0;

let interval = setInterval(blurring, 30);

function blurring() {
  load++;
  if (load > 99) {
    clearInterval(interval);
  }
  loadText.innerText = `${load}%`;
  loadText.style.opacity = 1 - load / 100;
  loadText.style.width = `${10 + load}%`;
  bg.style.filter = `blur(${30 - (load * 30) / 100}px)`;
}
let section = document.querySelector('section');
let text = document.querySelector('.text');
let innerText = document.querySelector('.inner-text');
const slides = document.querySelectorAll('.slide');


window.addEventListener('scroll', () => {
    let value = window.scrollY;
    
    text.style.left = `${100 - (value / 5)}%`
    innerText.style.left = `${100 - (value / 5)}%`

    const triggerBottom = window.innerHeight / 5 * 4;
    slides.forEach(slide => {
        const slideTop = slide.getBoundingClientRect().top;
        if (slideTop < triggerBottom) {
            slide.classList.add('in');
        } else {
            slide.classList.remove('in');
        }
    });

});
