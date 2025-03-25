console.log('coucou');

function help() {
  fetch('http://192.168.4.60/workshopAPI/api/v1/index.php?games')
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
    })
    .catch(console.error);
}

help();

const play = document.querySelector('#play');

play.addEventListener('click', (e) => {
  console.log('coucou');
});
