const header = document.querySelector(`.header`);
const hover = document.querySelector(`.hover`);
const second = 1000;

// setTimeout(() => {
//     header.style.animation = `header-slide-out .2s ease`;
//     header.style.transform = `translateY(-150%)`;
// }, 1 * second);

hover.addEventListener(`mouseenter`, function() {
    header.style.transform = `translateY(0)`;
});

header.addEventListener(`mouseleave`, function() {
    setTimeout(() => {
        header.style.transform = `translateY(-150%)`;
    }, 300);
});
