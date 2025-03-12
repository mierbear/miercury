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
                <img class="card ${cards[i]}" src="./assets/pp/${cards[i]}.png">
            </div>
        `);
    }
};

start.addEventListener(`click`, function() {
    startGame();
    const newCards = desk.querySelectorAll(`.card`);
    setTimeout(() => {
        newCards.forEach(function(card) {
            card.classList.add('flip');
            setTimeout(() => {
                card.src = `./assets/pp/blank.png`;
                setTimeout(() => {
                    card.style.transform = `rotateY(180deg)`;
                    card.classList.remove('flip');
                }, 1000);
            }, 1000);
        });
    }, sec * .5);
    newCards.forEach(function(card) {
        card.addEventListener(`click`, function() {
            console.log(`meow`);
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

// card.forEach(function(card) {
//     card.addEventListener(`click`, function() {
//         console.log(`meow`);
//     })
// });

// card.addEventListener(`click`, function() {
//     console.log(`meow`);
// })