// Folder variables
const container = document.querySelector('.container-1');
const progressBar = document.querySelector('.progress-bar');
const maxScore = 5;
const squareSize = 50;
let score = 0;
let gameInterval;
const colorData = {
    red: { timeout: 800, success: true },
    green: { timeout: 5000, success: false },
};

// Sonar variables
const sonar = document.querySelector('.sonar');
const radarBar = document.querySelector('.radar-bar');
const info = document.querySelector('.info');
let selectedPoint = null;
const points = [
    { angle: 0, radius: 20, data: 'point 1' },
    { angle: 45, radius: 40, data: 'point 2' },
    { angle: 90, radius: 60, data: 'point 3' },
    { angle: 135, radius: 80, data: 'point 4' },
    { angle: 180, radius: 100, data: 'point 5' },
    { angle: 225, radius: 80, data: 'point 6' },
    { angle: 270, radius: 20, data: 'point 7' },
    { angle: 315, radius: 40, data: 'capsule' },
];

// -------------------------------------------------------------------------

// Folder functions
function createRandomSquare() {
    const squareColor = Math.random() > 0.65;
    const type = squareColor ? "red" : "green";

    const square = document.createElement("div");
    square.classList.add(`${type}-square`);

    positionSquare(square);
    container.appendChild(square);

    handleSquareClick(square, type);
}

function positionSquare(square) {
    const containerRect = container.getBoundingClientRect();
    const x = Math.random() * (containerRect.width - squareSize);
    const y = Math.random() * (containerRect.height - squareSize);
    square.style.left = `${x}px`;
    square.style.top = `${y}px`;
    square.style.position = 'absolute';
}

function handleSquareClick(square, type) {
    let isClicked = false;

    square.addEventListener("click", () => {
        isClicked = true;
        if (colorData[type].success) {
            score += 1;
            updateScore();
        }
        square.remove();
    });

    setTimeout(() => {
        if (!isClicked) {
            square.remove();
        }
    }, colorData[type].timeout);
}

function updateScore() {
    const progressPercentage = (score / maxScore) * 100;
    progressBar.style.width = `${progressPercentage}%`;

    if (score >= maxScore) {
        clearInterval(gameInterval);
        container.innerHTML = '';
        document.querySelector('.container-1').style.display = 'none';
        document.querySelector('.container-2').style.display = 'flex';
        stopGame();
    }
}

// Sonar functions
function createGridLines() {
    for (let i = 1; i < 10; i++) {
        const horizontalLine = document.createElement('div');
        horizontalLine.classList.add('grid-line', 'horizontal');
        horizontalLine.style.top = `${(i * 10)}%`;
        sonar.appendChild(horizontalLine);

        const verticalLine = document.createElement('div');
        verticalLine.classList.add('grid-line', 'vertical');
        verticalLine.style.left = `${(i * 10)}%`;
        sonar.appendChild(verticalLine);
    }
}

function createPointElement(point) {
    const pointElement = document.createElement('div');
    pointElement.classList.add('point');
    pointElement.style.left = `calc(50% + ${point.radius * 0.5 * Math.cos(point.angle * Math.PI / 180)}%)`;
    pointElement.style.top = `calc(50% + ${point.radius * 0.5 * Math.sin(point.angle * Math.PI / 180)}%)`;
    pointElement.style.opacity = 0;
    pointElement.setAttribute('data-info', point.data);

    if (point.data === 'capsule') {
        pointElement.classList.add('capsule');
    }

    pointElement.addEventListener('click', () => handlePointClick(pointElement, point.data));
    return pointElement;
}

function handlePointClick(pointElement, data) {
    if (selectedPoint) {
        selectedPoint.classList.remove('selected');
    }
    pointElement.classList.add('selected');
    selectedPoint = pointElement;
    info.textContent = data;
}

function checkPointVisibility(point, pointElement) {
    const radarTransform = getComputedStyle(radarBar).transform;
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

function initializePoints() {
    points.forEach(point => {
        const pointElement = createPointElement(point);
        sonar.appendChild(pointElement);

        setInterval(() => checkPointVisibility(point, pointElement), 100);
    });
}

// -------------------------------------------------------------------------

function startGame() {
    if (document.querySelector('.container-1').style.display !== 'none') {
        gameInterval = setInterval(createRandomSquare, 1000);
    }
}

function stopGame() {
    clearInterval(gameInterval);
}

// Initialize the game
updateScore();
createGridLines();
initializePoints();
startGame();
startMemoryGame();

function startGame3() {
    const gridSize = 3; // Changez à 5 pour une grille 5x5
    const grid = document.getElementById('game3-grid');
    const status = document.getElementById('game3-status');
    let currentPlayer = 'X';
    let board = Array(gridSize).fill(null).map(() => Array(gridSize).fill(''));

    // Réinitialiser la grille
    grid.innerHTML = '';
    status.textContent = `Joueur ${currentPlayer}, à vous de jouer !`;

    // Créer la grille
    for (let row = 0; row < gridSize; row++) {
        for (let col = 0; col < gridSize; col++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.dataset.row = row;
            cell.dataset.col = col;
            cell.addEventListener('click', () => handleCellClick(row, col, cell));
            grid.appendChild(cell);
        }
    }

    function handleCellClick(row, col, cell) {
        if (board[row][col] !== '') return; // Case déjà occupée

        board[row][col] = currentPlayer;
        cell.textContent = currentPlayer;

        if (checkWin(row, col)) {
            status.textContent = `Joueur ${currentPlayer} a gagné !`;
            grid.querySelectorAll('.cell').forEach(c => c.removeEventListener('click', handleCellClick));
        } else if (board.flat().every(cell => cell !== '')) {
            status.textContent = 'Match nul !';
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            status.textContent = `Joueur ${currentPlayer}, à vous de jouer !`;
        }
    }

    function checkWin(row, col) {
        // Vérifier la ligne
        if (board[row].every(cell => cell === currentPlayer)) return true;

        // Vérifier la colonne
        if (board.every(row => row[col] === currentPlayer)) return true;

        // Vérifier la diagonale principale
        if (row === col && board.every((_, i) => board[i][i] === currentPlayer)) return true;

        // Vérifier la diagonale secondaire
        if (row + col === gridSize - 1 && board.every((_, i) => board[i][gridSize - 1 - i] === currentPlayer)) return true;

        return false;
    }
}

function startMemoryGame() {
    const colors = ['red', 'blue', 'green', 'yellow', 'purple', 'orange', 'pink', 'cyan'];
    const pairs = [...colors, ...colors]; // 8 paires
    const shuffledPairs = pairs.sort(() => Math.random() - 0.5);
    const grid = document.getElementById('memory-game');
    const status = document.getElementById('memory-status');
    let firstCard = null;
    let secondCard = null;
    let matches = 0;

    // Réinitialiser la grille et l'état
    grid.innerHTML = '';
    status.textContent = 'Trouvez toutes les paires !';
    matches = 0;

    // Créer les cartes
    shuffledPairs.forEach((color, index) => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.color = color;
        card.dataset.index = index;
        card.addEventListener('click', () => handleCardClick(card));
        grid.appendChild(card);
    });

    function handleCardClick(card) {
        if (card.classList.contains('flipped') || secondCard) return;

        card.style.backgroundColor = card.dataset.color;
        card.classList.add('flipped');

        if (!firstCard) {
            firstCard = card;
        } else {
            secondCard = card;

            // Vérifier si les deux cartes correspondent
            if (firstCard.dataset.color === secondCard.dataset.color) {
                matches++;
                firstCard = null;
                secondCard = null;

                if (matches === colors.length) {
                    status.textContent = 'Félicitations ! Vous avez trouvé toutes les paires !';
                }
            } else {
                // Retourner les cartes après un délai
                setTimeout(() => {
                    firstCard.style.backgroundColor = '';
                    secondCard.style.backgroundColor = '';
                    firstCard.classList.remove('flipped');
                    secondCard.classList.remove('flipped');
                    firstCard = null;
                    secondCard = null;
                }, 1000);
            }
        }
    }
}
