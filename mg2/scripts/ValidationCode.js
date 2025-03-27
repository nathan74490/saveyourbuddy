const inputs = document.querySelectorAll('.code-input');
const sound = document.getElementById('inputSound');

inputs.forEach((input, index) => {
  // Jouer un son lorsqu'on sélectionne un champ
  input.addEventListener('focus', () => {
    sound.currentTime = 0;
    sound.play();
  });

  // Jouer un son et passer au champ suivant
  input.addEventListener('input', () => {
    if (input.value.length === 1 && index < inputs.length - 1) {
      sound.currentTime = 0;
      sound.play();
      inputs[index + 1].focus();
    }
  });

  // Gérer les touches de suppression
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Backspace' && input.value.length === 0 && index > 0) {
      sound.currentTime = 0;
      sound.play();
      inputs[index - 1].focus();
    }
  });
});

// let id_game = localStorage.getItem('id_game');
// console.log(id_game);

// document.getElementById("codeForm").addEventListener("submit", function (event) {
//     event.preventDefault(); // Empêche l'envoi par défaut

//     // Récupérer tous les inputs
//     const inputs = document.querySelectorAll(".code-input");
//     let codeComplet = "";

//     // Concaténer les valeurs des inputs
//     inputs.forEach(input => {
//         codeComplet += input.value;
//     });

//     // Créer un champ caché pour envoyer le code concaténé
//     let hiddenInput = document.createElement("input");
//     hiddenInput.type = "hidden";
//     hiddenInput.name = "full_code";
//     hiddenInput.value = codeComplet;

//     // Ajouter l'input caché au formulaire et soumettre
//     this.appendChild(hiddenInput);
//     this.submit();
//     verifyGameCode(codeComplet, id_game);
// });

// function verifyGameCode(userInput, id_game) {
//     const url = `http://192.168.4.60/workshopAPI/api/v1/index.php?game=${id_game}`;
//     const errorMessage = document.getElementById("error-message");
//     const endScreen = document.getElementById("endScreen");

//     fetch(url)
//         .then((response) => response.json())
//         .then((game) => {
//             if (game && game.mindgame_code) {
//                 const code = game.mindgame_code.toString();
//                 if (userInput.toString() === code) {
//                     console.log('Code correct!');
//                     updateMindGamesStatus('success');

//                     // Afficher l'écran de fin
//                     endScreen.style.display = "flex";
//                     // Cache le message d'erreur s'il était affiché
//                     if (errorMessage) {
//                         errorMessage.style.display = "none";
//                     }
//                     return true;
//                 } else {
//                     console.log('Code incorrect!');

//                     // Affiche un message d'erreur
//                     if (errorMessage) {
//                         errorMessage.textContent = "Code incorrect, veuillez réessayer.";
//                         errorMessage.style.display = "block";
//                     }

//                     return false;
//                 }
//             }
//         })
//         .catch((error) => {
//             console.error(error);
//             if (errorMessage) {
//                 errorMessage.textContent = "Une erreur est survenue, veuillez réessayer.";
//                 errorMessage.style.display = "block";
//             }
//         });
// }

let id_game = localStorage.getItem('idGame');
console.log(id_game);

document
  .getElementById('codeForm')
  .addEventListener('submit', function (event) {
    event.preventDefault(); // Empêche l'envoi par défaut

    // Récupérer tous les inputs
    const inputs = document.querySelectorAll('.code-input');
    let codeComplet = '';

    // Concaténer les valeurs des inputs
    inputs.forEach((input) => {
      codeComplet += input.value;
    });
    console.log(codeComplet);

    verifyGameCode(codeComplet, id_game);
  });

function verifyGameCode(userInput, gameId) {
  const url = `http://192.168.4.60/workshopAPI/api/v1/index.php?game=${gameId}`;
  console.log('URL appelée:', url);

  fetch(url)
    .then((response) => {
      console.log('Statut de la réponse:', response.status);
      return response.json();
    })
    .then((game) => {
      console.log('Données reçues:', game);
      if (game && game.mindgame_code) {
        const code = game.mindgame_code.toString();
        if (userInput.toString() === code) {
          console.log('✅ Code correct!');
          updateMindGamesStatus('sucess');
          return true;
        } else {
          console.log('❌ Code incorrect!');
          return false;
        }
      } else {
        console.log('❌ Aucune donnée valide reçue.');
      }
    })
    .catch((error) => {
      console.error('Erreur fetch:', error);
    });
}

// function verifyGameCode(userInput, id_game) {
//   const url = `http://192.168.4.60/workshopAPI/api/v1/index.php?game=${id_game}`;

//   fetch(url)
//     .then((response) => response.json())
//     .then((game) => {
//       console.log(game);

//       // Trouver le mindgame avec le mindgame_number === 1
//       const mindGame = game.mindgames.find(
//         (mindgame) => mindgame.mindgame_number === '1'
//       );

//       // Vérifier si mindgame existe, a le bon statut et un code valide
//       if (
//         mindGame &&
//         mindGame.mindgame_status === 'sucess' &&
//         game.mindgame_code
//       ) {
//         const code = game.mindgame_code.toString();

//         // Vérifier si le code entré par l'utilisateur est correct
//         if (userInput.toString() === code) {
//           console.log('Code correct!');
//           updateMindGamesStatus('sucess'); // Appeler la fonction pour mettre à jour le statut
//           endScreen.style.display = 'flex'; // Afficher l'écran de fin
//           if (errorMessage) {
//             errorMessage.style.display = 'none';
//           }
//           return true;
//         } else {
//           console.log('Code incorrect!');
//           if (errorMessage) {
//             errorMessage.textContent = 'Code incorrect, veuillez réessayer.';
//             errorMessage.style.display = 'block';
//           }
//           return false;
//         }
//       } else {
//         console.log('Mindgame 1 n\'a pas le statut "sucess" ou pas de code.');
//         return false;
//       }
//     })
//     .catch((error) => {
//       console.error(error);
//       if (errorMessage) {
//         errorMessage.textContent =
//           'Une erreur est survenue, veuillez réessayer.';
//         errorMessage.style.display = 'block';
//       }
//     });
// }
