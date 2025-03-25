console.log('coucou');

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
      // const button = document.createElement('button');
      // button.textContent = 'Lancer le module';
      // button.setAttribute('id_game', gameId);

      // button.classList.add('game-button');
      console.log(game);
      let modules = game.modules;
      console.log(modules);
      const container = document.querySelector('.table-iframe');
      modules.map((module) => {
        console.log(module.module_status);
        container.innerHTML += `
      <iframe id_game="${gameId}" module_number="${module.module_number}" src="m${module.module_number}" frameborder="3"></iframe>
      `;
      });

      const iframes = document.querySelectorAll('iframe'); // Sélectionne toutes les iframes

      if (iframes.length > 0) {
        iframes.forEach((iframe) => {
          iframe.addEventListener('load', () => {
            iframe.contentWindow.postMessage(
              {
                game_id: iframe.getAttribute('id_game'),
                module_number: iframe.getAttribute('module_number'),
              },
              '*'
            );
          });
        });
      }

      if (container) {
        // container.appendChild(button);
      } else {
        console.warn("Le conteneur .table-iframe n'existe pas !");
      }
    })
    .catch(console.error);
}
