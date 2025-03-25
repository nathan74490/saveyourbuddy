let correctDirection = ""; // Stocke la direction correcte
let gameStarted = false; // Indique si le jeu a commencé
let activeCircles = []; // Stocke les indices des cercles actifs
let intervalId; // Pour stocker l'ID de l'intervalle

// DOM
const circles = document.querySelectorAll('.circle'); // Tous les cercles de la boussole
const arrow = document.getElementById('arrow'); // La flèche de la boussole
const message = document.getElementById('message'); // Message
const validateButton = document.querySelector("button"); // Le bouton de validation

// Démarrer le jeu
function startGame() {
    gameStarted = true; // Active le jeu
    resetGame(); // Réinitialise l'état précédent
    validateButton.style.display = 'block'; // Affiche le bouton de validation

    // Commence à changer les cercles toutes les n secondes
    intervalId = setInterval(() => {
        activeCircles = getRandomActiveCircles(); // Choisit aléatoirement des cercles lumineux
        showActiveCircles(activeCircles); // Affiche les cercles actifs
    }, 3000); // Change les cercles toutes les 3 secondes (3000 ms)
}

// Aléatoirement des cercles 
function getRandomActiveCircles() {
    const activeCircles = []; // Tableau pour stocker les indices des cercles 
    const randomIndex = Math.floor(Math.random() * 2); // Génère 0 ou 1 aléatoirement
    
    // Si 0, sélectionne les cercles du haut
    if (randomIndex === 0) {
        activeCircles.push(0, 1, 2, 3);
    } 
    // Si 1, sélectionne les cercles du bas 
    else {
        activeCircles.push(9, 10, 11, 8); 
    }
    return activeCircles;
}

// Fonction pour afficher les cercles actifs
function showActiveCircles(activeCircles) {
    // Réinitialise tous les cercles lumineux
    circles.forEach(circle => {
        circle.style.backgroundColor = '#ddd';
    });

    // Met en jaune les cercles lumineux
    activeCircles.forEach(index => {
        circles[index].style.backgroundColor = 'yellow';
    });
}

// Gestionnaire d'événement pour le clic sur la boussole
document.querySelector(".compass").addEventListener("click", (e) => {
    if (!gameStarted) return; // Ne rien faire si le jeu n'a pas commencé

    // Récupère les dimensions et position de la boussole
    const compassRect = document.querySelector(".compass").getBoundingClientRect();

    // Calcule les coordonnées du clic relatives à la boussole
    const clickX = e.clientX - compassRect.left;
    const clickY = e.clientY - compassRect.top;

    // Calcule le centre de la boussole
    const centerX = compassRect.width / 2;
    const centerY = compassRect.height / 2;
    
    // Calcule l'angle entre le centre et le point cliqué (en degrés)
    const angle = Math.atan2(clickY - centerY, clickX - centerX) * (180 / Math.PI);
    // Normalise l'angle entre 0 et 360 degrés
    const rotation = angle < 0 ? angle + 360 : angle;

    // Applique la rotation à la flèche
    arrow.style.transform = `translateX(-50%) rotate(${rotation}deg)`;
});

// Fonction pour valider la direction de la flèche
function check() {
    if (!gameStarted) return; // Si le jeu n'est pas encore commencé, ne rien faire

    // Récupère l'angle actuel de la flèche
    const arrowRotation = getRotationDegrees(arrow); // Fonction qui extrait l'angle de rotation en degrés

    // Vérifie si la direction est correcte
    if ((activeCircles.includes(0) || activeCircles.includes(1) || activeCircles.includes(2) || activeCircles.includes(3)) && 
        (arrowRotation >= 330 || arrowRotation <= 30)) {
        message.textContent = "Correct! Bravo !";
        message.style.color = 'green';
    } 
    // Cas où les cercles du bas sont actifs et la flèche pointe vers le bas 
    else if ((activeCircles.includes(8) || activeCircles.includes(9) || activeCircles.includes(10) || activeCircles.includes(11)) && 
               (arrowRotation >= 150 && arrowRotation <= 210)) {
        message.textContent = "Correct! Bravo !";
        message.style.color = 'green';
    } 
    // Direction incorrecte
    else {
        message.textContent = "Mauvaise direction, essaie encore !";
        message.style.color = 'red';
    }

    resetGame(); // Réinitialise le jeu après la validation
}

// Fonction pour obtenir l'angle de rotation de l'élément flèche
function getRotationDegrees(element) {
    const transform = window.getComputedStyle(element).getPropertyValue('transform');
    const matrix = new WebKitCSSMatrix(transform);
    return Math.atan2(matrix.m21, matrix.m11) * (180 / Math.PI);
}

// Fonction pour réinitialiser le jeu
function resetGame() {
    gameStarted = false; // Désactive le jeu
    arrow.style.transform = 'translateX(-50%) rotate(0deg)'; // Réinitialise la flèche
    message.textContent = ""; // Efface le message
    validateButton.style.display = 'none'; // Cache le bouton de validation après la fin du jeu
    clearInterval(intervalId); // Arrête l'intervalle pour changer les cercles
}
