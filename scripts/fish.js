'use strict';

const sec = 1000;

const mierImg = document.querySelector(`.mier-img`);
const playBtn = document.querySelector(`.play`);
const keysDiv = document.querySelector(`.keys`);
const timer = document.querySelector(`.timer`);
const timerText = document.querySelector(`.timer-text`);
const keys = [`ArrowUp`, `ArrowDown`, `ArrowLeft`, `ArrowRight`, `W`, `A`, `S`, `D`];

let firstKeyInput;
let timerID;
let timeOriginal;
let timeRemaining;
let timerActive = false;
let start = false;
let inputPlayer = [];
let inputMistakes = [];
let inputGame = [];
let currentRound;
let rounds;
let level;
let extraLife = true;
let mierState = 0;
let mierSlide = 0;

const randomizer = (arr) => {
    return Math.trunc((Math.random() * arr.length));
};

const addKeys = (count) => {
    for (let i = 0; i < count; i++) {
        inputGame.push(keys[randomizer(keys)]);
    }
};

const setMier = () => {
    if (mierState < 7) { mierState++ }
    mierImg.src = `./assets/fish/mier-${mierState}.png`;
    if (mierState > 3) {
        mierSlide += -15;
        mierImg.style.transform = `translateX(${mierSlide}px)`
    }
}



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
    timeOriginal = time;
    timeRemaining = Number(time);
    timerText.textContent = `${timeRemaining}`;
    timer.style.opacity = `1`;
    keysDiv.style.opacity = `1`;
    timer.style.backgroundColor = `black`;

    updateTimerBar();

    timerID = setInterval(() => {
        if (timeRemaining > 0 && timerActive) {
            timeRemaining -= .01;
            timerText.textContent = `${Math.trunc(timeRemaining)}`;
            updateTimerBar();
            if (timeRemaining < 4 && timeRemaining > 3) {
                timer.style.backgroundColor = `rgb(94, 7, 7)`;
            } else if (timeRemaining < 3 && timeRemaining > 2) {
                timer.style.backgroundColor = `rgb(183, 10, 10)`;
            } else if (timeRemaining < 2 && timeRemaining >= 0) {
                timer.style.backgroundColor = `red`;
            }
        // LOSE
        } else if (timeRemaining <= 0) {
            if (extraLife) {
                timeRemaining += 10
                extraLife = false;
                timer.style.backgroundColor = `black`;
            } else {
                stopTimer();
                console.log(`you lose!`);
                timer.style.opacity = `0`;
                keysDiv.style.opacity = `0`;
                inputPlayer = [];
                inputGame = [];
                setTimeout(() => {
                    keysDiv.innerHTML = ``;
                }, 1000);
            }
        }
    }, 10);
};

const updateTimerBar = () => {
    const percentage = (Math.trunc(timeRemaining) / timeOriginal) * 50;
    timer.style.width = `${percentage}%`;
};

const stopTimer = () => {
    clearInterval(timerID);
    timerActive = false;
};

const startFishing = (l, r, time) => {
    level = l;
    rounds = r;
    currentRound = 0;
    mierSlide = 0;
    mierState = 2;
    mierImg.src = `./assets/fish/mier-2.png`;
    

    startRound(level);
    startTimer(time);

    const keyFirst = document.querySelector(`.keys img`);
    firstKeyInput = document.querySelector(`.keys img`).src.split(`/`).pop().split(`.`).shift();
    console.log("First key set to:", firstKeyInput);
    keyFirst.style.transform = `scale(1.2)`;
};

const handleKeyPress = (event) => {
    const keyAll = document.querySelectorAll(`.keys img`);
    console.log(event.key);

    // WRONG KEY
    if (event.key !== firstKeyInput && event.key !== firstKeyInput.toLowerCase()) {
        console.log(`wrong!`);
        timeRemaining--;
        timerText.textContent = `${Math.trunc(timeRemaining)}`;
        updateTimerBar();
        keysDiv.style.animation = `wrong .1s ease-in-out`;
        setTimeout(() => {
            keysDiv.style.animation = `none`;
        }, 100);
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
            setMier();

            if (currentRound !== rounds) {
                startRound(level); 
                timer.style.width = `50%`;
                stopTimer();
                startTimer(timeRemaining + 3);
            // WIN LEVEL
            } else { 
                stopTimer();
                setTimeout(() => {
                    timer.style.opacity = `0`;
                }, 500);
                console.log(`you win!!`);
                mierImg.style.transform = `none`;
                mierImg.src = `./assets/fish/mier-8.png`;
            }
        }

        if (inputPlayer.length !== inputGame.length) {
            firstKeyInput = document.querySelector(`.keys img`).src.split(`/`).pop().split(`.`).shift();
            const keyFirst = document.querySelector(`.keys img`);
            keyFirst.style.transform = `scale(1.2)`;
        }
    }
};

document.addEventListener(`keydown`, (event) => {
    if (timerActive) {
        handleKeyPress(event);
    }
});

playBtn.addEventListener(`click`, () => {
    if (timerActive) { return }
    mierImg.src = `./assets/fish/mier-0.png`
    setTimeout(() => {
        mierImg.src = `./assets/fish/mier-1.png`
        setTimeout(() => {
            startFishing(1, 10, 8);
        }, 1000);
    // }, (Math.trunc(Math.random() * 10) + 5) * 1000);
    }, 0);
    // startFishing(1, 2, 20);
});