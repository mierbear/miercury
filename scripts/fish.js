'use strict';

const sec = 1000;

const fishContainer = document.querySelector(`.fishes`);
const fishAll = document.querySelectorAll(`.fish`);
const infoStars = document.querySelector(`.stars`);
const infoImg = document.querySelector(`.info-img`);
const infoHeader = document.querySelector(`.info-header`);
const infoSubHeader = document.querySelector(`.info-sub-header`);
const infoDesc = document.querySelector(`.info-description`);
const popup = document.querySelector(`.popup-container`);
const popupText = document.querySelector(`.popup-text`);
const popupTime = document.querySelector(`.popup-time`);
const monologue = document.querySelector(`.monologue`);

const mierImg = document.querySelector(`.mier-img`);
const fishImg = document.querySelector(`.fish-img`);
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
let inputPlayer = [];
let inputMistakes = [];
let inputGame = [];
let currentFish = [];
let currentRound;
let rounds;
let level;
let extraLife = false;
let mierState = 0;
let mierSlide = 0;
let win = false;

const randomizer = (arr) => {
    return arr[Math.trunc((Math.random() * arr.length))];
};

const preloadImage = (src, callback) => {
    const img = new Image();
    img.src = src;
    img.onload = callback;
}

const addKeys = (count) => {
    for (let i = 0; i < count; i++) {
        inputGame.push(randomizer(keys));
    }
};

const showPopup = (fish, time) => {
    popup.style.display = `flex`;
    popup.style.opacity = `1`;
    console.log(fish);
    if (fish[0] === `twelves`) {
        popupText.textContent = `you caught 12s!!`;
    } else if (fish[0] === `eight`) {
        popupText.textContent = `you caught 800!!`;
    } else if (fish[0] === `jelly`) {
        popupText.textContent = `you caught sr_jelly!!`;
    } else {
        popupText.textContent = `you caught ${fish}!!`;
    }
    if (time < .1) {
        popupTime.textContent = `+${time.toFixed(3)} MS LEFT!!!!`;
    } else if (time > .1 && time < .4) {
        popupTime.textContent = `+${time.toFixed(3)} ms left..... YOURE INSANEEE`;
    } else if (time > .4 && time < 1) {
        popupTime.textContent = `+${time.toFixed(3)} ms left... you're crazy lol`;
    } else if (time > 1 && time < 2) {
        popupTime.textContent = `+${time.toFixed(3)} second left! you almost lost it...`;
    } else if (time > 2 && time < 3) {
        popupTime.textContent = `+${time.toFixed(3)} seconds left! almost got away!`;
    } else {
        popupTime.textContent = `+${time.toFixed(3)} seconds left! good work!`;
    }
    setTimeout(() => {
        popup.style.opacity = `0`;
        setTimeout(() => {
            popup.style.display = `none`;
        }, 6000);
    }, 6000);
}

const setMier = () => {
    if (mierState < 7) { mierState++ }
    mierImg.src = `./assets/fish/mier-${mierState}.png`;
    if (mierState > 3) {
        mierSlide += -15;
        mierImg.style.transform = `translateX(${mierSlide}px)`;
        fishImg.style.transform = `translateX(${mierSlide}px)`;
    }
}

const playBtnAppear = () => {
    playBtn.style.display = `flex`;
    setTimeout(() => {
        playBtn.style.opacity = `1`;
        setTimeout(() => {
            playBtn.style.pointerEvents = `all`;
        }, 2000);
    }, 1000);
}

const playBtnDisappear = () => {
    playBtn.style.pointerEvents = `none`;
    playBtn.style.opacity = `0`;
}

const startRound = (level) => {
    if (level === 1) {
        addKeys(1)
    } else if (level === 2) {
        addKeys(2)
    } else if (level === 3) {
        addKeys(3)
    } else if (level === 4) {
        addKeys(4)
    } else if (level === 5) {
        addKeys(5)
    } else if (level === 6) {
        addKeys(6)
    } else if (level === 7) {
        addKeys(7)
    } else if (level === 8) {
        addKeys(8)
    } else if (level === 9) {
        addKeys(9)
    } else if (level === 10) {
        addKeys(10)
    };
    inputGame.forEach((key) => {
        keysDiv.insertAdjacentHTML(`afterbegin`, `<img src="./assets/fish/${key}.png">`);
    })
}

const loseQuotes = [
    `it's over...`,
    `sigh... u_u`,
    `how did it get away...`,
    `skill issue...`,
    `why did i (mier) code it like this...`,
    `i almost had it...`,
]

const startTimer = (time) => {
    timerActive = true;
    timeOriginal = time;
    timeRemaining = Number(time);
    timerText.textContent = `${Math.trunc(timeRemaining)}`;
    timer.style.opacity = `1`;
    keysDiv.style.opacity = `1`;
    timer.style.backgroundColor = `rgb(51, 53, 67)`;
    const mierLose = `./assets/fish/mier-9.png`;
    
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
                timer.style.backgroundColor = `rgb(51, 53, 67)`;
            } else {
                stopTimer();
                console.log(`you lose!`);
                playSound(fail());
                timer.style.opacity = `0`;
                keysDiv.style.opacity = `0`;
                currentFish = [];
                inputPlayer = [];
                inputGame = [];
                preloadImage(mierLose, () => {
                    mierImg.src = mierLose;
                });
                monologue.style.display = `flex`;
                monologue.style.opacity = `1`;
                monologue.textContent = randomizer(loseQuotes);
                setTimeout(() => {
                    monologue.style.opacity = `0`;
                    setTimeout(() => {
                        monologue.style.display = `none`;
                    }, 2000);
                }, 8000);
                setTimeout(() => {
                    keysDiv.innerHTML = ``;
                }, 1000);
                playBtn.textContent = `fish...`;
                playBtnAppear();
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

const putMonologue = (fish) => {
    if (fish === `bongli`) {
        return `this looks like the..<br>like the!!`;
    } else if (fish === `gigaegg`) {
        return `this fish reminds me..<br>of a certain egg person..`;
    } else if (fish === `nico`) {
        return `awww! very cute!<br>this reminds me of nico!`;
    } else if (fish === `phrog`) {
        return `hmmm... looks rather gay...<br>this reminds me of phrog!!`;
    } else if (fish === `yobu`) {
        return `cool octopus!<br>looks a lil sus though..`;
    } else if (fish === `jett`) {
        return `a bug?? this is gotta be..<br>jett!`;
    } else if (fish === `genki`) {
        return `this looks like cricket!!<br>just lacking the antlers..`;
    } else if (fish === `eight`) {
        return `why does this fish have an eight??<br>reminds me of floo's gf!!`;
    } else if (fish === `floo`) {
        return `panda fish?? this looks like erm...<br>floo.. what the flip.. u_u`;
    } else if (fish === `twelves`) {
        return `oooohh it has cute lil horns..<br>this is 12s!!`;
    } else if (fish === `partack`) {
        return `wha- partack!?!??!?<br>were there ******s under the sea???`;
    } else if (fish === `bluestrings`) {
        return `for some reason.. this reminds me of..<br>bluestrings......`;
    } else if (fish === `jelly`) {
        return `this jellyfish reminds me of..<br>a certain jelly man..`;
    } else if (fish === `truilt`) {
        return `so colorful!!<br>just like truilt!! :3`;
    } else if (fish === `kags`) {
        return `woah cool.... but i wouldnt go<br>to a sauna with this fish no way!`;
    } else if (fish === `widow`) {
        return `wha- widow!?!??!?<br>was there pho under the sea???`;
    } else if (fish === `kero`) {
        return `ghost shark!! it has a cool mask..<br>this is kero!!`;
    } else if (fish === `temer`) {
        return `woahhh!! i wonder...<br>where does it fart?? OTL`;
    } else if (fish === `vert`) {
        return `you ugly as hell!!!<br>reminds me of vert's kind...`;
    } else if (fish === `solis`) {
        return `that is horrifying...<br>just like solis!!`;
    } else if (fish === `gfr`) {
        return `a raptor!?!??!?<br>you look like you would stink..`;
    } else if (fish === `abri`) {
        return `so fat and heavy...<br>just like abri!!!`;
    } else if (fish === `lance`) {
        return `pointy fish!!<br>reminds me of someone pointy!!`;
    } else if (fish === `mier`) {
        return `woahh!! so cool!!<br>he's literally me... B]`;
    } else {
        return `Unknown fish!`;
    }
};


const startFishing = (l, r, time, f) => {
    level = l;
    rounds = r;
    currentFish.push(f);
    currentRound = 0;
    mierSlide = 0;
    mierState = 2;
    mierImg.src = `./assets/fish/mier-2.png`;
    // mierImg.style.transition = `all .5s ease;`;

    startRound(level + difficulty[3]);
    startTimer(time + difficulty[2]);

    const keyFirst = document.querySelector(`.keys img`);
    firstKeyInput = document.querySelector(`.keys img`).src.split(`/`).pop().split(`.`).shift();
    console.log("First key set to:", firstKeyInput);
    keyFirst.style.transform = `scale(1.2)`;
};

const handleKeyPress = (event) => {
    console.log(event.key);

    const mierWin = `./assets/fish/mier-11.png`;
    const mierWin2 = `./assets/fish/mier-12.png`;
    const activeFish = `./assets/fish/fish/${currentFish}Fish.png`

    // WRONG KEY
    if (event.key !== firstKeyInput && event.key !== firstKeyInput.toLowerCase()) {
        updateMistakes();
        console.log(`wrong!`);
        playSound(wrong());
        timeRemaining -= difficulty[5];
        timerText.textContent = `${Math.trunc(timeRemaining)}`;
        updateTimerBar();
        keysDiv.style.animation = `wrong .1s ease-in-out`;
        setTimeout(() => {
            keysDiv.style.animation = `none`;
        }, 100);
    }

    // RIGHT KEY
    if (event.key === firstKeyInput || event.key === firstKeyInput.toLowerCase()) {
        updateHitCount();
        console.log("correct");
        playSound(hit());
        inputPlayer.push(event.key);
        console.log(inputPlayer);

        // REMOVE FIRST KEY
        keysDiv.removeChild(keysDiv.firstChild);

        // WIN ROUND
        if (inputPlayer.length === inputGame.length) {
            currentRound++;
            playSound(reel());
            playSound(splash());
            inputPlayer = [];
            inputGame = [];
            setMier();

            if (currentRound !== rounds) {
                startRound(level + difficulty[3]); 
                timer.style.width = `50%`;
                stopTimer();
                // CF [ KEYS, ROUNDS, TIME ]
                console.log(timeRemaining);
                console.log((((fishNames[`${currentFish}`][2] * difficulty[4]) * difficulty[0]) + difficulty[1]));

                startTimer(timeRemaining + (((fishNames[`${currentFish}`][2] * difficulty[4]) * difficulty[0]) + difficulty[1]));
            // WIN LEVEL
            } else { 
                updateFishCount();
                playSound(success());
                playSound(pull());
                monologue.innerHTML = putMonologue(currentFish[0]);
                stopTimer();
                setTimeout(() => {
                    timer.style.opacity = `0`;
                }, 500);
                playBtn.textContent = `fish!!!`;
                playBtnAppear();
                fishImg.style.display = `flex`;
                setTimeout(() => {
                    fishImg.style.transform = `none`;
                }, 0);
                mierImg.style.transform = `none`;

                preloadImage(mierWin, () => {
                    mierImg.src = `./assets/fish/mier-11.png`;
                });
                preloadImage(activeFish, () => {
                    fishImg.src = activeFish;
                });
                preloadImage(mierWin2, () => {
                    setTimeout(() => {
                        mierImg.src = mierWin2;
                        fishImg.style.transform = `translateX(-6%) translateY(14.6%)`;
                        monologue.style.display = `flex`;
                        monologue.style.opacity = `1`;
                        setTimeout(() => {
                            monologue.style.opacity = `0`;
                            setTimeout(() => {
                                monologue.style.display = `none`;
                            }, 2000);
                        }, 8000);
                    }, 2500);
                });
                const cf = document.querySelector(`.${currentFish[0]}`);
                const cfImg = cf.querySelector(`img`);
                if (!cf.classList.contains(`unlocked`)) {
                    catalogBtn.src = `./assets/fish/catalogNotif.png`
                }
                cf.classList.add(`unlocked`);
                cfImg.src = `./assets/fish/fishCatalog/${currentFish}.png`;
                console.log(`you caught ${currentFish}!!`);
                unlockFish(currentFish);
                updateChances(fishNames[currentFish]);
                showPopup(currentFish, timeRemaining);
                setTimeout(() => {
                    // WIN GAME
                    if (!checkCert && !win && !cheatedStatus) {
                        winStats = [fishCaught, fishHooked, hitCount, mistakes, savedDifficulty, diffChange];
                        localStorage.setItem(`winStats`, JSON.stringify(winStats));
                        checkWin(fishContainer, 'unlocked');
                    }
                }, 4000);
            }
        }

        if (inputPlayer.length !== inputGame.length) {
            firstKeyInput = document.querySelector(`.keys img`).src.split(`/`).pop().split(`.`).shift();
            const keyFirst = document.querySelector(`.keys img`);
            keyFirst.style.transform = `scale(1.2)`;
        }
    }
};

let winCaught;
let winHooked;
let winCount;
let winMistakes;
let winDiff;
let winDiffChange;
let winStats = [];

document.addEventListener(`keydown`, (event) => {
    if (timerActive) {
        handleKeyPress(event);
    }
});

fishAll.forEach((fish, index) => {
    fish.addEventListener(`click`, () => {
        if (fish.classList.contains(`unlocked`)) {
            const selectedFish = fishObjects[index];
            if (selectedFish.stars === `★★★★★`) {
                infoStars.style.animation = `rainbow .5s ease-in-out infinite`;
            } else {
                infoStars.style.animation = `gold 2s ease-in-out infinite`;
            }
            infoStars.textContent = selectedFish.stars;
            infoImg.src = selectedFish.img;
            infoHeader.textContent = selectedFish.h;
            infoSubHeader.textContent = selectedFish.sh;
            infoDesc.innerHTML = selectedFish.desc;
            
            catalogInfo.style.display = `flex`;
        } else {
            infoImg.src = `./assets/fish/fishCatalog/locked-2.png`;
            infoStars.textContent = ``;
            infoHeader.textContent = ``;
            infoSubHeader.textContent = ``;
            infoDesc.textContent = `catch this fish first!`;
            
            catalogInfo.style.display = `flex`;
        }
    })
});

const fishObjects = [
    {
        stars: `★★★★★`,
        img: `./assets/fish/mierImg.png`,
        h: `Orca (Mier)`,
        sh: `Orcinus Orca`,
        desc: `The orca, commonly known as the killer whale, is the largest member of the dolphin family and one of the ocean's most formidable predators (just like Mier in real life). Found in all of the world's oceans, from the Arctic to the Antarctic, orcas are highly intelligent, social animals that live in tight-knit family groups called pods. They are apex predators, hunting a diverse range of prey, including abrifish, seals, partacks, and even whales. Different populations, known as "ecotypes," have specialized hunting techniques—some work together to create waves to knock seals off ice floes, while others beach themselves temporarily to catch sea lions. Their communication skills are equally impressive, with each pod developing its own unique vocal dialect.<br><br>Fun Fact: Orcas are one of the few animals known to pass down cultural knowledge through generations. Different pods have distinct hunting strategies, vocalizations, and social behaviors that are learned rather than instinctual!`
    },
    {
        stars: `★★★★★`,
        img: `./assets/fish/abriImg.png`,
        h: `Leatherback Turtle (Abri)`,
        sh: `Dermochelys Coriacea`,
        desc: `The leatherback turtle is the largest of all sea turtles, reaching up to 2.5 meters (8.2 feet) in length and weighing over 900 kg or 2,000 lbs (how did you lift this up with one hand??). Unlike other turtles, it lacks a hard shell and instead has a flexible, leathery carapace with ridges that help streamline its body for deep diving. Leatherbacks are known for their long migrations, often traveling thousands of kilometers between feeding and nesting sites. They primarily feed on jellyfish, using their sharp-edged jaws to tear through the gelatinous prey. The Leatherback Turtle also has a proclivity to put shells on their head and act as catgirls.<br><br>Fun Fact: Leatherbacks can dive deeper than 1,200 meters (3,900 feet), deeper than some whales, thanks to their unique physiology that allows them to withstand immense pressure.`,
    },
    {
        stars: `★★★★☆`,
        img: `./assets/fish/temerImg.png`,
        h: `Japanese Spider Crab (Temer)`,
        sh: `Macrocheira Kaempferi`,
        desc: `The Japanese spider crab has the longest leg span of any arthropod, reaching up to 12 feet (3.7 meters). Found in deep waters near Japan, these crabs are scavengers, feeding on decaying matter and small marine animals. Despite their fearsome appearance, they are relatively gentle creatures.<br><br>Fun Fact: Japanese spider crabs can live for over 100 years, making them one of the longest-living arthropods. OTL=3`,
    },
    {
        stars: `★★☆☆☆`,
        img: `./assets/fish/12sImg.png`,
        h: `Horned Blenny (12s)`,
        sh: `Parablennius Intermedius`,
        desc: `The horned blenny is a small, bottom-dwelling fish with fleshy, horn-like appendages above its eyes, commonly mistaken for goat horns by marine biologists. These fish are commonly found in rocky tide pools and coral reefs, where they use their excellent camouflage to avoid predators. They primarily feed on algae and small invertebrates.<br><br>Fun Fact: Horned blennies can survive for short periods out of water by breathing through their skin.`,
    },
    {
        stars: `★☆☆☆☆`,
        img: `./assets/fish/jellyImg.png`,
        h: `Cannonball Jellyfish (Sr_Jelly)`,
        sh: `Stomolophus Meleagris`,
        desc: `The Cannonball Jellyfish, also known as the Cabbagehead Jellyfish, is a species commonly found in the warm coastal waters of the western Atlantic and the Gulf of Mexico. It gets its name from its round, firm, dome-shaped bell, which can grow up to 25 cm (10 inches) in diameter. Unlike many jellyfish species, the Cannonball Jellyfish has very short tentacles, relying instead on a dense cluster of oral arms beneath its bell to capture plankton and small fish. These jellyfish play a crucial role in marine ecosystems, serving as a food source for sea turtles and certain large fish species.<br><br>Fun Fact: Cannonball Jellyfish produce a toxin that, while harmless to humans, can stun small fish and crustaceans, making them easier to catch. Their mucus is also used in certain traditional Asian medicines and cosmetics!`,
    },
    {
        stars: `★★☆☆☆`,
        img: `./assets/fish/flooImg.png`,
        h: `Panda Banggai Cardinalfish (Floo)`,
        sh: `Pterapogon Kauderni`,
        desc: `The Panda Banggai Cardinalfish is a small, strikingly patterned fish native to the Banggai Islands of Indonesia and Texas. Known for its bold black-and-white coloration and elongated fins, it closely resembles a panda in its markings. Unlike many marine fish, it does not undergo a larval stage in the open ocean. Instead, it has a unique reproductive strategy: males incubate fertilized eggs in their mouths (mouthbrooding) until the fully formed fry are ready to swim freely. This species prefers shallow seagrass beds, coral reefs, and mangrove habitats, where it forms small groups for protection against predators. Unfortunately, due to overfishing for the aquarium trade and habitat destruction, the Panda Banggai Cardinalfish is now considered an endangered species. Contrary to popular belief, the Panda Banggai Cardinalfish does not eat bamboo.<br><br>Fun Fact: The Panda Banggai Cardinalfish is one of the few marine fish species that exhibit direct parental care, with the male carrying the eggs in his mouth for about 20 days, ensuring their safety until hatching! Just like Floo in real life.`,
    },
    {
        stars: `★☆☆☆☆`,
        img: `./assets/fish/eightImg.png`,
        h: `Bubble Eye Goldfish (800)`,
        sh: `Carassius Auratus`,
        desc: `The Bubble Eye goldfish is a unique and delicate variety of fancy goldfish, characterized by the fluid-filled sacs under its eyes. These sacs grow larger as the fish matures and are incredibly fragile, making them one of the most sensitive goldfish breeds. Originally bred in China, Bubble Eye goldfish lack a dorsal fin, giving them a distinct appearance and affecting their swimming ability. They require calm water conditions with no sharp objects, as even the slightest puncture to their eye sacs can lead to infections or other health complications.<br><br>Fun Fact: If a Bubble Eye goldfish’s sacs are accidentally punctured, they can regenerate over time, although they may not grow back to their original size or shape! Just like 800 in real life.`,
    },
    {
        stars: `★★★★★`,
        img: `./assets/fish/vertImg.png`,
        h: `Goblin Shark (Vert)`,
        sh: `Mitsukurina Owstoni`,
        desc: `The goblin shark is a deep-sea species often referred to as a "living fossil" due to its lineage dating back over 125 million years. It has an elongated, flat snout packed with electroreceptors that help detect prey in the dark depths of the ocean. When attacking, its jaw extends outward rapidly to snatch prey using a specialized ligament mechanism (Vert does this in real life too). Goblin sharks are rarely seen by humans and mostly reside in deep waters around 1,200 meters (3,900 feet) below the surface.<br><br>Fun Fact: The goblin shark's jaw can extend up to 8.6% of its body length, one of the most extreme jaw protrusions in the animal kingdom. Just like Vert in real life.`,
    },
    {
        stars: `★★★★☆`,
        img: `./assets/fish/partackImg.png`,
        h: `Fiordland Penguin (Partack)`,
        sh: `Eudyptes Pachyrhynchus`,
        desc: `The Tawaki, or Fiordland penguin, is a rare and secretive species of crested penguin native to the rugged coastlines and temperate rainforests of New Zealand’s South Island and Wales. Unlike most penguins that inhabit open tundras or icy landscapes, Tawaki prefer dense forests and rocky fjords, making them one of the most elusive penguin species. They have distinctive yellow crests above their eyes, similar to other crested penguins, and are known for their excellent swimming and diving abilities, hunting small fish, squid, and crustaceans in the cold waters of the Southern Ocean. Their breeding sites are well hidden among thick vegetation or caves, providing natural protection from predators. The Fiordland Penguin also have a tendency to eat [REDACTED].<br><br>Fun Fact: Tawaki are one of the least-studied penguin species, and their secretive nature has led scientists to nickname them the "forest-dwelling penguins." Unlike most penguins that waddle in large groups, Tawaki often nest in isolated pairs deep within coastal rainforests!`,
    },
    {
        stars: `★★★★★`,
        img: `./assets/fish/keroImg.png`,
        h: `Ghost Shark (Kero)`,
        sh: `Callorhinchus Milii`,
        desc: `Ghost sharks, also called chimaeras, are deep-sea relatives of sharks and rays. They have a smooth, scaleless body and a long, whip-like tail. Unlike true sharks, they have a single gill opening and rely on grinding plates instead of sharp teeth to crush prey like mollusks and crustaceans. These mysterious fish inhabit depths of over 2,500 meters (8,200 feet). Ghost Sharks are also known to befriend frogs living in the area to establish a sort of symbiosis.<br><br>Fun Fact: Ghost sharks have retractable sexual organs on their foreheads, which they use during mating.`,
    },
    {
        stars: `★☆☆☆☆`,
        img: `./assets/fish/nicoImg.png`,
        h: `Sea Bunny (Nico)`,
        sh: `Jorunna Parva`,
        desc: `This adorable sea slug resembles a fluffy bunny due to its ear-like rhinophores (sensory organs) and velvety fur-like texture. Found in the Indo-Pacific, sea bunnies are tiny (about 1 inch long) and belong to the nudibranch family. Their soft-looking “fur” is actually tiny structures called caryophyllidia, which help them sense their surroundings. Though some have tried and failed miserably, no, Sea Bunnies are not suitable alternatives for candles.<br><br>Fun Fact: Despite their cute appearance, sea bunnies are toxic and absorb toxins from their sponge diet, making them unpalatable to predators.`,
    },
    {
        stars: `★★★★★`,
        img: `./assets/fish/lanceImg.png`,
        h: `Swordfish (Lance)`,
        sh: `Xiphias Gladius`,
        desc: `One of the fastest fish in the ocean, swordfish can reach speeds of up to 60 mph or 97 km/h (just like Lance in real life). Their long, flat bill is used to slash at schools of fish, stunning prey before eating them. Unlike most fish, they lack scales and teeth as adults. Swordfish are highly migratory and are found in both tropical and temperate oceans. Swordfish can also sometimes be seen using shells and mollusks as body armor.<br><br>Fun Fact: Swordfish can heat their eyes and brain, allowing them to see better in the cold, dark depths where they hunt.`,
    },
    {
        stars: `★★★☆☆`,
        img: `./assets/fish/genkiImg.png`,
        h: `Dumbo Octopus (Cricket)`,
        sh: `Grimpoteuthis Bathynectes`,
        desc: `Named after Disney’s Dumbo due to its ear-like fins (and how much of a dumb dumb Genki is), the Dumbo octopus lives in the deep ocean at depths of up to 7,000 meters (23,000 feet). Unlike most octopuses, it doesn’t use jet propulsion to move but instead flaps its ear-like fins to glide through the water. It primarily feeds on crustaceans and worms by swallowing them whole.<br><br>Fun Fact: Dumbo octopuses are one of the few octopus species that lack an ink sac, as they have almost no natural predators in their deep-sea environment.`,
    },
    {
        stars: `★★★★☆`,
        img: `./assets/fish/widowImg.png`,
        h: `Axolotl (Widow)`,
        sh: `Ambystoma Mexicanum`,
        desc: `The axolotl is a neotenic salamander, meaning it retains its larval features throughout its life instead of undergoing metamorphosis. Native to lakes in Mexico and Texas, it has remarkable regenerative abilities, capable of regrowing limbs, spinal cords, and even parts of its heart and brain. Due to habitat destruction and pollution, axolotls are critically endangered in the wild. The axolotl is also widely believed to be Black.<br><br>Fun Fact: Unlike most amphibians, axolotls remain aquatic their entire lives, never developing functional lungs like their relatives.`
    },
    {
        stars: `★☆☆☆☆`,
        img: `./assets/fish/bongliImg.png`,
        h: `Blobfish ([the])`,
        sh: `Psychrolutes Marcidus`,
        desc: `The blobfish, often called the "world’s ugliest animal," is a deep-sea fish found at depths of 600 to 1,200 meters (2,000 to 3,900 feet) off the coasts of Australia and New Zealand. It has a gelatinous body with minimal muscle (just like Bongli in real life), which helps it withstand the extreme pressure of the deep ocean. When brought to the surface, its body decompresses, giving it a saggy, blob-like appearance (just like Bongli in real life). However, in its natural habitat, it looks more like a regular fish.<br><br>Fun Fact: Unlike most fish, the blobfish doesn’t have a swim bladder. Instead, its body is slightly less dense than water, allowing it to float just above the seafloor with minimal effort.`,
    },
    {
        stars: `★☆☆☆☆`,
        img: `./assets/fish/gigaeggImg.png`,
        h: `Boxfish (Gigaegg)`,
        sh: `Ostraciidae`,
        desc: `Boxfish are small, cube-shaped fish found in coral reefs. Their bodies are encased in a bony armor (just like Gigaegg in real life), making them resistant to predators. They move slowly but are highly maneuverable, using precise fin movements. When threatened, some species release a toxic mucus that can poison nearby fish.<br><br>Fun Fact: The aerodynamic shape of the boxfish inspired the design of some cars, many of which are patented by Gigaegg, including the Mercedes-Benz Bionic concept car.`,
    },
    {
        stars: `★★☆☆☆`,
        img: `./assets/fish/yobuImg.png`,
        h: `Blue-Ringed Octopus (Yobu)`,
        sh: `Hapalochlaena Lunulata`,
        desc: `Despite its suspiciously small size (5–8 inches), the blue-ringed octopus is among one of the most sus venomous marine creatures. Among its features, Its iridescent blue rings serve as a warning to predators, as it carries a deadly neurotoxin called tetrodotoxin, among which is 1,200 times more potent than cyanide. A single bite can cause paralysis and respiratory failure to among us humans. Found among tide pools and coral reefs across the Pacific and Indian Oceans, this octopus preys among crustaceans using its venom to immobilize them.<br><br>Fun Fact: Among years upon its discovery, There has been no known antidote for the blue-ringed octopus's venom, making immediate artificial respiration among the only way to survive a bite.`,
    },
    {
        stars: `★★★★☆`,
        img: `./assets/fish/kagsImg.png`,
        h: `Bluespotted Ribbontail Ray (Kags)`,
        sh: `Taeniura Lymma`,
        desc: `The Bluespotted Ribbontail Ray is a strikingly colorful stingray found in the shallow coral reefs and sandy seabeds of the Indo-Pacific and Finland. Its bright blue spots serve as a warning to predators about its venomous tail spines, which it uses for self-defense. Unlike larger rays, this species is relatively small, typically reaching around 35 cm (14 inches) in width. It is an opportunistic feeder, using its electroreceptors to detect prey like crabs, shrimp, and small fish buried in the sand. Despite their beauty, Bluespotted Ribbontail Rays are often shy and prefer to flee rather than fight when approached by divers or predators. The Bluespotted Ribbontail Ray have also been reported to have poked the rears of many unsuspecting divers, causing horrific and painful deaths.<br><br>Fun Fact: This ray has a unique way of swimming—rather than undulating like most stingrays, it flaps its pectoral fins in a wave-like motion, making it resemble a bird "flying" underwater!`,
    },
    {
        stars: `★★★★☆`,
        img: `./assets/fish/jettImg.png`,
        h: `Giant Isopod (Jett)`,
        sh: `Bathynomus Giganteus`,
        desc: `Giant isopods are deep-sea crustaceans that can grow up to 50 cm (20 inches) long (unlike Jett in real life), making them one of the largest isopods in existence. They are scavengers that feed on dead whales, fish, and other organic material that falls to the ocean floor. Due to their slow metabolism, they can survive for long periods without food. The Isopod also have different races and have had many infighting for their insignificant differences.<br><br>Fun Fact: A giant isopod at a Japanese aquarium went for five years without eating, surviving entirely on stored energy.`,
    },
    {
        stars: `★★★☆☆`,
        img: `./assets/fish/truiltImg.png`,
        h: `Rosy-Scales Fairy Wrasse (Truilt)`,
        sh: `Cirrhilabrus Rubrisquamis`,
        desc: `This small, colorful fish is found in the deep reefs of the Indian Ocean. Males have a striking red and pink coloration, which intensifies during courtship displays. Wrasses are known for their social hierarchies, where dominant males control harems of females (Just like Truilt in real life). The Wrasse are also known to have an distinctive tendency to have a schizotypal personality<br><br>Fun Fact: Like many wrasses, this species can change sex from female to male if the dominant male is removed.`,
    },
    {
        stars: `★★☆☆☆`,
        img: `./assets/fish/phrogImg.png`,
        h: `Red-Lipped Batfish (Phrog)`,
        sh: `Ogcocephalus Darwini`,
        desc: `The red-lipped batfish is a bizarre and gay looking fish found around the Galápagos Islands at depths of 10 to 120 meters (30 to 400 feet). Its most distinctive feature is its bright red lips, looking like a gay man with lipstick on, which scientists believe may play a role in attracting gay mates (Just like Phrog in real life). The red-lipped batfish have an unusual sexual proclivity to homosexual relations (Just like Phrog in real life). Unlike most fish, it is a poor swimmer (Just like Phrog in real life) and instead uses its modified pectoral fins to "walk" along the ocean floor. This bottom-dweller preys on small fish, crustaceans, and marine worms.<br><br>Fun Fact: Despite being a fish, the red-lipped batfish prefers walking over swimming and has evolved a specialized structure on its head called an illicium, which acts like a lure to attract prey.`,
    },
    {
        stars: `★★★★★`,
        img: `./assets/fish/gfrImg.png`,
        h: `Saltwater Crocodile (GFR)`,
        sh: `Crocodylus Porosus`,
        desc: `The saltwater crocodile is the largest living reptile, growing up to 7 meters (23 feet) long and weighing over 1,000 kg (2,200 lbs). It is a highly adaptable apex predator, capable of living in freshwater, saltwater and the sewers. These crocodiles are ambush hunters, using their powerful jaws to crush prey, including fish, birds, and even large mammals, then proceed to fart in pleasure as they consume prey.<br><br>Fun Fact: Saltwater crocodiles can hold their breath for over an hour, allowing them to stalk prey undetected.`,
    },
    {
        stars: `★★★☆☆`,
        img: `./assets/fish/bluestringsImg.png`,
        h: `Whitemargin Unicornfish (Bluestrings)`,
        sh: `Naso Annulatus`,
        desc: `This species of surgeonfish gets its name from the small, horn-like protrusion on its forehead, resembling a unicorn, though it would wish it were a bull instead. Found in tropical reefs, it is a fast swimmer and primarily feeds on algae. Unicornfish have sharp, scalpel-like spines near their tails, which they use for defense.<br><br>Fun Fact: The "horn" on a unicornfish doesn’t appear until they mature, and its exact function remains unknown.`,
    },
    {
        stars: `★★★★★`,
        img: `./assets/fish/solisImg.png`,
        h: `Anglerfish (Solis)`,
        sh: `Lophiiformes`,
        desc: `Anglerfish are deep-sea predators known for their eerie appearance (Just like Solis in real life) and bioluminescent lure. Found in some of the ocean’s darkest depths, these fish have a unique adaptation—a fleshy, glowing appendage called an esca that dangles from their heads, attracting unsuspecting prey. This lure is produced by symbiotic bacteria that generate light, helping the anglerfish hunt efficiently in the pitch-black deep sea. With oversized mouths and expandable stomachs (Just like Solis in real life), anglerfish can consume prey nearly as large as themselves, making them highly effective ambush predators. One of the most bizarre aspects of anglerfish biology is their reproductive strategy. In some species, males are significantly smaller than females (Just like Solis in real life) and fuse permanently to their mates, relying on them for nutrients while providing sperm in return. This extreme form of parasitic mating ensures reproduction in an environment where encounters between individuals are rare.<br><br>Fun Fact: Some anglerfish species live more than a mile below the ocean’s surface, where the pressure is over 1,000 times greater than at sea level—yet they survive and thrive in this extreme environment!`
    },
];

const x = document.querySelector(`.x`);
const x2 = document.querySelector(`.x2`);

const catalogBtn = document.querySelector(`.catalog-btn`);
const settingsBtn = document.querySelector(`.settings-btn`);

const settings = document.querySelector(`.settings-container`);
const catalog = document.querySelector(`.catalog`);
const catalogInfo = document.querySelector(`.fish-info`);

const overlay = document.querySelector(`.overlay`);

let currentMenu;

const showMenu = (menu) => {
    if (currentMenu === menu) {
        menu.style.display = `none`;
        overlay.classList.add(`hidden`);
        currentMenu = null;
    } else  {
        if (currentMenu) {
            currentMenu.style.display = `none`;
        }
        menu.style.display = `flex`;
        overlay.classList.remove(`hidden`)
        currentMenu = menu;
    }
}

catalogBtn.addEventListener(`click`, () => {
    showMenu(catalog);
    catalogBtn.src = `./assets/fish/catalog.png`;
});

settingsBtn.addEventListener(`click`, () => {
    showMenu(settings);
});

x.addEventListener(`click`, () => {
    catalogInfo.style.display = `none`;
});

x2.addEventListener(`click`, () => {
    showMenu(settings);
});

const unlockFish = (fish) => {
    const fishEl = document.querySelector(`.fish.${fish}`);
    fishEl.classList.add(`unlocked`);
    let unlockedFish = JSON.parse(localStorage.getItem(`unlockedFish`)) || [];
    if (!unlockedFish.includes(fish)) {
        unlockedFish.push(fish);
    }
    localStorage.setItem(`unlockedFish`, JSON.stringify(unlockedFish));
};

const resetBtn = document.querySelector(`.reset-button`);

resetBtn.addEventListener(`click`, () => {
    localStorage.removeItem('unlockedFish');
    localStorage.removeItem('fishPool');
    localStorage.removeItem('fishCaught');
    localStorage.removeItem('fishHooked');
    localStorage.removeItem('diffChange');
    localStorage.removeItem('hitCount');
    localStorage.removeItem('mistakes');
    localStorage.removeItem('cheatedStatus');
    localStorage.removeItem('win');
    fishAll.forEach((fish) => {
        fish.classList.remove(`unlocked`);

        const img = fish.querySelector(`img`);
        img.src = `./assets/fish/fishCatalog/locked.png`;
    });
    location.reload();
});

if (false) {
    startTimer(fish + difficulty[2])
    timeRemaining + (((fishNames[`${currentFish}`][2] * difficulty[4]) * difficulty[0]) + difficulty[1])
    MULTIPLIER || GUARANTEED_BONUS_TIME || EXTRA_TIME || EXTRA_KEYS || MULTIPLIER_2 || MISTAKE_DEDUCTION
}

let difficulty = [2.2,  1.0,  2.0,  2,  0.10,  1.00];

let easy =     [2.6,  1.1,  5.0,  1,  0.15,  0.75];
let medium =   [2.2,  1.0,  3.0,  2,  0.10,  1.00];
let hard =     [1.8,  0.9,  1.5,  2,  0.10,  1.50];
let insane =   [1.4,  0.8,  1.0,  3,  0.09,  2.00];

const difficultyBtns = document.querySelectorAll(`.difficulties button`);
const diffTooltip = document.querySelector(`.diff-tooltip`);

const easyTooltip = document.querySelector(`.easyTooltip`);
const mediumTooltip = document.querySelector(`.mediumTooltip`);
const hardTooltip = document.querySelector(`.hardTooltip`);
const insaneTooltip = document.querySelector(`.insaneTooltip`);
const easyDiff = document.querySelector(`.easy`);
const mediumDiff = document.querySelector(`.medium`);
const hardDiff = document.querySelector(`.hard`);
const insaneDiff = document.querySelector(`.insane`);

const difficulties = {
    easy: easy,
    medium: medium,
    hard: hard,
    insane: insane,
};

const difficultiesObj = [
    {
        lvl: `.easy`,
        tooltip: `.easy-tooltip`,
    },
    {
        lvl: `.medium`,
        tooltip: `.medium-tooltip`,
    },
    {
        lvl: `.hard`,
        tooltip: `.hard-tooltip`,
    },
    {
        lvl: `.insane`,
        tooltip: `.insane-tooltip`,
    },
];

difficultiesObj.forEach(({ lvl, tooltip }) => {
    const btn = document.querySelector(lvl);
    const tip = document.querySelector(tooltip)

    btn.addEventListener(`click`, () => {
        difficultyBtns.forEach((btn) => {
            btn.classList.remove(`current-difficulty`);
        })
        btn.classList.add(`current-difficulty`);
        const diff = btn.classList[0]
        difficulty = difficulties[diff];
        updateDiffCount();
        difficultyShow.textContent = `difficulty: ${diff}`
        localStorage.setItem('selectedDifficulty', diff);
    });

    btn.addEventListener(`mouseenter`, () => {
        tip.style.display = `flex`;
    });
    
    btn.addEventListener(`mouseleave`, () => {
        tip.style.display = `none`;
    });

    btn.addEventListener(`mousemove`, (event) => {
        const tooltipWidth = tip.offsetWidth;
        const tooltipHeight = tip.offsetHeight;
        tip.style.left = `${event.pageX - tooltipWidth / 2}px`;
        tip.style.top = `${event.pageY - tooltipHeight - 5}px`;
    });
})

// [ LEVEL (1-6) - ROUNDS - TIME - NAME ]

//EASY
const nico =    [2, 3, 4, `nico`];
const eight =   [2, 3, 4, `eight`];
const bongli =  [2, 4, 4, `bongli`];
const jelly =   [3, 4, 4, `jelly`];
const phrog =   [2, 3, 4, `phrog`];
const gigaegg = [2, 3, 4, `gigaegg`];
const yobu =    [2, 5, 4, `yobu`];
const floo =    [3, 3, 4, `floo`];
const genki =   [3, 4, 4, `genki`];
const twelves = [3, 4, 4, `twelves`];
const truilt =  [3, 5, 4, `truilt`];

//MEDIUM
const bs =      [4, 6, 7, `bluestrings`];
const kags =    [5, 6, 7, `kags`];
const jett =    [5, 7, 7, `jett`];
const partack = [2, 12, 4, `partack`];
const widow = [3, 10, 4, `widow`];
const temer =   [6, 8, 9, `temer`];

//INSANE
const kero =  [6, 5, 6, `kero`];
const solis = [6, 9, 8, `solis`];
const abri =  [6, 12, 9, `abri`];
const vert =  [6, 7, 7, `vert`];
const lance = [1, 8, 1, `lance`];
const gfr =   [6, 8, 7, `gfr`];
const mier =  [7, 15, 10, `mier`];


const fishNames = {
    bongli: bongli,
    gigaegg: gigaegg,
    nico: nico,
    phrog: phrog,
    yobu: yobu,
    jett: jett,
    genki: genki,
    eight: eight,
    mier: mier,
    floo: floo,
    twelves: twelves,
    partack: partack,
    bluestrings: bs,
    truilt: truilt,
    jelly: jelly,
    kags: kags,
    solis: solis,
    lance: lance,
    widow: widow,
    temer: temer,
    vert: vert,
    kero: kero,
    gfr: gfr,
    abri: abri
};

const fishPool = [
    { fish: bongli,  chance: 5 },
    { fish: eight,   chance: 5 },
    { fish: jelly,   chance: 5 },
    { fish: nico,    chance: 5 },
    { fish: phrog,   chance: 5 },
    { fish: gigaegg, chance: 5 },
    { fish: yobu,    chance: 5 },
    { fish: floo,    chance: 5 },
    { fish: genki,   chance: 5 },
    { fish: truilt,  chance: 5 },
    { fish: twelves, chance: 5 },
    
    { fish: bs,      chance: 2 },
    { fish: jett,    chance: 2 },
    { fish: partack, chance: 2 },
    { fish: kags,    chance: 2 },
    { fish: temer,   chance: 2 },
    { fish: widow,   chance: 2 },
    
    { fish: kero,    chance: .75 },
    { fish: solis,   chance: .75 },
    { fish: abri,    chance: .75 },
    { fish: vert,    chance: .75 },
    { fish: lance,   chance: .75 },
    { fish: gfr,     chance: .75 },
    { fish: mier,    chance: .75 },
];
 

const selectFish = () => {
    const totalWeight = fishPool.reduce((sum, { chance }) => sum + chance, 0);
    const random = Math.random() * totalWeight;

    let cumulativeWeight = 0;
    for (let i = 0; i < fishPool.length; i++) {
        cumulativeWeight += fishPool[i].chance;
        if (random < cumulativeWeight) {
            return fishPool[i].fish;
        }
    }
};

const updateChances = (fishCaught) => {
    for (let i = 0; i < fishPool.length; i++) {
        if (fishPool[i].fish[3] === fishCaught[3]) {
            fishPool[i].chance = Math.max(0.1, fishPool[i].chance / 2);
            break;
        }
    }
    localStorage.setItem('fishPool', JSON.stringify(fishPool));
};

playBtn.addEventListener(`click`, () => {
    if (timerActive) { return }
    currentFish = [];
    timer.style.backgroundColor = `rgb(51, 53, 67)`;
    mierImg.style.transform = `none`;
    mierImg.src = `./assets/fish/mier-0.png`
    fishImg.style.transform = `none`;
    fishImg.style.display = `none`;
    fishImg.src = ``;
    playBtnDisappear();
    playSound(start());
    setTimeout(() => {
        mierImg.src = `./assets/fish/mier-1.png`
        playSound(takebait());
        updateFishHooked();
        setTimeout(() => {
            const selected = selectFish();
            startFishing(...selected);
            console.log(...selected);
            // startFishing(...bs);
        }, 700);
    // }, (Math.trunc(Math.random() * 10) + 5) * 1000);
    }, 0);
});

const bird = document.querySelector(`.bird`)

setInterval(() => {
    bird.src = `./assets/fish/bird-0.png`
    setTimeout(() => {
        bird.src = `./assets/fish/bird-1.png`
    }, 500);
}, 3000);

const birdFly = () => {
    bird.style.transition = `none`;
    bird.style.right = `-10vw`;

    setTimeout(() => {
        bird.style.transition = `all 15s ease-in-out`;
        bird.style.right = `110vw`;
    }, 50);
};

setInterval(() => {
    birdFly();
}, 25000);

birdFly();

const cloud0 = document.querySelector(`.cloud-0`);
const cloud1 = document.querySelector(`.cloud-1`);
const cloud2 = document.querySelector(`.cloud-2`);

const clouds = [cloud0, cloud1, cloud2];

const cloudMove = () => {
    const currentCloud = randomizer(clouds);
    currentCloud.style.transition = `all 40s`;
    setTimeout(() => {
        currentCloud.style.left = `100vw`;
    }, 1);
    setTimeout(() => {
        currentCloud.style.transition = `none`;
        currentCloud.style.left = `-80vw`;
    }, 50000);
}

setInterval(() => {
    cloudMove();
}, 50000);

cloudMove();

let beachFX;
let pullFX;
let reelFX;
let splashFX;
let startFX;
let takebaitFX;
let successFX0;
let successFX1;
let successFX2;
let successFX3;
let successFX4;
let failFX;
let hitFX;
let wrongFX;
let laughFX0;
let laughFX1;

const beach = () => {
    beachFX = new Audio('./assets/fish/audio/beach.mp3');
    beachFX.loop = true;
    beachFX.preload = "auto";
    beachFX.play();
};

const beachStop = () => {
    if (beachFX) {
        beachFX.pause();
        beachFX.currentTime = 0;
    }
};

const pull = () => {
    pullFX = new Audio('./assets/fish/audio/pull.mp3');
    pullFX.preload = "auto";
    return pullFX;
};

const reel = () => {
    reelFX = new Audio('./assets/fish/audio/reel.mp3');
    reelFX.preload = "auto";
    return reelFX;
};

const splash = () => {
    splashFX = new Audio('./assets/fish/audio/splash.mp3');
    splashFX.preload = "auto";
    return splashFX;
};

const takebait = () => {
    takebaitFX = new Audio('./assets/fish/audio/takebait.mp3');
    takebaitFX.preload = "auto";
    return takebaitFX;
};

const start = () => {
    startFX = new Audio('./assets/fish/audio/start.mp3');
    startFX.preload = "auto";
    return startFX;
};

const success = () => {
    successFX0 = new Audio('./assets/fish/audio/success0.mp3');
    successFX1 = new Audio('./assets/fish/audio/success1.mp3');
    successFX2 = new Audio('./assets/fish/audio/success2.mp3');
    successFX3 = new Audio('./assets/fish/audio/success3.mp3');
    successFX4 = new Audio('./assets/fish/audio/success4.mp3');
    successFX0.preload = "auto";
    successFX1.preload = "auto";
    successFX2.preload = "auto";
    successFX3.preload = "auto";
    successFX4.preload = "auto";
    const successFX = [successFX0, successFX1, successFX2, successFX3, successFX4,]
    return randomizer(successFX);
};

const fail = () => {
    failFX = new Audio('./assets/fish/audio/fail.mp3');
    failFX.preload = "auto";
    return failFX;
};

const hit = () => {
    hitFX = new Audio('./assets/fish/audio/hit.wav');
    hitFX.preload = "auto";
    return hitFX;
};

const wrong = () => {
    wrongFX = new Audio('./assets/fish/audio/wrong.mp3');
    wrongFX.preload = "auto";
    return wrongFX;
};

const laugh0 = () => {
    laughFX0 = new Audio('./assets/fish/audio/laugh0.mp3');
    laughFX0.preload = "auto";
    return laughFX0;
};

const laugh1 = () => {
    laughFX1 = new Audio('./assets/fish/audio/laugh1.mp3');
    laughFX1.preload = "auto";
    return laughFX1;
};

// const musicBtn = document.querySelector(`.music`);
// let music = true;

// musicBtn.addEventListener(`click`, () => {
//     if (music) {
//         musicBtn.src = `./assets/fish/musicnone.png`;
//         music = false;
//     } else {
//         musicBtn.src = `./assets/fish/music.png`;
//         music = true;
//     }
// });

const sfxBtn = document.querySelector(`.sfx`);
let sfx = true;

sfxBtn.addEventListener(`click`, () => {
    if (sfx) {
        sfxBtn.src = `./assets/fish/soundnone.png`;
        sfx = false;
        beachStop();
    } else {
        sfxBtn.src = `./assets/fish/sound.png`;
        sfx = true;
        beach();
    }
});

const playSound = (sound) => {
    if (sfx) {
        sound.play();
    }
};

const cheatTxt = document.querySelector(`.cheat-text`);
const unlockBtn = document.querySelector(`.unlock-button`);

cheatTxt.addEventListener(`input`, () => {
    if (cheatTxt.value === `im a stupid cheater`) {
        unlockBtn.style.backgroundColor = `white`;
        unlockBtn.style.pointerEvents = `all`;
    } else {
        unlockBtn.style.backgroundColor = `rgb(123, 130, 144)`;
        unlockBtn.style.pointerEvents = `none`;
    }
});

unlockBtn.addEventListener(`click`, () => {
    if (cheatTxt.value === `im a stupid cheater`) {
        cheatedToggle();
        unlockBtn.textContent = `lol`;
        let unlockedFish = JSON.parse(localStorage.getItem(`unlockedFish`)) || [];
        fishAll.forEach((fish) => {
            fish.classList.add(`unlocked`);
    
            const img = fish.querySelector(`img`);
            img.src = `./assets/fish/fishCatalog/${fish.classList[1]}.png`;
    
            const fishIdentifier = fish.classList[1];
            if (!unlockedFish.includes(fishIdentifier)) {
                unlockedFish.push(fishIdentifier);
            }
        });
        localStorage.setItem(`unlockedFish`, JSON.stringify(unlockedFish));
    }
});

const fishCaughtEl = document.querySelector(`.fish-caught`);
const fishHookedEl = document.querySelector(`.fish-hooked`);

let fishCaught = 0;
let fishHooked = 0;

const updateFishCount = () => {
    fishCaught++;
    fishCaughtEl.textContent = `fish caught: ${fishCaught}`;
    localStorage.setItem(`fishCaught`, JSON.stringify(fishCaught));
};

const updateFishHooked = () => {
    fishHooked++;
    fishHookedEl.textContent = `fish hooked: ${fishHooked}`;
    localStorage.setItem(`fishHooked`, JSON.stringify(fishHooked));
};

const hitCountEl = document.querySelector(`.hit-count`);
const mistakesEl = document.querySelector(`.mistakes`);
const diffChangeEl = document.querySelector(`.difficulty-change-count`);

let hitCount = 0;
let mistakes = 0;
let diffChange = 0;

const updateHitCount = () => {
    hitCount++;
    hitCountEl.textContent = `hit count: ${hitCount}`;
    localStorage.setItem(`hitCount`, JSON.stringify(hitCount));
}

const updateMistakes = () => {
    mistakes++;
    mistakesEl.textContent = `mistakes: ${mistakes}`;
    localStorage.setItem(`mistakes`, JSON.stringify(mistakes));
}

const difficultyShow = document.querySelector(`.difficulty-show`);

const updateDiffCount = () => {
    diffChange++;
    diffChangeEl.textContent = `difficulty change count: ${diffChange}`;
    localStorage.setItem(`diffChange`, JSON.stringify(diffChange));
}

const cheated = document.querySelector(`.cheated`);
cheated.style.color = `red`;
cheated.style.fontWeight = `bolder`;
cheated.style.fontSize = `3vh`;
cheated.style.textShadow = `-3px 3px 0px rgba(16, 46, 135, 0.333)`;
let cheatedStatus = false;

const cheatedToggle = () => {
    cheated.style.display = `flex`;
    cheatedStatus = true;
    localStorage.setItem(`cheatedStatus`, JSON.stringify(cheatedStatus));
}

const unlockedFish = JSON.parse(localStorage.getItem(`unlockedFish`)) || [];
const savedFishPool = JSON.parse(localStorage.getItem(`fishPool`));
const savedFishCaught = JSON.parse(localStorage.getItem(`fishCaught`));
const savedFishHooked = JSON.parse(localStorage.getItem(`fishHooked`));
const savedHitCount = JSON.parse(localStorage.getItem(`hitCount`));
const savedMistakes = JSON.parse(localStorage.getItem(`mistakes`));
const savedDiffChange = JSON.parse(localStorage.getItem(`diffChange`));
const savedCheatedStatus = JSON.parse(localStorage.getItem(`cheatedStatus`));
const savedWin = JSON.parse(localStorage.getItem(`win`));
const savedWinStats = JSON.parse(localStorage.getItem(`winStats`));
const savedDifficulty = localStorage.getItem(`selectedDifficulty`);

const loadProgress = () => {
    if (savedCheatedStatus) {
        cheatedToggle();
    }

    if (savedDifficulty) {
        difficultyShow.textContent = `difficulty: ${savedDifficulty}`;
        const savedButton = document.querySelector(`.${savedDifficulty}`);
        if (savedButton) {
            difficultyBtns.forEach((btn) => {
                btn.classList.remove(`current-difficulty`);
            })
            savedButton.classList.add(`current-difficulty`);
            difficulty = difficulties[savedDifficulty]; 
        }
    }

    if (savedDiffChange) {
        diffChange = savedDiffChange;
        diffChangeEl.textContent = `difficulty change count: ${savedDiffChange}`;
    }

    if (savedFishPool) {
        fishPool.splice(0, fishPool.length, ...savedFishPool);
    }

    if (savedFishCaught) {
        fishCaught = savedFishCaught;
        fishCaughtEl.textContent = `fish caught: ${savedFishCaught}`;
    }

    if (savedFishHooked) {
        fishHooked = savedFishHooked;
        fishHookedEl.textContent = `fish hooked: ${savedFishHooked}`;
    }

    if (savedHitCount) {
        hitCount = savedHitCount;
        hitCountEl.textContent = `hit count: ${savedHitCount}`;
    }

    if (savedMistakes) {
        mistakes = savedMistakes;
        mistakesEl.textContent = `mistakes: ${savedMistakes}`;
    }

    if (savedWin) {
        win = savedWin;
    }

    if (savedWinStats) {
        winStats = savedWinStats;
    }

    unlockedFish.forEach((fish) => {
        const fishEl = document.querySelector(`.fish.${fish}`);
        if (fishEl) {
            fishEl.classList.add(`unlocked`);
        }
        const fishCatalogueImg = document.querySelector(`.${fish} img`);
        fishCatalogueImg.src = `./assets/fish/fishCatalog/${fish}.png`;
    });
};

// const saveProgress = () => {
//     localStorage.setItem(`fishPool`, JSON.stringify(fishPool));
//     localStorage.setItem(`unlockedFish`, JSON.stringify(unlockedFish));
// }

loadProgress();

const certificate = document.querySelector(`.congrats-container`);
const congrats = document.querySelector(`.congrats-txt`);
let checkCert = false;

const checkWin = (parent, classList) => {
    const children = parent.children 
    const allUnlocked = Array.from(children).every(child => child.classList.contains(classList));
    if (allUnlocked) {
        checkCert = true;
        win = true;
        localStorage.setItem(`win`, JSON.stringify(win));
        const hitPerc = (winStats[0] / winStats[1]) * 100;
        const hitPerc2 = (winStats[2] / (winStats[3] + winStats[2])) * 100;
        congrats.innerHTML = `congrats! you have caught all fish!<br>
        at the time you caught all of them you had:<br>
        <br>
        you caught ${winStats[0]} out of ${winStats[1]} fishes hooked! (${hitPerc.toFixed(2)}%)<br>
        you hit ${winStats[2]} out of ${winStats[2] + winStats[3]} keys! (${hitPerc2.toFixed(2)}%)<br>
        you've beat the game on ${winStats[4]}<br>
        and changed the difficulty ${winStats[5]} times!<br>
        <br>
        ${parseFloat(hitPerc.toFixed(2)) >= 86.76 &&
        parseFloat(hitPerc2.toFixed(2)) >= 98.94 &&
        winStats[4] === 'insane' &&
        winStats[5] === 0
        ? 'you have bested me...<br>good job hehe :3'
        : 'good work!'}`;

        certificate.style.display = `flex`;
        setTimeout(() => {
            certificate.style.opacity = `1`;
        }, 1);

        document.addEventListener('mousedown', () => {
            certificate.style.opacity = `0`;
            setTimeout(() => {
                certificate.style.display = `none`;
            }, 2000);
        });
    } else {
        console.log(`you havent gotten all of them yet!`);
    }
}

if (win && !cheatedStatus) {
    checkWin(fishContainer, 'unlocked');
}

localStorage.setItem(`!!! i see you`, JSON.stringify(`you lil cheater lol`));

const preloadAssets = (assets, onComplete) => {
    let loadedCount = 0;
    const totalAssets = assets.length;

    assets.forEach(asset => {
        const img = new Image();
        img.src = asset;
        img.onload = () => {
            loadedCount++;
            console.log(`Loaded: ${asset}`);
            if (loadedCount === totalAssets) {
                finishLoading();
            }
        };
        img.onerror = () => {
            console.error(`Failed to load: ${asset}`);
        };
    });
};


let startBeach = false;
const menu = document.querySelector(`.menu`);
const startTxt = document.querySelector(`.start`);
const counterContainer = document.querySelector(`.counter-container`);

const preloadAudio = (audioFiles, onComplete) => {
    let loadedCount = 0;
    const totalAudio = audioFiles.length;

    audioFiles.forEach(audioSrc => {
        const audio = new Audio(audioSrc);
        audio.preload = "auto";
        audio.oncanplaythrough = () => {
            loadedCount++;
            console.log(`Loaded audio: ${audioSrc}`);
            if (loadedCount === totalAudio) {
                finishLoading();
            }
        };
        audio.onerror = () => {
            console.error(`Failed to load audio: ${audioSrc}`);
        };
    });
};

const audioToLoad = [
    `./assets/fish/audio/hit.wav`,
    `./assets/fish/audio/fail.mp3`,
    `./assets/fish/audio/pull.mp3`,
    `./assets/fish/audio/reel.mp3`,
    `./assets/fish/audio/splash.mp3`,
    `./assets/fish/audio/start.mp3`,
    `./assets/fish/audio/takebait.mp3`,
    `./assets/fish/audio/wrong.mp3`,
    `./assets/fish/audio/beach.mp3`,
    `./assets/fish/audio/success0.mp3`,
    `./assets/fish/audio/success1.mp3`,
    `./assets/fish/audio/success2.mp3`,
    `./assets/fish/audio/success3.mp3`,
    `./assets/fish/audio/success4.mp3`,
];


const assetsToLoad = [
    `./assets/fish/W.png`,
    `./assets/fish/A.png`,
    `./assets/fish/S.png`,
    `./assets/fish/D.png`,
    `./assets/fish/ArrowUp.png`,
    `./assets/fish/ArrowLeft.png`,
    `./assets/fish/ArrowDown.png`,
    `./assets/fish/ArrowRight.png`,
    `./assets/fish/fish/mierFish.png`,
    `./assets/fish/fish/abriFish.png`,
    `./assets/fish/fish/flooFish.png`,
    `./assets/fish/fish/eightFish.png`,
    `./assets/fish/fish/vertFish.png`,
    `./assets/fish/fish/yobuFish.png`,
    `./assets/fish/fish/phrogFish.png`,
    `./assets/fish/fish/lanceFish.png`,
    `./assets/fish/fish/nicoFish.png`,
    `./assets/fish/fish/jellyFish.png`,
    `./assets/fish/fish/temerFish.png`,
    `./assets/fish/fish/twelvesFish.png`,
    `./assets/fish/fish/bongliFish.png`,
    `./assets/fish/fish/gigaeggFish.png`,
    `./assets/fish/fish/jettFish.png`,
    `./assets/fish/fish/genkiFish.png`,
    `./assets/fish/fish/widowFish.png`,
    `./assets/fish/fish/keroFish.png`,
    `./assets/fish/fish/partackFish.png`,
    `./assets/fish/fish/kagsFish.png`,
    `./assets/fish/fish/bluestringsFish.png`,
    `./assets/fish/fish/truiltFish.png`,
    `./assets/fish/fish/solisFish.png`,
    `./assets/fish/fish/gfrFish.png`,
    `./assets/fish/mier-0.png`,
    `./assets/fish/mier-1.png`,
    `./assets/fish/mier-2.png`,
    `./assets/fish/mier-3.png`,
    `./assets/fish/mier-4.png`,
    `./assets/fish/mier-5.png`,
    `./assets/fish/mier-6.png`,
    `./assets/fish/mier-7.png`,
    `./assets/fish/mier-9.png`,
    `./assets/fish/mier-10.png`,
    `./assets/fish/mier-11.png`,
    `./assets/fish/mier-12.png`,
];

preloadAudio(audioToLoad);
preloadAssets(assetsToLoad);
let loadCount = 0

const finishLoading = () => {
    loadCount++
    if (loadCount === 2) {
        console.log('All assets preloaded!');
        startTxt.textContent = `click to start!`
        document.addEventListener('mousedown', () => {
            startGame();
        }, { once: true });
    }
}

const startGame = () => {
    if (!startBeach) {
        beach();
        playBtn.style.top = `20vh`;
        menu.style.right = `2.5vh`;
        counterContainer.style.left = `2.5vh`;
        startTxt.style.opacity = `0`;
        setTimeout(() => {
            startTxt.style.display = `none`;
        }, 2000);
        startBeach = true;
    }
};