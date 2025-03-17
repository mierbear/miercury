"use strict";

const kyle = document.querySelector('.kyle');
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
    }
});
