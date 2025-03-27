const alphabet = "abcdefghijklmnopqrstuvwxyz";
const codesCorrects = ["echo", "mats"]; // Les deux codes possibles
let toggle = 0; // Alterne entre 0 et 1


function turnOneDivIdToDisplayNone(id, displayStatus){
    id = document.getElementById(id);
    id.style.display = displayStatus;
}
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

document.querySelector('#validate').addEventListener('click', () => {
    const code = Array.from(document.querySelectorAll('.digit'))
        .map(d => d.textContent).join('');

    if (code === codesCorrects[toggle]) {
        turnOneDivIdToDisplayNone('validate', 'none');
        turnOneDivIdToDisplayNone('screen', 'none');
        turnOneDivIdToDisplayNone('screenFinish', 'block');
        toggle = 1 - toggle; // Alterne entre 0 et 1
        updateModuleStatus('sucess');
    } 
});
