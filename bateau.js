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

// -------------------------------------------------------------------------
// Game 1: Random Squares
function spawnRandomSquare() {
    const isRedSquare = Math.random() > 0.65;
    const squareType = isRedSquare ? "red" : "green";

    const squareElement = document.createElement("div");
    squareElement.classList.add(`${squareType}-square`);

    positionSquareElement(squareElement);
    gameContainer1.appendChild(squareElement);

    handleSquareInteraction(squareElement, squareType);
}

function positionSquareElement(squareElement) {
    const containerBounds = gameContainer1.getBoundingClientRect();
    const xPosition = Math.random() * (containerBounds.width - squareDimension);
    const yPosition = Math.random() * (containerBounds.height - squareDimension);
    squareElement.style.left = `${xPosition}px`;
    squareElement.style.top = `${yPosition}px`;
    squareElement.style.position = 'absolute';
}

function handleSquareInteraction(squareElement, squareType) {
    let wasClicked = false;

    squareElement.addEventListener("click", () => {
        wasClicked = true;
        if (squareColors[squareType].isSuccess) {
            currentScore += 1;
            updateGame1Score();
        }
        squareElement.remove();
    });

    setTimeout(() => {
        if (!wasClicked) {
            squareElement.remove();
        }
    }, squareColors[squareType].timeout);
}

function updateGame1Score() {
    const progressPercentage = (currentScore / maxGame1Score) * 100;
    progressBarElement.style.width = `${progressPercentage}%`;

    if (currentScore >= maxGame1Score) {
        clearInterval(game1Interval);
        gameContainer1.innerHTML = '';
        document.querySelector('.container-1').style.display = 'none';
        document.querySelector('.container-2').style.display = 'flex';
        document.querySelector('.progress').classList.add('hidden');
        stopGame1();
    }
}

// -------------------------------------------------------------------------
// Game 2: Sonar
function drawGridLines() {
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

function createRadarPointElement(point) {
    const pointElement = document.createElement('div');
    pointElement.classList.add('point');
    pointElement.style.left = `calc(50% + ${point.radius * 0.5 * Math.cos(point.angle * Math.PI / 180)}%)`;
    pointElement.style.top = `calc(50% + ${point.radius * 0.5 * Math.sin(point.angle * Math.PI / 180)}%)`;
    pointElement.style.opacity = 0;
    pointElement.setAttribute('data-label', point.label);

    if (point.label === 'capsule') {
        pointElement.classList.add('capsule');
    }

    pointElement.addEventListener('click', () => handleRadarPointClick(pointElement, point.label));
    return pointElement;
}

function handleRadarPointClick(pointElement, label) {
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
        startTicTacToeGame();
    }
}

function checkRadarPointVisibility(point, pointElement) {
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

function initializeRadarPoints() {
    radarPoints.forEach(point => {
        const pointElement = createRadarPointElement(point);
        sonarElement.appendChild(pointElement);

        setInterval(() => checkRadarPointVisibility(point, pointElement), 100);
    });
}

// -------------------------------------------------------------------------
// Game 3: Tic-Tac-Toe
function startTicTacToeGame() {
    const gridSize = 3;
    const ticTacToeGrid = document.getElementById('game3-grid');
    const gameStatus = document.getElementById('game3-status');
    let currentPlayer = 'X';
    let gameBoard = Array(gridSize).fill(null).map(() => Array(gridSize).fill(''));

    ticTacToeGrid.innerHTML = '';
    gameStatus.textContent = `Joueur ${currentPlayer}, à vous de jouer !`;

    for (let row = 0; row < gridSize; row++) {
        for (let col = 0; col < gridSize; col++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.dataset.row = row;
            cell.dataset.col = col;
            cell.addEventListener('click', () => handleTicTacToeCellClick(row, col, cell));
            ticTacToeGrid.appendChild(cell);
        }
    }

    function handleTicTacToeCellClick(row, col, cell) {
        if (gameBoard[row][col] !== '') return;

        gameBoard[row][col] = currentPlayer;
        cell.textContent = currentPlayer;

        if (checkTicTacToeWin(row, col)) {
            gameStatus.textContent = `Joueur ${currentPlayer} a gagné !`;
            ticTacToeGrid.querySelectorAll('.cell').forEach(c => c.removeEventListener('click', handleTicTacToeCellClick));
        } else if (gameBoard.flat().every(cell => cell !== '')) {
            gameStatus.textContent = 'Match nul !';
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            gameStatus.textContent = `Joueur ${currentPlayer}, à vous de jouer !`;
        }
    }

    function checkTicTacToeWin(row, col) {
        if (gameBoard[row].every(cell => cell === currentPlayer)) return true;

        if (gameBoard.every(row => row[col] === currentPlayer)) return true;

        if (row === col && gameBoard.every((_, i) => gameBoard[i][i] === currentPlayer)) return true;

        if (row + col === gridSize - 1 && gameBoard.every((_, i) => gameBoard[i][gridSize - 1 - i] === currentPlayer)) return true;

        return false;
    }
}

// -------------------------------------------------------------------------
// Game 4: Memory Game
function startMemoryMatchingGame() {
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
        card.addEventListener('click', () => handleMemoryCardClick(card));
        memoryGameGrid.appendChild(card);
    });

    function handleMemoryCardClick(card) {
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

                if (matchedPairs === cardColors.length) {
                    console.log('Félicitations ! Vous avez trouvé toutes les paires !');
                }
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
        }
    }
}

// -------------------------------------------------------------------------
// Game Control Functions
function startGame1() {
    if (document.querySelector('.container-1').style.display !== 'none') {
        game1Interval = setInterval(spawnRandomSquare, 1000);
    }
}

function stopGame1() {
    clearInterval(game1Interval);
}

// -------------------------------------------------------------------------
// Initialize the Game
updateGame1Score();
drawGridLines();
initializeRadarPoints();
startGame1();
startMemoryMatchingGame();
