'use strict';
//ill implement bongli's critique here later, currently not my priority but tyty :3

const second = 1000;

const popup = document.querySelector(`.popup`);
const overlay = document.querySelector(`.overlay`);
const focusWarning = document.getElementById(`focus-warning`);
const textContainer = document.getElementById(`current-line`);
const inputBox = document.getElementById(`input-box`);
const center = document.querySelector(`.center`);

let player;
let playerBuild;
let playerColor;


const fadeOut = function() {
    popup.style.animation = `fade-out 1s ease`;
}

const fadeIn = function() {
    popup.style.animation = `fade-in 1s ease`;
}

const prologue = function () {
    popup.innerHTML = `
    <h1>What is your name?</h1>
    <div class="popup-bottom">
    <input type="text" class="playerName" placeholder="...">
    <button class="popupBtn">✅</button>
    </div>
    `
    popup.style.animation = `fade-in 3s ease`;
    popup.style.opacity = 1;
    const button = document.querySelector(`.popupBtn`);
    const playerName = document.querySelector(`.playerName`);

    button.addEventListener(`click`, function() {
        player = playerName.value;
        console.log(player);
        fadeOut();
        prologue2();
    })
};

const prologue2 = function () {
    popup.innerHTML = `
    <h1>How would you describe yourself?</h1>
    <div class="popup-bottom">
    <button class="slender choice">slender</button>
    <button class="tiny choice">tiny</button>
    <button class="robust choice">robust</button>
    <button class="average choice">average</button>
    </div>
    `
    fadeIn();
    let choice = document.querySelectorAll(`.choice`);

    choice.forEach(function(build) {
        build.addEventListener(`click`, function() {
            playerBuild = build.textContent;
            console.log(playerBuild);
            fadeOut();
            prologue3();
        })
    })
};

const prologue3 = function() {
    popup.innerHTML = `
    <h1>Which of these colors would you pick?</h1>
    <div class="popup-bottom">
    <button class="red choice">red</button>
    <button class="blue choice">blue</button>
    <button class="yellow choice">yellow</button>
    </div>
    `
    fadeIn();
    let choice = document.querySelectorAll(`.choice`);

    choice.forEach(function(color) {
        color.addEventListener(`click`, function() {
            playerColor = color.textContent;
            console.log(playerColor);
            fadeOut();
            prologue4();
        })
    })
};

const prologue4 = function() {
    popup.innerHTML = `
    <h1>Have fun ${player}!</h1>
    <div class="popup-bottom-column">
    <p>This was made for fun and on a whim. Don't take this silly lil project too seriously hehe</p>
    </div>
    `
    fadeIn();
    setTimeout(() => {
        popup.style.animation = `fade-out 1s ease`;
        overlay.style.animation = `fade-out 1s ease`;
        popup.style.opacity = 0;
        overlay.style.opacity = 0;
        popup.style.display = `none`;
        overlay.style.display = `none`;
    }, second * 4)
}

prologue();

const lines = [
    `Today is your big day. You were invited here yesterday to receive your rightful title as a knight.`,
    `Gone are the days of mediocrity. You conjure reveries, imagining yourself as the man who has it all: riches, women, and glory.`,
    `For the past fortnight, the earth has been shaking with great might.`,
    `It is speculated that these tremors are the work of a fearsome beast in the far north.`,
    `To face this looming threat, the king of Abrithia, Abri XI, has chosen you, ${player}, as the courageous and valiant hero—who shall quell the rumblings.`
];