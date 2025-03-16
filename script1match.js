'use strict';

const sec = 1000;

const start       = document.querySelector(`.start`);
const start2      = document.querySelector(`.start2`);
const desk        = document.querySelector(`.desk`);
const card        = document.querySelectorAll(`.card`);
const overlay     = document.querySelector(`.overlay`);
const win         = document.querySelector(`.win`);
const scoreEl     = document.querySelector(`.score`);
const highscoreEl = document.querySelector(`.highscore`);

// prioritizing making it easy to tweak game variables
const names = [
    'abri', 'bluestrings', 'confetti', 'floo', 'genki',
    'jelly', 'jett', 'lance', 'mierangel', 'miertyrant',
    'nico', 'partack', 'pp', 'temer', 'twelves',
    'vert', 'widow', 'yobu', 'kags', 'phrog', 'the', 'davy'
];

const scoreCorrect   = 20
const scoreIncorrect =  3

let score = 0;
let highscore = 0;

function playFlipSound() {
    const flipFX = new Audio('./assets/flip.mp3');
    flipFX.play();
}
function playFlip2Sound() {
    const flipFX2 = new Audio('./assets/flip2.mp3');
    flipFX2.play();
}

const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
};

const resetGame = () => {
    setScore(100)
}

const updateScore = () => {
    scoreEl.textContent = String(score);
    highscoreEl.textContent = String(highscore);
}

const setScore = (amount) => {
    score = amount
    scoreEl.textContent = String(score);
}

const setHighscore = () => {
    if (score > highscore) {
        highscore = score;
        highscoreEl.textContent = String(highscore);
    }
}

const startGame = () => {
    resetGame();
    
    let cards = [...names, ...names];
    shuffleArray(cards);

    win.style.display = `none`;
    desk.innerHTML = ""
    for (let i = 0; i < cards.length; i++) {
        desk.insertAdjacentHTML("beforeend", `
            <div class="slot">
                <img class="${cards[i]} incorrect card" src="./assets/pp/${cards[i]}.png">
            </div>
        `);
    }
};

start.addEventListener(`click`, function() {
    startGame();
    const newCards = desk.querySelectorAll(`.card`);

    start.textContent = `reset`;
    overlay.style.display = `flex`;
    
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
            let cardName = card.classList[0];

            playFlipSound();
            card.classList.add(`clicked`, `current`);
            card.style.animation = `none`;
            card.style.transform = `rotateY(0deg)`;
            
            setTimeout(() => {
                card.src = `./assets/pp/${cardName}.png`;
            }, sec * .3);

            selectedCards.push(cardName);
            console.log(selectedCards);


            if (selectedCards.length !== 2) { return }

            overlay.style.display = `flex`;            
            

            const currentHand = document.querySelectorAll(`.current`);
            if (selectedCards[0] === selectedCards[1]) {
                setScore(score + scoreCorrect)
                selectedCards = [];

                currentHand.forEach(function(card) {
                    card.classList.add(`correct`);
                    card.classList.remove(`incorrect`, `current`, `clicked`);
                    
                    card.style.animation = `win-glow 5s ease-in-out infinite`;
                    overlay.style.display = `none`;
                });

                if (Array.from(newCards).every(card => card.classList.contains(`correct`))) {
                    setHighscore()

                    win.style.display = `flex`;
                    overlay.style.display = `flex`;
                    start.textContent = `play again?`;

                }
            } else {
                selectedCards = [];
                setScore(score - scoreIncorrect)
                                
                setTimeout(() => {
                    playFlip2Sound();
                    currentHand.forEach(function(incCard) {
                        incCard.classList.remove(`current`, `clicked`);
                        
                        incCard.style.animation = `flip .6s ease`;
                        setTimeout(() => {
                            incCard.src = `./assets/pp/blank.png`;
                            incCard.style.transform = `rotateY(180deg)`;
                            overlay.style.display = `none`;
                        }, 300);
                    });
                }, 800);
                
            };
        });
    });
});