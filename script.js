let words = [
    {
        "reference": "DELTA",
        "reponse": ["ALPHA", "BETA", "GAMMA", "EPSILON", "ZETA", "OMEGA", "SIGMA", "TAU", "LAMBDA", "KAPPA", "PHI", "CHARLIE", "PROTOCOL", "VECTOR", "TACTICAL", "NEXUS", "CIPHER", "QUANTUM", "STELLAR", "HORIZON", "MAVERICK", "PHANTOM", "SENTINEL", "CRYPTEX"],
        "position": 3
    },
    {
        "reference": "ALPHA",
        "reponse": ["CHARLIE", "BRAVO", "DELTA", "ECHO", "FOXTROT", "GAMMA", "SIGMA", "ZETA", "PROTOCOL", "LAMBDA", "VECTOR", "OMEGA", "TAU", "INFILTRATE", "TACTICAL", "NEXUS", "CIPHER", "QUANTUM", "STELLAR", "HORIZON", "MAVERICK", "PHANTOM", "SENTINEL", "CRYPTEX"],
        "position": 1
    },
    {
        "reference": "OMEGA",
        "reponse": ["SIGMA", "ZETA", "PROTOCOL", "DELTA", "EPSILON", "ALPHA", "GAMMA", "BETA", "CHARLIE", "LAMBDA", "TAU", "BRAVO", "VECTOR", "KAPPA", "TACTICAL", "NEXUS", "CIPHER", "QUANTUM", "STELLAR", "HORIZON", "MAVERICK", "PHANTOM", "SENTINEL", "CRYPTEX"],
        "position": 5
    },
    {
        "reference": "EPSILON",
        "reponse": ["PROTOCOL", "GAMMA", "BRAVO", "ZETA", "DELTA", "TAU", "ALPHA", "CHARLIE", "OMEGA", "LAMBDA", "SIGMA", "VECTOR", "BETA", "INFILTRATE", "TACTICAL", "NEXUS", "CIPHER", "QUANTUM", "STELLAR", "HORIZON", "MAVERICK", "PHANTOM", "SENTINEL", "CRYPTEX"],
        "position": 2
    },
    {
        "reference": "TACTICAL",
        "reponse": ["ZETA", "GAMMA", "BRAVO", "DELTA", "ALPHA", "EPSILON", "SIGMA", "LAMBDA", "CHARLIE", "OMEGA", "PROTOCOL", "TAU", "VECTOR", "INFILTRATE", "NEXUS", "CIPHER", "QUANTUM", "STELLAR", "HORIZON", "MAVERICK", "PHANTOM", "SENTINEL", "CRYPTEX", "PARADIGM"],
        "position": 0
    },
    {
        "reference": "BETA",
        "reponse": ["BRAVO", "GAMMA", "ZETA", "DELTA", "ALPHA", "LAMBDA", "TAU", "PROTOCOL", "CHARLIE", "OMEGA", "SIGMA", "EPSILON", "VECTOR", "INFILTRATE", "TACTICAL", "NEXUS", "CIPHER", "QUANTUM", "STELLAR", "HORIZON", "MAVERICK", "PHANTOM", "SENTINEL", "CRYPTEX"],
        "position": 4
    },
    {
        "reference": "GAMMA",
        "reponse": ["ZETA", "LAMBDA", "SIGMA", "DELTA", "ALPHA", "EPSILON", "BRAVO", "OMEGA", "TAU", "CHARLIE", "PROTOCOL", "BETA", "VECTOR", "INFILTRATE", "TACTICAL", "NEXUS", "CIPHER", "QUANTUM", "STELLAR", "HORIZON", "MAVERICK", "PHANTOM", "SENTINEL", "CRYPTEX"],
        "position": 5
    },
    {
        "reference": "VECTOR",
        "reponse": ["PROTOCOL", "TACTICAL", "INFILTRATE", "SIGMA", "ZETA", "LAMBDA", "BRAVO", "DELTA", "CHARLIE", "OMEGA", "ALPHA", "GAMMA", "BETA", "TAU", "NEXUS", "CIPHER", "QUANTUM", "STELLAR", "HORIZON", "MAVERICK", "PHANTOM", "SENTINEL", "CRYPTEX", "PARADIGM"],
        "position": 3
    },
    {
        "reference": "NEXUS",
        "reponse": ["CIPHER", "QUANTUM", "STELLAR", "ZETA", "DELTA", "ALPHA", "GAMMA", "PROTOCOL", "TACTICAL", "LAMBDA", "SIGMA", "OMEGA", "VECTOR", "HORIZON", "MAVERICK", "PHANTOM", "SENTINEL", "CRYPTEX", "PARADIGM", "INFILTRATE", "CHARLIE", "BETA", "TAU", "BRAVO"],
        "position": 1
    },
    {
        "reference": "QUANTUM",
        "reponse": ["STELLAR", "HORIZON", "MAVERICK", "NEXUS", "CIPHER", "PROTOCOL", "TACTICAL", "DELTA", "LAMBDA", "SIGMA", "OMEGA", "VECTOR", "ALPHA", "GAMMA", "BETA", "TAU", "PHANTOM", "SENTINEL", "CRYPTEX", "PARADIGM", "INFILTRATE", "CHARLIE", "ZETA", "BRAVO"],
        "position": 2
    },
    {
        "reference": "SENTINEL",
        "reponse": ["MAVERICK", "PHANTOM", "CRYPTEX", "NEXUS", "QUANTUM", "STELLAR", "HORIZON", "DELTA", "ALPHA", "GAMMA", "PROTOCOL", "TACTICAL", "VECTOR", "SIGMA", "LAMBDA", "OMEGA", "CIPHER", "PARADIGM", "INFILTRATE", "CHARLIE", "BETA", "TAU", "ZETA", "BRAVO"],
        "position": 0
    },
    {
        "reference": "MAVERICK",
        "reponse": ["PHANTOM", "SENTINEL", "CRYPTEX", "QUANTUM", "STELLAR", "HORIZON", "NEXUS", "DELTA", "ALPHA", "GAMMA", "PROTOCOL", "TACTICAL", "VECTOR", "SIGMA", "LAMBDA", "OMEGA", "CIPHER", "PARADIGM", "INFILTRATE", "CHARLIE", "BETA", "TAU", "ZETA", "BRAVO"],
        "position": 5
    },
    {
        "reference": "CIPHER",
        "reponse": ["QUANTUM", "STELLAR", "HORIZON", "NEXUS", "MAVERICK", "PHANTOM", "SENTINEL", "DELTA", "ALPHA", "GAMMA", "PROTOCOL", "TACTICAL", "VECTOR", "SIGMA", "LAMBDA", "OMEGA", "CRYPTEX", "PARADIGM", "INFILTRATE", "CHARLIE", "BETA", "TAU", "ZETA", "BRAVO"],
        "position": 4
    },
    {
        "reference": "CRYPTEX",
        "reponse": ["SENTINEL", "MAVERICK", "PHANTOM", "NEXUS", "QUANTUM", "STELLAR", "HORIZON", "DELTA", "ALPHA", "GAMMA", "PROTOCOL", "TACTICAL", "VECTOR", "SIGMA", "LAMBDA", "OMEGA", "CIPHER", "PARADIGM", "INFILTRATE", "CHARLIE", "BETA", "TAU", "ZETA", "BRAVO"],
        "position": 1
    },
    {
        "reference": "HORIZON",
        "reponse": ["STELLAR", "QUANTUM", "MAVERICK", "NEXUS", "CIPHER", "PHANTOM", "SENTINEL", "DELTA", "ALPHA", "GAMMA", "PROTOCOL", "TACTICAL", "VECTOR", "SIGMA", "LAMBDA", "OMEGA", "CRYPTEX", "PARADIGM", "INFILTRATE", "CHARLIE", "BETA", "TAU", "ZETA", "BRAVO"],
        "position": 3
    },
    {
        "reference": "PARADIGM",
        "reponse": ["INFILTRATE", "TACTICAL", "PROTOCOL", "NEXUS", "QUANTUM", "STELLAR", "HORIZON", "DELTA", "ALPHA", "GAMMA", "VECTOR", "SIGMA", "LAMBDA", "OMEGA", "CIPHER", "MAVERICK", "PHANTOM", "SENTINEL", "CRYPTEX", "CHARLIE", "BETA", "TAU", "ZETA", "BRAVO"],
        "position": 2
    }
]

let space_of_button = document.getElementById("space_button");
let ecran = document.getElementById("ecran");
let score_div = document.getElementById('count');
let score = 0;
let nbr_de_btn = 6;



function game() {
    //initialisation des variable aléatoire et d'une copie du tableau initiale pour effectuer des actions dessus
    let tab_words = JSON.parse(JSON.stringify(words))
    let IndexOfWordInScreen = Math.floor(Math.random() * words.length)
    let IndexOfWordReference = Math.floor(Math.random() * words.length)

    //initialisation des positions de chaque donnée
    let positionOfWordInScreen = words[IndexOfWordInScreen].position
    let goodPosition = tab_words[IndexOfWordReference].position
    //boucle pour crée les boutons
    for (let i = 0; i < nbr_de_btn; i++) {
        //on enregistre le bouton dans une varibale pour pouvoir crée une logique
        let button = document.createElement("button")
        //on donne un id pour identifier le bouton clické
        button.id = i
        space_of_button.appendChild(button)
        //on choisie un mot dans la copie de mot du mot de l'ecran
        let textRandomButton = Math.floor(Math.random() * tab_words[IndexOfWordInScreen].reponse.length);
        //on ajoute ce mot a un bouton
        button.innerHTML = tab_words[IndexOfWordInScreen].reponse[textRandomButton];
        //enleve le mot de la copie du tableau pour pas avoir de doublons dans les mots
        tab_words[IndexOfWordInScreen].reponse.splice(textRandomButton, 1)
        //on affiche le mot de l'ecran
        ecran.innerHTML = words[IndexOfWordInScreen].reference
        if (i === positionOfWordInScreen) {
            //si le bouton a le meme id que le
            button.innerHTML = tab_words[IndexOfWordReference].reference
        }
        button.addEventListener("click", () => {
            if (i === goodPosition) {
                score++;
                console.log("wp")
                score_div.innerHTML = score
            } else {
                fail()
                score = 0;
                score_div.innerHTML = score
            }
            //quand le joueur atteint 5 le jeux se supprime
            if (score < 5) {
                Array.from(document.getElementsByTagName('button')).forEach(element => element.remove());
                game()
            }else{
                Array.from(document.body.children).forEach(element => element.remove());
                document.body.innerHTML = "bravo tu as gagné"
            }
        });
    }
}
game()

function fail(){
    document.body.style.backgroundImage= "none"
    setTimeout(()=>{
        document.body.innerHTML = "<p>error</p>"
    },300)
    setInterval(()=>copieEnProfondeur.forEach(element => {
        document.body.appendChild(element);
        document.body.style.backgroundImage= "url('img/background.svg')"
    }, 5000))
    
}