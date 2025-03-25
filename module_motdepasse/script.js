const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        
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

        document.getElementById('validate').addEventListener('click', () => {
            const code = Array.from(document.querySelectorAll('.digit'))
                .map(d => d.textContent).join('');
            
            const correctCode = "ECHO";
            const correctCode2 = "MATS";
            if (code === correctCode || code === correctCode2) {
                document.getElementById('result').textContent = "Code correct !";
                document.getElementById('result').style.color = "#0f0";
            } else {
                document.getElementById('result').textContent = "Code incorrect";
                document.getElementById('result').style.color = "#f00";
            }
        });