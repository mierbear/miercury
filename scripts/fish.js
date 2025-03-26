'use strict';

const sec = 1000;

const settingsBtn = document.querySelector(`.settings-btn`);
const catalogBtn = document.querySelector(`.catalog-btn`);
const settings = document.querySelector(`.settings`);
const catalog = document.querySelector(`.catalog`);
const catalogInfo = document.querySelector(`.fish-info`);
const x = document.querySelector(`.x`);

let catalogShow = false;
let catalogInfoShow = false;
let settingsShow = false;

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
let extraLife = true;
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
                const cf = document.querySelector(`.${currentFish[0]}`); //abri
                const cfImg = cf.querySelector(`img`);
                cf.classList.add(`unlocked`);
                cfImg.src = `./assets/fish/placeholder.png`;
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
            startFishing(1, 2, 8, `abri`);
        }, 1000);
    // }, (Math.trunc(Math.random() * 10) + 5) * 1000);
    }, 0);
    // startFishing(1, 2, 20);
});

catalogBtn.addEventListener(`click`, () => {
    if (catalogShow) {
        catalog.style.display = `none`;
        catalogShow = false;
    } else {
        catalog.style.display = `flex`;
        catalogShow = true;
    }
});

x.addEventListener(`click`, () => {
    if (catalogInfoShow) {
        catalogInfo.style.display = `none`;
        catalogInfoShow = false;
    } else {
        catalogInfo.style.display = `flex`;
        catalogInfoShow = true;
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
            catalogInfoShow = true;
        } else {
            infoImg.src = ``;
            infoHeader.textContent = `???`;
            infoSubHeader.textContent = `???`;
            infoDesc.textContent = `???`;
            
            catalogInfo.style.display = `flex`;
            catalogInfoShow = true;
        }
    })
});

const fishObjects = [
{
    img: `./assets/fish/mierImg.png`,
    h: `Sea Angel (Mier)`,
    sh: `Clione Limacina`,
    desc: `Sea angels are small, translucent marine gastropods that belong to the clade Gymnosomata. Unlike typical snails, they lack a shell and have wing-like appendages called parapodia, which they use to gracefully "fly" through the water. They are found in polar and subarctic waters, often thriving in cold oceanic environments. Despite their delicate, almost ethereal appearance, sea angels are ferocious predators, feeding primarily on their close relatives, the shelled pteropods (commonly known as "sea butterflies"). They use specialized tentacle-like structures to latch onto their prey, extracting their soft bodies with a surprising level of efficiency. Fun Fact: Sea angels produce a chemical compound that acts as a natural antifreeze, allowing them to survive in icy waters where other creatures would freeze.`,
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
    h: ``,
    sh: ``,
    desc: ``,
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