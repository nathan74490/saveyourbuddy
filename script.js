let tabModules = [];
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

function getGameForModule(gameId) {
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
    })
    .catch(console.error);
}

// cette fonction charge les modules dans l'iframe
function loadModules(gameId, modules) {
  const container = document.querySelector('.table-iframe');

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
function GetIdGame() {
  let gameId = localStorage.getItem('id_game');
  console.log('id du script.js ' + gameId);
  getGameForModule(gameId);
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

// function checkIfAllMindGamesSuccess() {
//   tabMindGames.forEach((game) => {
//     // Vérifie s'il y a exactement 2 modules dans ce jeu
//     if (game.modules.length === 2) {
//       // Vérifie si tous les modules ont le statut 'success'
//       const allModulesSuccess = game.modules.every(
//         (module) => module.modelStatus === 'success'
//       );

//       if (allModulesSuccess) {
//         console.log(`Tous les modules du jeu ${game.id_game} sont en succès !`);
//         container.style.display = 'none';
//         containerModule.style.display = 'none';
//         const divGauge = document.querySelector('.gauge');
//         divGauge.style.display = 'none';
//       } else {
//         console.log(
//           `Tous les modules du jeu ${game.id_game} ne sont pas encore en succès.`
//         );
//       }
//     } else {
//       console.log(
//         `Le jeu ${
//           game.id_game
//         } n'a pas encore ses 2 modules complets. Modules restants: ${
//           2 - game.modules.length
//         }`
//       );
//     }
//   });
// }

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
        containerModule.style.display = 'none';
        const divGauge = document.querySelector('.gauge');
        divGauge.style.display = 'none';
        console.log('jeu fini');
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
