import { updateMindGamesStatus } from './APIMindGame.js';

// =========================================================================
// CONSTANTS
// =========================================================================
const maxGame1Score = 5;
const squareDimension = 50;
const squareColors = {
  red: { timeout: 800, isSuccess: true },
  green: { timeout: 5000, isSuccess: false },
};

const codeDigits = ['_', '_', '_', '_', '_', '_'];
const cardImages = ['anchor', 'coral', 'helmet', 'medusa', 'O2', 'shell'];

// =========================================================================
// DOM ELEMENTS
// =========================================================================
const gameContainer1 = document.querySelector('.container-1');
const progressBarElement = document.querySelector('.progress-bar');
const progressBarElement2 = document.querySelector('.progress-bar-2');
const sonarElement = document.querySelector('.sonar');
const radarBarElement = document.querySelector('.radar-bar');
const infoDisplay = document.querySelector('.info');
const codeDisplay = document.getElementById('code-display');
const memoryGameGrid = document.getElementById('memory-game');

// =========================================================================
// GAME STATE VARIABLES
// =========================================================================
let currentScore = 0;
let game1Interval;
let activePoint = null;
let gamesCompleted = 0;

// =========================================================================
// RADAR POINTS CONFIGURATION
// =========================================================================
const radarPoints = [
  { angle: 240, radius: 50, label: 'HYDRA-3X' },
  { angle: 0, radius: 20, label: 'POD-22X' },
  { angle: 45, radius: 40, label: 'OCEAN-7B' },
  { angle: 90, radius: 60, label: 'AQUA-12' },
  { angle: 135, radius: 80, label: 'MARINE-8' },
  { angle: 180, radius: 100, label: '??@#-12X' },
  { angle: 225, radius: 80, label: 'X!@#-Z9' },
  { angle: 270, radius: 20, label: 'CRYPT-99' },
  { angle: 300, radius: 40, label: 'ZETA-77' },
  { angle: 330, radius: 60, label: 'OMEGA-3' },
  { angle: 15, radius: 80, label: 'TITAN-5' },
  { angle: 45, radius: 100, label: 'NOVA-1' },
  { angle: 75, radius: 20, label: 'AERO-9' },
  { angle: 105, radius: 40, label: '??@#-X1' },
  { angle: 135, radius: 60, label: 'CRYPT-88' },
  { angle: 165, radius: 80, label: 'ZETA-99' },
  { angle: 195, radius: 100, label: 'OMEGA-7' },
  { angle: 225, radius: 20, label: 'DELTA-4' },
  { angle: 255, radius: 40, label: 'ALPHA-2' },
  { angle: 285, radius: 60, label: 'BETA-3' },
];

// =========================================================================
// CAPSULES DATA
// =========================================================================
const capsules = [
  {
    name: "HYDRA-3X",
    manufacturer: "Arasaka",
    year: 2077,
    depthLimit: 6500,
    survivalTime: "30min",
    extendedSurvivalTime: "7 jours",
    material: "Alliage de titane renforcé au carbure de néon",
    color: ["rouge", "noir"],
  },
  {
    name: "POD-22X",
    manufacturer: "Renaud",
    year: 2186,
    depthLimit: 11000,
    survivalTime: "16h",
    extendedSurvivalTime: "10 jours",
    material: "Coque en titane de grade aérospatial avec fenêtres en quartz synthétique",
    color: ["violet", "noir"],
  },
  {
    name: "OCEAN-7B",
    manufacturer: "DeepCore",
    year: 2194,
    depthLimit: 5800,
    survivalTime: "18h",
    extendedSurvivalTime: "16 jours",
    material: "Alliage de titane renforcé au carbure de néon",
    color: ["vert", "violet"],
  },
  {
    name: "AQUA-12",
    manufacturer: "NeptuneTech",
    year: 2201,
    depthLimit: 7200,
    survivalTime: "12h",
    extendedSurvivalTime: "5 jours",
    material: "Alliage composite renforcé",
    color: ["bleu", "argent"],
  },
  {
    name: "MARINE-8",
    manufacturer: "Oceanic Systems",
    year: 2175,
    depthLimit: 5000,
    survivalTime: "10h",
    extendedSurvivalTime: "3 jours",
    material: "Acier inoxydable renforcé",
    color: ["gris", "bleu"],
  },
  {
    name: "??@#-12X",
    manufacturer: "jior@?8*+q",
    year: "2@#%",
    depthLimit: "??@@",
    survivalTime: "??h",
    extendedSurvivalTime: "?? jours",
    material: "??@# alliage",
    color: ["??", "??"],
  },
  {
    name: "X!@#-Z9",
    manufacturer: "qwe@!9*+",
    year: "2!@#",
    depthLimit: "!!@@",
    survivalTime: "!@h",
    extendedSurvivalTime: "!@ jours",
    material: "!@# alliage",
    color: ["!@", "!@"],
  },
  {
    name: "CRYPT-99",
    manufacturer: "Unknown",
    year: "????",
    depthLimit: "????",
    survivalTime: "??h",
    extendedSurvivalTime: "?? jours",
    material: "Cryptic material",
    color: ["???", "???"],
  },
  {
    name: "ZETA-77",
    manufacturer: "Unknown",
    year: "??!!",
    depthLimit: "??!!",
    survivalTime: "??h",
    extendedSurvivalTime: "?? jours",
    material: "Unknown",
    color: ["??", "??"],
  },
  {
    name: "OMEGA-3",
    manufacturer: "Unknown",
    year: "??##",
    depthLimit: "??##",
    survivalTime: "??h",
    extendedSurvivalTime: "?? jours",
    material: "Unknown",
    color: ["??", "??"],
  },
  {
    name: "TITAN-5",
    manufacturer: "DeepSea Corp",
    year: 2210,
    depthLimit: 8000,
    survivalTime: "20h",
    extendedSurvivalTime: "8 jours",
    material: "Alliage de titane avancé",
    color: ["noir", "argent"],
  },
  {
    name: "NOVA-1",
    manufacturer: "StarMarine",
    year: 2230,
    depthLimit: 9000,
    survivalTime: "24h",
    extendedSurvivalTime: "10 jours",
    material: "Carbone renforcé",
    color: ["blanc", "bleu"],
  },
  {
    name: "AERO-9",
    manufacturer: "SkyTech",
    year: 2225,
    depthLimit: 7000,
    survivalTime: "15h",
    extendedSurvivalTime: "6 jours",
    material: "Alliage composite",
    color: ["bleu", "noir"],
  },
  {
    name: "??@#-X1",
    manufacturer: "Unknown",
    year: "??!!",
    depthLimit: "??!!",
    survivalTime: "??h",
    extendedSurvivalTime: "?? jours",
    material: "Unknown",
    color: ["??", "??"],
  },
  {
    name: "CRYPT-88",
    manufacturer: "Unknown",
    year: "????",
    depthLimit: "????",
    survivalTime: "??h",
    extendedSurvivalTime: "?? jours",
    material: "Unknown",
    color: ["???", "???"],
  },
  {
    name: "ZETA-99",
    manufacturer: "Unknown",
    year: "??!!",
    depthLimit: "??!!",
    survivalTime: "??h",
    extendedSurvivalTime: "?? jours",
    material: "Unknown",
    color: ["??", "??"],
  },
  {
    name: "OMEGA-7",
    manufacturer: "Unknown",
    year: "??##",
    depthLimit: "??##",
    survivalTime: "??h",
    extendedSurvivalTime: "?? jours",
    material: "Unknown",
    color: ["??", "??"],
  },
  {
    name: "DELTA-4",
    manufacturer: "Unknown",
    year: "??!!",
    depthLimit: "??!!",
    survivalTime: "??h",
    extendedSurvivalTime: "?? jours",
    material: "Unknown",
    color: ["??", "??"],
  },
  {
    name: "ALPHA-2",
    manufacturer: "Unknown",
    year: "??!!",
    depthLimit: "??!!",
    survivalTime: "??h",
    extendedSurvivalTime: "?? jours",
    material: "Unknown",
    color: ["??", "??"],
  },
  {
    name: "BETA-3",
    manufacturer: "Unknown",
    year: "??!!",
    depthLimit: "??!!",
    survivalTime: "??h",
    extendedSurvivalTime: "?? jours",
    material: "Unknown",
    color: ["??", "??"],
  },
];

// =========================================================================
// GAME 1: RANDOM SQUARES
// =========================================================================
function spawnSquare() {
  const isColoredSquare = Math.random() > 0.65;
  const squareType = isColoredSquare ? 'red' : 'green';

  const squareElement = document.createElement('div');
  squareElement.classList.add(`${squareType}-square`);

  setSquarePosition(squareElement);
  gameContainer1.appendChild(squareElement);

  handleSquareClick(squareElement, squareType);
}

function setSquarePosition(squareElement) {
  const containerBounds = gameContainer1.getBoundingClientRect();
  const xPosition = Math.random() * (containerBounds.width - squareDimension);
  const yPosition = Math.random() * (containerBounds.height - squareDimension);
  squareElement.style.left = `${xPosition}px`;
  squareElement.style.top = `${yPosition}px`;
  squareElement.style.position = 'absolute';
}

function handleSquareClick(squareElement, squareType) {
  let wasClicked = false;

  squareElement.addEventListener('click', () => {
    wasClicked = true;
    if (squareColors[squareType].isSuccess) {
      currentScore += 1;
      updateScoreForGame1();
    }
    squareElement.remove();
  });

  setTimeout(() => {
    if (!wasClicked) {
      squareElement.remove();
    }
  }, squareColors[squareType].timeout);
}

function updateScoreForGame1() {
  const progressPercentage = (currentScore / maxGame1Score) * 100;
  progressBarElement.style.width = `${progressPercentage}%`;

  if (currentScore >= maxGame1Score) {
    clearInterval(game1Interval);
    gameContainer1.innerHTML = '';
    document.querySelector('.container-1').style.display = 'none';
    document.querySelector('.container-2').style.display = 'flex';
    document.querySelector('.progress').classList.add('hidden');
    stopRandomSquareGame();
    const randomDigits = [Math.floor(Math.random() * 10), Math.floor(Math.random() * 10)];
    revealCodeDigits(0, randomDigits.map(String));
  }
}

// =========================================================================
// GAME 2: SONAR
// =========================================================================
function renderGridLines() {
  for (let i = 1; i < 10; i++) {
    const horizontalLine = document.createElement('div');
    horizontalLine.classList.add('grid-line', 'horizontal');
    horizontalLine.style.top = `${i * 10}%`;
    sonarElement.appendChild(horizontalLine);

    const verticalLine = document.createElement('div');
    verticalLine.classList.add('grid-line', 'vertical');
    verticalLine.style.left = `${i * 10}%`;
    sonarElement.appendChild(verticalLine);
  }
}

function createRadarPoint(point) {
  const pointElement = document.createElement('div');
  pointElement.classList.add('point');
  pointElement.style.left = `calc(50% + ${point.radius * 0.5 * Math.cos((point.angle * Math.PI) / 180)}%)`;
  pointElement.style.top = `calc(50% + ${point.radius * 0.5 * Math.sin((point.angle * Math.PI) / 180)}%)`;
  pointElement.style.opacity = 0;
  pointElement.setAttribute('data-label', point.label);

  if (point.label === 'capsule') {
    pointElement.classList.add('capsule');
  }

  pointElement.addEventListener('click', () => onRadarPointClick(pointElement, point.label));
  return pointElement;
}

function onRadarPointClick(pointElement, label) {
  if (activePoint) {
    activePoint.classList.remove('selected');
  }
  pointElement.classList.add('selected');
  pointElement.classList.add('clicked');
  activePoint = pointElement;
  displayCapsuleInfo(label);
}

function verifyRadarPointVisibility(point, pointElement) {
  const radarTransform = getComputedStyle(radarBarElement).transform;
  if (radarTransform !== 'none') {
    const values = radarTransform.split('(')[1].split(')')[0].split(',');
    const a = values[0];
    const b = values[1];
    let radarAngle = Math.atan2(b, a) * (180 / Math.PI);

    let pointAngle = point.angle;
    if (pointAngle < 0) pointAngle += 360;
    if (radarAngle < 0) radarAngle += 360;

    if (Math.abs(radarAngle - pointAngle) < 5) {
      pointElement.style.opacity = 1;
      setTimeout(() => {
        if (!pointElement.classList.contains('selected')) {
          pointElement.style.opacity = 0;
        }
      }, 1000);
    }
  }
}

function setupRadarPoints() {
  radarPoints.forEach((point) => {
    const pointElement = createRadarPoint(point);
    sonarElement.appendChild(pointElement);
    setInterval(() => verifyRadarPointVisibility(point, pointElement), 100);
  });
}

// =========================================================================
// GAME 3: MEMORY GAME
// =========================================================================
function updateScoreForGame3(matchedPairs, totalPairs) {
  const progressPercentage = (matchedPairs / totalPairs) * 100;
  progressBarElement2.style.width = `${progressPercentage}%`;

  if (matchedPairs === totalPairs) {
    document.querySelector('.container-3').style.display = 'none';
    document.querySelector('.progress-2').classList.add('hidden');
    const randomDigits = [Math.floor(Math.random() * 10), Math.floor(Math.random() * 10)];
    revealCodeDigits(4, randomDigits.map(String));
  }
}

function initializeMemoryGame() {
  const cardPairs = [...cardImages, ...cardImages];
  const shuffledCards = cardPairs.sort(() => Math.random() - 0.5);
  let firstSelectedCard = null;
  let secondSelectedCard = null;
  let matchedPairs = 0;

  memoryGameGrid.innerHTML = '';
  matchedPairs = 0;

  shuffledCards.forEach((imageName, index) => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.image = imageName;
    card.dataset.index = index;
    card.addEventListener('click', () => onMemoryCardClick(card));
    memoryGameGrid.appendChild(card);
  });

  function onMemoryCardClick(card) {
    if (card.classList.contains('flipped') || secondSelectedCard) return;

    card.style.backgroundImage = `url('./assets/images/${card.dataset.image}.png')`;
    card.style.backgroundSize = 'cover';
    card.classList.add('flipped');

    if (!firstSelectedCard) {
      firstSelectedCard = card;
    } else {
      secondSelectedCard = card;

      if (firstSelectedCard.dataset.image === secondSelectedCard.dataset.image) {
        matchedPairs++;
        updateScoreForGame3(matchedPairs, cardImages.length);
        firstSelectedCard = null;
        secondSelectedCard = null;
      } else {
        setTimeout(() => {
          firstSelectedCard.style.backgroundImage = '';
          secondSelectedCard.style.backgroundImage = '';
          firstSelectedCard.classList.remove('flipped');
          secondSelectedCard.classList.remove('flipped');
          firstSelectedCard = null;
          secondSelectedCard = null;
        }, 1000);
      }
    }
  }
}

// =========================================================================
// CODE MANAGEMENT
// =========================================================================
function updateCodeDisplay() {
  const codeTextElement = document.getElementById('code-text');
  codeTextElement.textContent = codeDigits.join(' ');
}

function revealCodeDigits(startIndex, digits) {
  for (let i = 0; i < digits.length; i++) {
    codeDigits[startIndex + i] = digits[i];
  }
  updateCodeDisplay();

  gamesCompleted++;
  if (gamesCompleted === 3) {
    showEndScreen();
  }
}

// =========================================================================
// GAME END FUNCTIONS
// =========================================================================
function showEndScreen() {
  document.querySelector('.container-1').style.display = 'none';
  document.querySelector('.container-2').style.display = 'none';
  document.querySelector('.container-3').style.display = 'none';
  document.querySelector('#end-screen').style.display = 'flex';

  const code = (document.getElementById('final-code').textContent = codeDigits.join(''));
  console.log(code);
  document.getElementById('code-display').style.display = 'none';
  updateMindGamesStatus('sucess');
  let id_game = localStorage.getItem('id_game');
  console.log(id_game);
  updateGameData(id_game, null, code);
}

function updateGameData(gameId, finalTime, mindgameCode) {
  const updateData = {
    type: 'game',
    id_game: gameId,
    final_time: finalTime,
    mindgame_code: mindgameCode,
  };

  fetch('http://192.168.4.60/workshopAPI/api/v1/index.php', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updateData),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
    })
    .catch(console.error);
}

// =========================================================================
// CAPSULE INFO FUNCTIONS
// =========================================================================
function displayCapsuleInfo(capsuleName) {
  const normalizedCapsuleName = capsuleName.trim().toLowerCase();
  const capsule = capsules.find(c => c.name.trim().toLowerCase() === normalizedCapsuleName);

  if (capsule) {
    infoDisplay.innerHTML = `
      <strong>Nom :</strong> ${capsule.name}<br>
      <strong>Conçu par :</strong> ${capsule.manufacturer}<br>
      <strong>Année :</strong> ${capsule.year}<br>
      <strong>Profondeur limite :</strong> ${capsule.depthLimit} m<br>
      <strong>Mode survie :</strong> ${capsule.survivalTime}<br>
      <strong>Mode survie étendu :</strong> ${capsule.extendedSurvivalTime}<br>
      <strong>Matériau :</strong> ${capsule.material}<br>
      <strong>Couleurs :</strong> ${capsule.color.join(", ")}<br>
    `;
  } else {
    infoDisplay.textContent = "Capsule inconnue.";
  }
}

function decryptCapsuleData(capsuleName) {
  const capsule = capsules.find(c => c.name === capsuleName);
  if (capsule && capsule.name.includes('?')) {
    capsule.name = "Decrypted Name";
    capsule.manufacturer = "Decrypted Manufacturer";
    capsule.year = "Decrypted Year";
    capsule.depthLimit = "Decrypted Depth Limit";
    capsule.survivalTime = "Decrypted Survival Time";
    capsule.extendedSurvivalTime = "Decrypted Extended Survival Time";
    capsule.material = "Decrypted Material";
    capsule.color = ["Decrypted Color 1", "Decrypted Color 2"];
  }
}

// =========================================================================
// GAME CONTROL FUNCTIONS
// =========================================================================
function startRandomSquareGame() {
  if (document.querySelector('.container-1').style.display !== 'none') {
    game1Interval = setInterval(spawnSquare, 1000);
  }
}

function stopRandomSquareGame() {
  clearInterval(game1Interval);
}

// =========================================================================
// EVENT LISTENERS
// =========================================================================

document.getElementById('confirm-button').addEventListener('click', () => {
  const confirmationMessage = document.getElementById('confirmation-message');

  if (activePoint && activePoint.getAttribute('data-label') === 'HYDRA-3X') {
    document.querySelector('.container-2').style.display = 'none';
    document.querySelector('.container-3').style.display = 'flex';
    document.querySelector('.progress-2').classList.remove('hidden');
    const randomDigits = [Math.floor(Math.random() * 10), Math.floor(Math.random() * 10)];
    revealCodeDigits(2, randomDigits.map(String));
  } else {
    confirmationMessage.textContent = 'Échec ! Ce n\'est pas la bonne capsule.';
    confirmationMessage.style.color = 'red';
  }
});

document.addEventListener('DOMContentLoaded', () => {
  const alertScreen1 = document.getElementById('alert-screen-1');
  const restartButton = document.getElementById('restart-button');

  // Passe au jeu 1 lorsque le bouton "Redémarrer" est cliqué
  restartButton.addEventListener('click', () => {
      alertScreen1.classList.add('hidden'); // Cache l'écran d'alerte
      document.querySelector('.container-1').style.display = 'grid'; // Affiche le jeu 1
      startRandomSquareGame(); // Démarre le jeu 1
  });
});

document.addEventListener('DOMContentLoaded', () => {
    const alertScreen1 = document.getElementById('alert-screen-1');
    const alertScreen2 = document.getElementById('alert-screen-2');
    const restartButton = document.getElementById('restart-button');
    const progressBar = document.querySelector('.progress-bar');

    // Passe à la deuxième alerte avec une barre de chargement
    restartButton.addEventListener('click', () => {
        alertScreen1.classList.add('hidden'); // Cache la première alerte
        alertScreen2.classList.remove('hidden'); // Affiche la deuxième alerte

        // Démarre l'animation de la barre de chargement
        setTimeout(() => {
            progressBar.style.width = '100%'; // Remplit la barre
        }, 100);

        // Passe au jeu 1 après la fin de la barre de chargement
        setTimeout(() => {
            alertScreen2.classList.add('hidden'); // Cache la deuxième alerte
            document.querySelector('.container-1').style.display = 'grid'; // Affiche le jeu 1
            startRandomSquareGame(); // Démarre le jeu 1
        }, 3100); // Temps de chargement (3 secondes + un léger délai)
    });
});

// =========================================================================
// INITIALIZATION
// =========================================================================
updateScoreForGame1();
renderGridLines();
setupRadarPoints();
startRandomSquareGame();
initializeMemoryGame();