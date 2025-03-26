const molette = document.getElementById("molette");
const aiguille = document.getElementById("aiguille");  // Référence à l'aiguille
const ledContainer = document.getElementById("ledContainer");
const validateBtn = document.getElementById("validate");
// Pop up
const messageBox = document.getElementById("messageBox");

let rotation = 0;
let correctPosition = Math.floor(Math.random() * 4) * 90;
let leds = [];
let mistakes = 0;
let correctAnswers = 0;  // Compteur pour les bonnes réponses
const maxMistakes = 2;

const ledPositions = [
    { x: -110, y: -20}, { x: -80, y: 40 }, { x: -10, y: 80 }, { x: 70, y: 80 },
    { x: 150, y: 40 }, { x: 200, y: -30}, { x: -110, y: 110}, { x: -80, y: 180 },
    { x: -10, y: 210 }, { x: 70, y: 210 }, { x: 150, y: 170 }, { x: 200, y: 102}
];

ledPositions.forEach(pos => {
    let led = document.createElement("div");
    led.classList.add("led");
    led.style.width = "50px";
    led.style.height = "50px";
    led.style.left = `${pos.x}px`;
    led.style.top = `${pos.y}px`;
    ledContainer.appendChild(led);
    leds.push(led);
});

const patterns = {
    haut: [1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1],
    bas: [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1],
    gauche: [1, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 0],
    droite: [1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 0, 1]
};

function updateLEDs() {
    const directions = Object.keys(patterns);
    let randomDirection = directions[Math.floor(Math.random() * directions.length)];
    let pattern = patterns[randomDirection];

    leds.forEach((led, index) => {
        led.style.backgroundColor = pattern[index] ? "yellow" : "white";
        led.style.boxShadow = pattern[index] ? "0 0 10px 1px white" : "none";
    });
}

setInterval(updateLEDs, 5000);

molette.addEventListener("click", () => {
    rotation += 90;
    if (rotation >= 360) rotation = 0;
    aiguille.style.transform = `translateX(-50%) translateY(-100%) rotate(${rotation}deg)`; // Applique la rotation uniquement à l'aiguille
});

validateBtn.addEventListener("click", () => {
    if (rotation === correctPosition) {
        checkCircle.style.backgroundColor = "green"; // Le cercle devient vert si la réponse est correcte
        correctAnswers++;  // Incrémenter le compteur de bonnes réponses

        if (correctAnswers >= 4) {  // Vérifier si l'utilisateur a 4 bonnes réponses
            messageBox.innerText = "MISSION ACCOMPLIE";
            messageBox.style.display = "flex"; // Afficher le pop-up
            validateBtn.disabled = true;
            molette.style.pointerEvents = "none"; // Désactiver la molette
            updateModuleStatus('sucess')
            // Retarder la réactivation après 10 secondes
            setTimeout(() => {
                messageBox.style.display = "none"; // Masquer le pop-up
                validateBtn.disabled = false;
                molette.style.pointerEvents = "auto"; // Réactiver la molette
                correctAnswers = 0;  // Réinitialiser les bonnes réponses pour recommencer
                mistakes = 0;  // Réinitialiser les erreurs
            }, 10000);  // 10 secondes
        }
    } else {
        checkCircle.style.backgroundColor = "red"; // Le cercle devient rouge si la réponse est incorrecte
        mistakes++;

        if (mistakes >= maxMistakes) {
            messageBox.innerText = "ERROR";
            messageBox.style.display = "flex"; // Afficher le pop-up
            validateBtn.disabled = true;
            molette.style.pointerEvents = "none"; // Désactiver la molette
            updateModuleStatus('failed')
            // Retarder la réactivation après 10 secondes
            setTimeout(() => {
                messageBox.style.display = "none"; // Masquer le pop-up
                validateBtn.disabled = false;
                molette.style.pointerEvents = "auto"; // Réactiver la molette
                mistakes = 0;  // Réinitialiser les erreurs
                correctAnswers = 0;  // Réinitialiser les bonnes réponses
            }, 1000);  // 1 seconde
        }
    }
});

updateLEDs();





