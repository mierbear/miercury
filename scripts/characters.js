"use strict";

// PER 100vh
const mier   = document.querySelector(`.mier`);
const simeon = document.querySelector(`.simeon`);
const quince = document.querySelector(`.quince`);
const pio    = document.querySelector(`.pio`);
const skulls = document.querySelector(`.skulls`);

// CHARACTER POSITION
const mierPos = document.querySelector(`.mier`).offsetTop;
const simeonPos = document.querySelector(`.simeon`).offsetTop;
const quincePos = document.querySelector(`.quince`).offsetTop;
const pioPos = document.querySelector(`.pio`).offsetTop;
const skullsPos = document.querySelector(`.skulls`).offsetTop;

const bg = document.querySelector(`.bg`);

const arrows = document.querySelector(`.arrows`);
const arrowR = document.querySelector(`.arrow-right`);
const arrowL = document.querySelector(`.arrow-left`);

// MIER
const mierinfo = document.querySelector(`.mier-info`);
const miername = document.querySelector(`.mier-name`);
const mierbio = document.querySelector(`.mier-bio`);
const mierdesc = document.querySelector(`.mier-description`);
const mierangel = document.querySelector(`.mierangel`);
const miertyrant = document.querySelector(`.miertyrant`);
const miericemage = document.querySelector(`.miericemage`);

const miericons = [mierangel, miertyrant, miericemage];

const mierAngelImg = document.querySelector(`.mierangel-img`);
const mierImg = document.querySelector(`.mier-img`);

let mierPeek = true;
let mierInc = 1;

const mierNames = [`Mier Boreas`, `Mier`, `Mier Morozov`];
const mierBios = [`The Weakest Ice Mage`, `The one who guides. Be not afraid!`, `The Tyrant of Pacific Purgatory`];
const mierDescs = [
    // ICEMAGE
    `Yet born with a deficient affinity with magic,<br>
    he strives to be the strongest mage in the world.<br>    
    A gurren lagann ripoff that I<br>
    plan on making into a comic someday.`,
    // ANGEL
    `Created as an original character back in 2018.<br>
    Many revisions were done and now<br>
    finalized as some sort of messenger.<br>
    He's also who I draw very frequently<br>
    <br>
    (i may have same hair syndrome..)`,
    // TYRANT
    `Made as the captain of <span class="pp">Pacific Purgatory (?)</span>,<br>
    an art community I grew since the May of 2023.<br>
    He has a deep seated hatred for furries and nsfw artists. (just like me)<br>
    <br>
    (he also bullies abri a lot, just like me)`,
];

const ppInfo =  document.querySelector(`.ppinfo`);
const pp = document.querySelector(`.pp`);

// pp.addEventListener('mouseenter', () => {
//     ppInfo.style.display = 'block';
// });

// pp.addEventListener('mousemove', (event) => {
//     ppInfo.style.left = `${event.clientX + 10}px`;
//     ppInfo.style.top = `${event.clientY + 10}px`;
// });

// pp.addEventListener('mouseleave', () => {
//     ppInfo.style.display = 'none';
// });

setTimeout(() => {
    mierAngelImg.src = `./assets/characters/mierangel2.png`;
}, 1600);


const patMier = () => {
    mierInc += .05;
    mierAngelImg.src = `./assets/characters/mierangel.png`;
    mierAngelImg.style.transform = `scale(${mierInc})`;
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

const fadeIn = () => {
    mierImg.style.animation = `fade-in .2s ease`;
    miername.style.animation = `fade-in .2s ease`;
    mierbio.style.animation = `fade-in .2s ease`;
    mierdesc.style.animation = `fade-in .2s ease`;
}

const fadeOut = () => {
    mierImg.style.animation = `fade-out .3s ease`;
    miername.style.animation = `fade-out .3s ease`;
    mierbio.style.animation = `fade-out .3s ease`;
    mierdesc.style.animation = `fade-out .3s ease`;
}

const setMierText = (arr) => {
    miername.textContent = `${mierNames[arr]}`;
    mierbio.textContent = `${mierBios[arr]}`;
    mierdesc.innerHTML = `${mierDescs[arr]}`;
}

// MIER BUTTONS

mierangel.addEventListener(`click`, function() {
    if (!mierangel.classList.contains(`current-mier`)) {
        fadeOut();
        setTimeout(() => {
            setMierStyles(mierangel);
            mierImg.src = `./assets/characters/mierangelalt.png`;
            setMierText(1);
            fadeIn();
        }, 300);
    } else {
        patMier();
    }
});

miertyrant.addEventListener(`click`, function() {
    if (!miertyrant.classList.contains(`current-mier`)) {
        fadeOut();
        setTimeout(() => {
            if (mierPeek) {
                leaveAngel();
                mierImg.style.transition = `all 2s ease`;
                mierImg.style.right = `0`;
            }
            setMierStyles(miertyrant);
            mierImg.src = `./assets/characters/miertyrant.png`;
            mierImg.style.right = `0`;
            setMierText(2);
            fadeIn();
            if (mierImg.style.transform !== `translateX(0%)`) {
                setTimeout(() => {
                    mierImg.style.transform = `translateX(0%)`
                }, 300);
            };
    
            setTimeout(() => {
                const pp = document.querySelector('.pp');
                if (pp) {
                    pp.addEventListener('mouseenter', () => {
                        ppInfo.style.display = 'flex';
                    });
    
                    pp.addEventListener('mousemove', (event) => {
                        ppInfo.style.left = `${event.clientX + 20}px`;
                        ppInfo.style.top = `${event.clientY + 20}px`;
                    });
    
                    pp.addEventListener('mouseleave', () => {
                        ppInfo.style.display = 'none';
                    });
                }
            }, 0);
        }, 300);
    }
});

miericemage.addEventListener(`click`, function() {
    if (!miericemage.classList.contains(`current-mier`)) {
        fadeOut();
        setTimeout(() => {
            if (mierPeek) {
                leaveAngel();
                mierImg.style.transition = `all 2s ease`;
                mierImg.style.right = `0`;
            }
            setMierStyles(miericemage);
            mierImg.src = `./assets/characters/miericemage.png`;
            mierImg.style.right = `0`;
            setMierText(0);
            fadeIn();
            if (mierImg.style.transform !== `translateX(0%)`) {
                setTimeout(() => {
                    mierImg.style.transform = `translateX(0%)`
                }, 300);
            }
        }, 300);
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