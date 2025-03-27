setTimeout(() => {
  let audio = document.getElementById('background-music');
  audio.play().catch((error) => console.log('Autoplay bloqué 😢', error));
}, 1000); // Petite pause avant de jouer le son

let params = new URLSearchParams(document.location.search);
let mindGameNumber = params.get('nbMindGame');
console.log('mindGameNumber ' + mindGameNumber);
localStorage.setItem('mindGameNumber', mindGameNumber);

document.addEventListener('DOMContentLoaded', function () {
  const fixBtn = document.getElementById('FixBtn');
  const link = document.querySelector('.Bottom__content a');

  // Nouvelle image après le clic
  const newImageSrc = './assets/images/FixButton.svg';

  link.addEventListener('click', function (event) {
    event.preventDefault(); // Empêche la redirection immédiate

    // Changer l'image
    fixBtn.src = newImageSrc;

    // Ajouter un délai avant d'accéder au lien (ex: 1 seconde)
    setTimeout(() => {
      window.location.href = link.href;
    }, 1000); // 1000 ms = 1 seconde
  });
});
