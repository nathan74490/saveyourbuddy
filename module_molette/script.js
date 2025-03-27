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
    { x: -140, y: 140, haut: 1, bas: 1, gauche: 0, droite: 0 },
    { x: -40, y: 170, haut: 1, bas: 1, gauche: 0, droite: 1 },
    { x: 90, y: 180, haut: 1, bas: 1, gauche: 1, droite: 1 },
    { x: 220, y: 150, haut: 0, bas: 0, gauche: 1, droite: 0},
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
console.log(rotation);
console.log(correctPosition);
function updateLEDs() {
    leds.forEach((led, index) => {
        let currentLed = ledData[index];
        // Vérifie l'orientation de l'aiguille et affiche les LEDs correspondantes
        let active = false;
        
        // Selon la direction de l'aiguille (rotation), on choisit la bonne direction
        switch (rotation) {
            case 0:  // Aiguille en haut
                active = currentLed.haut;
                break;
            case 90:  // Aiguille à droite
                active = currentLed.droite;
                break;
            case 180:  // Aiguille en bas
                active = currentLed.bas;
                break;
            case 270:  // Aiguille à gauche
                active = currentLed.gauche;
                break;
        }

        // Met à jour la couleur et l'ombre de la LED en fonction de son état
        led.style.backgroundColor = active ? "yellow" : "white";
        led.style.boxShadow = active ? "0 0 10px 1px white" : "none";
    });
}

// Mise à jour des LEDs toutes les 5 secondes, en fonction de la rotation de l'aiguille
setInterval(() => {
    ledRotation = (ledRotation + 90) % 360;  // Rotation indépendante des LEDs
    updateLEDs();  // Mise à jour des LEDs après rotation
}, 5000);

// & Fonction de validation des réponses
validateBtn.addEventListener("click", () => {
    // Vérifie si l'aiguille est dans la position correcte
    if (rotation === correctPosition) {
        checkCircle.style.backgroundColor = "green";
        correctAnswers++;
        if (correctAnswers >= 4) {
            messageBox.innerText = "mission accomplie!";
            messageBox.style.display = "flex";
            validateBtn.disabled = true;
            sonar.style.pointerEvents = "none";
            updateModuleStatus('success'); 
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
            messageBox.innerText = "erreur!";
            messageBox.style.display = "flex";
            validateBtn.disabled = true;
            sonar.style.pointerEvents = "none";
            updateModuleStatus('failed'); 
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

// Initialisation des LEDs
updateLEDs();

//& Gestion du clic sur la sonar
sonar.addEventListener("click", () => {
    rotation = (rotation + 90) % 360;  // Tourne de 90° et revient à 0 après 360°
    aiguille.style.transform = `translateX(-50%) translateY(-100%) rotate(${rotation}deg)`;
});