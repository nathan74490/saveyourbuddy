function help() {
    fetch('http://192.168.4.60/workshopAPI/api/v1/index.php?help')
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
        })
        .catch(console.error);
}

help(); // Calling the help function to get API documentation


function getGames() {
    fetch('http://192.168.4.60/workshopAPI/api/v1/index.php?games')
        .then((response) => response.json())
        .then((games) => {
            console.log(games); // Log the list of games to the console
        })
        .catch(console.error);
}

getGames(); // Calling the getGames function to fetch games

function getGameModule(gameId, moduleNumber) {
    const url = `http://192.168.4.60/workshopAPI/api/v1/index.php?game=${gameId}&module=${moduleNumber}`;

    fetch(url)
        .then((response) => response.json())
        .then((module) => {
            console.log(module); // Log the module information
        })
        .catch(console.error);
}

// Example usage:
getGameModule(12, 2); // Fetch module 2 of game 1

function getGameMindgame(gameId, mindgameNumber) {
    const url = `http://192.168.4.60/workshopAPI/api/v1/index.php?game=${gameId}&mindgame=${mindgameNumber}`;

    fetch(url)
        .then((response) => response.json())
        .then((mindgame) => {
            console.log(mindgame); // Log the mindgame information
        })
        .catch(console.error);
}

// Example usage:
getGameMindgame(12, 1); // Fetch mindgame 1 of game 1

function createGame(gameStatus) {
    const gameData = {
        type: 'game',
        game_status: gameStatus // Send the game status
    };

    fetch('http://192.168.4.60/workshopAPI/api/v1/index.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(gameData)
    })
        .then((response) => response.json())
        .then((data) => {
            console.log(data); // Log the response from the server (success or error)
        })
        .catch(console.error);
}

// Example usage:
createGame('ongoing'); // Create a new game with 'ongoing' status


function updateModuleStatus(gameId, moduleNumber, moduleStatus) {
    const updateData = {
        type: 'module',
        id_game: gameId,
        module_number: moduleNumber,
        module_status: moduleStatus // Update status (e.g., 'completed')
    };

    fetch('http://192.168.4.60/workshopAPI/api/v1/index.php', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateData)
    })
        .then((response) => response.json())
        .then((data) => {
            console.log(data); // Log the response (success or error)
        })
        .catch(console.error);
}

// Example usage:
updateModuleStatus(12, 2, 'sucess'); // Update module 2 of game 1 to 'completed'


function updateMindgameStatus(gameId, mindgameNumber, mindgameStatus) {
    const updateData = {
        type: 'mindgame',
        id_game: gameId,
        mindgame_number: mindgameNumber,
        mindgame_status: mindgameStatus // Update status (e.g., 'completed')
    };

    fetch('http://192.168.4.60/workshopAPI/api/v1/index.php', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updateData)
    })
        .then((response) => response.json())
        .then((data) => {
            console.log(data); // Log the response (success or error)
        })
        .catch(console.error);
}

// Example usage:
updateMindgameStatus(12, 1, 'failed'); // Update mindgame 1 of game 1 to 'completed'


function createUser(nom, prenom, idTeam) {
    const userData = {
        type: 'user',
        nom: nom,
        prenom: prenom,
        id_team: idTeam
    };

    fetch('http://192.168.4.60/workshopAPI/api/v1/index.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
    })
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
        })
        .catch(console.error);
}

function createTeam(teamName, numero) {
    const teamData = {
        type: 'team',
        team_name: teamName,
        numero: numero
    };

    fetch('http://192.168.4.60/workshopAPI/api/v1/index.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(teamData)
    })
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
        })
        .catch(console.error);
}

// Example usage:
// createUser("Cavus", "Muhammed", 2);
// createTeam("Team Alpha", "0123456789");
function updateTeamGame(teamId, gameId) {
    const updateData = {
        type: 'team',
        id_team: teamId,
        id_game: gameId
    };

    fetch('http://192.168.4.60/workshopAPI/api/v1/index.php', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updateData)
    })
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
        })
        .catch(console.error);
}

function getTeams() {
    const url = `http://192.168.4.60/workshopAPI/api/v1/index.php?teams`;

    fetch(url)
        .then((response) => response.json())
        .then((teams) => {
            console.log(teams);
        })
        .catch(console.error);
}

function getTeam(teamId) {
    const url = `http://192.168.4.60/workshopAPI/api/v1/index.php?team=${teamId}`;

    fetch(url)
        .then((response) => response.json())
        .then((team) => {
            console.log(team);
        })
        .catch(console.error);
}

// Example usage:
getTeams(); // Get all teams
getTeam(2); // Get specific team by ID


// updateTeamGame(5, 12);
getTeam(2);

function getGame(gameId) {
    const url = `http://192.168.4.60/workshopAPI/api/v1/index.php?game=${gameId}`;

    fetch(url)
        .then((response) => response.json())
        .then((game) => {
            console.log(game);
        })
        .catch(console.error);
}

// Example usage:
getGame(12); // Get game with ID 12 and its associated modules and mindgames


