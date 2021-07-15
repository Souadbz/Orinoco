/*** Sélectionner La partie html où les produits seront affichés***/
const affichageTeddies = document.getElementById("section-produits");

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
         <a href="./product.html?id=${teddy._id}" class="btn btn-primary" aria-label="Bouton Accès page produits"> En savoir plus</a>
        </div> 
       </div>`
};
/************************* Appel Api avec Fetch  pour récupérer les teddies  ******************/
function getTeddiesProducts() {
  fetch("http://localhost:3000/api/teddies")
    .then(response => response.json()) /*** récuperer les données au format JSON ***/
    .then(function (productslist) {
      for (let teddy of productslist) {
        affichageListeTeddies(teddy);
      } /*** La boucle "for...of" nous permet de récuperer les données dans l'ordre ***/
    })
    /*** Si Problème Api ***/
    .catch(function (error) {
      console.log("la liste des produits en vente est temporairement indisponible")
    });
}
/*** Appel de la fonction et affichage des produits  ***/
getTeddiesProducts()