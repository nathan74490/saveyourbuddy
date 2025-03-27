window.onload = function() {
    let audio = document.getElementById("background-music");
    audio.play().catch(error => console.log("Autoplay bloqué 😢", error));
};