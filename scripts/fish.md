800 - bubble eye goldfish

partack - penguin
confetti - ghost shark
lance - swordfish
temer - japanese spider crab

bongli - blobfish
gigaegg - boxfish
kags - stingray
jett - isopod

burrito
floo - skeleton panda sea squirt
genki - dumbo octopus
vert - goblin shark

skittles
gfr - saltwater crocodile
truilt - rosy-scales fairy-wrasse
solis - telescope fish
phrog - redlipped batfish
bluestrings - whitemargin unicornfish

onigiri
mier - angel fish
abri - leatherback turtle
12s - horned blenny
widow - axolotl

coxinha
jelly - jellyfish
nico - seabunny
yobu - bluering octopus

idea scrapped!! but if you see this, you know where i was going with it LOLOLOL

TO DO LIST:

- add music
- render fish better
- add sfx
- improve ui
- improve fish catalogue info

orca
leatherback turtle
Panda Banggai Cardinalfish
Bubble eye goldfish
goblin shark
bluering octopus
redlipped batfish
swordfish
seabunny
cannonball jellyfish
japanese spider crab
horned blenny
blobfish
boxfish
giant isopod
flapjack octopus
axolotl
ghost shark
fiordlad penguin
bluedotted stingray
whitemargin unicornfish
rosy-scales fairy-wrasse
anglerfish
saltwater crocodile

so im struggling to balance the fishing game. in the game, you fish and then a timer starts when a fish bites the bait.
there will then be 5-10 WASD and/or arrow keys on the screen and the player will have to press them in order, when pressing them all, there will be more rounds of it that will follow, along with an bonus extra time. each fish will have different numbers of keys and rounds and seconds given to catch it.

so what im strugging with is how to balance the time given to the player. i want there to be enough given bonus time for the fishes that have 10 keys, 12 rounds and plenty of given time (big fishes), but not too much that it ruins the experience trying to catch the fishes that have like 3 keys, 20 rounds and 1 second to catch (fast fishes), as it gives them like 5 seconds by the time theyre in round 3, which is too much time.

heres what i made so far:

//these are the difficulties and time variables
let extraTime = [2, .5, 2];

let easy = [3, 1, 3.5];
let medium = [2.5, .8, 2.6];
let hard = [1.8, .5, 1.8];
let insane = [1.4, .2, 1];

//this is for when the game starts
startTimer(time + extraTime[2]);

//this is when a round is over and proceeds to the next one
if (inputPlayer.length === inputGame.length) {
currentRound++;
inputPlayer = [];
inputGame = [];
setMier();

            if (currentRound !== rounds) {
                startRound(level);
                timer.style.width = `50%`;
                stopTimer();
                startTimer(timeRemaining + extraTime[0]) + ((timeRemaining + extraTime[0]) * extraTime[1]);

what do you think i could do to better balance this properly?
