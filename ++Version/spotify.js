// l'entête de la requête avec le token
const headers = {
  "Content-Type": "application/json",
  Authorization: "Bearer BQC7fUYq50AB3w-i4dDJcVoAzXnTB5WlCIl6XbmjxmDtiskxa2HvRMdJ7uIXdY1bRfFy60_XrSuy9AHlo3OmSbLdDJg_DxxkgUXcf7tuHPQsh20cqpLme0YaCiDdotCgoBsi94-640Gk_iYZCqWJlVColAkF6dPPHbAUcGJ0gVI"
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
      document.getElementById("motcle").className = "input is-success";
      afficherAlbums(albums);
  })
  .catch( (error) => console.log(error))
  document.getElementById("motcle").className = "input is-danger";

}

function afficherAlbums(albums) {
  // supprimer les albums précédents
  let listeAlbums = document.getElementById("albums");
  listeAlbums.innerHTML = "";

  // afficher les albums
  for (let album of albums) {
    let img = document.createElement("img");
    img.src = album.images[0].url;
    img.id = album.id;
    img.className = "album";
    img.addEventListener("click", infoAlbum);
    img.alt = album.name;
    document.getElementById("albums").appendChild(img);
    }
}

function infoAlbum(event){
   let id = event.target.id;
   console.log(id);
    fetch("https://api.spotify.com/v1/albums/"+id, fetchOptions)
    .then( (response) => {
        return response.json()
    })
    .then( (dataJSON) => {
        console.log(dataJSON);
        //récup d'information sur l'album
        let artiste = dataJSON.artists[0];
        let titre = dataJSON.name;
        let tracklist = dataJSON.tracks.items;
        
        // afficher les informations sur l'album
        document.getElementById("disque").innerHTML = titre;
        document.getElementById("chanteur").innerHTML = `<a href="${artiste.external_urls.spotify}" target="_blank">${artiste.name}</a>`;
        document.getElementById("tracklist").innerHTML = ""; //reset de la tracklist
        for (let track of tracklist) {
            let li = document.createElement("li");
            let time = convetMstoM(track.duration_ms);
            //on insert un lien + audio pour chaque track
            li.innerHTML = `<a href="${track.external_urls.spotify}" target="_blank">${track.name} - ${time}</a>` + `<br><audio id="audio" src= ${track.preview_url} controls>'Pas de preview'</audio>`;
            document.getElementById("tracklist").appendChild(li);
        }
      })
    .catch( (error) => console.log(error))
}

//convertir des millisecondes en minutes et secondes
function convetMstoM (ms) {
  var minutes = Math.floor(ms / 60000);
  var seconds = ((ms % 60000) / 1000).toFixed(0);
  return `${minutes}:${(seconds < 10 ? "0" : "")}${seconds}`;
}