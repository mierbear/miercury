"use strict";

const kyle = document.querySelector('.kyle');
const ageEl = document.querySelector(`.age`);
const center = document.querySelector('.center');
const text = document.querySelector('.about-me');
const headerText = document.querySelector(`.title`);
const navText = document.querySelectorAll(`.link`);
const anime = document.querySelector(`.anime`);
const music = document.querySelector(`.music`);
const games = document.querySelector(`.games`);
const animeList = document.querySelector(`.anime-list`);
const musicList = document.querySelector(`.music-list`);
const gameList = document.querySelector(`.game-list`);
const overlay = document.querySelector(`.overlay`);
const love = document.querySelectorAll(`.love`);
const xg = document.querySelector(`.xg`);
const xa = document.querySelector(`.xa`);
const xm = document.querySelector(`.xm`);
const brag = document.querySelector('.brag');
const bragInfo = document.querySelector('.brag-info');
let smile = false;
let knockFX;


function knock() {
    knockFX = new Audio('./assets/knock.mp3');
    knockFX.loop = true;
    knockFX.play();
};

function stopKnock() {
    if (knockFX) {
        knockFX.pause();
        knockFX.currentTime = 0;
    }
};

const birthYear = 2002;
const birthMonth = 10;
const birthDay = 11;

const today = new Date();
const currentYear = today.getFullYear();

const birthdayThisYear = new Date(currentYear, birthMonth - 1, birthDay);

let age = currentYear - birthYear;
if (today < birthdayThisYear) {
  age--;
}

ageEl.textContent = age;

games.addEventListener(`click`, function() {
    gameList.classList.toggle(`hidden`);
    overlay.classList.toggle(`hidden`);
})

anime.addEventListener(`click`, function() {
    animeList.classList.toggle(`hidden`);
    overlay.classList.toggle(`hidden`);
})

music.addEventListener(`click`, function() {
    musicList.classList.toggle(`hidden`);
    overlay.classList.toggle(`hidden`);
})

xg.addEventListener(`click`, function() {
    gameList.classList.toggle(`hidden`);
    overlay.classList.toggle(`hidden`);
});

xa.addEventListener(`click`, function() {
    animeList.classList.toggle(`hidden`);
    overlay.classList.toggle(`hidden`);
});

xm.addEventListener(`click`, function() {
    musicList.classList.toggle(`hidden`);
    overlay.classList.toggle(`hidden`);
});

kyle.addEventListener('click', function() {
    if (!smile) {
        knock();
        kyle.src = './assets/aboutme/smile.png';
        kyle.style.opacity = '1';
        center.style.backgroundColor = 'black';
        text.style.color = 'white';
        headerText.style.color = `white`;
        navText.forEach((link) => {
            link.style.color = `white`;
        })
        smile = true;
        animeList.style.color = `white`;
        animeList.style.border = `.1rem solid rgb(255, 255, 255)`;
        animeList.style.backgroundColor = `black`;
        musicList.style.color = `white`;
        musicList.style.border = `.1rem solid rgb(255, 255, 255)`;
        musicList.style.backgroundColor = `black`;
        gameList.style.color = `white`;
        gameList.style.border = `.1rem solid rgb(255, 255, 255)`;
        gameList.style.backgroundColor = `black`;
        love.forEach((love) => {
            love.style.animation = `love2 2s ease-in-out infinite`;
        bragInfo.style.color = `white`;
        bragInfo.style.backgroundColor = `rgba(0, 0, 0, 0.7)`;
        })
    } else {
        setTimeout(() => {
            kyle.style.transition = 'all 2s ease';
        }, 0);
        stopKnock();
        kyle.src = './assets/aboutme/normal.png';
        kyle.style.transition = 'none';
        kyle.style.opacity = '0.1';
        center.style.backgroundColor = 'white';
        text.style.color = 'black';
        headerText.style.color = `black`;
        navText.forEach((link) => {
            link.style.color = `black`;
        })
        smile = false;
        animeList.style.color = `black`;
        animeList.style.border = `.1rem solid rgb(0, 0, 0)`;
        animeList.style.backgroundColor = `white`;
        musicList.style.color = `black`;
        musicList.style.border = `.1rem solid rgb(0, 0, 0)`;
        musicList.style.backgroundColor = `white`;
        gameList.style.color = `black`;
        gameList.style.border = `.1rem solid rgb(0, 0, 0)`;
        gameList.style.backgroundColor = `white`;
        love.forEach((love) => {
            love.style.animation = `love 2s ease-in-out infinite`;
        })
        bragInfo.style.color = `black`;
        bragInfo.style.backgroundColor = `rgba(255, 255, 255, 0.7)`;
    }
});


brag.addEventListener('mouseenter', () => {
    bragInfo.style.display = 'flex';
});

brag.addEventListener('mousemove', (event) => {
    const tooltipWidth = bragInfo.offsetWidth;
    const tooltipHeight = bragInfo.offsetHeight;
    bragInfo.style.left = `${event.pageX - tooltipWidth - 40}px`;
    bragInfo.style.top = `${event.pageY - tooltipHeight / 2}px`;
});

brag.addEventListener('mouseleave', () => {
    bragInfo.style.display = 'none';
});