// Folder variables
const container = document.querySelector('.container-1');
const scoreElement = document.querySelector('.score');
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
    scoreElement.innerHTML = score;
    if (score >= 5) {
        clearInterval(gameInterval);
        container.innerHTML = '';
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

// other
document.getElementById('show-container-1').addEventListener('click', () => {
    document.querySelector('.container-2').style.display = 'none';
    document.querySelector('.container-1').style.display = 'block';
    startGame();
});

document.getElementById('show-container-2').addEventListener('click', () => {
    document.querySelector('.container-1').style.display = 'none';
    document.querySelector('.container-2').style.display = 'flex';
    stopGame();
});