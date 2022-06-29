// l'entête de la requête avec le token
const headers = {
  "Content-Type": "application/json",
  Authorization: "Bearer BQCQz6YBSYbyWy1GE7QeQgDbzSKIyt5BIJscn-Zylw10yMXydeQ8iTV8cEzhbKkNayssE7qGOIj24mOI1JuOT656tqhS3Kt8BvNabgiQOkR8tJn88XRR3RZ4zvG2vl283hSBoMkTSd1VshTqTAaBxlN1QUTDj0NFd09j1UvQZ4c"
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
    img.id = album.id;
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
        let artiste = dataJSON.artists[0].name;
        let titre = dataJSON.name;
        let tracklist = dataJSON.tracks.items;
        
        // afficher les informations sur l'album
        document.getElementById("disque").innerHTML = titre;
        document.getElementById("chanteur").innerHTML = artiste;
        document.getElementById("tracklist").innerHTML = ""; //reset de la tracklist
        for (let track of tracklist) {
            let li = document.createElement("li");
            //on insert un lien + audio pour chaque track
            li.innerHTML = `<a href="${track.external_urls.spotify}" target="_blank">${track.name}</a>` + `<br><audio id="audio" src= ${track.preview_url} controls>'Pas de preview'</audio>`;
            document.getElementById("tracklist").appendChild(li);
        }
      })
    .catch( (error) => console.log(error))
}