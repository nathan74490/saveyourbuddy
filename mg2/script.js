
setTimeout(() => {
  let audio = document.getElementById('background-music');
  audio.play().catch((error) => console.log('Autoplay bloqué 😢', error));
}, 1000); // Petite pause avant de jouer le son

document.addEventListener('DOMContentLoaded', function () {
  const fixBtn = document.getElementById('FixBtn');
  const link = document.querySelector('.Bottom__content a');

  // Nouvelle image après le premier clic
  const newImageSrc = './assets/images/FixButtonDown.svg';
  // Nouvelle image après le deuxième clic
  const secondImageSrc = './assets/images/FixButton.svg';

  link.addEventListener('click', function (event) {
    event.preventDefault(); // Empêche la redirection immédiate

    // Changer l'image au premier clic
    fixBtn.src = newImageSrc;

    // Ajouter un délai avant de changer l'image une seconde fois et accéder au lien
    setTimeout(() => {
      // Changer l'image une seconde fois
      fixBtn.src = secondImageSrc;

      // Attendre encore un peu avant de rediriger
      setTimeout(() => {
        window.location.href = link.href;
      }, 500); // Vous pouvez ajuster ce délai selon votre préférence (500 ms ici)
    }, 1000); // 1000 ms = 1 seconde
  });
});
