"use strict";

const header = document.querySelector(`.header`)
const footer = document.querySelector(`.footer`);
const quoteElmnt = document.querySelector(`.quote`);
const mier = document.querySelector(`.mier`);
const bg = document.querySelector(`.bg`);
const bg0 = document.querySelector(`.bg0`);
const bg1 = document.querySelector(`.bg1`);
const bg2 = document.querySelector(`.bg2`);
const bg3 = document.querySelector(`.bg3`);
const ground = document.querySelector(`.ground`);
const minute = 60000;
const second = 1000;
const toggles = document.querySelector(`.toggles`);
const contentBox = document.querySelector(`.content-box`);
const centerText = document.querySelector(`.center-text`);
const x = document.querySelector(`.x`);
const h = document.querySelector(`.h`);
// const t = document.querySelector(`.t`);
const m = document.querySelector(`.m`);
const slider = document.querySelector(`.slider`);
const overlay = document.querySelector(`.overlay`);


// FOOTER

window.addEventListener('scroll', function() {
    const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrolledPercentage = window.scrollY / scrollableHeight * 100;

    if (scrolledPercentage >= 99) {
        footer.style.bottom = '0';
    } else {
        footer.style.bottom = '-100px';
    }
});


// QUOTES
// hi :3
// these are the principles that i live by. most of which are of course taken from CC.

const quotes = [
    "How can you put forth your best fruit if you are not put forth within yourself first?",
    "You can only be in hell with your own permission.",
    "There's not enough room in your mind for some other entity's thoughts.",
    "Men are second only to God, which is something that the forgetting of is the end of your life prematurely. Which is usually at the beginning.",
    "The devil makes work of idle hands.",
    "Become who you are, become who you want to be and who you should be, before you never do.",
    "The only thing you're in control of are your own thoughts.",
    "The only thing the devil wants is for you to suffer like it is.",
    "There is no free will in the world, unless you get less of the world.",
    "The only thing there is in this life is to purify your soul, so that you're not afraid of death.",
    "The angels weep for men and women failing to accept the challenge of integrity.",
    "When we experience tears, our souls become like babies.",
    "There are no coincidences. Nothing is random.",
    "Fear is not a natural state of man.",
    "Hatred is reserved for fist fighting the demons.",
    "Forgive them for they know not what they do.",
    "Unless you turn and become like children, you will never enter the kingdom of heaven.",
    "The fear of death distresses a man with a guilty conscience, but the man with a good witness within himself longs for death as for life.",
	"Your thoughts determine your life.",
    "Each and every action are equally drastic, therefore no action is drastic. So you don't have to look at something as hard to do.",
    "It takes control to be addicted. It takes more control to keep it in you than to push it all out.",
    "Strict adherence to one’s own free will, is the fall.",
    "Restoration of faith is the knowledge of real free will, which is obedience. Free will is actually obedience, but you are only willing to and enthusiastic of obedience when you have faith to back it up",
    "You're better off fishing in your own mind",
]

const getQuoteIndex = function() {
    const quoteIndex = Math.floor(Math.random() * quotes.length);
    return quotes[quoteIndex];
}

document.querySelector(".quote").innerText = getQuoteIndex();

const changeQuote = function () {
    quoteElmnt.style.opacity = 0;
    setTimeout(() => {
        document.querySelector(".quote").innerText = getQuoteIndex();
        quoteElmnt.style.opacity = 1;
    }, 500)
}

changeQuote();
setInterval(changeQuote, minute / 6);


// MIER FALLING ANIMATION / BG PARALLAX

window.addEventListener('scroll', function() {
    const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrolledPercentage = window.scrollY / scrollableHeight * 100;
    let y = scrolledPercentage * 2;
    mier.style.transform = `translateY(${y}vh)`;
});


// BG PARALLAX (NIGHT)

const bg_layers   = [bg,   bg0,   bg1,   bg2,  bg3,  ground];
const bg_parallax = [1.5,  0.8,   0.9,   1,    1.3,  0.8];

window.addEventListener('scroll', function() {
    const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrolledPercentage = window.scrollY / scrollableHeight * 100;

    bg_layers.forEach((bg, i) => {
        let y = scrolledPercentage * -0.1 * bg_parallax[i]
        bg.style.transform = `translateY(${y}%)`;
        
    });
});

// DELAYED FADE IN

setTimeout(() => {
    const header = document.querySelector('.header');
    header.style.animation = 'fade-in 3.5s ease';
    header.style.opacity = `1`;
}, second * .3);

setTimeout(() => {
    centerText.style.animation = 'fade-in 3.5s ease';
    centerText.style.opacity = `1`;
    contentBox.style.animation = 'fade-in 3.5s ease';
    contentBox.style.opacity = `1`;
    toggles.style.animation = 'fade-in 3.5s ease';
    toggles.style.opacity = `1`;
}, second * .6);


// TOGGLES LISTENER

// CONTENT

let closed = false;

x.addEventListener(`click`, function() {
    if (!closed) {
        contentBox.style.animation = `container-slide 1.5s ease-in`;
        contentBox.style.transform = `translateX(-150%)`;
        x.textContent = `O`;
        closed = true;
    } else if (closed === true) {
        contentBox.style.animation = `container-slide-out 2.2s ease-out`;
        contentBox.style.transform = `translateX(0%)`;
        x.textContent = `C`;
        closed = false;
    }
});

let headerClosed = false;

// HEADER

h.addEventListener(`click`, function() {
    if (!closed) {
        header.style.animation = `header-slide-out 0.5s ease-in`;
        header.style.transform = `translateY(-150%)`;
        setTimeout(() => {
            centerText.style.opacity = `0`;
        }, 0.5 * second)
        h.textContent = `O`;
        closed = true;
    } else if (closed === true) {
        header.style.animation = `header-slide-out .65s ease-out`;
        header.style.transform = `translateY(0%)`;
        setTimeout(() => {
            centerText.style.opacity = `1`;
        }, 0.5 * second)
        h.textContent = `H`;
        closed = false;
    }
});

// MIER

let mierPresent = true;

m.addEventListener(`click`, function() {
    if (mierPresent) {
        mierPresent = false;
        console.log(mierPresent);
        mier.style.animation = `go-up 3s ease`;
        mier.style.top = `-100%`;
        m.textContent = `O`;
    } else {
        mierPresent = true;
        console.log(mierPresent);
        mier.style.display = `block`;
        mier.style.animation = `fall-in 3.5s ease`;
        mier.style.top = `20%`;
        m.textContent = `M`;
    }
});


slider.addEventListener(`input`, function() {
    overlay.style.opacity = slider.value;
})

// TIME

const now = new Date();
const hours = now.getHours();
let timeOfDay;
console.log(hours);

// const removeAssets = function() {
//     mier.src = `none`;
//     bg.src = `none`;
//     bg0.src = `none`;
//     bg1.src = `none`;
//     bg2.src = `none`;
//     bg3.src = `none`;
//     ground.src = `none`;
// }

// const timeSetDawn = function() {
//     mier.src = `./assets/mierfalldawn.png`;
//     bg.src = `./assets/dawn.png`;
//     bg0.src = `./assets/none.png`;
//     bg1.src = `./assets/none.png`;
//     bg2.src = `./assets/none.png`;
//     bg3.src = `./assets/none.png`;
//     ground.src = `./assets/none.png`;
// }
// const timeSetMorning = function() {
//     mier.src = `./assets/mierfallmorning.png`;
//     bg.src = `./assets/clouds.png`;
//     bg0.src = `./assets/none.png`;
//     bg1.src = `./assets/none.png`;
//     bg2.src = `./assets/none.png`;
//     bg3.src = `./assets/none.png`;
//     ground.src = `./assets/none.png`;
// }
// const timeSetSunset = function() {
//     mier.src = `./assets/mierfallsunset.png`;
//     bg.src = `./assets/sunset.png`;
//     bg0.src = `./assets/none.png`;
//     bg1.src = `./assets/none.png`;
//     bg2.src = `./assets/none.png`;
//     bg3.src = `./assets/none.png`;
//     ground.src = `./assets/none.png`;
// }
// const timeSetEvening = function() {
//     mier.src = `./assets/mierfall.png`;
//     bg.src = `./assets/bgnew.png`;
//     bg0.src = `./assets/stars00.png`;
//     bg1.src = `./assets/stars11.png`;
//     bg2.src = `./assets/stars22.png`;
//     bg3.src = `./assets/shootingstars.png`;
//     ground.src = `./assets/ground.png`;
// }


// if (hours >= 5 && hours < 7) {
//     timeOfDay = `dawn`;
//     removeAssets();
//     timeSetDawn();
// } else if (hours >= 7 && hours < 17) {
//     timeOfDay = `morning`;
//     removeAssets();
//     timeSetMorning();
// } else if (hours >= 17 && hours < 19) {
//     timeOfDay = `sunset`;
//     removeAssets();
//     timeSetSunset();
// } else {
//     timeOfDay = `evening`;
//     removeAssets();
//     timeSetEvening();
// }

// console.log(timeOfDay)

// t.addEventListener(`click`, function() {
//     if (timeOfDay === `dawn`) {
//         timeOfDay = `morning`;
//         removeAssets();
//         timeSetMorning();
//         console.log(timeOfDay);
//         t.textContent = `M`;
//     } else if (timeOfDay === `morning`) {
//         timeOfDay = `sunset`;
//         removeAssets();
//         timeSetSunset();
//         console.log(timeOfDay);
//         t.textContent = `S`;
//     } else if (timeOfDay === `sunset`) {
//         timeOfDay = `evening`;
//         removeAssets();
//         timeSetEvening();
//         console.log(timeOfDay);
//         t.textContent = `E`;
//     } else if (timeOfDay === `evening`) {
//         timeOfDay = `dawn`;
//         removeAssets();
//         timeSetDawn();
//         console.log(timeOfDay);
//         t.textContent = `D`;
//     }
// });