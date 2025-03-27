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



function verifyGameCode(userInput, gameId) {
    const url = `http://192.168.4.60/workshopAPI/api/v1/index.php?game=${gameId}`;

    fetch(url)
        .then((response) => response.json())
        .then((game) => {
            if (game && game.mindgame_code) {
                const code = game.mindgame_code.toString();
                if (userInput.toString() === code) {
                    console.log('Code correct!');
                    return true;
                } else {
                    console.log('Code incorrect!');
                    return false;
                }
            }
        })
        .catch(console.error);
}

// Example usage:
verifyGameCode(1234, 190);