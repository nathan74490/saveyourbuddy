// Sélection des éléments HTML nécessaires
const sonar = document.getElementById('sonar');
const aiguille = document.getElementById('aiguille');
const ledContainer = document.getElementById('ledContainer');
const validateBtn = document.getElementById('validate');
const messageBox = document.getElementById('messageBox');
const checkCircle = document.querySelector('.circle');

// Variables de suivi du jeu
let rotation = 0;
let correctPosition = 0; // Toujours démarrer avec 180
let leds = [];
let correctAnswers = 0;
const maxMistakes = 2;
let ledRotation = 0;

// Données des LEDs
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
  { x: 220, y: 150, haut: 0, bas: 0, gauche: 1, droite: 0 },
  { x: 290, y: 90, haut: 1, bas: 1, gauche: 1, droite: 0 },
];

// Création des LEDs
ledData.forEach((pos) => {
  let led = document.createElement('div');
  led.classList.add('led');
  led.style.width = '50px';
  led.style.height = '50px';
  led.style.left = `${pos.x}px`;
  led.style.top = `${pos.y}px`;
  ledContainer.appendChild(led);
  leds.push(led);
});

function newCorrectPosition() {
  const angles = [0, 90, 180, 270];
  const randomIndex = Math.floor(Math.random() * angles.length);
  correctPosition = angles[randomIndex];
}
newCorrectPosition();

console.log(correctPosition);
// Fonction pour mettre à jour l'affichage des LEDs
function updateLEDs() {
  leds.forEach((led, index) => {
    let currentLed = ledData[index];
    let active = false;

    switch (correctPosition) {
      case 0:
        active = currentLed.haut;
        break;
      case 90:
        active = currentLed.droite;
        break;
      case 180:
        active = currentLed.bas;
        break;
      case 270:
        active = currentLed.gauche;
        break;
    }

    led.style.backgroundColor = active ? 'yellow' : 'white';
    led.style.boxShadow = active ? '0 0 10px 1px white' : 'none';
  });
}
// Fonction de validation des réponses
// Fonction de validation des réponses
validateBtn.addEventListener('click', () => {
  if (rotation === correctPosition) {
    // Changer la couleur des cercles en vert pour la réponse correcte
    document.querySelectorAll('.circle').forEach((circle) => {
      circle.style.backgroundColor = 'green'; // Tout devient vert
    });
    checkCircle.style.backgroundColor = 'green';
    setTimeout(() => {
      document.querySelectorAll('.circle').forEach((circle) => {
        circle.style.backgroundColor = 'black'; // Tout devient vert
      });
    }, 500);
    correctAnswers++;
    console.log(correctAnswers);
    newCorrectPosition();
    updateLEDs();

    console.log(correctPosition);
    if (correctAnswers >= 4) {
      messageBox.innerText = 'Mission accomplie!';
      messageBox.style.display = 'flex';
      validateBtn.disabled = true;
      sonar.style.pointerEvents = 'none';
      updateModuleStatus('sucess');
    }
  } else {
    // Si la réponse est incorrecte, changer `lastCircle` en rouge
    document.querySelectorAll('.circle').forEach((circle) => {
      circle.style.backgroundColor = 'green'; // Rendre les autres cercles verts
    });
    const lastCircle = document.getElementById('lastCircle');
    lastCircle.style.backgroundColor = 'red'; // `lastCircle` devient rouge en cas d'erreur

    checkCircle.style.backgroundColor = 'red';
    console.log(correctAnswers);
    setTimeout(() => {
      checkCircle.style.backgroundColor = 'black';
    }, 500);
    correctAnswers = 0; // Réinitialiser les bonnes réponses en cas d'échec
  }
});

// Initialisation des LEDs
updateLEDs();

// Gestion du clic sur la sonar
sonar.addEventListener('click', () => {
  rotation = (rotation + 90) % 360;
  aiguille.style.transform = `translateX(-50%) translateY(-100%) rotate(${rotation}deg)`;
  // Les LEDs ne changent pas ici
});

// Sélection de l'élément audio
const ambientSound = document.getElementById('ambientSound');

// Fonction pour démarrer le son dès le chargement de la page
window.addEventListener('load', () => {
  ambientSound.play().catch((error) => {
    console.log('Erreur lors de la lecture du son d\'ambiance:', error);
  });
});
