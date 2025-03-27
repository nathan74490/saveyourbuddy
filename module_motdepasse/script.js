const alphabet = "abcdefghijklmnopqrstuvwxyz";
const codeCorrect = "echo";
const codeCorrect2 = "mats"; // Les deux codes possibles
let btn_sound = new Audio('SOUNDS/btn_pressed.wav')
let letter_swip = new Audio('SOUNDS/ltr_swipe.wav')

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
            letter_swip.play();
            letter_swip.playbackRate=1.5;
            digit.textContent = alphabet[(currentIndex + 1) % alphabet.length];
        } else {
            letter_swip.play();
            letter_swip.playbackRate=1.5;
            digit.textContent = alphabet[(currentIndex - 1 + alphabet.length) % alphabet.length];
        }
    });
});

document.querySelector('#validate').addEventListener('click', () => {
    btn_sound.play();
    const code = Array.from(document.querySelectorAll('.digit'))
        .map(d => d.textContent).join('');

    if (code === codeCorrect || code === codeCorrect2) {
        turnOneDivIdToDisplayNone('validate', 'none');
        turnOneDivIdToDisplayNone('screen', 'none');
        turnOneDivIdToDisplayNone('screenFinish', 'block');
        updateModuleStatus('sucess');
    } 
});
