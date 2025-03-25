let words = [
    {
        "reference": "READY",
        "reponse": ["YES", "OKAY", "WHAT", "MIDDLE", "LEFT", "PRESS", "RIGHT", "BLANK", "READY", "NO", "FIRST", "UHHH", "NOTHING", "WAIT"],
        "position": 3
    },
    {
        "reference": "FIRST",
        "reponse": ["LEFT", "OKAY", "YES", "MIDDLE", "NO", "RIGHT", "NOTHING", "UHHH", "WAIT", "READY", "BLANK", "WHAT", "PRESS", "FIRST"],
        "position": 1
    },
    {
        "reference": "NO",
        "reponse": ["BLANK", "UHHH", "WAIT", "FIRST", "WHAT", "READY", "RIGHT", "YES", "NOTHING", "LEFT", "PRESS", "OKAY", "NO", "MIDDLE"],
        "position": 5
    },
    {
        "reference": "BLANK",
        "reponse": ["WAIT", "RIGHT", "OKAY", "MIDDLE", "BLANK", "PRESS", "READY", "NOTHING", "NO", "WHAT", "LEFT", "UHHH", "YES", "FIRST"],
        "position": 2
    },
    {
        "reference": "NOTHING",
        "reponse": ["UHHH", "RIGHT", "OKAY", "MIDDLE", "YES", "BLANK", "NO", "PRESS", "LEFT", "WHAT", "WAIT", "FIRST", "NOTHING", "READY"],
        "position": 0
    },
    {
        "reference": "YES",
        "reponse": ["OKAY", "RIGHT", "UHHH", "MIDDLE", "FIRST", "WHAT", "PRESS", "READY", "NOTHING", "YES", "LEFT", "BLANK", "NO", "WAIT"],
        "position": 4
    },
    {
        "reference": "WHAT",
        "reponse": ["UHHH", "WHAT", "LEFT", "NOTHING", "READY", "BLANK", "MIDDLE", "NO", "OKAY", "FIRST", "WAIT", "YES", "PRESS", "RIGHT"],
        "position": 5
    },
    {
        "reference": "YOU",
        "reponse": ["SURE", "YOU ARE", "YOU'RE", "NEXT", "UH HUH", "WHAT?", "DONE", "U", "HOLD", "WHAT", "YOU", "UH UH", "LIKE", "DONE", "U"],
        "position": 3
    },
    {
        "reference": "YOU ARE",
        "reponse": ["YOUR", "NEXT", "LIKE", "UH HUH", "WHAT?", "DONE", "UH UH", "HOLD", "YOU", "U", "YOU'RE", "SURE", "UR", "YOU ARE"],
        "position": 1
    },
    {
        "reference": "YOUR",
        "reponse": ["UH UH", "YOU ARE", "UH HUH", "YOUR", "NEXT", "UR", "SURE", "U", "YOU'RE", "YOU", "WHAT?", "HOLD", "LIKE", "DONE"],
        "position": 2
    },
    {
        "reference": "YOU'RE",
        "reponse": ["YOU", "YOU'RE", "UR", "NEXT", "UH UH", "YOU ARE", "U", "YOUR", "WHAT?", "UH HUH", "SURE", "DONE", "LIKE", "HOLD"],
        "position": 0
    },
    {
        "reference": "UR",
        "reponse": ["DONE", "U", "UR", "UH HUH", "WHAT?", "SURE", "YOUR", "HOLD", "YOU'RE", "LIKE", "NEXT", "UH UH", "YOU", "WHAT"],
        "position": 5
    },
    {
        "reference": "U",
        "reponse": ["UH HUH", "SURE", "NEXT", "WHAT?", "YOU'RE", "UR", "UH UH", "DONE", "U", "LIKE", "HOLD", "YOU ARE", "YOUR"],
        "position": 4
    },
    {
        "reference": "UH HUH",
        "reponse": ["UH HUH", "YOUR", "YOU ARE", "YOU", "DONE", "HOLD", "UH UH", "NEXT", "SURE", "LIKE", "YOU'RE", "UR", "U", "WHAT?"],
        "position": 1
    },
    {
        "reference": "UH UH",
        "reponse": ["UR", "U", "YOU ARE", "YOU'RE", "NEXT", "YOU", "UH UH", "UH HUH", "LIKE", "YOUR", "SURE", "HOLD", "WHAT?", "DONE"],
        "position": 3
    },
    {
        "reference": "WHAT?",
        "reponse": ["YOU", "HOLD", "YOU'RE", "YOUR", "U", "DONE", "UH UH", "LIKE", "YOU ARE", "UH HUH", "NEXT", "WHAT?", "SURE"],
        "position": 2
    },
    {
        "reference": "LIKE",
        "reponse": ["YOU'RE", "NEXT", "U", "UR", "HOLD", "DONE", "UH UH", "WHAT?", "UH HUH", "YOU", "LIKE", "SURE", "YOU ARE", "YOUR"],
        "position": 0
    }
];


let body = document.getElementsByTagName("body")[0];
let ecran = document.getElementById("ecran");
let score_div = document.getElementById('count');
let score = 0;
let nbr_de_btn = 6;
let tab_words = JSON.parse(JSON.stringify(words));
let IndexOfWordInScreen = Math.floor(Math.random() * words.length)
let IndexOfWordReference = Math.floor(Math.random() * words.length)

let positionOfWordInScreen = words[IndexOfWordInScreen].position
let goodPosition = tab_words[IndexOfWordReference].position


for (let i = 0; i < nbr_de_btn; i++) {
    let button = document.createElement("button")
    button.id = i
    body.appendChild(button)
    let textRandomButton = Math.floor(Math.random() * tab_words[IndexOfWordInScreen].reponse.length);
    button.innerHTML = tab_words[IndexOfWordInScreen].reponse[textRandomButton];

    tab_words[IndexOfWordInScreen].reponse.splice(textRandomButton, 1)
    ecran.innerHTML = words[IndexOfWordInScreen].reference
    if (i === positionOfWordInScreen) {
        button.innerHTML = tab_words[IndexOfWordReference].reference

    }




    button.addEventListener("click", () => {
        if (i === goodPosition) {
            console.log("wp")
        } else {
            console.log("la bonne reponse etait : " + goodPosition)
        }
        tab_words = JSON.parse(JSON.stringify(words))
        IndexOfWordInScreen = Math.floor(Math.random() * words.length)
        IndexOfWordReference = Math.floor(Math.random() * words.length)
        for (let j = 0; j < nbr_de_btn; j++) {
            let textRandomButton = Math.floor(Math.random() * tab_words[IndexOfWordInScreen].reponse.length);
            button.innerHTML = tab_words[IndexOfWordInScreen].reponse[textRandomButton];

            tab_words[IndexOfWordInScreen].reponse.splice(textRandomButton, 1)
            ecran.innerHTML = words[IndexOfWordInScreen].reference
            if (j === positionOfWordInScreen) {
                button.innerHTML = tab_words[IndexOfWordReference].reference

            }
        }
    });
}