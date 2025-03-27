let tabMindGames = [];
const container = document.querySelector('.table-iframe-mindgames');
const containerModule = document.querySelector('.table-iframe');

window.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'mindGameStatusUpdate') {
    console.log(
      `Le module ${event.data.mindGame_number} a changé d'état: ${event.data.status}`
    );

    const mindGamesNumber = event.data.mindGame_number;
    const status = event.data.status;
    const idGame = event.data.id_game;

    // Vérifier si ce jeu est déjà dans tabMindGames
    let gameMindGame = tabMindGames.find((game) => game.id_game === idGame);

    if (!gameMindGame) {
      // Si le jeu n'existe pas encore, on le crée avec son premier mindgame
      gameMindGame = {
        id_game: idGame,
        mind_game: [
          { nbMindGamesNumber: mindGamesNumber, mindGameStatus: status },
        ],
      };
      tabMindGames.push(gameMindGame);
    } else {
      // Vérifier si ce mindgame existe déjà dans le jeu
      const existingMindGame = gameMindGame.mind_game.find(
        (mind_game) => mind_game.nbMindGamesNumber === mindGamesNumber
      );

      console.log('existingMindGame:', existingMindGame);

      if (!existingMindGame) {
        // S'il n'existe pas, on l'ajoute
        gameMindGame.mind_game.push({
          nbMindGamesNumber: mindGamesNumber,
          mindGameStatus: status,
        });
      } else {
        // Sinon, on met juste à jour son statut
        existingMindGame.mindGameStatus = status;
      }
    }

    // Mise à jour du statut côté serveur
    updateMindGamesStatus(idGame, mindGamesNumber, status);

    // Vérifier si tous les mindgames sont réussis
    checkIfAllMindGameSuccess();
  }
});

const play = document.querySelector('#play');
play.addEventListener('click', () => {
  let gameStatus = 'ongoing';
  createGame(gameStatus);
  containerModule.style.display = 'none';
});

function createGame(gameStatus) {
  const gameData = {
    type: 'game',
    game_status: gameStatus,
  };

  fetch('http://192.168.4.60/workshopAPI/api/v1/index.php', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(gameData),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      let id_game = data.game_id;
      localStorage.setItem('id_game', id_game);
      getGame(id_game);
    })
    .catch(console.error);
}

function getGame(gameId) {
  const url = `http://192.168.4.60/workshopAPI/api/v1/index.php?game=${gameId}`;

  fetch(url)
    .then((response) => response.json())
    .then((game) => {
      console.log('Données du jeu récupérées:', game);
      let ongoingMindGames = game.mindgames.filter(
        (mindgame) => mindgame.mindgame_status === 'ongoing'
      );

      if (ongoingMindGames.length > 0) {
        console.log('Modules en cours détectés, reprise de la partie...');
        loadMindGames(gameId, ongoingMindGames);
      } else {
        console.log(
          'Aucun mindgames en cours, les mindgames sont peut-être finis.'
        );
      }

      if (game && game.game_time) {
        const startTime = new Date(game.game_time.replace(' ', 'T'));
        console.log(startTime);
        initializeOxygenBar(startTime);
      }
    })
    .catch(console.error);
}

function loadMindGames(gameId, mindGames) {
  const divGauge = document.querySelector('.gauge');
  divGauge.style.display = 'block';

  mindGames.forEach((mindGame) => {
    console.log("Ajout de l'iframe pour:", mindGame);
    const iframe = document.createElement('iframe');
    iframe.setAttribute('id_game', gameId);
    iframe.src = `mg${mindGame.mindgame_number}?nbMindGame=${mindGame.mindgame_number}`;
    iframe.style.border = '1px solid grey';

    container.appendChild(iframe);
  });
}
function updateMindGamesStatus(id_game, mindGamesNumber, status) {
  console.log(
    `Mise à jour du statut pour le jeu ${id_game}, module ${mindGamesNumber} avec le statut ${status}`
  );
  const updateData = {
    type: 'mindgame',
    id_game: id_game,
    mindgame_number: mindGamesNumber,
    mindgame_status: status,
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
      console.log(tabMindGames);
    })
    .catch(console.error);
}

function checkIfAllMindGameSuccess() {
  tabMindGames.forEach((gameMindGame) => {
    // Vérifie si le jeu a bien 2 mindgames
    if (gameMindGame.mind_game.length === 2) {
      // Vérifie si tous les mindgames du jeu sont en succès
      const allModulesSuccess = gameMindGame.mind_game.every(
        (mind_game) => mind_game.mindGameStatus === 'sucess'
      );

      if (allModulesSuccess) {
        console.log(
          `Tous les mindgames du jeu ${gameMindGame.id_game} sont en succès !`
        );

        // Masque le conteneur des mindgames
        container.style.display = 'none';
        // Affiche le conteneur du module
        containerModule.style.display = 'block';

        // Appelle la fonction pour récupérer le jeu pour le module
        getGameForModule(gameMindGame.id_game);
      } else {
        const remainingModules = gameMindGame.mind_game.filter(
          (mind_game) => mind_game.mindGameStatus !== 'sucess'
        ).length;
        console.log(
          `Le jeu ${gameMindGame.id_game} n'a pas encore tous ses mindgames en succès. Modules restants: ${remainingModules}`
        );
      }
    } else {
      console.log(`Le jeu ${gameMindGame.id_game} n'a pas 2 mindgames.`);
    }
  });
}

/**********************************OXYGEN************************************************************/
function initializeOxygenBar(startTime) {
  const maxTime = 30 * 60 * 1000; // 30 minutes in milliseconds
  const oxygenLevel = document.getElementById('oxygenLevel');
  const needle = document.querySelector('.needle');
  const bar = document.querySelector('.bar');

  function updateOxygenBar() {
    const currentTime = new Date();
    const elapsedTime = currentTime - startTime;

    // Check if game is finished
    if (elapsedTime >= maxTime) {
      needle.style.transform = 'rotate(-90deg)';
      bar.style.transform = 'rotate(-90deg)';
      clearInterval(timerInterval);
      return;
    }

    // Calculate remaining oxygen and time
    const remainingTime = maxTime - elapsedTime;
    const percentageRemaining = (remainingTime / maxTime) * 100;

    // Calculate rotation angle (-90 to 90 degrees based on percentage)
    const rotationAngle = -90 + percentageRemaining * 1.8; // 1.8 = 180/100

    // Update needle and bar rotation
    needle.style.transform = `rotate(${rotationAngle}deg)`;
    bar.style.transform = `rotate(${rotationAngle}deg)`;

    /*  // Convert remaining time to minutes and seconds
      const remainingMinutes = Math.floor(remainingTime / 60000);
      const remainingSeconds = Math.floor((remainingTime % 60000) / 1000); */

    // Update oxygen bar
    oxygenLevel.style.width = percentageRemaining + '%';
    oxygenLevel.textContent = `${Math.round(percentageRemaining)}%`;

    // Change color based on remaining oxygen
    if (percentageRemaining < 20) {
      bar.style.backgroundColor = 'red';
    } else if (percentageRemaining < 50) {
      bar.style.backgroundColor = 'orange';
    }
  }

  // Remove default animation
  needle.style.animation = 'none';
  bar.style.animation = 'none';

  // Initial update
  updateOxygenBar();

  // Update every second
  const timerInterval = setInterval(updateOxygenBar, 1000);
}
