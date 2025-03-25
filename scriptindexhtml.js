console.log('scriptindexhtml.js');

const win = document.querySelector('#win');
const lose = document.querySelector('#lose');

const button = document.createElement('button');

win.addEventListener('click', (e) => {
  console.log('gagné');
  let id_game = localStorage.getItem('id_game');
  console.log(id_game);
  let moduleStatus = 'sucess';
  let moduleNumber = 1;
  updateModuleStatus(id_game, moduleNumber, moduleStatus);
});

function updateModuleStatus(gameId, moduleNumber, moduleStatus) {
  const updateData = {
    type: 'module',
    id_game: gameId,
    module_number: moduleNumber,
    module_status: moduleStatus,
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

lose.addEventListener('click', (e) => {
  console.log('perdu');
});
