console.log('coucou');

document.addEventListener('DOMContentLoaded', () => {
  const storedGameId = localStorage.getItem('id_game');
  if (storedGameId) {
    console.log(`Reprise de la partie en cours : ${storedGameId}`);
    getGame(storedGameId);
  }
});

const play = document.querySelector('#play');

play.addEventListener('click', (e) => {
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
      console.log(data.game_id);
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
      console.log('Données de la partie récupérées :', game);

      let ongoingModules = game.modules.filter(
        (module) => module.module_status === 'ongoing'
      );

      if (ongoingModules.length > 0) {
        console.log('Modules en cours détectés, reprise de la partie...');
        loadModules(gameId, ongoingModules);
      } else {
        console.log('Aucun module en cours, la partie est peut-être terminée.');
        localStorage.removeItem('id_game');
      }
    })
    .catch(console.error);
}

function loadModules(gameId, modules) {
  const container = document.querySelector('.table-iframe');
  container.innerHTML = '';

  modules.forEach((module) => {
    //création d'une iframe
    const iframe = document.createElement('iframe');
    iframe.setAttribute('id_game', gameId);
    iframe.setAttribute('module_number', module.module_number);
    iframe.src = `m${module.module_number}`;
    iframe.frameBorder = '3';

    //envoie un message dans la fènetre pour récupérer le module_number
    iframe.addEventListener('load', () => {
      iframe.contentWindow.postMessage(
        { game_id: gameId, module_number: module.module_number },
        '*'
      );
    });

    container.appendChild(iframe);
  });
}
