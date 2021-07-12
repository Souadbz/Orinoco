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
/************************* Appel Api avec Fetch ******************/
/*** appel API pour récupérer tout les teddies ***/
function getTeddiesProducts() {
  fetch("http://localhost:3000/api/teddies")
    .then(async response => {
      /*** récuperer les données au format JSON ***/
      const productsList = await response.json();
      productsList.forEach(teddy => {
        affichageListeTeddies(teddy)

      }) /*** la fonction forEach permet de récuperer les données du array dans l'ordre ***/
    })
    /*** Si Problème Api ***/
    .catch(error => {
      console.log('les produits ne sont pas disponible')
    })

}
/*** Appel de la fonction et affichage des produits  ***/
getTeddiesProducts()