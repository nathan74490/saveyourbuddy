function updateMindGamesStatus(mindgameStatus) {
  let id_game = localStorage.getItem('id_game');
  console.log(id_game);
  let mindGameNumber = localStorage.getItem('mindGameNumber');
  console.log(mindGameNumber);

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
