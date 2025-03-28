// Sélection des éléments HTML nécessaires
const sonar = document.getElementById('sonar');
const aiguille = document.getElementById('aiguille');
const ledContainer = document.getElementById('ledContainer');
const validateBtn = document.getElementById('validate');
const messageBox = document.getElementById('messageBox');
const checkCircle = document.querySelector('.circle');

// Variables de suivi du jeu
let rotation = 0;
let correctPosition = 0; 
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
validateBtn.addEventListener('click', () => {
    if (rotation === correctPosition) {
      correctAnswers++; // Incrémenter le nombre de bonnes réponses
  
      // Changer la couleur des cercles en vert pour chaque bonne réponse
      const circles = document.querySelectorAll('.circle');
      circles.forEach((circle, index) => {
        if (index < correctAnswers) {
          circle.style.backgroundColor = 'green'; // Vert pour les réponses correctes
        } else if (circle.style.backgroundColor !== 'green') {
          circle.style.backgroundColor = 'black'; // Noir pour les réponses restantes
        }
      });
  
      // Mettre à jour le dernier cercle en rouge avec le nombre de fautes
      const lastCircle = document.getElementById('lastCircle');
      lastCircle.style.backgroundColor = 'red';
     
  
      setTimeout(() => {
        // Réinitialiser le dernier cercle après un court délai
        lastCircle.innerText = '';
      }, 500);
  
      console.log(correctAnswers);
      newCorrectPosition();
      updateLEDs();
  
      if (correctAnswers >= 4) {
        messageBox.innerText = 'mission accomplie!';
        messageBox.style.display = 'flex';
        validateBtn.disabled = true;
        sonar.style.pointerEvents = 'none';
        updateModuleStatus('sucess');
      }
    } else {
      // Ne pas réinitialiser les cercles verts, mais seulement mettre le dernier cercle en rouge
      const circles = document.querySelectorAll('.circle');
      const lastCircle = document.getElementById('lastCircle');
      
      lastCircle.style.backgroundColor = 'red'; // Le dernier cercle devient rouge en cas d'erreur
  
  
      setTimeout(() => {
        lastCircle.style.backgroundColor = 'black'; // Réinitialiser après un délai
        lastCircle.innerText = ''; // Effacer le texte
      }, 900);
  
      console.log(correctAnswers);
    }
  });
  updateLEDs();  

// Gestion du clic sur le sonar
sonar.addEventListener("click", () => {
  rotation += 90;  // Tourner de 90° à chaque clic (Nord -> Est -> Sud -> Ouest)
  
  if (rotation === 0) rotation = 0;  // Réinitialiser la rotation à 0 (Nord) après avoir atteint 360°
  
  aiguille.style.transform = `translateX(-50%) translateY(-100%) rotate(${rotation}deg)`;  // Appliquer la rotation
});

// Sélection de l'élément audio
const ambientSound = document.getElementById('ambientSound');
const aiguilleSound = document.getElementById('aiguilleSound');

// Fonction pour démarrer le son dès le chargement de la page
window.addEventListener('load', () => {
    ambientSound.volume = 0.1;
  ambientSound.play().catch((error) => {
    console.log('Erreur lors de la lecture du son d\'ambiance:', error);
  });
});

// Gestion du clic sur l'aiguille
aiguille.addEventListener('click', () => {

    aiguilleSound.volume = 1; 
  // Lire le son de l'aiguille à chaque clic
  aiguilleSound.play().catch((error) => {
    console.log('Erreur lors de la lecture du son de l\'aiguille:', error);
  });

  // Rotation de l'aiguille
  rotation = (rotation + 90) % 360;
  aiguille.style.transform = `translateX(-50%) translateY(-100%) rotate(${rotation}deg)`;

});
