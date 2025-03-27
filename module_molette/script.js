//& Sélection des éléments HTML nécessaires
const sonar = document.getElementById("sonar");  // sonar cliquable
const aiguille = document.getElementById("aiguille");  // Aiguille de la sonar
const ledContainer = document.getElementById("ledContainer");  // Conteneur pour les LEDs
const validateBtn = document.getElementById("validate");  // Bouton de validation
const messageBox = document.getElementById("messageBox");  // Pop-up de message
const checkCircle = document.getElementById("checkCircle");  // Indicateur de validation

//& Variables de suivi du jeu
let rotation = 0;  // Rotation actuelle de l'aiguille
let correctPosition = Math.floor(Math.random() * 4) * 90; // Position aléatoire (haut, droite, bas, gauche)
let leds = []; // LEDs
let mistakes = 0; // Compteur d'erreurs
let correctAnswers = 0;  // Compteur de bonnes réponses
const maxMistakes = 2; // Nombre max d'erreurs
let ledRotation = 0; // Rotation indépendante pour les LEDs

//& Données des LEDs
const ledData = [
    { x: -200, y: 10, haut: 0, bas: 0, gauche: 0, droite: 1 },
    { x: -120, y: 60, haut: 0, bas: 1, gauche: 0, droite: 0 },
    { x: -20, y: 90, haut: 1, bas: 1, gauche: 0, droite: 1 },
    { x: 90, y: 100, haut: 0, bas: 0, gauche: 0, droite: 1 },
    { x: 190, y: 60, haut: 1, bas: 0, gauche: 1, droite: 1 },
    { x: 270, y: 6, haut: 1, bas: 1, gauche: 0, droite: 1 },
    { x: -210, y: 90, haut: 1, bas: 1, gauche: 1, droite: 1 },
    { x: -140, y: 140, haut: 1, bas: 1, gauche: 0, droite: 1 },
    { x: -40, y: 170, haut: 1, bas: 1, gauche: 0, droite: 1 },
    { x: 90, y: 180, haut: 1, bas: 1, gauche: 1, droite: 0 },
    { x: 220, y: 150, haut: 0, bas: 0, gauche: 1, droite: 1 },
    { x: 290, y: 90, haut: 1, bas: 1, gauche: 1, droite: 0 }
];

//& Création des LEDs 
ledData.forEach(pos => {
    let led = document.createElement("div");
    led.classList.add("led");  // Ajout style
    led.style.width = "50px";
    led.style.height = "50px";
    led.style.left = `${pos.x}px`;
    led.style.top = `${pos.y}px`;
    ledContainer.appendChild(led);  // Ajouter la LED 
    leds.push(led);  // LED dans le tableau
});

//& Fonction pour mettre à jour l'affichage des LEDs
function updateLEDs() {
    leds.forEach((led, index) => {
        let currentLed = ledData[index];
        let active = ledRotation === 0 ? currentLed.haut :
                     ledRotation === 90 ? currentLed.droite :
                     ledRotation === 180 ? currentLed.bas :
                     currentLed.gauche;
        led.style.backgroundColor = active ? "yellow" : "white";
        led.style.boxShadow = active ? "0 0 10px 1px white" : "none";
    });
}

// Lancer immédiatement
updateLEDs();

//& Gestion du clic sur la sonar
sonar.addEventListener("click", () => {
    rotation = (rotation + 90) % 360;  // Tourne de 90° et revient à 0 après 360°
    aiguille.style.transform = `translateX(-50%) translateY(-100%) rotate(${rotation}deg)`;
});

//& Changement automatique des lumières toutes les 5 secondes
setInterval(() => {
    ledRotation = (ledRotation + 90) % 360;  // Tourne les LEDs indépendamment
    updateLEDs();  // Mise à jour des LEDs après rotation
}, 15000);

//& Gestion du clic sur le bouton de validation
validateBtn.addEventListener("click", () => {
    if (rotation === correctPosition) {
        checkCircle.style.backgroundColor = "green";
        correctAnswers++;
        if (correctAnswers >= 4) {
            messageBox.innerText = "mission accomplie";
            messageBox.style.display = "flex";
            validateBtn.disabled = true;
            sonar.style.pointerEvents = "none";
            setTimeout(() => {
                messageBox.style.display = "none";
                validateBtn.disabled = false;
                sonar.style.pointerEvents = "auto";
                correctAnswers = 0;
                mistakes = 0;
            }, 10000);
        }
    } else {
        checkCircle.style.backgroundColor = "red";
        mistakes++;
        if (mistakes >= maxMistakes) {
            messageBox.innerText = "error";
            messageBox.style.display = "flex";
            validateBtn.disabled = true;
            sonar.style.pointerEvents = "none";
            setTimeout(() => {
                messageBox.style.display = "none";
                validateBtn.disabled = false;
                sonar.style.pointerEvents = "auto";
                mistakes = 0;
                correctAnswers = 0;
            }, 2000);
        }
    }
});

//& Initialisation des LEDs 
updateLEDs();
