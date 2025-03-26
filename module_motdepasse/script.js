const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const codesCorrects = ["ECHO", "MATS"]; // Les deux codes possibles
let toggle = 0; // Alterne entre 0 et 1

document.querySelectorAll('.arrow').forEach(arrow => {
    arrow.addEventListener('click', () => {
        let index = arrow.dataset.index;
        let direction = arrow.dataset.dir;
        let digit = document.querySelector(`.digit[data-index='${index}']`);
        let currentIndex = alphabet.indexOf(digit.textContent);

        if (direction === "up") {
            digit.textContent = alphabet[(currentIndex + 1) % alphabet.length];
        } else {
            digit.textContent = alphabet[(currentIndex - 1 + alphabet.length) % alphabet.length];
        }
    });
});

document.querySelector('.validate').addEventListener('click', () => {
    const code = Array.from(document.querySelectorAll('.digit'))
        .map(d => d.textContent).join('');

    if (code === codesCorrects[toggle]) {
        document.querySelector('.checkCircle').style.backgroundImage = "url('IMG/green_btn.svg')";
        toggle = 1 - toggle; // Alterne entre 0 et 1
    } else {
        document.querySelector('.checkCircle').style.backgroundImage = "url('IMG/red_btn.svg')";
        setTimeout(() => {
            document.querySelector('.checkCircle').style.backgroundImage = "url('IMG/gray_btn.svg')";
        }, 1000);
    }
});
