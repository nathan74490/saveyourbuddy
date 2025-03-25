# Documentation API Workshop Scénographie

## Endpoints disponibles (Wifi Salle creation: mdp => animation)

## Accéder à phpMyAdmin depuis un autre appareil

Sur un appareil connecté au même réseau Wi-Fi, ouvrez un navigateur et entrez l'URL suivante :

http://192.168.4.60/phpmyadmin

Vous aurez alors accès à phpMyAdmin pour visualiser la base de donnée.

## Valueur disponible pour les status module et casse-tete: ongoing, sucess, failed.

### 1. Obtenir la liste des endpoints (Help)
```javascript
function help() {
    fetch('http://192.168.4.60/workshopAPI/api/v1/index.php?help')
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
        })
        .catch(console.error);
}
```

### 2. Obtenir la liste des parties (Games)
```javascript
function getGames() {
    fetch('http://192.168.4.60/workshopAPI/api/v1/index.php?games')
        .then((response) => response.json())
        .then((games) => {
            console.log(games);
        })
        .catch(console.error);
}
```

### 3. Obtenir les informations d'un module spécifique (Modules)
```javascript
function getGameModule(gameId, moduleNumber) {
    const url = `http://192.168.4.60/workshopAPI/api/v1/index.php?game=${gameId}&module=${moduleNumber}`;
    
    fetch(url)
        .then((response) => response.json())
        .then((module) => {
            console.log(module);
        })
        .catch(console.error);
}
```

### 4. Obtenir les informations d'un casse-tête 
```javascript
function getGameMindgame(gameId, mindgameNumber) {
    const url = `http://192.168.4.60/workshopAPI/api/v1/index.php?game=${gameId}&mindgame=${mindgameNumber}`;
    
    fetch(url)
        .then((response) => response.json())
        .then((mindgame) => {
            console.log(mindgame);
        })
        .catch(console.error);
}
```

### 5. Créer une nouvelle partie
```javascript
function createGame(gameStatus) {
    const gameData = {
        type: 'game',
        game_status: gameStatus
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
        console.log(data);
    })
    .catch(console.error);
}
```

### 6. Mettre à jour le statut d'un module
```javascript
function updateModuleStatus(gameId, moduleNumber, moduleStatus) {
    const updateData = {
        type: 'module',
        id_game: gameId,
        module_number: moduleNumber,
        module_status: moduleStatus
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
```

### 7. Mettre à jour le statut d'un mindgame
```javascript
function updateMindgameStatus(gameId, mindgameNumber, mindgameStatus) {
    const updateData = {
        type: 'mindgame',
        id_game: gameId,
        mindgame_number: mindgameNumber,
        mindgame_status: mindgameStatus
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
```

### 8.Get une team
```javascript
function getTeam(teamId) {
    const url = `http://192.168.4.60/workshopAPI/api/v1/index.php?team=${teamId}`;
    
    fetch(url)
        .then((response) => response.json())
        .then((team) => {
            console.log(team);
        })
        .catch(console.error);
}
```

### 9.Creer un user
```javascript
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

```

### 10.Update une team sur le id_game
```javascript
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
```

### 11.create team
```javascript
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
```

### 12. get Gane info
```javascript
function getGame(gameId) {
    const url = `http://192.168.4.60/workshopAPI/api/v1/index.php?game=${gameId}`;
    
    fetch(url)
        .then((response) => response.json())
        .then((game) => {
            console.log(game);
        })
        .catch(console.error);
}
```
### ID-Module:

1. Téléphone cheminement
2. Retro-proj
3. Minitel
4. Configuration led

### ID-Casse-tête:

1. Equipe Bateau
2. Equipe Sous-Marin
