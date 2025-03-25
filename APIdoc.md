# Documentation API WORSHOP2

### Fonction créer une partie POST pour sceno

```js
fetch('http://192.168.4.60/workshopAPI/api/v1', {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    name: 'Nouveau nom',
    age: 25,
  }),
})
  .then((response) => response.json())
  .then((data) => console.log('Success:', data))
  .catch((error) => console.error('Error:', error));
```

update module pour chnager le status et pareil pour casse tete
update fonction qui génére un code et qui update le cassetete n1 avec le code js
et fonction qui férifie le code du cassete 1 et qui mettra à jour le statu des casses-tete et que on vérifie si les deux sont réussis

rendre iframe dynamique et en fonction de l'id module elle vient chercher les modules avec cette id

### Fonction pour fetch les données

```js
function help() {
  fetch('http://192.168.4.60/workshopAPI/api/v1/index.php?help')
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
    })
    .catch(console.error);
}

help();
```
