const inputs = document.querySelectorAll('.code-input');
const sound = document.getElementById("inputSound");

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



let id_game = localStorage.getItem('id_game');
console.log(id_game);

document.getElementById("codeForm").addEventListener("submit", function (event) {
    event.preventDefault(); // Empêche l'envoi par défaut

    // Récupérer tous les inputs
    const inputs = document.querySelectorAll(".code-input");
    let codeComplet = "";

    // Concaténer les valeurs des inputs
    inputs.forEach(input => {
        codeComplet += input.value;
    });

    // Créer un champ caché pour envoyer le code concaténé
    let hiddenInput = document.createElement("input");
    hiddenInput.type = "hidden";
    hiddenInput.name = "full_code";
    hiddenInput.value = codeComplet;

    // Ajouter l'input caché au formulaire et soumettre
    this.appendChild(hiddenInput);
    this.submit();
    verifyGameCode(codeComplet, id_game);
});




function verifyGameCode(userInput, id_game) {
    const url = `http://192.168.4.60/workshopAPI/api/v1/index.php?game=${id_game}`;

    fetch(url)
        .then((response) => response.json())
        .then((game) => {
            if (game && game.mindgame_code) {
                const code = game.mindgame_code.toString();
                if (userInput.toString() === code) {
                    console.log('Code correct!');
                    updateMindGamesStatus('sucess')
                    return true;
                } else {
                    console.log('Code incorrect!');

                    return false;
                }
            }
        })
        .catch(console.error);
}

