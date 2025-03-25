const molette = document.getElementById("molette");
        const ledContainer = document.getElementById("ledContainer");
        const countdownElement = document.getElementById("countdown");
        const validateBtn = document.getElementById("validate");
        let rotation = 0;
        let timer = 10;
        let correctPosition = Math.floor(Math.random() * 4) * 90;
        let leds = [];

        // Création des LED fixes
        for (let i = 0; i < 12; i++) {
            let led = document.createElement("div");
            led.classList.add("led");
            ledContainer.appendChild(led);
            leds.push(led);
        }

        function updateLEDs() {
            leds.forEach(led => {
                let isOn = Math.random() > 0.5;
                led.style.backgroundColor = isOn ? "yellow" : "grey";
            });
        }

        molette.addEventListener("click", () => {
            rotation += 90;
            if (rotation >= 360) rotation = 0;
            molette.style.transform = `rotate(${rotation}deg)`;
        });

        let countdownInterval = setInterval(() => {
            timer--;
            countdownElement.textContent = timer;
            updateLEDs();
            if (timer === 0) {
                clearInterval(countdownInterval);
                validatePosition();
            }
        }, 1000);

        validateBtn.addEventListener("click", validatePosition);

        function validatePosition() {
            if (rotation === correctPosition) {
                alert("Bravo ! Position correcte !");
            } else {
                alert("Perdu ! Mauvaise position.");
            }
        }