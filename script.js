let tabModules = [];

// ici on écoute les messages venant des iframes
// ici on écoute les messages venant des iframes
window.addEventListener('message', (event) => {
  // on vérifie que l'event a bien un type 'moduleStatusUpdate'
  if (event.data && event.data.type === 'moduleStatusUpdate') {
    console.log(
      `le module ${event.data.module_number} a changé d'état: ${event.data.status}`
    );

    // on récupère l'id du jeu, le numéro du module et son statut

    const moduleNumber = event.data.module_number;
    const status = event.data.status;
    const idGame = event.data.id_game;

    // On cherche si le jeu existe déjà dans tabModules
    let game = tabModules.find((game) => game.id_game === idGame);

    // Si le jeu n'existe pas, on le crée avec le premier module
    if (!game) {
      game = {
        id_game: idGame,
        modules: [{ nbModule: moduleNumber, modelStatus: status }],
      };
      tabModules.push(game);
    } else {
      // Sinon, on ajoute simplement le module à ce jeu
      const moduleExists = game.modules.some(
        (module) => module.nbModule === moduleNumber
      );
      if (!moduleExists) {
        game.modules.push({ nbModule: moduleNumber, modelStatus: status });
      }
    }

    // Ici, on appelle la fonction pour mettre à jour l'état du module via l'API
    updateModuleStatus(idGame, moduleNumber, status);

    // Vérification après mise à jour
    checkIfAllModulesSuccess();
  }
});

// ici, on écoute le click sur le bouton de démarrage du jeu
//const play = document.querySelector('#play');

// play.addEventListener('click', (e) => {
//   let gameStatus = 'ongoing'; // on définit le statut du jeu comme 'en cours'
//   createGame(gameStatus); // on crée la partie
// });

// cette fonction crée un jeu en envoyant des données à l'API
function createGame(gameStatus) {
  const gameData = {
    type: 'game',
    game_status: gameStatus,
  };

  // on fait un fetch pour créer le jeu via l'API
  fetch('http://192.168.4.60/workshopAPI/api/v1/index.php', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(gameData),
  })
    .then((response) => response.json()) // on récupère la réponse de l'API
    .then((data) => {
      console.log(data);
      console.log(data.game_id);
      let id_game = data.game_id;
      localStorage.setItem('id_game', id_game); // on stocke l'id du jeu dans localStorage

      // on récupère les modules du jeu dès qu'il est créé
      getGame(id_game);
    })
    .catch(console.error);
}

function getGame(gameId) {
  const url = `http://192.168.4.60/workshopAPI/api/v1/index.php?game=${gameId}`;

  fetch(url)
    .then((response) => response.json())
    .then((game) => {
      console.log('données du jeu récupérées:', game);
      let ongoingModules = game.modules.filter(
        (module) => module.module_status === 'ongoing' // on garde uniquement les modules en cours
      );

      // Si on a des modules en cours, on les charge
      if (ongoingModules.length > 0) {
        console.log('modules en cours détectés, reprise de la partie...');
        loadModules(gameId, ongoingModules);
      } else {
        console.log('aucun module en cours, la partie est peut-être finie.');
        localStorage.removeItem('id_game'); // on retire l'id du jeu de localStorage si plus de modules en cours
      }

      /********TIMER********/
      if (game && game.game_time) {
        // Convert MySQL datetime to JavaScript Date object
        const startTime = new Date(game.game_time.replace(' ', 'T'));
        console.log(startTime); // Log the converted date
        initializeOxygenBar(startTime);
      }
    })
    .catch(console.error);
}

// cette fonction charge les modules dans l'iframe
function loadModules(gameId, modules) {
  const container = document.querySelector('.table-iframe');
  // const divGauge = document.querySelector('.gauge');
  // divGauge.style.display = 'block';
  container.innerHTML = ''; // on vide le conteneur avant d'ajouter de nouveaux modules

  modules.forEach((module) => {
    // création d'une iframe pour chaque module
    const iframe = document.createElement('iframe');
    iframe.setAttribute('id_game', gameId);
    iframe.src = `m${module.module_number}?nbmodule=${module.module_number}`; // on passe le numéro du module dans l'url
    iframe.frameBorder = '3';

    container.appendChild(iframe); // on ajoute l'iframe au conteneur
  });
}

// cette fonction met à jour le statut d'un module dans l'API
function updateModuleStatus(id_game, moduleNumber, moduleStatus) {
  console.log(
    `mettre à jour le statut pour le jeu ${id_game}, module ${moduleNumber} avec le statut ${moduleStatus}`
  );

  const updateData = {
    type: 'module',
    id_game: id_game,
    module_number: moduleNumber,
    module_status: moduleStatus,
  };

  // on fait un fetch pour mettre à jour le module via l'API
  fetch('http://192.168.4.60/workshopAPI/api/v1/index.php', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updateData),
  })
    .then((response) => response.json()) // on récupère la réponse de l'API
    .then((data) => {
      console.log("réponse de l'API:", data);
      console.log(tabModules);
      // ici tu peux faire des actions supplémentaires si nécessaire
    })
    .catch(console.error); // gestion des erreurs
}

function checkIfAllModulesSuccess() {
  tabModules.forEach((game) => {
    // Vérifie si tous les modules du jeu ont le statut 'sucess'
    const allModulesSuccess = game.modules.every(
      (module) => module.modelStatus === 'sucess'
    );

    if (game.modules.length === 4) {
      // On vérifie qu'il y a bien 4 modules pour ce jeu
      if (allModulesSuccess) {
        console.log(`Tous les modules du jeu ${game.id_game} sont en succès !`);
      } else {
        console.log(
          `Tous les modules du jeu ${game.id_game} ne sont pas encore en succès.`
        );
      }
    } else {
      console.log(
        `Le jeu ${
          game.id_game
        } n'a pas encore tous ses modules. Modules restants: ${
          4 - game.modules.length
        }`
      );
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

// Start the game
