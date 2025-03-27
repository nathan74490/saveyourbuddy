//& Sélection des éléments HTML nécessaires
const sonar = document.getElementById("sonar");  // sonar cliquable
const aiguille = document.getElementById("aiguille");  // Aiguille de la sonar
const ledContainer = document.getElementById("ledContainer");  // Conteneur pour les LEDs
const validateBtn = document.getElementById("validate");  // Bouton de validation
const messageBox = document.getElementById("messageBox");  // Pop-up de message

//& Variables de suivi du jeu
let rotation = 0;  // Rotation actuelle de l'aiguille
let correctPosition = Math.floor(Math.random() * 4) * 90; // Position aléatoire (haut, droite, bas, gauche)
let leds = []; // LEDs
let mistakes = 0; // Compteur d'erreurs
let correctAnswers = 0;  // Compteur de bonnes réponses
const maxMistakes = 3; // Nombre max d'erreurs

//& Positions des LEDs
const ledPositions = [
    // 6 LEDs en haut
    { x: -200, y: 10 }, //haut gauche 
    { x: -120, y: 60 }, // 1 gauche
    { x: -20, y: 90 }, // 2 gauche
    { x: 90, y: 100 }, // 3 gauche 
    { x: 190, y: 60 }, // 4 gauche
    { x: 270, y: 6 }, // dernière en haut à droite
    // 6 LEDs en bas
    { x: -210, y: 90 }, // bas gauche
    { x: -140, y: 140 }, // 1 gauche
    { x: -40, y: 170 }, // 2 gauche
    { x: 90, y: 180 }, // 3 gauche
    { x: 220, y: 150 }, // 4 gauche
    { x: 290, y: 90 } // dernier bas droite
];

//& Création des LEDs 
ledPositions.forEach(pos => {
    let led = document.createElement("div");
    led.classList.add("led");  // Ajout style
    led.style.width = "50px";
    led.style.height = "50px";
    led.style.left = `${pos.x}px`;
    led.style.top = `${pos.y}px`;
    ledContainer.appendChild(led);  // Ajouter la LED 
    leds.push(led);  // LED dans le tableau
});

//& Leds allumées ou non
const patterns = {
    haut: [
        [0, 0, 1, 0, 1, 1], // première partie
        [1, 1, 0, 0, 0, 1] // deuxième partie
    ],
    bas: [
        [0, 1, 0, 1, 0, 1],
        [0, 1, 0, 1, 1, 1]
    ],
    gauche: [
        [1, 0, 0, 0, 0, 0],
        [0, 1, 0, 1, 1, 0]
    ],
    droite: [
        [1, 1, 1, 0, 0, 0],
        [0, 1, 1, 1, 0, 1]
    ]
};

// const storedPatterns = JSON.parse(localStorage.getItem("patterns")) || {};  

// console.log(storedPatterns);


// localStorage.setItem("patterns", JSON.stringify(patterns));

//& Fonction pour mettre à jour l'affichage des LEDs
function updateLEDs() {
    const directions = Object.keys(patterns);  // Liste des directions (haut, bas, gauche, droite)
    let randomDirection = directions[Math.floor(Math.random() * directions.length)];  // Choisir une direction au hasard
    let patternIndex = Math.floor(Math.random() * 2);  // Choisir (0 ou 1)
    let pattern = patterns[randomDirection][patternIndex];  // Sélectionner le tableau allumé ou non

    // 6 valeurs se répètent pour les 12 LEDs
    leds.forEach((led, index) => {
        let value = pattern[index % 6];  // Répétition de l'allumage des LEDs
        led.style.backgroundColor = value ? "yellow" : "white";
        led.style.boxShadow = value ? "0 0 10px 1px white" : "none";
    });
}

// Lancer immédiatement + mise à jour toutes les 5s
updateLEDs();
setInterval(updateLEDs, 5000);

//& Gestion du clic sur la sonar
sonar.addEventListener("click", () => {
    rotation += 90;  // Tourner de 90° à chaque clic (Nord -> Est -> Sud -> Ouest)
    
    if (rotation === 0) rotation = 0;  // Réinitialiser la rotation à 0 (Nord) après avoir atteint 360°
    
    aiguille.style.transform = `translateX(-50%) translateY(-100%) rotate(${rotation}deg)`;  // Appliquer la rotation
});

//& Gestion du clic sur le bouton de validation
validateBtn.addEventListener("click", () => {
    if (rotation === correctPosition) {  // Vérifie si la position est correcte
        checkCircle.style.backgroundColor = "green";  // Change la couleur en vert (réponse correcte)
        correctAnswers++;  // Incrémente le compteur de bonnes réponses

        if (correctAnswers >= 4) {  // Si 4 réponses correctes
            messageBox.innerText = "mission accomplie";  // Afficher le message de réussite
            messageBox.style.display = "flex";  // Montrer le pop-up
            validateBtn.disabled = true;  // Désactiver le bouton
            sonar.style.pointerEvents = "none";  // Désactiver la sonar
            updateModuleStatus('success');  // Mise à jour du statut du module

            // Réinitialisation du pop up
            setTimeout(() => {
                messageBox.style.display = "none";
                validateBtn.disabled = false;
                sonar.style.pointerEvents = "auto";
                correctAnswers = 0;  // Réinitialiser les bonnes réponses
                mistakes = 0;  // Réinitialiser les erreurs
            }, 10000);
        }
    } else {  // Mauvaise réponse
        checkCircle.style.backgroundColor = "red";  // Change la couleur en rouge (erreur)
        mistakes++;  // Incrémente le compteur d'erreurs

        if (mistakes >= maxMistakes) {  // Si le joueur atteint le max d'erreurs
            messageBox.innerText = "error";  // Afficher le message d'échec
            messageBox.style.display = "flex";  // Montrer le pop-up
            validateBtn.disabled = true;  // Désactiver le bouton
            sonar.style.pointerEvents = "none";  // Désactiver la sonar
            updateModuleStatus('failed');  // Mise à jour du statut du module

            // Réinitialisation après 2 secondes
            setTimeout(() => {
                messageBox.style.display = "none";
                validateBtn.disabled = false;
                sonar.style.pointerEvents = "auto";
                mistakes = 0;  // Réinitialiser les erreurs
                correctAnswers = 0;  // Réinitialiser les bonnes réponses
            }, 2000);
        }
    }
});

//& Initialisation des LEDs 
updateLEDs();
