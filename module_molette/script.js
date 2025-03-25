
//& Timer 

// Début du timer à 31s
let time = 31;
let timer;

// Démarrer le chronomètre
function startTimer() {
  // Intervalle qui appelle la fonction myTimer toutes les 1000ms
  timer = setInterval(myTimer, 1000);
}

// Fonction exécutée chaque seconde pour mettre à jour le chronomètre
function myTimer() {
  time--; // Décrémente le temps
  
  // Met à jour l'affichage du chrono
  document.getElementById("chrono").innerHTML = time + "s";

  // Vérifie si le temps est écoulé
  if (time === 0) { 
    clearInterval(timer); // Arrête le chrono à 0
  }
}

// Redémarre au reload de la page
startTimer();



//& fonction "sonar"
// Sélectionne l'élément représentant l'aiguille de la boussole
const needle = document.querySelector('.needle');
const compass = document.querySelector('.compass');

document.addEventListener('click', (event) => {
    const rect = compass.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const deltaX = event.clientX - centerX;
    const deltaY = event.clientY - centerY;

    let angle = 0;

    if (Math.abs(deltaX) > Math.abs(deltaY)) {
        // Déplacement horizontal : gauche ou droite
        angle = deltaX > 0 ? 90 : -90; // Droite = 90°, Gauche = -90°
    } else {
        // Déplacement vertical : haut ou bas
        angle = deltaY > 0 ? 180 : 0; // Bas = 180°, Haut = 0°
    }

    needle.style.transform = `translate(-50%, -90%) rotate(${angle}deg)`;
});


//& Ombres

// Sélection du conteneur
const container = document.querySelector('.container');

// Stocker les cercles créés
const circles = [];

// Positions (x, y) pour le placement des cercles
const positions = [
    [50, 100], [150, 50], [250, 100], [350, 150], [450, 200], [550, 150], [650, 100], [750, 50],
    [150, 200], [250, 250], [350, 300], [450, 300], [550, 250], [650, 200]
];

// Crée et place les cercles aux positions données
positions.forEach(([x, y]) => {
    const circle = document.createElement('div'); // Crée un élément div pour chaque cercle
    circle.classList.add('circle'); // Ajoute la classe CSS "circle"
    circle.style.left = `${x}px`; // Position horizontale
    circle.style.top = `${y}px`; // Position verticale
    container.appendChild(circle); // Ajoute le cercle au DOM
    circles.push(circle); // Stocke le cercle
});

// Génère des ombres aléatoires sur certains cercles à des moments différents
function randomShadows() {
    // Sélectionne quelques cercles au hasard
    const selectedCircles = circles.sort(() => 0.5 - Math.random()).slice(0, Math.floor(circles.length / 3));
    
    circles.forEach(circle => {
        if (selectedCircles.includes(circle)) {
            const randomX = (Math.random() - 0.5) * 40; // Déplacement horizontal aléatoire
            const randomY = (Math.random() - 0.5) * 40; // Déplacement vertical aléatoire
            const randomBlur = Math.random() * 20; // Flou aléatoire

            circle.style.boxShadow = `${randomX}px ${randomY}px ${randomBlur}px rgba(255, 4, 4, 60)`;
        } else {
            circle.style.boxShadow = "none"; // Supprime l'ombre des autres cercles
        }
    });
}

// Mise à jour des ombres toutes les ms
setInterval(randomShadows, 1000);
