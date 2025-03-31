'use strict';

const sec = 1000;

const fishAll = document.querySelectorAll(`.fish`);
const infoStars = document.querySelector(`.stars`);
const infoImg = document.querySelector(`.info-img`);
const infoHeader = document.querySelector(`.info-header`);
const infoSubHeader = document.querySelector(`.info-sub-header`);
const infoDesc = document.querySelector(`.info-description`);
const popup = document.querySelector(`.popup-container`);
const popupText = document.querySelector(`.popup-text`);

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

const showPopup = (fish) => {
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
    setTimeout(() => {
        popup.style.opacity = `0`;
        setTimeout(() => {
            popup.style.display = `none`;
        }, 2000);
    }, 2000);
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
    playBtn.style.pointerEvents = `all`;
    playBtn.style.display = `flex`;
    setTimeout(() => {
        playBtn.style.opacity = `1`;
    }, 1000);
}

const playBtnDisappear = () => {
    playBtn.style.pointerEvents = `none`;
    playBtn.style.opacity = `0`;
    // setTimeout(() => {
    //     playBtn.style.display = `none`;
    // }, 2000);
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
    // mierImg.style.transition = `all .5s ease;`;

    startRound(level + difficulty[3]);
    startTimer(time + difficulty[2]);

    const keyFirst = document.querySelector(`.keys img`);
    firstKeyInput = document.querySelector(`.keys img`).src.split(`/`).pop().split(`.`).shift();
    console.log("First key set to:", firstKeyInput);
    keyFirst.style.transform = `scale(1.2)`;
};

const handleKeyPress = (event) => {
    const keyAll = document.querySelectorAll(`.keys img`);
    console.log(event.key);

    const mierWin = `./assets/fish/mier-11.png`;
    const mierWin2 = `./assets/fish/mier-12.png`;
    const activeFish = `./assets/fish/fish/${currentFish}Fish.png`

    // WRONG KEY
    if (event.key !== firstKeyInput && event.key !== firstKeyInput.toLowerCase()) {
        console.log(`wrong!`);
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
                startRound(level + difficulty[3]); 
                timer.style.width = `50%`;
                stopTimer();
                // CF [ KEYS, ROUNDS, TIME ]
                console.log(timeRemaining);
                console.log((((fishNames[`${currentFish}`][2] * difficulty[4]) * difficulty[0]) + difficulty[1]));

                startTimer(timeRemaining + (((fishNames[`${currentFish}`][2] * difficulty[4]) * difficulty[0]) + difficulty[1]));
            // WIN LEVEL
            } else { 
                stopTimer();
                setTimeout(() => {
                    timer.style.opacity = `0`;
                }, 500);
                playBtn.textContent = `fish!!!`;
                playBtnAppear();
                // mierImg.style.transition = `none`;
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
                    }, 2000);
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
                showPopup(currentFish);
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
            infoStars.textContent = selectedFish.stars;
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
    stars: `★★★★★`,
    img: `./assets/fish/mierImg.png`,
    h: `Orca (Mier)`,
    sh: `Orcinus Orca`,
    desc: `The orca, commonly known as the killer whale, is the largest member of the dolphin family and one of the ocean's most formidable predators. Found in all of the world's oceans, from the Arctic to the Antarctic, orcas are highly intelligent, social animals that live in tight-knit family groups called pods. They are apex predators, hunting a diverse range of prey, including fish, seals, penguins, and even whales. Different populations, known as "ecotypes," have specialized hunting techniques—some work together to create waves to knock seals off ice floes, while others beach themselves temporarily to catch sea lions. Their communication skills are equally impressive, with each pod developing its own unique vocal dialect. Fun Fact: Orcas are one of the few animals known to pass down cultural knowledge through generations. Different pods have distinct hunting strategies, vocalizations, and social behaviors that are learned rather than instinctual!`
},
{
    stars: `★★★★★`,
    img: `./assets/fish/abriImg.png`,
    h: `Leatherback Turtle (Abri)`,
    sh: `Dermochelys Coriacea`,
    desc: `The leatherback turtle is the largest of all sea turtles, reaching up to 2.5 meters (8.2 feet) in length and weighing over 900 kg (2,000 lbs). Unlike other turtles, it lacks a hard shell and instead has a flexible, leathery carapace with ridges that help streamline its body for deep diving. Leatherbacks are known for their long migrations, often traveling thousands of kilometers between feeding and nesting sites. They primarily feed on jellyfish, using their sharp-edged jaws to tear through the gelatinous prey. Fun Fact: Leatherbacks can dive deeper than 1,200 meters (3,900 feet), deeper than some whales, thanks to their unique physiology that allows them to withstand immense pressure.`,
},
{
    stars: `★★★★☆`,
    img: `./assets/fish/temerImg.png`,
    h: `Japanese Spider Crab (Temer)`,
    sh: `Macrocheira Kaempferi`,
    desc: `The Japanese spider crab has the longest leg span of any arthropod, reaching up to 12 feet (3.7 meters). Found in deep waters near Japan, these crabs are scavengers, feeding on decaying matter and small marine animals. Despite their fearsome appearance, they are relatively gentle creatures. Fun Fact: Japanese spider crabs can live for over 100 years, making them one of the longest-living arthropods.`,
},
{
    stars: `★☆☆☆☆`,
    img: `./assets/fish/12sImg.png`,
    h: `Horned Blenny (12s)`,
    sh: `Parablennius Intermedius`,
    desc: `The horned blenny is a small, bottom-dwelling fish with fleshy, horn-like appendages above its eyes. These fish are commonly found in rocky tide pools and coral reefs, where they use their excellent camouflage to avoid predators. They primarily feed on algae and small invertebrates. Fun Fact: Horned blennies can survive for short periods out of water by breathing through their skin.`,
},
{
    stars: `★★☆☆☆`,
    img: `./assets/fish/jellyImg.png`,
    h: `Cannonball Jellyfish (Sr_Jelly)`,
    sh: `Stomolophus Meleagris`,
    desc: `The Cannonball Jellyfish, also known as the Cabbagehead Jellyfish, is a species commonly found in the warm coastal waters of the western Atlantic and the Gulf of Mexico. It gets its name from its round, firm, dome-shaped bell, which can grow up to 25 cm (10 inches) in diameter. Unlike many jellyfish species, the Cannonball Jellyfish has very short tentacles, relying instead on a dense cluster of oral arms beneath its bell to capture plankton and small fish. These jellyfish play a crucial role in marine ecosystems, serving as a food source for sea turtles and certain large fish species. Fun Fact: Cannonball Jellyfish produce a toxin that, while harmless to humans, can stun small fish and crustaceans, making them easier to catch. Their mucus is also used in certain traditional Asian medicines and cosmetics!`,
},
{
    stars: `★☆☆☆☆`,
    img: `./assets/fish/flooImg.png`,
    h: `Panda Banggai Cardinalfish (Floo)`,
    sh: `Pterapogon Kauderni`,
    desc: `The Panda Banggai Cardinalfish is a small, strikingly patterned fish native to the Banggai Islands of Indonesia. Known for its bold black-and-white coloration and elongated fins, it closely resembles a panda in its markings. Unlike many marine fish, it does not undergo a larval stage in the open ocean. Instead, it has a unique reproductive strategy: males incubate fertilized eggs in their mouths (mouthbrooding) until the fully formed fry are ready to swim freely. This species prefers shallow seagrass beds, coral reefs, and mangrove habitats, where it forms small groups for protection against predators. Unfortunately, due to overfishing for the aquarium trade and habitat destruction, the Panda Banggai Cardinalfish is now considered an endangered species. Fun Fact: The Panda Banggai Cardinalfish is one of the few marine fish species that exhibit direct parental care, with the male carrying the eggs in his mouth for about 20 days, ensuring their safety until hatching!`,
},
{
    stars: `★☆☆☆☆`,
    img: `./assets/fish/eightImg.png`,
    h: `Bubble Eye Goldfish (800)`,
    sh: `Carassius Auratus`,
    desc: `The Bubble Eye goldfish is a unique and delicate variety of fancy goldfish, characterized by the fluid-filled sacs under its eyes. These sacs grow larger as the fish matures and are incredibly fragile, making them one of the most sensitive goldfish breeds. Originally bred in China, Bubble Eye goldfish lack a dorsal fin, giving them a distinct appearance and affecting their swimming ability. They require calm water conditions with no sharp objects, as even the slightest puncture to their eye sacs can lead to infections or other health complications. Fun Fact: If a Bubble Eye goldfish’s sacs are accidentally punctured, they can regenerate over time, although they may not grow back to their original size or shape!`,
},
{
    stars: `★★★★★`,
    img: `./assets/fish/vertImg.png`,
    h: `Goblin Shark (Vert)`,
    sh: `Mitsukurina Owstoni`,
    desc: `The goblin shark is a deep-sea species often referred to as a "living fossil" due to its lineage dating back over 125 million years. It has an elongated, flat snout packed with electroreceptors that help detect prey in the dark depths of the ocean. When attacking, its jaw extends outward rapidly to snatch prey using a specialized ligament mechanism. Goblin sharks are rarely seen by humans and mostly reside in deep waters around 1,200 meters (3,900 feet) below the surface. Fun Fact: The goblin shark's jaw can extend up to 8.6% of its body length, one of the most extreme jaw protrusions in the animal kingdom.`,
},
{
    stars: `★★★★☆`,
    img: `./assets/fish/partackImg.png`,
    h: `Fiordland Penguin`,
    sh: `Eudyptes Pachyrhynchus`,
    desc: `The Tawaki, or Fiordland penguin, is a rare and secretive species of crested penguin native to the rugged coastlines and temperate rainforests of New Zealand’s South Island. Unlike most penguins that inhabit open tundras or icy landscapes, Tawaki prefer dense forests and rocky fjords, making them one of the most elusive penguin species. They have distinctive yellow crests above their eyes, similar to other crested penguins, and are known for their excellent swimming and diving abilities, hunting small fish, squid, and crustaceans in the cold waters of the Southern Ocean. Their breeding sites are well hidden among thick vegetation or caves, providing natural protection from predators. Fun Fact: Tawaki are one of the least-studied penguin species, and their secretive nature has led scientists to nickname them the "forest-dwelling penguins." Unlike most penguins that waddle in large groups, Tawaki often nest in isolated pairs deep within coastal rainforests!`,
},
{
    stars: `★★★★★`,
    img: `./assets/fish/keroImg.png`,
    h: `Ghost Shark (Kero)`,
    sh: `Callorhinchus Milii`,
    desc: `Ghost sharks, also called chimaeras, are deep-sea relatives of sharks and rays. They have a smooth, scaleless body and a long, whip-like tail. Unlike true sharks, they have a single gill opening and rely on grinding plates instead of sharp teeth to crush prey like mollusks and crustaceans. These mysterious fish inhabit depths of over 2,500 meters (8,200 feet). Fun Fact: Ghost sharks have retractable sexual organs on their foreheads, which they use during mating.`,
},
{
    stars: `★☆☆☆☆`,
    img: `./assets/fish/nicoImg.png`,
    h: `Sea Bunny (Nico)`,
    sh: `Jorunna Parva`,
    desc: `This adorable sea slug resembles a fluffy bunny due to its ear-like rhinophores (sensory organs) and velvety fur-like texture. Found in the Indo-Pacific, sea bunnies are tiny (about 1 inch long) and belong to the nudibranch family. Their soft-looking “fur” is actually tiny structures called caryophyllidia, which help them sense their surroundings. Fun Fact: Despite their cute appearance, sea bunnies are toxic and absorb toxins from their sponge diet, making them unpalatable to predators.`,
},
{
    stars: `★★★★★`,
    img: `./assets/fish/lanceImg.png`,
    h: `Swordfish (Lance)`,
    sh: `Xiphias Gladius`,
    desc: `One of the fastest fish in the ocean, swordfish can reach speeds of up to 60 mph (97 km/h). Their long, flat bill is used to slash at schools of fish, stunning prey before eating them. Unlike most fish, they lack scales and teeth as adults. Swordfish are highly migratory and are found in both tropical and temperate oceans. Fun Fact: Swordfish can heat their eyes and brain, allowing them to see better in the cold, dark depths where they hunt.`,
},
{
    stars: `★★★☆☆`,
    img: `./assets/fish/genkiImg.png`,
    h: `Dumbo Octopus (Cricket)`,
    sh: `Grimpoteuthis Bathynectes`,
    desc: `Named after Disney’s Dumbo due to its ear-like fins, the Dumbo octopus lives in the deep ocean at depths of up to 7,000 meters (23,000 feet). Unlike most octopuses, it doesn’t use jet propulsion to move but instead flaps its ear-like fins to glide through the water. It primarily feeds on crustaceans and worms by swallowing them whole. Fun Fact: Dumbo octopuses are one of the few octopus species that lack an ink sac, as they have almost no natural predators in their deep-sea environment.`,
},
{
    stars: `★★★★☆`,
    img: `./assets/fish/widowImg.png`,
    h: `Axolotl (Widow)`,
    sh: `Ambystoma Mexicanum`,
    desc: `The axolotl is a neotenic salamander, meaning it retains its larval features throughout its life instead of undergoing metamorphosis. Native to lakes in Mexico, it has remarkable regenerative abilities, capable of regrowing limbs, spinal cords, and even parts of its heart and brain. Due to habitat destruction and pollution, axolotls are critically endangered in the wild. Fun Fact: Unlike most amphibians, axolotls remain aquatic their entire lives, never developing functional lungs like their relatives.`
},
{
    stars: `☆☆☆☆☆`,
    img: `./assets/fish/bongliImg.png`,
    h: `Blobfish ([the])`,
    sh: `Psychrolutes Marcidus`,
    desc: `The blobfish, often called the "world’s ugliest animal," is a deep-sea fish found at depths of 600 to 1,200 meters (2,000 to 3,900 feet) off the coasts of Australia and New Zealand. It has a gelatinous body with minimal muscle, which helps it withstand the extreme pressure of the deep ocean. When brought to the surface, its body decompresses, giving it a saggy, blob-like appearance. However, in its natural habitat, it looks more like a regular fish. Fun Fact: Unlike most fish, the blobfish doesn’t have a swim bladder. Instead, its body is slightly less dense than water, allowing it to float just above the seafloor with minimal effort.`,
},
{
    stars: `★☆☆☆☆`,
    img: `./assets/fish/gigaeggImg.png`,
    h: `Boxfish (Gigaegg)`,
    sh: `Ostraciidae`,
    desc: `Boxfish are small, cube-shaped fish found in coral reefs. Their bodies are encased in a bony armor, making them resistant to predators. They move slowly but are highly maneuverable, using precise fin movements. When threatened, some species release a toxic mucus that can poison nearby fish. Fun Fact: The aerodynamic shape of the boxfish inspired the design of some cars, including the Mercedes-Benz Bionic concept car.`,
},
{
    stars: `★★★☆☆`,
    img: `./assets/fish/yobuImg.png`,
    h: `Blue-Ringed Octopus (Yobu)`,
    sh: `Hapalochlaena Lunulata`,
    desc: `Despite its small size (5–8 inches), the blue-ringed octopus is one of the most venomous marine creatures. Its iridescent blue rings serve as a warning to predators, as it carries a deadly neurotoxin called tetrodotoxin, which is 1,200 times more potent than cyanide. A single bite can cause paralysis and respiratory failure in humans. Found in tide pools and coral reefs across the Pacific and Indian Oceans, this octopus preys on crustaceans using its venom to immobilize them. Fun Fact: There is no known antidote for the blue-ringed octopus's venom, making immediate artificial respiration the only way to survive a bite.`,
},
{
    stars: `★★★★☆`,
    img: `./assets/fish/kagsImg.png`,
    h: `Bluespotted Ribbontail Ray (Kags)`,
    sh: `Taeniura Lymma`,
    desc: `The Bluespotted Ribbontail Ray is a strikingly colorful stingray found in the shallow coral reefs and sandy seabeds of the Indo-Pacific. Its bright blue spots serve as a warning to predators about its venomous tail spines, which it uses for self-defense. Unlike larger rays, this species is relatively small, typically reaching around 35 cm (14 inches) in width. It is an opportunistic feeder, using its electroreceptors to detect prey like crabs, shrimp, and small fish buried in the sand. Despite their beauty, Bluespotted Ribbontail Rays are often shy and prefer to flee rather than fight when approached by divers or predators. Fun Fact: This ray has a unique way of swimming—rather than undulating like most stingrays, it flaps its pectoral fins in a wave-like motion, making it resemble a bird "flying" underwater!`,
},
{
    stars: `★★★★☆`,
    img: `./assets/fish/jettImg.png`,
    h: `Giant Isopod (Jett)`,
    sh: `Bathynomus Giganteus`,
    desc: `Giant isopods are deep-sea crustaceans that can grow up to 50 cm (20 inches) long, making them one of the largest isopods in existence. They are scavengers that feed on dead whales, fish, and other organic material that falls to the ocean floor. Due to their slow metabolism, they can survive for long periods without food. Fun Fact: A giant isopod at a Japanese aquarium went for five years without eating, surviving entirely on stored energy.`,
},
{
    stars: `★★☆☆☆`,
    img: `./assets/fish/truiltImg.png`,
    h: `Rosy-Scales Fairy Wrasse (Truilt)`,
    sh: `Cirrhilabrus Rubrisquamis`,
    desc: `This small, colorful fish is found in the deep reefs of the Indian Ocean. Males have a striking red and pink coloration, which intensifies during courtship displays. Wrasses are known for their social hierarchies, where dominant males control harems of females. Fun Fact: Like many wrasses, this species can change sex from female to male if the dominant male is removed.`,
},
{
    stars: `★☆☆☆☆`,
    img: `./assets/fish/phrogImg.png`,
    h: `Red-Lipped Batfish (Phrog)`,
    sh: `Ogcocephalus Darwini`,
    desc: `The red-lipped batfish is a bizarre-looking fish found around the Galápagos Islands at depths of 10 to 120 meters (30 to 400 feet). Its most distinctive feature is its bright red lips, which scientists believe may play a role in attracting mates. Unlike most fish, it is a poor swimmer and instead uses its modified pectoral fins to "walk" along the ocean floor. This bottom-dweller preys on small fish, crustaceans, and marine worms. Fun Fact: Despite being a fish, the red-lipped batfish prefers walking over swimming and has evolved a specialized structure on its head called an illicium, which acts like a lure to attract prey.`,
},
{
    stars: `★★★★★`,
    img: `./assets/fish/gfrImg.png`,
    h: `Saltwater Crocodile (GFR)`,
    sh: `Crocodylus Porosus`,
    desc: `The saltwater crocodile is the largest living reptile, growing up to 7 meters (23 feet) long and weighing over 1,000 kg (2,200 lbs). It is a highly adaptable apex predator, capable of living in both freshwater and saltwater. These crocodiles are ambush hunters, using their powerful jaws to crush prey, including fish, birds, and even large mammals. Fun Fact: Saltwater crocodiles can hold their breath for over an hour, allowing them to stalk prey undetected.`,
},
{
    stars: `★★★☆☆`,
    img: `./assets/fish/bluestringsImg.png`,
    h: `Whitemargin Unicornfish (Bluestrings)`,
    sh: `Naso Annulatus`,
    desc: `This species of surgeonfish gets its name from the small, horn-like protrusion on its forehead, resembling a unicorn. Found in tropical reefs, it is a fast swimmer and primarily feeds on algae. Unicornfish have sharp, scalpel-like spines near their tails, which they use for defense. Fun Fact: The "horn" on a unicornfish doesn’t appear until they mature, and its exact function remains unknown.`,
},
{
    stars: `★★★★★`,
    img: `./assets/fish/solisImg.png`,
    h: `Anglerfish (Solis)`,
    sh: `Lophiiformes`,
    desc: `Anglerfish are deep-sea predators known for their eerie appearance and bioluminescent lure. Found in some of the ocean’s darkest depths, these fish have a unique adaptation—a fleshy, glowing appendage called an esca that dangles from their heads, attracting unsuspecting prey. This lure is produced by symbiotic bacteria that generate light, helping the anglerfish hunt efficiently in the pitch-black deep sea. With oversized mouths and expandable stomachs, anglerfish can consume prey nearly as large as themselves, making them highly effective ambush predators. One of the most bizarre aspects of anglerfish biology is their reproductive strategy. In some species, males are significantly smaller than females and fuse permanently to their mates, relying on them for nutrients while providing sperm in return. This extreme form of parasitic mating ensures reproduction in an environment where encounters between individuals are rare. Fun Fact: Some anglerfish species live more than a mile below the ocean’s surface, where the pressure is over 1,000 times greater than at sea level—yet they survive and thrive in this extreme environment!`
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

const unlockBtn = document.querySelector(`.unlock-button`);

unlockBtn.addEventListener(`click`, () => {
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
});

const resetBtn = document.querySelector(`.reset-button`);

resetBtn.addEventListener(`click`, () => {
    localStorage.removeItem('unlockedFish');
    localStorage.removeItem('fishPool');
    fishAll.forEach((fish) => {
        fish.classList.remove(`unlocked`);

        const img = fish.querySelector(`img`);
        img.src = `./assets/fish/fishCatalog/locked.png`;
    });
});

if (false) {
    startTimer(fish + difficulty[2])
    timeRemaining + (((fishNames[`${currentFish}`][2] * difficulty[4]) * difficulty[0]) + difficulty[1])
    MULTIPLIER || GUARANTEED_BONUS_TIME || EXTRA_TIME || EXTRA_KEYS || MULTIPLIER_2 || MISTAKE_DEDUCTION
}

let difficulty = [2.2,  1.0,  2.0,  2,  0.10,  1.00];

let easy =     [2.6,  1.1,  3.0,  1,  0.15,  0.75];
let medium =   [2.2,  1.0,  2.0,  2,  0.10,  1.00];
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
const bongli =  [2, 1, 30, `bongli`];
const eight =   [2, 3, 15, `eight`];
const jelly =   [3, 4, 14, `jelly`];
const nico =    [2, 2, 10, `nico`];
const phrog =   [2, 3, 10, `phrog`];
const gigaegg = [2, 2, 10, `gigaegg`];
const yobu =    [2, 4, 10, `yobu`];
const floo =    [3, 3, 8, `floo`];
const genki =   [2, 3, 8, `genki`];
const truilt =  [3, 5, 8, `truilt`];
const twelves = [3, 4, 7, `twelves`];

//MEDIUM
const bs =      [4, 5, 7, `bluestrings`];
const jett =    [2, 4, 10, `jett`];
const partack = [2, 12, 4, `partack`];
const kags =    [5, 4, 7, `kags`];
const temer =   [5, 8, 10, `temer`];
const widow = [3, 10, 4, `widow`];

//INSANE
const kero =  [6, 5, 8, `kero`];
const solis = [6, 7, 10, `solis`];
const abri =  [6, 12, 10, `abri`];
const vert =  [6, 7, 7, `vert`];
const lance = [1, 8, 1, `lance`];
const gfr =   [6, 9, 10, `gfr`];
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
    
    { fish: bs,      chance: 4 },
    { fish: jett,    chance: 3 },
    { fish: partack, chance: 3 },
    { fish: kags,    chance: 3 },
    { fish: temer,   chance: 2 },
    { fish: widow,   chance: 2 },
    
    { fish: kero,    chance: 1 },
    { fish: solis,   chance: 1 },
    { fish: abri,    chance: 1 },
    { fish: vert,    chance: 1 },
    { fish: lance,   chance: 1 },
    { fish: gfr,     chance: 1 },
    { fish: mier,    chance: 1 },
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
    mierImg.style.transform = `none`;
    mierImg.src = `./assets/fish/mier-0.png`
    fishImg.style.transform = `none`;
    fishImg.style.display = `none`;
    fishImg.src = ``;
    playBtnDisappear();
    setTimeout(() => {
        mierImg.src = `./assets/fish/mier-1.png`
        setTimeout(() => {
            const selected = selectFish();
            startFishing(...selected);
            console.log(...selected);
            // startFishing(...partack);
        }, 700);
    }, (Math.trunc(Math.random() * 10) + 5) * 1000);
    // }, 0);
});

const unlockedFish = JSON.parse(localStorage.getItem(`unlockedFish`)) || [];
const savedFishPool = JSON.parse(localStorage.getItem(`fishPool`));
const savedDifficulty = localStorage.getItem(`selectedDifficulty`);

const loadProgress = () => {    
    if (savedDifficulty) {
        const savedButton = document.querySelector(`.${savedDifficulty}`);
        if (savedButton) {
            difficultyBtns.forEach((btn) => {
                btn.classList.remove(`current-difficulty`);
            })
            savedButton.classList.add(`current-difficulty`);
            difficulty = difficulties[savedDifficulty]; 
        }
    }

    if (savedFishPool) {
        fishPool.splice(0, fishPool.length, ...savedFishPool);
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
