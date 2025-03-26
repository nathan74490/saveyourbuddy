// -------------------------------------------------------------------------
// Global Variables
const gameContainer1 = document.querySelector('.container-1');
const progressBarElement = document.querySelector('.progress-bar');
const maxGame1Score = 5;
const squareDimension = 50;
let currentScore = 0;
let game1Interval;

const squareColors = {
    red: { timeout: 800, isSuccess: true },
    green: { timeout: 5000, isSuccess: false },
};

const sonarElement = document.querySelector('.sonar');
const radarBarElement = document.querySelector('.radar-bar');
const infoDisplay = document.querySelector('.info');
let activePoint = null;

const radarPoints = [
    { angle: 0, radius: 20, label: 'point 1' },
    { angle: 45, radius: 40, label: 'point 2' },
    { angle: 90, radius: 60, label: 'point 3' },
    { angle: 135, radius: 80, label: 'point 4' },
    { angle: 180, radius: 100, label: 'point 5' },
    { angle: 225, radius: 80, label: 'point 6' },
    { angle: 270, radius: 20, label: 'point 7' },
    { angle: 315, radius: 40, label: 'capsule' },
];

const codeDigits = ['_', '_', '_', '_', '_', '_'];
const codeDisplay = document.getElementById('code-display');
let gamesCompleted = 0;

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

function showEndScreen() {
    document.querySelector('#main').style.display = 'none';
    document.querySelector('#end-screen').style.display = 'block';
    document.getElementById('final-code').textContent = codeDigits.join('');
    document.getElementById('code-text').style.display = 'none';
}

// -------------------------------------------------------------------------
// Game 1: Random Squares
function spawnSquare() {
    const isColoredSquare = Math.random() > 0.65;
    const squareType = isColoredSquare ? "red" : "green";

    const squareElement = document.createElement("div");
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

    squareElement.addEventListener("click", () => {
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
        revealCodeDigits(0, ['1', '2']);
    }
}

// -------------------------------------------------------------------------
// Game 2: Sonar
function renderGridLines() {
    for (let i = 1; i < 10; i++) {
        const horizontalLine = document.createElement('div');
        horizontalLine.classList.add('grid-line', 'horizontal');
        horizontalLine.style.top = `${(i * 10)}%`;
        sonarElement.appendChild(horizontalLine);

        const verticalLine = document.createElement('div');
        verticalLine.classList.add('grid-line', 'vertical');
        verticalLine.style.left = `${(i * 10)}%`;
        sonarElement.appendChild(verticalLine);
    }
}

function createRadarPoint(point) {
    const pointElement = document.createElement('div');
    pointElement.classList.add('point');
    pointElement.style.left = `calc(50% + ${point.radius * 0.5 * Math.cos(point.angle * Math.PI / 180)}%)`;
    pointElement.style.top = `calc(50% + ${point.radius * 0.5 * Math.sin(point.angle * Math.PI / 180)}%)`;
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
    activePoint = pointElement;
    infoDisplay.textContent = label;

    if (label === 'capsule') {
        document.querySelector('.container-2').style.display = 'none';
        document.querySelector('.container-3').style.display = 'flex';
        infoDisplay.textContent = '';
        revealCodeDigits(2, ['3', '4']);
    }
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
    radarPoints.forEach(point => {
        const pointElement = createRadarPoint(point);
        sonarElement.appendChild(pointElement);

        setInterval(() => verifyRadarPointVisibility(point, pointElement), 100);
    });
}


// -------------------------------------------------------------------------
// Game 3: Memory Game
function initializeMemoryGame() {
    const cardColors = ['red', 'blue', 'green', 'yellow', 'purple', 'orange', 'pink', 'cyan'];
    const cardPairs = [...cardColors, ...cardColors];
    const shuffledCards = cardPairs.sort(() => Math.random() - 0.5);
    const memoryGameGrid = document.getElementById('memory-game');
    let firstSelectedCard = null;
    let secondSelectedCard = null;
    let matchedPairs = 0;

    memoryGameGrid.innerHTML = '';
    matchedPairs = 0;

    shuffledCards.forEach((color, index) => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.color = color;
        card.dataset.index = index;
        card.addEventListener('click', () => onMemoryCardClick(card));
        memoryGameGrid.appendChild(card);
    });

    function onMemoryCardClick(card) {
        if (card.classList.contains('flipped') || secondSelectedCard) return;

        card.style.backgroundColor = card.dataset.color;
        card.classList.add('flipped');

        if (!firstSelectedCard) {
            firstSelectedCard = card;
        } else {
            secondSelectedCard = card;

            if (firstSelectedCard.dataset.color === secondSelectedCard.dataset.color) {
                matchedPairs++;
                firstSelectedCard = null;
                secondSelectedCard = null;
            } else {
                setTimeout(() => {
                    firstSelectedCard.style.backgroundColor = '';
                    secondSelectedCard.style.backgroundColor = '';
                    firstSelectedCard.classList.remove('flipped');
                    secondSelectedCard.classList.remove('flipped');
                    firstSelectedCard = null;
                    secondSelectedCard = null;
                }, 1000);
            }

            if (matchedPairs === cardColors.length) {
                revealCodeDigits(4, ['5', '6']);
            }
        }
    }
}

// -------------------------------------------------------------------------
// Game Control Functions
function startRandomSquareGame() {
    if (document.querySelector('.container-1').style.display !== 'none') {
        game1Interval = setInterval(spawnSquare, 1000);
    }
}

function stopRandomSquareGame() {
    clearInterval(game1Interval);
}

// Add event listener for game selector
document.getElementById('game-selector').addEventListener('change', (event) => {
    const selectedGame = event.target.value;

    // Hide all game containers and reset progress
    document.querySelector('.container-1').style.display = 'none';
    document.querySelector('.container-2').style.display = 'none';
    document.querySelector('.container-3').style.display = 'none';
    document.querySelector('.progress').classList.add('hidden');
    stopRandomSquareGame();

    // Show the selected game container
    if (selectedGame === 'game1') {
        document.querySelector('.container-1').style.display = 'grid';
        document.querySelector('.progress').classList.remove('hidden');
        startRandomSquareGame();
    } else if (selectedGame === 'game2') {
        document.querySelector('.container-2').style.display = 'flex';
    } else if (selectedGame === 'game3') {
        document.querySelector('.container-3').style.display = 'flex';
        initializeMemoryGame();
    }
});

// -------------------------------------------------------------------------
// Initialize the Game
updateScoreForGame1();
renderGridLines();
setupRadarPoints();
startRandomSquareGame();
initializeMemoryGame();
