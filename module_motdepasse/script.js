const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"; // Déclaration de l'alphabet 
        
        document.querySelectorAll('.arrow').forEach(arrow => {
            arrow.addEventListener('click', () => {
                let index = arrow.dataset.index;
                let direction = arrow.dataset.dir;
                let digit = document.querySelector(`.digit[data-index='${index}']`);
                let currentIndex = alphabet.indexOf(digit.textContent);
                
                if (direction === "up") {
                    digit.textContent = alphabet[(currentIndex + 1) % alphabet.length]; // Si on clique sur la flèche du haut, on incrémente la lettre
                } else {
                    digit.textContent = alphabet[(currentIndex - 1 + alphabet.length) % alphabet.length]; // Sinon on décrémente la lettre
                }
            });
        });

        document.getElementById('validate').addEventListener('click', () => {
            const code = Array.from(document.querySelectorAll('.digit'))
                .map(d => d.textContent).join('');
            
            const correctCode = "ECHO"; // Code correct
            const correctCode2 = "MATS"; // Code correct 2
            if (code === correctCode || code === correctCode2) { // Si code correct 
                document.getElementById('result').textContent = "Code correct !";
                document.getElementById('result').style.color = "#0f0"; // Affichage en vert
            } else {
                document.getElementById('result').textContent = "Code incorrect";
                document.getElementById('result').style.color = "#f00";
            }
        });

        // TO DO : 
        // Faire en sorte que correctCode soit valide une fois sur deux, idem pour correctCode2.