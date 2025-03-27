
function updateMindGamesStatus(mindgameStatus) {
  let id_game = localStorage.getItem('id_game');
  console.log(id_game);

  let params = new URLSearchParams(document.location.search);
  let mindGameNumber = params.get('nbmodule');
  console.log('mindGameNumber ' + mindGameNumber);

  if (mindGameNumber) {
    window.parent.postMessage(
      {
        type: 'mindGameStatusUpdate',
        id_game: id_game, // Envoi de l'id_game
        mindGame_number: mindGameNumber, // Envoi du module_number
        status: mindgameStatus, // Envoi du statut du module
      },
      '*'
    );
  }
}
