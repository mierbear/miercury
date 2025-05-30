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
const bottom = document.documentElement.scrollHeight;

const bg = document.querySelector(`.bg`);

const arrows = document.querySelector(`.arrows`);
const arrowR = document.querySelector(`.arrow-right`);
const arrowL = document.querySelector(`.arrow-left`);

// X BUTTON

const galleryBtn = document.querySelector(`.gallery-button`);
const x = document.querySelector(`.x`);
const gallery = document.querySelector(`.gallery`);

galleryBtn.addEventListener(`click`, () => {
    gallery.style.display = `flex`;
})

x.addEventListener(`click`, () => {
    gallery.style.display = `none`;
})

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
        bg.style.backgroundColor = `rgb(15, 15, 18)`;
        arrows.style.color = `rgb(191, 201, 201)`;
    } else if (scrolledPercentage >= 20 && scrolledPercentage < 40) {
        bg.style.backgroundColor = `rgb(37, 55, 79)`;
        arrows.style.color = `rgb(68, 119, 169)`;
    } else if (scrolledPercentage >= 40 && scrolledPercentage < 60) {
        bg.style.backgroundColor = `rgb(45, 29, 29)`;
        arrows.style.color = `rgb(125, 69, 69)`;
    } else if (scrolledPercentage >= 60 && scrolledPercentage < 80) {
        bg.style.backgroundColor = `rgb(44, 44, 52)`;
        arrows.style.color = `rgb(158, 169, 176)`;
    } else {
        bg.style.backgroundColor = `rgb(24, 25, 29)`;
        arrows.style.color = `rgb(211, 211, 211)`;
    }
});

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
let mierSwitchCount = 0;

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
    He's also who I draw very frequently.<br>
    <br>
    (i may have same hair syndrome..)`,
    // TYRANT
    `Made as the captain of <span class="pp" draggable="true">Pacific Purgatory(?)</span>,<br>
    an art community I grew since the May of 2023.<br>
    He has a deep seated hatred for furries and nsfw artists. (just like me)<br>
    <br>
    (he also bullies abri a lot, just like me)`,
];

const ppInfo =  document.querySelector(`.ppinfo`);
const pp = document.querySelector(`.pp`);

// TOOLTIP CODE

// pp.addEventListener('mouseenter', () => {
//     ppInfo.style.display = 'flex';
// });

// pp.addEventListener('mousemove', (event) => {
//     ppInfo.style.left = `${event.clientX + 20}px`;
//     ppInfo.style.top = `${event.clientY + 20}px`;
// });

// pp.addEventListener('mouseleave', () => {
//     ppInfo.style.display = 'none';
// });

const preloadImage = (src, callback) => {
    const img = new Image();
    img.src = src;
    img.onload = callback;
}

const patMier = () => {
    mierInc += .05;
    mierAngelImg.src = `./assets/characters/mierangel.png`;
    mierAngelImg.style.transform = `scale(${mierInc})`;
    setTimeout(() => {
        mierAngelImg.src = `./assets/characters/mierangel2.png`;
    }, 400);
};

const mierCount = () => {
    mierSwitchCount++;
    if (mierSwitchCount === 2) {
        mierWhy.style.display = `block`;
        mierWhy.style.animation = `fade-in 3s ease`;
        setTimeout(() => {
            mierWhy.style.opacity = `1`
        }, 3000);
    }
}

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

const preloadMier = `./assets/characters/mierangel2.png`

preloadImage(preloadMier, () => {    
    setTimeout(() => {
        mierAngelImg.src = preloadMier;
    }, 1000);
});


// MIER BUTTONS

mierangel.addEventListener(`click`, function() {
    if (!mierangel.classList.contains(`current-mier`)) {
        const newSrc = `./assets/characters/mierangelalt.png`;
        preloadImage(newSrc, () => {
            fadeOut();
            setTimeout(() => {
                mierImg.src = newSrc;
                setMierStyles(mierangel);
                mierCount();
                setMierText(1);
                fadeIn();
            }, 300);
        });
    } else {
        patMier();
    }
});


miertyrant.addEventListener(`click`, function() {
    if (!miertyrant.classList.contains(`current-mier`)) {
        const newSrc = `./assets/characters/miertyrant.png`;
        preloadImage(newSrc, () => {
            fadeOut();
            setTimeout(() => {
                if (mierPeek) {
                    leaveAngel();
                    mierImg.style.transition = `all 2s ease`;
                    mierImg.style.right = `0`;
                }
                mierImg.src = newSrc;
                mierImg.style.right = `0`;
                setMierStyles(miertyrant);
                mierCount();
                setMierText(2);
                fadeIn();
                if (mierImg.style.transform !== `translateX(0%)`) {
                    setTimeout(() => {
                        mierImg.style.transform = `translateX(0%)`;
                    }, 300);
                }
                setTimeout(() => {
                    const pp = document.querySelector('.pp');
                    if (pp) {
                        pp.addEventListener('mouseenter', () => {
                            ppInfo.style.display = 'flex';
                        });
                        pp.addEventListener('mousemove', (event) => {
                            ppInfo.style.left = `${event.pageX + 20}px`;
                            ppInfo.style.top = `${event.pageY + 20}px`;
                        });
                        pp.addEventListener('mouseleave', () => {
                            ppInfo.style.display = 'none';
                        });
                    }
                }, 0);
            }, 300);
        });
    }
});


miericemage.addEventListener(`click`, function() {
    if (!miericemage.classList.contains(`current-mier`)) {
        const newSrc = `./assets/characters/miericemage.png`;
        preloadImage(newSrc, () => {
            fadeOut();
            setTimeout(() => {
                if (mierPeek) {
                    leaveAngel();
                    mierImg.style.transition = `all 2s ease`;
                    mierImg.style.right = `0`;
                }
                mierImg.src = newSrc;
                mierImg.style.right = `0`;
                setMierStyles(miericemage);
                mierCount();
                setMierText(0);
                fadeIn();
                if (mierImg.style.transform !== `translateX(0%)`) {
                    setTimeout(() => {
                        mierImg.style.transform = `translateX(0%)`;
                    }, 300);
                }
            }, 300);
        });
    }
});


const mierWhy = document.querySelector('.mier-why');
const mierWhyInfo = document.querySelector('.mier-why-info');

mierWhy.addEventListener('mouseenter', () => {
    mierWhyInfo.style.display = 'flex';
});

mierWhy.addEventListener('mousemove', (event) => {
    const tooltipWidth = mierWhyInfo.offsetWidth;
    const tooltipHeight = mierWhyInfo.offsetHeight;
    mierWhyInfo.style.left = `${event.pageX - tooltipWidth / 2}px`;
    mierWhyInfo.style.top = `${event.pageY - tooltipHeight}px`;
});

// ${event.pageX - tooltipWidth / 2}px`;
// brotherInfo.style.top = `${event.pageY - tooltipHeight}px`;

mierWhy.addEventListener('mouseleave', () => {
    mierWhyInfo.style.display = 'none';
});

// QUINCE 

const quinceImg = document.querySelector(`.quince-img`);
let blood = false;

quinceImg.addEventListener(`click`, () => {
    const newSrc = blood ? `./assets/characters/quincealt.png` : `./assets/characters/quince.png`;

    preloadImage(newSrc, () => {
        quinceImg.style.animation = `fade-out .3s ease`;
        quinceImg.style.opacity = `0`;

        setTimeout(() => {
            quinceImg.src = newSrc;
            quinceImg.style.animation = `fade-in .2s ease`;
            quinceImg.style.opacity = `1`;
            blood = !blood;
        }, 300);
    });
});


// SKULL BOYS

const aurelius = document.querySelector(`.aurelius`);
const rufus = document.querySelector(`.rufus`);
const ignatius = document.querySelector(`.ignatius`);
const brutus = document.querySelector(`.brutus`);
const brother = document.querySelectorAll(`.brother`);

const aureliusImg = document.querySelector(`.aurelius-img`);
const rufusImg = document.querySelector(`.rufus-img`);
const ignatiusImg = document.querySelector(`.ignatius-img`);
const brutusImg = document.querySelector(`.brutus-img`);

const aureliusInfo = document.querySelector(`.aurelius-info`);
const rufusInfo = document.querySelector(`.rufus-info`);
const ignatiusInfo = document.querySelector(`.ignatius-info`);
const brutusInfo = document.querySelector(`.brutus-info`);

const skullBrothers = [
    {
        id: `aurelius`,
        info: `aureliusInfo`,
        img: `aureliusImg`,
        column: `1.5fr .6fr 1fr 1fr`,
    },
    {
        id: `rufus`,
        info: `rufusInfo`,
        img: `rufusImg`,
        column: `1fr 1.2fr 1fr 1fr`,
    },
    {
        id: `ignatius`,
        info: `ignatiusInfo`,
        img: `ignatiusImg`,
        column: `1fr .6fr 1.5fr 1fr`,
    },
    {
        id: `brutus`,
        info: `brutusInfo`,
        img: `brutusImg`,
        column: `1fr .6fr 1fr 1.5fr`,
    },
];

skullBrothers.forEach(({ id, info, img, column }) => {
    const brother = document.getElementById(id);
    const brotherInfo = document.getElementById(info);
    const brotherImg = document.getElementById(img);

    brother.addEventListener(`mouseenter`, () => {
        brotherInfo.style.display = `flex`;
        brotherImg.style.transform = `translateY(20%)`;
        brotherImg.style.animation = `glow 4s infinite`;
        brotherImg.style.zIndex = `99`;
        skulls.style.gridTemplateColumns = column; 
    });

    brother.addEventListener(`mouseleave`, () => {
        brotherInfo.style.display = `none`;
        brotherImg.style.transform = `translateY(23%)`;
        brotherImg.style.animation = `none`;
        if (id === `rufus`) {
            brotherImg.style.zIndex = `2`;
        } else {
            brotherImg.style.zIndex = `1`;
        }
        skulls.style.gridTemplateColumns = `1fr .6fr 1fr 1fr`;
    });

    brother.addEventListener(`mousemove`, (event) => {
        const tooltipWidth = brotherInfo.offsetWidth;
        const tooltipHeight = brotherInfo.offsetHeight;
        brotherInfo.style.left = `${event.pageX - tooltipWidth / 2}px`;
        brotherInfo.style.top = `${event.pageY - tooltipHeight}px`;
    });
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
        window.scrollTo({ top: bottom, behavior: 'smooth' });
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

const footer = document.querySelector(`.footer`);

window.addEventListener('scroll', function() {
    const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrolledPercentage = window.scrollY / scrollableHeight * 100;

    if (scrolledPercentage >= 98) {
        footer.style.bottom = '0';
        arrowL.style.bottom = `7.5rem`;
        arrowR.style.bottom = `5rem`;
    } else {
        footer.style.bottom = '-100px';
        arrowL.style.bottom = `4.5rem`;
        arrowR.style.bottom = `2rem`;
    }
});