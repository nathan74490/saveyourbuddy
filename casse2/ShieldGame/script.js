setTimeout(() => {
    let audio = document.getElementById("background-music");
    audio.play().catch(error => console.log("Autoplay bloqué 😢", error));
}, 1000); // Petite pause avant de jouer le son