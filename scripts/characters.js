"use strict";

const mier = document.querySelector(`.mier`);
const simeon = document.querySelector(`.simeon`);
const quince = document.querySelector(`.quince`);
const pio = document.querySelector(`.pio`);
const skulls = document.querySelector(`.skulls`);

const bg = document.querySelector(`.bg`);

const mierPos = document.querySelector(`.mier`).offsetTop;
const simeonPos = document.querySelector(`.simeon`).offsetTop;
const quincePos = document.querySelector(`.quince`).offsetTop;
const pioPos = document.querySelector(`.pio`).offsetTop;
const skullsPos = document.querySelector(`.skulls`).offsetTop;

const arrows = document.querySelector(`.arrows`);
const arrowR = document.querySelector(`.arrow-right`);
const arrowL = document.querySelector(`.arrow-left`);

const mierbio = document.querySelector(`.mier-bio`);
const mierdesc = document.querySelector(`.mier-desc`);
const mierangel = document.querySelector(`.mierangel`);
const miertyrant = document.querySelector(`.miertyrant`);
const miericemage = document.querySelector(`.miericemage`);
const mierangeldiv = document.querySelector(`.mierangeldiv`);
const miertyrantdiv = document.querySelector(`.miertyrantdiv`);
const miericemagediv = document.querySelector(`.miericemagediv`);

const miericons = [mierangel, miertyrant, miericemage];

const mierAngelImg = document.querySelector(`.mierangel-img`);
const mierImg = document.querySelector(`.mier-img`);

let mierPeek = true;

setTimeout(() => {
    mierAngelImg.src = `./assets/characters/mierangel2.png`;
}, 1600);


const patMier = () => {
    mierAngelImg.src = `./assets/characters/mierangel.png`;
    setTimeout(() => {
        mierAngelImg.src = `./assets/characters/mierangel2.png`;
    }, 400);
};

const leaveAngel = () => {
    mierAngelImg.style.animation = `mier-popdown 1.5s ease`;
    mierAngelImg.style.bottom = `-100%`;
    setTimeout(() => {
        mierAngelImg.style.display = `none`;
        mierPeek = false;
    }, 1500);
}

const resetMierIcons = () => {
    miericons.forEach((mier) => {
        mier.classList.remove(`current-mier`);
        mier.style.opacity = `.2`
    });
};

const setMierStyles = (element) => {
    resetMierIcons();
    element.classList.add(`current-mier`);
    element.style.opacity = `1`;
};

// MIER BUTTONS

mierangel.addEventListener(`click`, function() {
    if (!mierangel.classList.contains(`current-mier`)) {
        setMierStyles(mierangel);
        mierImg.src = `./assets/characters/mierangelalt.png`;
    } else {
        patMier();
    }
});

miertyrant.addEventListener(`click`, function() {
    if (!miertyrant.classList.contains(`current-mier`)) {
        if (mierPeek) {
            leaveAngel();
            mierImg.style.transition = `all 2s ease`;
            mierImg.style.right = `0`;
        }
        setMierStyles(miertyrant);
        mierImg.src = `./assets/characters/miertyrant.png`;
        mierImg.style.right = `0`;
        if (mierImg.style.transform !== `translateX(0%)`) {
            setTimeout(() => {
                mierImg.style.transform = `translateX(0%)`
            }, 300);
        }
    }
});

miericemage.addEventListener(`click`, function() {
    if (!miericemage.classList.contains(`current-mier`)) {
        if (mierPeek) {
            leaveAngel();
            mierImg.style.transition = `all 2s ease`;
            mierImg.style.right = `0`;
        }
        setMierStyles(miericemage);
        mierImg.src = `./assets/characters/miericemage.png`;
        mierImg.style.right = `0`;
        if (mierImg.style.transform !== `translateX(0%)`) {
            setTimeout(() => {
                mierImg.style.transform = `translateX(0%)`
            }, 300);
        }
    }
});


// SCROLL LISTENER

window.addEventListener('scroll', function() {
    const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrolledPercentage = window.scrollY / scrollableHeight * 100;
    
    // MIER POPDOWN ANIM

    if (scrolledPercentage > 10 && mierPeek) {
        leaveAngel();
        console.log(`meow`);
        mierImg.src = `./assets/characters/mierangelalt.png`;
        setTimeout(() => {
            mierImg.style.transform = `translateX(0%)`
        }, 100);
    } 

    // BACKGROUND COLOR FOR EACH CHARACTER

    if (scrolledPercentage >= 0 && scrolledPercentage < 20) {
        bg.style.backgroundColor = `rgb(12, 12, 13)`;
        arrows.style.color = `rgb(119, 172, 192)`;
    } else if (scrolledPercentage >= 20 && scrolledPercentage < 40) {
        bg.style.backgroundColor = `rgb(20, 20, 41)`;
        arrows.style.color = `rgb(42, 42, 55)`;
    } else if (scrolledPercentage >= 40 && scrolledPercentage < 60) {
        bg.style.backgroundColor = `rgb(45, 29, 29)`;
        arrows.style.color = `rgb(125, 23, 23)`;
    } else if (scrolledPercentage >= 60 && scrolledPercentage < 80) {
        bg.style.backgroundColor = `rgb(44, 44, 52)`;
        arrows.style.color = `rgb(14, 14, 21)`;
    } else if (scrolledPercentage >= 80 && scrolledPercentage <= 100) {
        bg.style.backgroundColor = `rgb(12, 12, 13)`;
        arrows.style.color = `rgb(167, 167, 146)`;
    }
});

// ARROWS 

arrowR.addEventListener(`click`, function() {
    const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrolledPercentage = window.scrollY / scrollableHeight * 100;

    if (scrolledPercentage >= 0 && scrolledPercentage < 20) {
        window.scrollTo({ top: simeonPos, behavior: 'smooth' });
    } else if (scrolledPercentage >= 20 && scrolledPercentage < 40) {
        window.scrollTo({ top: quincePos, behavior: 'smooth' });
    } else if (scrolledPercentage >= 40 && scrolledPercentage < 60) {
        window.scrollTo({ top: pioPos, behavior: 'smooth' });
    } else if (scrolledPercentage >= 60 && scrolledPercentage < 80) {
        window.scrollTo({ top: skullsPos, behavior: 'smooth' });
    } else {
        console.log(`meow :3`)
    }
});

arrowL.addEventListener(`click`, function() {
    const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrolledPercentage = window.scrollY / scrollableHeight * 100;

    if (scrolledPercentage >= 0 && scrolledPercentage < 20) {
        console.log(`meow :3`)
    } else if (scrolledPercentage >= 20 && scrolledPercentage < 40) {
        window.scrollTo({ top: mierPos, behavior: 'smooth' });
    } else if (scrolledPercentage >= 40 && scrolledPercentage < 60) {
        window.scrollTo({ top: simeonPos, behavior: 'smooth' });
    } else if (scrolledPercentage >= 60 && scrolledPercentage < 80) {
        window.scrollTo({ top: quincePos, behavior: 'smooth' });
    } else {
        window.scrollTo({ top: pioPos, behavior: 'smooth' });
    }
});