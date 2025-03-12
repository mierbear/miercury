'use strict';

const start = document.querySelector(`.start`);
const start2 = document.querySelector(`.start2`);
const desk = document.querySelector(`.desk`);
const card = document.querySelectorAll(`.card`);
const sec = 1000;
const overlay = document.querySelector(`.overlay`);
const win = document.querySelector(`.win`);
const scoreEl = document.querySelector(`.score`);
const highscoreEl = document.querySelector(`.highscore`);

let score = 0;
let highscore = 0;

const names = [
    'abri', 'bluestrings', 'confetti', 'floo', 'genki',
    'jelly', 'jett', 'lance', 'mierangel', 'miertyrant',
    'nico', 'partack', 'pp', 'temer', 'twelves',
    'vert', 'widow', 'yobu'
];

const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
};

const resetGame = () => {
    score = 100;
    scoreEl.textContent = `100`;
}

const updateScore = () => {
    scoreEl.textContent = String(score);
    highscoreEl.textContent = String(highscore);
}

const startGame = () => {
    resetGame();
    win.style.display = `none`;
    desk.innerHTML = ""
    let cards = [...names, ...names];
    shuffleArray(cards);
    for (let i = 0; i < cards.length; i++) {
        desk.insertAdjacentHTML("beforeend", `
            <div class="slot">
                <img class="${cards[i]} incorrect card" src="./assets/pp/${cards[i]}.png">
            </div>
        `);
    }
};

start.addEventListener(`click`, function() {
    start.textContent = `reset`;
    startGame();
    const newCards = desk.querySelectorAll(`.card`);
    newCards.forEach(function(card) {
        card.style.animation = `fade-in 1s ease-in`;
        card.style.transition = `none`;
    });
    setTimeout(() => {
        newCards.forEach(function(card) {
            card.style.animation = `flip 2s ease`;
            setTimeout(() => {
                card.src = `./assets/pp/blank.png`;
                card.style.transform = `rotateY(180deg)`;
                card.style.transition = `all 1s ease`;
                setTimeout(() => {
                    overlay.style.display = `none`;
                }, 1200)
            }, 1000);
        });
    }, sec * 1.5);

    let selectedCards = [];
    const incorrect = document.querySelectorAll(`.incorrect`);

    newCards.forEach(function(card) {
        card.addEventListener(`click`, function() {
            if (!card.classList.contains(`clicked`)) {
                card.classList.add(`clicked`);
            }

            card.style.animation = `none`;
            card.style.transform = `rotateY(0deg)`;
            card.classList.toggle(`current`)
            setTimeout(() => {
                card.src = `./assets/pp/${card.classList[0]}.png`;
            }, sec * .3);

            selectedCards.push(card.classList[0]);
            console.log(selectedCards);

            if (selectedCards.length === 2) {
                overlay.style.display = `flex`;
                const currentHand = document.querySelectorAll(`.current`);
                if (selectedCards[0] === selectedCards[1]) {
                    selectedCards = [];
                    score += 20;
                    updateScore();
                    currentHand.forEach(function(card) {
                        card.classList.toggle(`correct`);
                        card.classList.toggle(`incorrect`);
                        card.classList.toggle(`current`);
                        card.classList.toggle(`clicked`);
                        overlay.style.display = `none`;
                    });
                    if (Array.from(newCards).every(card => card.classList.contains(`correct`))) {
                        win.style.display = `flex`;
                        overlay.style.display = `flex`;
                        start.textContent = `play again?`;
                        if (score > highscore) {
                            highscore = score;
                            highscoreEl.textContent = String(highscore);
                        }
                    }
                } else {
                    selectedCards = [];
                    score -= 3;
                    updateScore();
                    currentHand.forEach(function(card) {
                        card.classList.toggle(`current`);
                        card.classList.toggle(`clicked`);
                    });
                    setTimeout(() => {
                        const incorrect = document.querySelectorAll('.incorrect');
                        incorrect.forEach(function(incCard) {
                            incCard.style.animation = `flip .6s ease`;
                            setTimeout(() => {
                                incCard.src = `./assets/pp/blank.png`;
                                incCard.style.transform = `rotateY(180deg)`;
                                overlay.style.display = `none`;
                            }, 300);
                        });
                    }, 800);
                };
            };
        });
    });
});