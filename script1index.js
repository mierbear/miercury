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
const t = document.querySelector(`.t`);


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

    if (scrolledPercentage >= 10 && scrolledPercentage < 20) {
        mier.style.transform = `translateY(0vh)`;
    } else if (scrolledPercentage >= 20 && scrolledPercentage < 30) {
        mier.style.transform = `translateY(25vh)`;
    } else if (scrolledPercentage >= 30 && scrolledPercentage < 40) {
        mier.style.transform = `translateY(50vh)`;
    } else if (scrolledPercentage >= 40 && scrolledPercentage < 50) {
        mier.style.transform = `translateY(75vh)`;
    } else if (scrolledPercentage >= 50 && scrolledPercentage < 60) {
        mier.style.transform = `translateY(100vh)`;
    } else if (scrolledPercentage >= 60 && scrolledPercentage < 70) {
        mier.style.transform = `translateY(125vh)`;
    } else if (scrolledPercentage >= 70 && scrolledPercentage < 80) {
        mier.style.transform = `translateY(150vh)`;
    } else if (scrolledPercentage >= 80 && scrolledPercentage < 90) {
        mier.style.transform = `translateY(175vh)`;
    } else if (scrolledPercentage >= 90) {
        mier.style.transform = `translateY(200vh)`;
    }
});


// BG PARALLAX (NIGHT)

window.addEventListener('scroll', function() {
    const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrolledPercentage = window.scrollY / scrollableHeight * 100;

    if (scrolledPercentage >= 10 && scrolledPercentage < 20) {
        bg.style.transform = `translateY(0%)`;
        bg0.style.transform = `translateY(0%)`; 
        bg1.style.transform = `translateY(0%)`;
        bg2.style.transform = `translateY(0%)`;
        bg3.style.transform = `translateY(0%)`;
        ground.style.transform = `translateY(0%)`;
    } else if (scrolledPercentage >= 20 && scrolledPercentage < 30) {
        bg.style.transform = `translateY(-1.5%)`;
        bg0.style.transform = `translateY(-1.4%)`;
        bg1.style.transform = `translateY(-1.2%)`;
        bg2.style.transform = `translateY(-1%)`;
        bg3.style.transform = `translateY(-1.3%)`;
        ground.style.transform = `translateY(-.8%)`;
    } else if (scrolledPercentage >= 30 && scrolledPercentage < 40) {
        bg.style.transform = `translateY(-3%)`;
        bg0.style.transform = `translateY(-2.8%)`;
        bg1.style.transform = `translateY(-2.4%)`;
        bg2.style.transform = `translateY(-2%)`;
        bg3.style.transform = `translateY(-2.6%)`;
        ground.style.transform = `translateY(-1.6%)`;
    } else if (scrolledPercentage >= 40 && scrolledPercentage < 50) {
        bg.style.transform = `translateY(-4.5%)`;
        bg0.style.transform = `translateY(-4.2%)`;
        bg1.style.transform = `translateY(-3.6%)`;
        bg2.style.transform = `translateY(-3%)`;
        bg3.style.transform = `translateY(-3.9%)`;
        ground.style.transform = `translateY(-2.4%)`;
    } else if (scrolledPercentage >= 50 && scrolledPercentage < 60) {
        bg.style.transform = `translateY(-6%)`;
        bg0.style.transform = `translateY(-5.6%)`;
        bg1.style.transform = `translateY(-4.8%)`;
        bg2.style.transform = `translateY(-4%)`;
        bg3.style.transform = `translateY(-5.2%)`;
        ground.style.transform = `translateY(-3.2%)`;
    } else if (scrolledPercentage >= 60 && scrolledPercentage < 70) {
        bg.style.transform = `translateY(-7.5%)`;
        bg0.style.transform = `translateY(-7%)`;
        bg1.style.transform = `translateY(-6%)`;
        bg2.style.transform = `translateY(-5%)`;
        bg3.style.transform = `translateY(-6.5%)`;
        ground.style.transform = `translateY(-4%)`;
    } else if (scrolledPercentage >= 70 && scrolledPercentage < 80) {
        bg.style.transform = `translateY(-9%)`;
        bg0.style.transform = `translateY(-8.4%)`;
        bg1.style.transform = `translateY(-7.2%)`;
        bg2.style.transform = `translateY(-6%)`;
        bg3.style.transform = `translateY(-7.8%)`;
        ground.style.transform = `translateY(-4.8%)`;
    } else if (scrolledPercentage >= 80 && scrolledPercentage < 90) {
        bg.style.transform = `translateY(-10.5%)`;
        bg0.style.transform = `translateY(-9.4%)`;
        bg1.style.transform = `translateY(-8.4%)`;
        bg2.style.transform = `translateY(-7%)`;
        bg3.style.transform = `translateY(-9.1%)`;
        ground.style.transform = `translateY(-5.6%)`;
    } else if (scrolledPercentage >= 90) {
        bg.style.transform = `translateY(-12%)`;
        bg0.style.transform = `translateY(-10.8%)`;
        bg1.style.transform = `translateY(-9.6%)`;
        bg2.style.transform = `translateY(-8%)`;
        bg3.style.transform = `translateY(-10.4%)`;
        ground.style.transform = `translateY(-6.4%)`;
    }
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
        contentBox.style.animation = `container-slide 1s ease-in`;
        contentBox.style.transform = `translateX(-150%)`;
        x.textContent = `X`;
        closed = true;
    } else if (closed === true) {
        contentBox.style.animation = `container-slide-out 1.8s ease-out`;
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
        h.textContent = `X`;
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

// TIME

const now = new Date();
const hours = now.getHours();
let timeOfDay;
console.log(hours);

if (hours >= 5 && hours < 7) {
    timeOfDay = `dawn`;
} else if (hours >= 7 && hours < 12) {
    timeOfDay = `morning`;
} else if (hours >= 12 && hours < 18) {
    timeOfDay = `afternoon`;
} else {
    timeOfDay = `evening`;
}

console.log(timeOfDay)

t.addEventListener(`click`, function() {
    if (timeOfDay === `dawn`) {
        timeOfDay = `morning`;
        console.log(timeOfDay);
        t.textContent = `M`;
    } else if (timeOfDay === `morning`) {
        timeOfDay = `afternoon`;
        console.log(timeOfDay);
        t.textContent = `A`;
    } else if (timeOfDay === `afternoon`) {
        timeOfDay = `evening`;
        console.log(timeOfDay);
        t.textContent = `E`;
    } else if (timeOfDay === `evening`) {
        timeOfDay = `dawn`;
        console.log(timeOfDay);
        t.textContent = `D`;
    }
});