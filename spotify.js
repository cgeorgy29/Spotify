// l'entête de la requête avec le token
const headers = {
  "Content-Type": "application/json",
  Authorization: "Bearer BQAkc7UiMFJj9K7YGWeM3oSQvQFVRpn2tLqnECE4_TXRDTAkqU-Vtyvj1fNjHFKToDz5hrigAkUhCU2T3Gj92l8BmXY9RjFevw3Ut_UBbKeTkJVk5Qq9kSuz3NljaMSd6MxykzeQaKASSyh4wa46_aXPcISLrY6nKA5cyOm8Cv0D"
};
const fetchOptions = { headers: headers };
// l'url de recherche d'albums
const url = "https://api.spotify.com/v1/search?type=album&market=FR&limit=10&q="


// événement validation (submit) du formulaire
document.getElementById("fm").addEventListener("submit", chercherAlbums);

function chercherAlbums(event) {
  // empecher le rechargement de la page
  event.preventDefault();

  let motcle = document.getElementById("motcle").value;

  fetch(url+motcle, fetchOptions)
  .then( (response) => {
      return response.json()
  })
  .then( (dataJSON) => {
      console.log(dataJSON);

      // recupérer la listes des albums
      let albums = dataJSON.albums.items;
      // afficher les albums
      afficherAlbums(albums);


  })
  .catch( (error) => console.log(error))
}

function afficherAlbums(albums) {
  // supprimer les albums précédents
  let listeAlbums = document.getElementById("albums");
  listeAlbums.innerHTML = "";

  // afficher les albums
  for (let album of albums) {
    let img = document.createElement("img");
    img.src = album.images[0].url;
    img.alt = album.name;
    document.getElementById("albums").appendChild(img);
    }
}
