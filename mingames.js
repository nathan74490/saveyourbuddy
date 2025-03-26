//let tabModules = [];

let id_game = localStorage.getItem('id_game');
console.log(id_game);
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
    //updateModuleStatus(idGame, moduleNumber, status);

    // Vérification après mise à jour
    //checkIfAllModulesSuccess();
  }
});

function getGame(gameId) {
  const url = `http://192.168.4.60/workshopAPI/api/v1/index.php?game=${gameId}`;

  fetch(url)
    .then((response) => response.json())
    .then((game) => {
      console.log(game);
    })
    .catch(console.error);
}
