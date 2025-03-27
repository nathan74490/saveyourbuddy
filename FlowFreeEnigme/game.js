document.addEventListener('DOMContentLoaded', function() {
    const gameBoard = document.getElementById('game-board');
    const newGameBtn = document.getElementById('new-game');
    const restartBtn = document.getElementById('restart');
    const nextLevelBtn = document.getElementById('next-level');
    const levelInfo = document.getElementById('level-info');
    const progressInfo = document.getElementById('progress-info');

    // Start with a larger board for tablets
    let boardSize = 6;
    let level = 1;
    const MAX_LEVEL = 1; // Set maximum level
    let colors = [];
    let board = [];
    let completedPaths = {};
    let selectedColor = null;
    let currentPath = [];
    let completedPairs = 0;
    let isTouchDevice = 'ontouchstart' in window;

    initGame();

    newGameBtn.addEventListener('click', initGame);
    restartBtn.addEventListener('click', restartGame);
    nextLevelBtn.addEventListener('click', nextLevel);

    function initGame() {
        level = 1;
        boardSize = 6;
        board = createEmptyBoard(boardSize);
        colors = generateColors(boardSize);
        generateSolvableLevel();
        selectedColor = null;
        currentPath = [];
        completedPairs = 0;
        completedPaths = {};

        renderBoard();
        updateLevelInfo();
        updateProgressInfo();
    }

    function restartGame() {
        // Keep same level and board size, just reset the game
        board = createEmptyBoard(boardSize);
        generateSolvableLevel();
        selectedColor = null;
        currentPath = [];
        completedPairs = 0;
        completedPaths = {};

        renderBoard();
        updateProgressInfo();
    }

    function nextLevel() {
        if (level >= MAX_LEVEL) {
            // Player has completed all levels
            setTimeout(() => {
                alert('Congratulations! You won the game!');
                initGame(); // Reset to level 1
            }, 500);
            return;
        }

        level++;
        // Increase board size more slowly for tablets
        boardSize = Math.min(8, 6 + Math.floor(level / 5));
        board = createEmptyBoard(boardSize);
        colors = generateColors(boardSize);
        generateSolvableLevel();
        selectedColor = null;
        currentPath = [];
        completedPairs = 0;
        completedPaths = {};

        renderBoard();
        updateLevelInfo();
        updateProgressInfo();
    }

    function createEmptyBoard(size) {
        return Array(size).fill().map(() => Array(size).fill(0));
    }

    function generateColors(size) {
        const colorCount = Math.min(8, Math.max(3, Math.floor(size * 0.7)));
        return Array(colorCount).fill().map((_, i) => i + 1);
    }

    function generateSolvableLevel() {
        // First generate solution paths
        const solution = createEmptyBoard(boardSize);
        const colorEndpoints = {};

        // For each color, find valid endpoints and path
        colors.forEach(color => {
            let pathFound = false;
            let attempts = 0;
            const maxAttempts = 100;

            while (!pathFound && attempts < maxAttempts) {
                attempts++;

                // Find two empty positions for endpoints
                const endpoints = findEmptyEndpointPositions(solution, boardSize);
                if (!endpoints) continue;

                const [start, end] = endpoints;

                // Try to find a path between them
                const path = findPath(solution, start.x, start.y, end.x, end.y);

                if (path) {
                    // Mark the path on the solution board
                    path.forEach(pos => {
                        solution[pos.x][pos.y] = color;
                    });

                    // Store the endpoints
                    solution[start.x][start.y] = color;
                    solution[end.x][end.y] = color;
                    colorEndpoints[color] = {start, end};

                    pathFound = true;
                }
            }

            if (!pathFound) {
                console.warn(`Failed to find path for color ${color} after ${maxAttempts} attempts`);
            }
        });

        // Now create the puzzle board with just the endpoints
        colors.forEach(color => {
            if (colorEndpoints[color]) {
                const {start, end} = colorEndpoints[color];
                board[start.x][start.y] = color;
                board[end.x][end.y] = color;
            }
        });
    }

    function findEmptyEndpointPositions(board, size) {
        const emptyPositions = [];

        for (let x = 0; x < size; x++) {
            for (let y = 0; y < size; y++) {
                if (board[x][y] === 0) {
                    emptyPositions.push({x, y});
                }
            }
        }

        if (emptyPositions.length < 2) return null;

        // Shuffle and pick two positions that aren't adjacent
        shuffleArray(emptyPositions);

        for (let i = 0; i < emptyPositions.length; i++) {
            for (let j = i + 1; j < emptyPositions.length; j++) {
                const pos1 = emptyPositions[i];
                const pos2 = emptyPositions[j];

                // Ensure endpoints aren't adjacent (makes puzzle too easy)
                if (!isAdjacent(pos1.x, pos1.y, pos2.x, pos2.y)) {
                    return [pos1, pos2];
                }
            }
        }

        return null;
    }

    function findPath(board, startX, startY, endX, endY) {
        // Simple pathfinding using BFS
        const visited = createEmptyBoard(board.length);
        const queue = [[{x: startX, y: startY}]];
        visited[startX][startY] = 1;

        while (queue.length > 0) {
            const path = queue.shift();
            const {x, y} = path[path.length - 1];

            if (x === endX && y === endY) {
                return path.slice(1, -1); // Exclude endpoints
            }

            // Check adjacent cells
            const directions = [
                {dx: 1, dy: 0}, {dx: -1, dy: 0},
                {dx: 0, dy: 1}, {dx: 0, dy: -1}
            ];

            for (const {dx, dy} of directions) {
                const nx = x + dx;
                const ny = y + dy;

                if (isValidPosition(nx, ny, board.length) &&
                    board[nx][ny] === 0 &&
                    !visited[nx][ny]) {

                    visited[nx][ny] = 1;
                    const newPath = [...path, {x: nx, y: ny}];
                    queue.push(newPath);
                }
            }
        }

        return null; // No path found
    }

    function isValidPosition(x, y, size) {
        return x >= 0 && x < size && y >= 0 && y < size;
    }

    function isAdjacent(x1, y1, x2, y2) {
        return (Math.abs(x1 - x2) === 1 && y1 === y2) ||
            (Math.abs(y1 - y2) === 1 && x1 === x2);
    }

    function isEndpoint(x, y, color) {
        let count = 0;
        for (let dx = 0; dx < boardSize; dx++) {
            for (let dy = 0; dy < boardSize; dy++) {
                if (board[dx][dy] === color && (dx !== x || dy !== y)) {
                    count++;
                }
            }
        }
        return count === 1; // Only one other dot of this color exists
    }

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    function renderBoard() {
        gameBoard.innerHTML = '';
        gameBoard.style.gridTemplateColumns = `repeat(${boardSize}, 60px)`;

        for (let x = 0; x < boardSize; x++) {
            for (let y = 0; y < boardSize; y++) {
                const cell = document.createElement('div');
                cell.className = 'cell';

                if (board[x][y] > 0) {
                    cell.classList.add(`color-${board[x][y]}`);

                    // Mark endpoints
                    if (isEndpoint(x, y, board[x][y])) {
                        cell.classList.add('endpoint');
                    }

                    // If this is part of a completed path (but not an endpoint)
                    if (completedPaths[`${x},${y}`] && !isEndpoint(x, y, board[x][y])) {
                        cell.classList.add('path');
                    }
                }

                cell.dataset.x = x;
                cell.dataset.y = y;

                // Use both touch and mouse events for better tablet support
                if (isTouchDevice) {
                    cell.addEventListener('touchstart', (e) => {
                        e.preventDefault();
                        handleCellClick(x, y);
                    });
                    cell.addEventListener('touchmove', (e) => {
                        e.preventDefault();
                        const touch = e.touches[0];
                        const element = document.elementFromPoint(touch.clientX, touch.clientY);
                        if (element && element.classList.contains('cell')) {
                            const x = parseInt(element.dataset.x);
                            const y = parseInt(element.dataset.y);
                            handleCellHover(x, y);
                        }
                    });
                } else {
                    cell.addEventListener('click', () => handleCellClick(x, y));
                    cell.addEventListener('mouseover', () => handleCellHover(x, y));
                }

                gameBoard.appendChild(cell);
            }
        }
    }

    function handleCellClick(x, y) {
        const cellValue = board[x][y];

        // If clicking on a color dot
        if (cellValue > 0) {
            // If we were already drawing a path for this color
            if (selectedColor === cellValue) {
                // If clicking on the starting point again, continue the path
                if (currentPath.length > 0 && currentPath[0].x === x && currentPath[0].y === y) {
                    // Allow continuing the path
                    return;
                }
                // Otherwise complete the path
                completePath();
            } else {
                // Start a new path
                selectedColor = cellValue;
                currentPath = [{x, y}];
            }
        }
        // If clicking on an empty cell while a color is selected
        else if (selectedColor !== null) {
            // Check if the move is valid (adjacent)
            const last = currentPath[currentPath.length - 1];
            if (isAdjacent(last.x, last.y, x, y)) {
                // Check if we're completing a path to the other dot
                const otherDot = findOtherDot(selectedColor, currentPath[0].x, currentPath[0].y);
                if (otherDot.x === x && otherDot.y === y) {
                    currentPath.push({x, y});
                    completePath();
                } else {
                    // Add to path
                    currentPath.push({x, y});
                }
            }
        }

        updateBoardDisplay();
    }

    function handleCellHover(x, y) {
        if (selectedColor === null || currentPath.length === 0) return;

        const cellValue = board[x][y];
        const last = currentPath[currentPath.length - 1];

        // If hovering over a cell that's not the start dot and is adjacent to the last path cell
        if (!(x === currentPath[0].x && y === currentPath[0].y) && isAdjacent(last.x, last.y, x, y)) {
            // Check if it's empty or the matching end dot
            const otherDot = findOtherDot(selectedColor, currentPath[0].x, currentPath[0].y);
            if (cellValue === 0 || (otherDot.x === x && otherDot.y === y)) {
                updateBoardDisplay();

                // Show temporary path
                const tempPath = [...currentPath, {x, y}];
                tempPath.forEach((pos, i) => {
                    if (i > 0) { // Don't highlight the start dot
                        const cell = document.querySelector(`.cell[data-x="${pos.x}"][data-y="${pos.y}"]`);
                        if (cell) {
                            cell.classList.add('path');
                            cell.style.backgroundColor = getComputedStyle(document.querySelector(`.color-${selectedColor}`)).backgroundColor;
                        }
                    }
                });
            }
        }
    }

    function findOtherDot(color, startX, startY) {
        for (let x = 0; x < boardSize; x++) {
            for (let y = 0; y < boardSize; y++) {
                if (board[x][y] === color && !(x === startX && y === startY)) {
                    return {x, y};
                }
            }
        }
        return null;
    }

    function completePath() {
        // Store the completed path
        currentPath.forEach(pos => {
            board[pos.x][pos.y] = selectedColor;
            completedPaths[`${pos.x},${pos.y}`] = selectedColor;
        });

        completedPairs++;
        selectedColor = null;
        currentPath = [];

        let linkSound = new Audio("./assets/LinkSound.mp3")
        linkSound.volume = 0.3;
        linkSound.play();
        updateProgressInfo();

        // Check if all pairs are connected
        if (completedPairs === colors.length) {
            setTimeout(() => {
                if (level >= MAX_LEVEL) {
                    document.location.href = "../../../workshop/ShieldGame/pages/HubLevelUnlock.html";
                } else {
                    nextLevel();
                }
            }, 500);
        }

        renderBoard(); // Re-render to show completed paths
    }

    function updateBoardDisplay() {
        // Clear all temporary path highlights
        document.querySelectorAll('.cell').forEach(cell => {
            if (!completedPaths[`${cell.dataset.x},${cell.dataset.y}`]) {
                cell.classList.remove('path');
                cell.style.backgroundColor = '';
            }
        });

        // Highlight current path
        currentPath.forEach((pos, i) => {
            if (i > 0) { // Don't highlight the start dot
                const cell = document.querySelector(`.cell[data-x="${pos.x}"][data-y="${pos.y}"]`);
                if (cell) {
                    cell.classList.add('path');
                    cell.style.backgroundColor = getComputedStyle(document.querySelector(`.color-${selectedColor}`)).backgroundColor;
                }
            }
        });
    }

    function updateLevelInfo() {
        levelInfo.textContent = `Level: ${level} (${boardSize}x${boardSize})`;
    }

    function updateProgressInfo() {
        progressInfo.textContent = `${completedPairs} sur ${colors.length}`;
    }
});