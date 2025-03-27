function updateMindGamesStatus(mindgameStatus) {
  let id_game = localStorage.getItem('idGame');
  console.log(id_game);

  mindGameNumber = 2;
  console.log(mindGameNumber);

  if (mindGameNumber) {
    console.log('message envoyé');
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
