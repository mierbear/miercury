'use strict';

const sec = 1000;

const fishAll = document.querySelectorAll(`.fish`);
const infoImg = document.querySelector(`.info-img`);
const infoHeader = document.querySelector(`.info-header`);
const infoSubHeader = document.querySelector(`.info-sub-header`);
const infoDesc = document.querySelector(`.info-description`);


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
let currentFish = [];
let currentRound;
let rounds;
let level;
let extraLife = false;
let mierState = 0;
let mierSlide = 0;

const randomizer = (arr) => {
    return arr[Math.trunc((Math.random() * arr.length))];
};

const addKeys = (count) => {
    for (let i = 0; i < count; i++) {
        inputGame.push(randomizer(keys));
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

const playBtnAppear = () => {
    playBtn.style.pointerEvents = `all`;
    playBtn.style.display = `flex`;
    setTimeout(() => {
        playBtn.style.opacity = `1`;
    }, 1000);
}

const playBtnDisappear = () => {
    playBtn.style.pointerEvents = `none`;
    playBtn.style.opacity = `0`;
    setTimeout(() => {
        playBtn.style.display = `none`;
    }, 2000);
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
    timerText.textContent = `${Math.trunc(timeRemaining)}`;
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
                currentFish = [];
                inputPlayer = [];
                inputGame = [];
                mierImg.src = `./assets/fish/mier-9.png`
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

const startFishing = (l, r, time, f) => {
    level = l;
    rounds = r;
    currentFish.push(f);
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
                startTimer(timeRemaining + extraTime[0]) + ((timeRemaining + extraTime[0]) * extraTime[1]);
            // WIN LEVEL
            } else { 
                stopTimer();
                setTimeout(() => {
                    timer.style.opacity = `0`;
                }, 500);
                playBtn.textContent = `fish!!!`;
                playBtnAppear();
                mierImg.style.transform = `none`;
                mierImg.src = `./assets/fish/mier-8.png`;
                const cf = document.querySelector(`.${currentFish[0]}`);
                const cfImg = cf.querySelector(`img`);
                cf.classList.add(`unlocked`);
                cfImg.src = `./assets/fish/placeholder.png`; //REPLACE
                console.log(`you caught a ${currentFish}!!`);
                unlockFish(currentFish);
                updateChances(fishNames[currentFish]);
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

fishAll.forEach((fish, index) => {
    fish.addEventListener(`click`, () => {
        if (fish.classList.contains(`unlocked`)) {
            const selectedFish = fishObjects[index];
            infoImg.src = selectedFish.img;
            infoHeader.textContent = selectedFish.h;
            infoSubHeader.textContent = selectedFish.sh;
            infoDesc.textContent = selectedFish.desc;
            
            catalogInfo.style.display = `flex`;
        } else {
            infoImg.src = ``;
            infoHeader.textContent = `???`;
            infoSubHeader.textContent = `???`;
            infoDesc.textContent = `???`;
            
            catalogInfo.style.display = `flex`;
        }
    })
});

const fishObjects = [
{
    img: `./assets/fish/mierImg.png`,
    h: `Orca (Mier)`,
    sh: `Orcinus Orca`,
    desc: `The orca, commonly known as the killer whale, is the largest member of the dolphin family and one of the ocean's most formidable predators. Found in all of the world's oceans, from the Arctic to the Antarctic, orcas are highly intelligent, social animals that live in tight-knit family groups called pods. They are apex predators, hunting a diverse range of prey, including fish, seals, penguins, and even whales. Different populations, known as "ecotypes," have specialized hunting techniques—some work together to create waves to knock seals off ice floes, while others beach themselves temporarily to catch sea lions. Their communication skills are equally impressive, with each pod developing its own unique vocal dialect. Fun Fact: Orcas are one of the few animals known to pass down cultural knowledge through generations. Different pods have distinct hunting strategies, vocalizations, and social behaviors that are learned rather than instinctual!`
},
{
    img: `./assets/fish/abriImg.png`,
    h: `Leatherback Turtle (Abri)`,
    sh: `Dermochelys Coriacea`,
    desc: `The leatherback turtle is the largest of all sea turtles, reaching up to 2.5 meters (8.2 feet) in length and weighing over 900 kg (2,000 lbs). Unlike other turtles, it lacks a hard shell and instead has a flexible, leathery carapace with ridges that help streamline its body for deep diving. Leatherbacks are known for their long migrations, often traveling thousands of kilometers between feeding and nesting sites. They primarily feed on jellyfish, using their sharp-edged jaws to tear through the gelatinous prey. Fun Fact: Leatherbacks can dive deeper than 1,200 meters (3,900 feet), deeper than some whales, thanks to their unique physiology that allows them to withstand immense pressure.`,
},
{
    img: `./assets/fish/temerImg.png`,
    h: `Japanese Spider Crab (Temer)`,
    sh: `Macrocheira Kaempferi`,
    desc: `The Japanese spider crab has the longest leg span of any arthropod, reaching up to 12 feet (3.7 meters). Found in deep waters near Japan, these crabs are scavengers, feeding on decaying matter and small marine animals. Despite their fearsome appearance, they are relatively gentle creatures. Fun Fact: Japanese spider crabs can live for over 100 years, making them one of the longest-living arthropods.`,
},
{
    img: `./assets/fish/12sImg.png`,
    h: `Horned Blenny (12s)`,
    sh: `Parablennius Intermedius`,
    desc: `The horned blenny is a small, bottom-dwelling fish with fleshy, horn-like appendages above its eyes. These fish are commonly found in rocky tide pools and coral reefs, where they use their excellent camouflage to avoid predators. They primarily feed on algae and small invertebrates. Fun Fact: Horned blennies can survive for short periods out of water by breathing through their skin.`,
},
{
    img: `./assets/fish/jellyImg.png`,
    h: `Cannonball Jellyfish (Sr_Jelly)`,
    sh: `Stomolophus Meleagris`,
    desc: `The Cannonball Jellyfish, also known as the Cabbagehead Jellyfish, is a species commonly found in the warm coastal waters of the western Atlantic and the Gulf of Mexico. It gets its name from its round, firm, dome-shaped bell, which can grow up to 25 cm (10 inches) in diameter. Unlike many jellyfish species, the Cannonball Jellyfish has very short tentacles, relying instead on a dense cluster of oral arms beneath its bell to capture plankton and small fish. These jellyfish play a crucial role in marine ecosystems, serving as a food source for sea turtles and certain large fish species. Fun Fact: Cannonball Jellyfish produce a toxin that, while harmless to humans, can stun small fish and crustaceans, making them easier to catch. Their mucus is also used in certain traditional Asian medicines and cosmetics!`,
},
{
    img: `./assets/fish/flooImg.png`,
    h: `Skeleton Panda Sea Squirt (Floo)`,
    sh: `Clavelina Ossipandae`,
    desc: `The skeleton panda sea squirt is a rare type of tunicate that gets its name from its ghostly white and black appearance, resembling a panda. These tiny marine organisms attach themselves to reefs and filter-feed by drawing in water and extracting plankton. Although they look like a single organism, they are colonial animals, meaning each visible "panda" is part of a larger interconnected system of individual units working together. Fun Fact: Sea squirts are more closely related to vertebrates (including humans) than most other marine invertebrates because they belong to the phylum Chordata, sharing key embryonic traits with vertebrates.`,
},
{
    img: `./assets/fish/800Img.png`,
    h: `Bubble Eye Goldfish (800)`,
    sh: `Carassius Auratus`,
    desc: `The Bubble Eye goldfish is a unique and delicate variety of fancy goldfish, characterized by the fluid-filled sacs under its eyes. These sacs grow larger as the fish matures and are incredibly fragile, making them one of the most sensitive goldfish breeds. Originally bred in China, Bubble Eye goldfish lack a dorsal fin, giving them a distinct appearance and affecting their swimming ability. They require calm water conditions with no sharp objects, as even the slightest puncture to their eye sacs can lead to infections or other health complications. Fun Fact: If a Bubble Eye goldfish’s sacs are accidentally punctured, they can regenerate over time, although they may not grow back to their original size or shape!`,
},
{
    img: `./assets/fish/vertImg.png`,
    h: `Goblin Shark (Vert)`,
    sh: `Mitsukurina Owstoni`,
    desc: `The goblin shark is a deep-sea species often referred to as a "living fossil" due to its lineage dating back over 125 million years. It has an elongated, flat snout packed with electroreceptors that help detect prey in the dark depths of the ocean. When attacking, its jaw extends outward rapidly to snatch prey using a specialized ligament mechanism. Goblin sharks are rarely seen by humans and mostly reside in deep waters around 1,200 meters (3,900 feet) below the surface. Fun Fact: The goblin shark's jaw can extend up to 8.6% of its body length, one of the most extreme jaw protrusions in the animal kingdom.`,
},
{
    img: `./assets/fish/partackImg.png`,
    h: `Fiordland Penguin`,
    sh: `Eudyptes Pachyrhynchus`,
    desc: `The Tawaki, or Fiordland penguin, is a rare and secretive species of crested penguin native to the rugged coastlines and temperate rainforests of New Zealand’s South Island. Unlike most penguins that inhabit open tundras or icy landscapes, Tawaki prefer dense forests and rocky fjords, making them one of the most elusive penguin species. They have distinctive yellow crests above their eyes, similar to other crested penguins, and are known for their excellent swimming and diving abilities, hunting small fish, squid, and crustaceans in the cold waters of the Southern Ocean. Their breeding sites are well hidden among thick vegetation or caves, providing natural protection from predators. Fun Fact: Tawaki are one of the least-studied penguin species, and their secretive nature has led scientists to nickname them the "forest-dwelling penguins." Unlike most penguins that waddle in large groups, Tawaki often nest in isolated pairs deep within coastal rainforests!`,
},
{
    img: `./assets/fish/keroImg.png`,
    h: `Ghost Shark (Kero)`,
    sh: `Callorhinchus Milii`,
    desc: `Ghost sharks, also called chimaeras, are deep-sea relatives of sharks and rays. They have a smooth, scaleless body and a long, whip-like tail. Unlike true sharks, they have a single gill opening and rely on grinding plates instead of sharp teeth to crush prey like mollusks and crustaceans. These mysterious fish inhabit depths of over 2,500 meters (8,200 feet). Fun Fact: Ghost sharks have retractable sexual organs on their foreheads, which they use during mating.`,
},
{
    img: `./assets/fish/nicoImg.png`,
    h: `Sea Bunny (Nico)`,
    sh: `Jorunna Parva`,
    desc: `This adorable sea slug resembles a fluffy bunny due to its ear-like rhinophores (sensory organs) and velvety fur-like texture. Found in the Indo-Pacific, sea bunnies are tiny (about 1 inch long) and belong to the nudibranch family. Their soft-looking “fur” is actually tiny structures called caryophyllidia, which help them sense their surroundings. Fun Fact: Despite their cute appearance, sea bunnies are toxic and absorb toxins from their sponge diet, making them unpalatable to predators.`,
},
{
    img: `./assets/fish/lanceImg.png`,
    h: `Swordfish (Lance)`,
    sh: `Xiphias Gladius`,
    desc: `One of the fastest fish in the ocean, swordfish can reach speeds of up to 60 mph (97 km/h). Their long, flat bill is used to slash at schools of fish, stunning prey before eating them. Unlike most fish, they lack scales and teeth as adults. Swordfish are highly migratory and are found in both tropical and temperate oceans. Fun Fact: Swordfish can heat their eyes and brain, allowing them to see better in the cold, dark depths where they hunt.`,
},
{
    img: `./assets/fish/genkiImg.png`,
    h: `Flapjack Octopus (Cricket)`,
    sh: `Opisthoteuthis Californiana`,
    desc: `The Flapjack octopus is a deep-sea cephalopod known for its soft, gelatinous body and adorable, cartoonish appearance. It belongs to the umbrella octopus family, meaning it has a web of skin connecting its arms, allowing it to spread out like a parachute when gliding through the water. Unlike more active hunters, the Flapjack octopus is a passive ambush predator, hovering just above the ocean floor and using its webbed arms to trap small crustaceans and other invertebrates. This species resides at depths of 500 to 1,500 meters (1,600–4,900 feet), where the pressure is immense, and light is scarce. Fun Fact: The Flapjack octopus served as inspiration for the popular Pokémon character Omanyte and also resembles the animated character Pearl from Finding Nemo!`,
},
{
    img: `./assets/fish/widowImg.png`,
    h: `Axolotl (Widow)`,
    sh: `Ambystoma Mexicanum`,
    desc: `The axolotl is a neotenic salamander, meaning it retains its larval features throughout its life instead of undergoing metamorphosis. Native to lakes in Mexico, it has remarkable regenerative abilities, capable of regrowing limbs, spinal cords, and even parts of its heart and brain. Due to habitat destruction and pollution, axolotls are critically endangered in the wild. Fun Fact: Unlike most amphibians, axolotls remain aquatic their entire lives, never developing functional lungs like their relatives.`
},
{
    img: `./assets/fish/bongliImg.png`,
    h: `Blobfish ([the])`,
    sh: `Psychrolutes Marcidus`,
    desc: `The blobfish, often called the "world’s ugliest animal," is a deep-sea fish found at depths of 600 to 1,200 meters (2,000 to 3,900 feet) off the coasts of Australia and New Zealand. It has a gelatinous body with minimal muscle, which helps it withstand the extreme pressure of the deep ocean. When brought to the surface, its body decompresses, giving it a saggy, blob-like appearance. However, in its natural habitat, it looks more like a regular fish. Fun Fact: Unlike most fish, the blobfish doesn’t have a swim bladder. Instead, its body is slightly less dense than water, allowing it to float just above the seafloor with minimal effort.`,
},
{
    img: `./assets/fish/gigaeggImg.png`,
    h: `Boxfish (Gigaegg)`,
    sh: `Ostraciidae`,
    desc: `Boxfish are small, cube-shaped fish found in coral reefs. Their bodies are encased in a bony armor, making them resistant to predators. They move slowly but are highly maneuverable, using precise fin movements. When threatened, some species release a toxic mucus that can poison nearby fish. Fun Fact: The aerodynamic shape of the boxfish inspired the design of some cars, including the Mercedes-Benz Bionic concept car.`,
},
{
    img: `./assets/fish/yobuImg.png`,
    h: `Blue-Ringed Octopus (Yobu)`,
    sh: `Hapalochlaena Lunulata`,
    desc: `Despite its small size (5–8 inches), the blue-ringed octopus is one of the most venomous marine creatures. Its iridescent blue rings serve as a warning to predators, as it carries a deadly neurotoxin called tetrodotoxin, which is 1,200 times more potent than cyanide. A single bite can cause paralysis and respiratory failure in humans. Found in tide pools and coral reefs across the Pacific and Indian Oceans, this octopus preys on crustaceans using its venom to immobilize them. Fun Fact: There is no known antidote for the blue-ringed octopus's venom, making immediate artificial respiration the only way to survive a bite.`,
},
{
    img: `./assets/fish/kagsImg.png`,
    h: `Bluespotted Ribbontail Ray (Kags)`,
    sh: `Taeniura Lymma`,
    desc: `The Bluespotted Ribbontail Ray is a strikingly colorful stingray found in the shallow coral reefs and sandy seabeds of the Indo-Pacific. Its bright blue spots serve as a warning to predators about its venomous tail spines, which it uses for self-defense. Unlike larger rays, this species is relatively small, typically reaching around 35 cm (14 inches) in width. It is an opportunistic feeder, using its electroreceptors to detect prey like crabs, shrimp, and small fish buried in the sand. Despite their beauty, Bluespotted Ribbontail Rays are often shy and prefer to flee rather than fight when approached by divers or predators. Fun Fact: This ray has a unique way of swimming—rather than undulating like most stingrays, it flaps its pectoral fins in a wave-like motion, making it resemble a bird "flying" underwater!`,
},
{
    img: `./assets/fish/jettImg.png`,
    h: `Giant Isopod (Jett)`,
    sh: `Bathynomus Giganteus`,
    desc: `Giant isopods are deep-sea crustaceans that can grow up to 50 cm (20 inches) long, making them one of the largest isopods in existence. They are scavengers that feed on dead whales, fish, and other organic material that falls to the ocean floor. Due to their slow metabolism, they can survive for long periods without food. Fun Fact: A giant isopod at a Japanese aquarium went for five years without eating, surviving entirely on stored energy.`,
},
{
    img: `./assets/fish/truiltImg.png`,
    h: `Rosy-Scales Fairy Wrasse (Truilt)`,
    sh: `Cirrhilabrus Rubrisquamis`,
    desc: `This small, colorful fish is found in the deep reefs of the Indian Ocean. Males have a striking red and pink coloration, which intensifies during courtship displays. Wrasses are known for their social hierarchies, where dominant males control harems of females. Fun Fact: Like many wrasses, this species can change sex from female to male if the dominant male is removed.`,
},
{
    img: `./assets/fish/phrogImg.png`,
    h: `Red-Lipped Batfish (Phrog)`,
    sh: `Ogcocephalus Darwini`,
    desc: `The red-lipped batfish is a bizarre-looking fish found around the Galápagos Islands at depths of 10 to 120 meters (30 to 400 feet). Its most distinctive feature is its bright red lips, which scientists believe may play a role in attracting mates. Unlike most fish, it is a poor swimmer and instead uses its modified pectoral fins to "walk" along the ocean floor. This bottom-dweller preys on small fish, crustaceans, and marine worms. Fun Fact: Despite being a fish, the red-lipped batfish prefers walking over swimming and has evolved a specialized structure on its head called an illicium, which acts like a lure to attract prey.`,
},
{
    img: `./assets/fish/gfrImg.png`,
    h: `Saltwater Crocodile (GFR)`,
    sh: `Crocodylus Porosus`,
    desc: `The saltwater crocodile is the largest living reptile, growing up to 7 meters (23 feet) long and weighing over 1,000 kg (2,200 lbs). It is a highly adaptable apex predator, capable of living in both freshwater and saltwater. These crocodiles are ambush hunters, using their powerful jaws to crush prey, including fish, birds, and even large mammals. Fun Fact: Saltwater crocodiles can hold their breath for over an hour, allowing them to stalk prey undetected.`,
},
{
    img: `./assets/fish/bluestringsImg.png`,
    h: `Whitemargin Unicornfish (Bluestrings)`,
    sh: `Naso Annulatus`,
    desc: `This species of surgeonfish gets its name from the small, horn-like protrusion on its forehead, resembling a unicorn. Found in tropical reefs, it is a fast swimmer and primarily feeds on algae. Unicornfish have sharp, scalpel-like spines near their tails, which they use for defense. Fun Fact: The "horn" on a unicornfish doesn’t appear until they mature, and its exact function remains unknown.`,
},
{
    img: `./assets/fish/solisImg.png`,
    h: `Telescope Fish (Solis)`,
    sh: `Gigantura Chuni`,
    desc: `Telescope fish are deep-sea predators with tubular eyes that allow them to detect bioluminescent prey. Unlike most fish, their eyes point forward rather than to the sides, giving them an excellent depth perception in the darkness of the deep ocean. They can expand their jaws to swallow prey whole, even those larger than themselves. Fun Fact: Telescope fish can rotate their eyes to look upward while swimming horizontally, helping them spot prey above them.`,
},
];

const musicBtn = document.querySelector(`.music`);
const sfxBtn = document.querySelector(`.sfx`);
let music = true;
let sfx = true;

musicBtn.addEventListener(`click`, () => {
    if (music) {
        musicBtn.src = `./assets/fish/musicnone.png`;
        music = false;
    } else {
        musicBtn.src = `./assets/fish/music.png`;
        music = true;
    }
});

sfxBtn.addEventListener(`click`, () => {
    if (sfx) {
        sfxBtn.src = `./assets/fish/soundnone.png`;
        sfx = false;
    } else {
        sfxBtn.src = `./assets/fish/sound.png`;
        sfx = true;
    }
});


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

const unlockBtn = document.querySelector(`.unlock-button`);

unlockBtn.addEventListener(`click`, () => {
    let unlockedFish = JSON.parse(localStorage.getItem(`unlockedFish`)) || [];

    fishAll.forEach((fish) => {
        fish.classList.add(`unlocked`);

        const img = fish.querySelector(`img`);
        img.src = `./assets/fish/placeholder.png`;

        const fishIdentifier = fish.classList[1];
        if (!unlockedFish.includes(fishIdentifier)) {
            unlockedFish.push(fishIdentifier);
        }
    });
    localStorage.setItem(`unlockedFish`, JSON.stringify(unlockedFish));
});

const resetBtn = document.querySelector(`.reset-button`);

resetBtn.addEventListener(`click`, () => {
    localStorage.removeItem('unlockedFish');
    localStorage.removeItem('fishPool');
    fishAll.forEach((fish) => {
        fish.classList.remove(`unlocked`);

        const img = fish.querySelector(`img`);
        img.src = `./assets/fish/placeholder2.png`;
    });
});

let extraTime = [2, .5];

let easy =   [2.5, .7];
let medium = [2, .5];
let hard =   [1.5, .3];
let insane = [1, .2];

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
        extraTime = difficulties[diff];
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
        tip.style.top = `${event.pageY - tooltipHeight}px`;
    });
})

// [ LEVEL (1-6) - ROUNDS - TIME - NAME ]

//EASY
const bongli =  [1, 1, 30, `bongli`];
const gigaegg = [1, 2, 10, `gigaegg`];
const nico =    [1, 2, 10, `nico`];
const phrog =   [1, 3, 10, `phrog`];

//MEDIUM
const yobu =  [2, 3, 8, `yobu`];
const jett =  [3, 4, 10, `jett`];
const genki = [2, 3, 8, `genki`];
const eight = [4, 2, 15, `eight-hundred`];

//HARD
const floo =    [3, 3, 8, `floo`];
const twelves = [4, 4, 7, `twelves`];
const partack = [4, 6, 12, `partack`];
const bs =      [4, 4, 10, `bluestrings`];
const truilt =  [3, 4, 7, `truilt`];
const jelly =   [3, 6, 14, `jelly`];
const kags =    [6, 4, 10, `kags`];
const solis =   [5, 7, 10, `solis`];

//INSANE
const lance = [1, 8, 5, `lance`];
const widow = [1, 12, 8, `widow`];
const temer = [6, 7, 8, `temer`];
const vert =  [6, 7, 12, `vert`];
const kero =  [6, 5, 8, `kero`];
const gfr =   [6, 10, 12, `gfr`];
const abri =  [6, 12, 10, `abri`];
const mier =  [6, 15, 10, `mier`];

const fishNames = {
    bongli: bongli,
    gigaegg: gigaegg,
    nico: nico,
    phrog: phrog,
    yobu: yobu,
    jett: jett,
    genki: genki,
    eight_hundred: eight,
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
    { fish: bongli,  chance: 10 },
    { fish: gigaegg, chance: 10 },
    { fish: nico,    chance: 10 },
    { fish: phrog,   chance: 10 },
    { fish: yobu,    chance: 10 },
    { fish: jett,    chance: 10 },
    { fish: genki,   chance: 10 },
    { fish: eight,   chance: 10 },
    { fish: floo,    chance: 10 },
    { fish: twelves, chance: 10 },
    { fish: partack, chance: 10 },
    { fish: jelly,   chance: 10 },
    { fish: bs,      chance: 6 },
    { fish: truilt,  chance: 6 },
    { fish: kags,    chance: 6 },
    { fish: solis,   chance: 4 },
    { fish: temer,   chance: 4 },
    { fish: kero,    chance: 4 },
    { fish: lance,   chance: 3 },
    { fish: widow,   chance: 3 },
    { fish: vert,    chance: 3 },
    { fish: gfr,     chance: 3 },
    { fish: abri,    chance: 2 },
    { fish: mier,    chance: 2 },
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
            fishPool[i].chance = Math.max(1, fishPool[i].chance / 2);
            break;
        }
    }
    localStorage.setItem('fishPool', JSON.stringify(fishPool));
};

playBtn.addEventListener(`click`, () => {
    if (timerActive) { return }
    currentFish = [];
    mierImg.style.transform = `none`;
    mierImg.src = `./assets/fish/mier-0.png`
    playBtnDisappear();
    setTimeout(() => {
        mierImg.src = `./assets/fish/mier-1.png`
        setTimeout(() => {
            startFishing(...gigaegg);
            // startFishing(...selectFish());
        }, 1000);
    // }, (Math.trunc(Math.random() * 10) + 5) * 1000);
    }, 0);
    // startFishing(1, 2, 20);
});

const loadProgress = () => {
    const unlockedFish = JSON.parse(localStorage.getItem(`unlockedFish`)) || [];
    const savedFishPool = JSON.parse(localStorage.getItem(`fishPool`));
    const savedDifficulty = localStorage.getItem(`selectedDifficulty`);
    localStorage.setItem(`fishPool`, JSON.stringify(fishPool));

    if (savedDifficulty) {
        const savedButton = document.querySelector(`.${savedDifficulty}`);
        if (savedButton) {
            difficultyBtns.forEach((btn) => {
                btn.classList.remove(`current-difficulty`);
            })
            savedButton.classList.add(`current-difficulty`);
            extraTime = difficulties[savedDifficulty]; 
        }
    }

    unlockedFish.forEach((fish) => {
        const fishEl = document.querySelector(`.fish.${fish}`);
        if (fishEl) {
            fishEl.classList.add(`unlocked`);
        }
        const fishImg = document.querySelector(`.${fish} img`);
        fishImg.src = `./assets/fish/placeholder.png`; //REPLACE
    });

    if (savedFishPool) {
        fishPool.splice(0, fishPool.length, ...savedFishPool);
    }
};

loadProgress();
