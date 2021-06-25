/*** Sélectionner La partie html où les produits seront affichés***/
const affichageTeddies = document.getElementById("section-produits");

/*** Appel Api avec Fetch ***/
  fetch("http://localhost:3000/api/teddies")
    .then(response => response.json())           /*** récuperer les données au format JSON ***/
    .then(function (listeTeddies) {
        for (let teddy of listeTeddies) {         
            affichageListeTeddies(teddy);
        }        /*** La boucle "for...of" nous permet de récuperer les données dans l'ordre ***/
    })
    /*** Si Problème Api ***/
    .catch(function (error) {
        alert("la liste des produits en vente est temporairement indisponible")
    });
     
    /*** Création de la page pour afficher les produits après l'appel Api ***/
    const affichageListeTeddies = teddy => {
      affichageTeddies.innerHTML += 
      `<div class= "card">
        <img src=${teddy.imageUrl} alt="ours en peluche" class="card-img-top"/>
       <div class="card-body">
         <h3 class='card-title'>${teddy.name}</h3>
         <p class='card-text'>${teddy.description}</p>
         <div class="card-price-star">
            <span class='card-price'>prix: ${teddy.price / 100}.00€</span>
            <span class="star-blue"><i class="fas fa-star"></i></span>
            <span class="star-blue"><i class="fas fa-star"></i></span>
            <span class="star-blue"><i class="fas fa-star"></i></span>
            <span class="star-blue"><i class="fas fa-star"></i></span>
            <span class="star-blue"><i class="fas fa-star"></i></span>
         </div>
         <a href="./products.html?id=${teddy._id}" class="btn btn-primary" aria-label="Bouton Accès page produits"> En savoir plus</a>
        </div> 
       </div>`     
  };
 