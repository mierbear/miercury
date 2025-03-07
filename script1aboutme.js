"use strict";

const kyle = document.querySelector('.kyle');
const center = document.querySelector('.center');
const text = document.querySelector('.about-me');
let smile = false;
let knockFX;


function knock() {
    knockFX = new Audio('./assets/knock.mp3');
    knockFX.loop = true;
    knockFX.play();
}

function stopKnock() {
    if (knockFX) {
        knockFX.pause();
        knockFX.currentTime = 0;
    }
}

kyle.addEventListener('click', function() {
    if (!smile) {
        knock();
        kyle.src = './assets/smile.png';
        kyle.style.opacity = '1';
        center.style.backgroundColor = 'black';
        text.style.color = 'white';
        smile = true;
    } else {
        setTimeout(() => {
            kyle.style.transition = 'all 2s ease';
        }, 0);
        stopKnock();
        kyle.src = './assets/normal.png';
        kyle.style.transition = 'none';
        kyle.style.opacity = '0.1';
        center.style.backgroundColor = 'white';
        text.style.color = 'black';
        smile = false;
    }
});
