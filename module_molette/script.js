// Sélection des éléments HTML nécessaires
const sonar = document.getElementById('sonar');
const aiguille = document.getElementById('aiguille');
const ledContainer = document.getElementById('ledContainer');
const validateBtn = document.getElementById('validate');
const messageBox = document.getElementById('messageBox');

// Variables de suivi du jeu
let rotation = 0;
let correctPosition = 0; 
let leds = [];
let correctAnswers = 0;
const maxMistakes = 2;

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
  console.log('Nouvelle position correcte:', correctPosition);
}

function updateLEDs() {
  console.log('Mise à jour des LEDs avec correctPosition:', correctPosition);
  leds.forEach((led, index) => {
    let currentLed = ledData[index];
    let active = false;

    switch (correctPosition) {
      case 0:
        active = currentLed.haut;
        console.log("haut")
        break;
      case 90:
        active = currentLed.droite;
        console.log("droite")
        break;
      case 180:
        active = currentLed.bas;
        console.log("bas")
        break;
      case 270:
        active = currentLed.gauche;
        console.log("gauche")
        break;
    }

    led.style.backgroundColor = active ? 'yellow' : 'white';
    led.style.boxShadow = active ? '0 0 10px 1px white' : 'none';
  });
}

validateBtn.addEventListener('click', () => {
  console.log('Validation : rotation =', rotation, ', correctPosition =', correctPosition);
  if (rotation === correctPosition) {
    correctAnswers++;
    correctSound.play().catch(error => console.log('Erreur de lecture du son:', error));

    document.querySelectorAll('.circle').forEach((circle, index) => {
      circle.style.backgroundColor = index < correctAnswers ? 'green' : 'black';
    });

    if (correctAnswers >= 4) {
      messageBox.innerText = 'Mission accomplie!';
      messageBox.style.display = 'flex';
      validateBtn.disabled = true;
      sonar.style.pointerEvents = 'none';
    }

    newCorrectPosition();
    setTimeout(updateLEDs, 100);
  } else {
    document.getElementById('lastCircle').style.backgroundColor = 'red';
    setTimeout(() => {
      document.getElementById('lastCircle').style.backgroundColor = 'black';
    }, 900);
  }
});

updateLEDs();

//& Gestion du clic sur la sonar
sonar.addEventListener("click", () => {
  rotation = (rotation + 90) % 360;
  aiguille.style.transform = `translateX(-50%) translateY(-100%) rotate(${rotation}deg)`;
});


// Sélection de l'élément audio
const ambientSound = document.getElementById('ambientSound');
const aiguilleSound = document.getElementById('aiguilleSound');
const correctSound = document.getElementById('correctSound');


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