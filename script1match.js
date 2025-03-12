'use strict';

const start = document.querySelector(`.start`);
const start2 = document.querySelector(`.start2`);
const desk = document.querySelector(`.desk`);
const card = document.querySelectorAll(`.card`);
const sec = 1000;

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

const startGame = () => {
    desk.innerHTML = ""
    let cards = [...names, ...names];
    shuffleArray(cards);
    for (let i = 0; i < cards.length; i++) {
        desk.insertAdjacentHTML("beforeend", `
            <div class="slot">
                <img class="incorrect card ${cards[i]}" src="./assets/pp/${cards[i]}.png">
            </div>
        `);
    }
};

start.addEventListener(`click`, function() {
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
                // setTimeout(() => {
                //     card.style.animation = `none`;
                // }, 1000)
            }, 1000);
        });
    }, sec * 1.5);
    let selectedCards = [];
    const incorrect = document.querySelectorAll(`.incorrect`);
    newCards.forEach(function(card) {
        card.addEventListener(`click`, function() {
            card.style.animation = `none`;
            card.style.transform = `rotateY(0deg)`;
            setTimeout(() => {
                card.src = `./assets/pp/${card.classList[card.classList.length - 1]}.png`;
            }, sec * .3);
            selectedCards.push(card.classList[card.classList.length - 1]);
            console.log(selectedCards);
            if (selectedCards.length === 2) {
                selectedCards = [];
                console.log(`meow`);
                setTimeout(() => {
                    incorrect.forEach(function(incCard) {
                        incCard.style.animation = `flip 1s ease`;
                        setTimeout(() => {
                            incCard.src = `./assets/pp/blank.png`;
                            incCard.style.transform = `rotateY(180deg)`;
                        }, 500);
                    });
                }, 1000);
            };
        });
    });
});

start2.addEventListener(`click`, function() {
    startGame();

    const newCards = desk.querySelectorAll(`.card`);
    newCards.forEach(function(card) {
        card.src = `./assets/pp/blank.png`;
        card.style.transform = `rotateY(180deg)`;
    });
});