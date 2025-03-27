function updateMindGamesStatus(mindgameStatus) {
  let id_game = localStorage.getItem('idGame');
  console.log(id_game);

  let mindGameNumber = 1;

  updateMindgameStatus(id_game, mindGameNumber, mindgameStatus);
}

function updateMindgameStatus(gameId, mindgameNumber, mindgameStatus) {
  const updateData = {
    type: 'mindgame',
    id_game: gameId,
    mindgame_number: mindgameNumber,
    mindgame_status: mindgameStatus,
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
    })
    .catch(console.error);
}
