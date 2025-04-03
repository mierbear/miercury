const header = document.querySelector(`.header`);
const hover = document.querySelector(`.hover`);
const second = 1000;

hover.addEventListener(`mouseenter`, function() {
    header.style.transform = `translateY(0)`;
});

header.addEventListener(`mouseleave`, function() {
    setTimeout(() => {
        header.style.transform = `translateY(-150%)`;
    }, 300);
});
