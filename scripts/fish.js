'use strict';

const sec = 1000;

const playBtn = document.querySelector(`.play`);
const keysDiv = document.querySelector(`.keys`);
const timer = document.querySelector(`.timer`);
const timerText = document.querySelector(`.timer-text`);
const keys = [`ArrowUp`, `ArrowDown`, `ArrowLeft`, `ArrowRight`, `W`, `A`, `S`, `D`];

let firstKeyInput;
let timerID;
let timeRemaining;
let timerActive = false;
let start = false;
let inputPlayer = [];
let inputMistakes = [];
let inputGame = [];
let currentRound;
let rounds;
let level;

const randomizer = (arr) => {
    return Math.trunc((Math.random() * arr.length));
};

const addKeys = (count) => {
    for (let i = 0; i < count; i++) {
        inputGame.push(keys[randomizer(keys)]);
    }
};



const startRound = (level) => {
    if (level === 1) {
        addKeys(5)
    } else if (level === 2) {
        addKeys(6)
    } else if (level === 3) {
        addKeys(7)
    } else if (level === 4) {
        addKeys(8)
    } else if (level === 5) {
        addKeys(9)
    } else if (level === 6) {
        addKeys(10)
    };
    inputGame.forEach((key) => {
        keysDiv.insertAdjacentHTML(`afterbegin`, `<img src="./assets/fish/${key}.png">`);
    })
}


const startTimer = (time) => {
    timerActive = true;
    timeRemaining = Number(time);
    timerText.textContent = `${timeRemaining}`;
    timer.style.opacity = `1`;

    timerID = setInterval(() => {
        if (timeRemaining > 0 && timerActive) {
            timeRemaining--;
            timerText.textContent = `${timeRemaining}`;
        } else {
            stopTimer();
            console.log(`you lose!`);
            timer.style.opacity = `0`;
        }
    }, 1000);
};

const stopTimer = () => {
    clearInterval(timerID);
    timerActive = false;
};

const startFishing = (l, r, time) => {
    level = l;
    rounds = r;
    currentRound = 0;

    startRound(level);
    startTimer(time);
    timer.style.animation = `timer ${time}s`;

    firstKeyInput = document.querySelector(`.keys img`).src.split(`/`).pop().split(`.`).shift();
    const firstKey = document.querySelector(`.keys img`);
    firstKey.style.transform = `scale(1.2)`;
    console.log("First key set to:", firstKeyInput);
};

const handleKeyPress = (event) => {
    console.log(event.key);

    // WRONG KEY
    if (event.key !== firstKeyInput && event.key !== firstKeyInput.toLowerCase()) {
        console.log(`wrong!`);
        timeRemaining--;
        timerText.textContent = `${timeRemaining}`;
    }

    // RIGHT KEY
    if (event.key === firstKeyInput || event.key === firstKeyInput.toLowerCase()) {
        console.log("correct");
        inputPlayer.push(event.key);
        console.log(inputPlayer);

        // REMOVE FIRST KEY
        keysDiv.removeChild(keysDiv.firstChild);

        // WIN ROUND
        if (inputPlayer.length === inputGame.length) {
            currentRound++;
            inputPlayer = [];
            inputGame = [];

            if (currentRound !== rounds) {
                startRound(level); 
                timer.style.width = `50%`;
                timer.style.animation = `none`;
                stopTimer();
                startTimer(timeRemaining + 3);

                setTimeout(() => {
                    timer.style.animation = `timer ${timeRemaining}s`;
                }, 0);
            // WIN LEVEL
            } else { 
                stopTimer();
                timer.style.animation = `none`;
                setTimeout(() => {
                    timer.style.opacity = `0`;
                }, 500);
                console.log(`you win!!`);
            }
        }

        if (inputPlayer.length !== inputGame.length) {
            firstKeyInput = document.querySelector(`.keys img`).src.split(`/`).pop().split(`.`).shift();
            const firstKey = document.querySelector(`.keys img`);
            firstKey.style.transform = `scale(1.2)`;
        }
    }
};

document.addEventListener(`keydown`, (event) => {
    if (timerActive) {
        handleKeyPress(event);
    }
});

playBtn.addEventListener(`click`, () => {
    startFishing(6, 5, 8);
});