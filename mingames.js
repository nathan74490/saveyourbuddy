let tabMindGames = [];

let id_game = localStorage.getItem('id_game') || null;
if (!id_game) console.log('Aucun ID de jeu trouvé dans le localStorage.');

console.log(id_game);

window.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'mindGameStatusUpdate') {
    console.log(
      `le module ${event.data.mindGame_number} a changé d'état: ${event.data.status}`
    );

    const mindGamesNumber = event.data.mindGame_number;
    const status = event.data.status;
    const idGame = event.data.id_game;

    let gameMindGames = tabMindGames.find((game) => game.id_game === idGame);

    if (!gameMindGames) {
      gameMindGames = {
        id_game: idGame,
        modules: [{ nbMindGamesNumber: mindGamesNumber, modelStatus: status }],
      };
      tabMindGames.push(gameMindGames);
    } else {
      const gameMindGamesExists = gameMindGames.modules.some(
        (module) => module.nbMindGamesNumber === mindGamesNumber
      );
      if (!gameMindGamesExists) {
        gameMindGames.modules.push({
          nbMindGamesNumber: mindGamesNumber,
          modelStatus: status,
        });
      }
    }

    updateMindGamesStatus(idGame, mindGamesNumber, status);
  }
});

const play = document.querySelector('#play');
play.addEventListener('click', () => {
  let gameStatus = 'ongoing';
  createGame(gameStatus);
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
  const container = document.querySelector('.table-iframe-mindgames');
  const divGauge = document.querySelector('.gauge');
  divGauge.style.display = 'block';

  mindGames.forEach((mindGame) => {
    console.log("Ajout de l'iframe pour:", mindGame);
    const iframe = document.createElement('iframe');
    iframe.setAttribute('id_game', gameId);
    iframe.src = `mg${mindGame.mindgame_number}?nbmodule=${mindGame.mindgame_number}`;
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
