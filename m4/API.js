const win = document.querySelector('#win');
const lose = document.querySelector('#lose');

// Lorsque le joueur gagne


function updateModuleStatus(moduleStatus) {
  let id_game = localStorage.getItem('idGame');
  console.log(id_game);

  let moduleNumber = 4
  console.log(moduleNumber);

  if (moduleNumber) {
    window.parent.postMessage(
      {
        type: 'moduleStatusUpdate',
        id_game: id_game, // Envoi de l'id_game
        module_number: moduleNumber, // Envoi du module_number
        status: moduleStatus, // Envoi du statut du module
      },
      '*' // On permet d'envoyer à n'importe quelle origine, mais tu peux préciser l'origine ici pour plus de sécurité
    );
  }
}
