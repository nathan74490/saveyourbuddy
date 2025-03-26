document.addEventListener("DOMContentLoaded", function () {
    const screen = document.getElementById("ecran");
    const keys = document.querySelectorAll(".key");
    const led = document.getElementById('led')
    const statusButton = document.getElementById('statusButton')


    let step = 1;
    let historical = [];
    let moduleIsFinish = false;
    let canClick = true;

    // Si le joueur appuie sur la bonne clé, alors on allume la LED et on l'éteint.
    function isTheGoodKey(YesOrNo) {
        if (YesOrNo === 'yes') {
            if (step < 5) {
                statusButton.src = "pictures/correct-button.svg";
                setTimeout(() => {
                    statusButton.src = "pictures/idle-button.svg";

                }, 600)
            }

        } else if (YesOrNo === 'no') {
            statusButton.src = "pictures/notcorrect-button.svg";
            setTimeout(() => {
                statusButton.src = "pictures/idle-button.svg";

            }, 600)
        }
    }

    // Permet d'ajouter un bloc blanc dans la box pour voir l'avancée ou de la vider s'il y a une erreur.
    function addStepInAdvance(AddOrRemove) {
        const advanceBox = document.getElementById('advance');

        if (AddOrRemove === "add") {
            advanceBox.innerHTML += '<div class="progressStep"> <img src="pictures/correct-button.svg" alt = ""> </div> '
        } else if (AddOrRemove === "remove") {
            advanceBox.innerHTML = ''
        }


    }

    // Prends un chiffre entre 1 et 4 et le mets dans l'écran.
    function writeRandomNumber() {
        let randomNumber;
        let lastNumber = null;
        do {
            randomNumber = 1 + Math.floor(Math.random() * 4);
        } while (randomNumber === lastNumber);

        lastNumber = randomNumber;
        // console.log("Dernier nombre :", lastNumber);

        screen.innerHTML = '2';
    }

    // Quand le module est résolue on met l'écran vide, la led verte et on enlève la possibilité d'intéragir.
    function moduleFinish() {
        screen.innerHTML = "";
        statusButton.src = "pictures/correct-button.svg";
        moduleIsFinish = true;
        console.log(`A la fin :${moduleIsFinish}`);
        updateModuleStatus("sucess");

        keys.forEach(key => {
            key.removeEventListener("click", key.clickListener);
        });
    }

    // Il prend en compte le chiffre sur l'écran et ce que tu interagis, et vérifie si ça correspond à la bonne réponse à chaque étape par rapport au processus donné.
    function verifierEtape(positionClicked, valueClicked) {
        let numberScreen = screen.textContent.trim();
        let expectedPosition, expectedValue;

        switch (step) {
            case 1:
                expectedPosition = [1, 1, 2, 3][numberScreen - 1];
                expectedValue = keys[expectedPosition].textContent;
                break;
            case 2:
                if (numberScreen === "1") expectedValue = "4";
                else if (numberScreen === "2" || numberScreen === "4") expectedPosition = historical[0].position;
                else if (numberScreen === "3") expectedPosition = 0;

                if (expectedPosition !== undefined) expectedValue = keys[expectedPosition].textContent;
                break;
            case 3:
                if (numberScreen === "1") expectedValue = historical[1].valeur;
                else if (numberScreen === "2") expectedValue = historical[0].valeur;
                else if (numberScreen === "3") expectedPosition = 2;
                else if (numberScreen === "4") expectedValue = "4";

                if (expectedPosition !== undefined) expectedValue = keys[expectedPosition].textContent;
                break;
            case 4:
                if (numberScreen === "1") expectedPosition = historical[0].position;
                else if (numberScreen === "2") expectedPosition = 0;
                else if (numberScreen === "3" || numberScreen === "4") expectedPosition = historical[1].position;

                if (expectedPosition !== undefined) expectedValue = keys[expectedPosition].textContent;
                break;
            case 5:
                if (numberScreen === "1") expectedValue = historical[0].valeur;
                else if (numberScreen === "2") expectedValue = historical[1].valeur;
                else if (numberScreen === "3") expectedValue = historical[3].valeur;
                else if (numberScreen === "4") expectedValue = historical[2].valeur;
                break;
        }




        if ((expectedPosition !== undefined && expectedPosition === positionClicked) || expectedValue === valueClicked) {
            console.log(`✅ Étape ${step} OK !`);
            historical.push({ position: positionClicked, valeur: valueClicked });
            isTheGoodKey("yes");
            writeRandomNumber();
            addStepInAdvance("add");
            console.log(historical)
            step++;
            console.log(moduleIsFinish)

            if (step === 6) {
                moduleFinish();
            }

        } else {
            console.log(`❌ Mauvais choix à l'étape ${step} !`);
            step = 1;
            writeRandomNumber();
            isTheGoodKey("no");
            addStepInAdvance("remove");
        }
    }

    if (!moduleIsFinish) {
        writeRandomNumber();

        keys.forEach((key, index) => {
            key.clickListener = function () {

                if (canClick) {
                    verifierEtape(index, key.textContent);
                    canClick = false;
                }

                setTimeout(() => {
                    canClick = true;
                }, 800)

            };
            key.addEventListener("click", key.clickListener);
        });
    }
});

