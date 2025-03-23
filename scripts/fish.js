'use strict';

const sec = 1000;

const keysDiv = document.querySelector(`.keys`);
const keys = [`ArrowUp`, `ArrowDown`, `ArrowLeft`, `ArrowRight`, `W`, `A`, `S`, `D`];

let firstKey;
let start = false;
let inputPlayer = [];
let inputGame = [];

const randomizer = (arr) => {
    return Math.trunc((Math.random() * arr.length));
}

const startFishing = () => {
    inputGame.push(keys[randomizer(keys)]);
    inputGame.push(keys[randomizer(keys)]);
    inputGame.push(keys[randomizer(keys)]);
    inputGame.push(keys[randomizer(keys)]);
    inputGame.push(keys[randomizer(keys)]);
    inputGame.push(keys[randomizer(keys)]);
    inputGame.push(keys[randomizer(keys)]);

    inputGame.forEach((key) => {
        keysDiv.insertAdjacentHTML(`afterbegin`, `<img src="./assets/fish/${key}.png">`);
    })

    firstKey = document.querySelector(`.keys img`).src.split(`/`).pop().split(`.`).shift();
    console.log("First key set to:", firstKey);
};

startFishing();

document.addEventListener(`keydown`, (event) => {
    console.log(event.key);

    if (event.key !== firstKey) {
        console.log(`not a key!`);
    } else if (event.key.toUpperCase() == firstKey || event.key == firstKey) {
        console.log("meow");
        keysDiv.removeChild(keysDiv.firstChild);
        firstKey = document.querySelector(`.keys img`).src.split(`/`).pop().split(`.`).shift();
    }
})