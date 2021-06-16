/*** Récupération de l'id dans l'url ***/
const recoverUrlId = window.location.search;
console.log(recoverUrlId);

/**Extraire l'id**/
const urlSearchParams = new URLSearchParams(recoverUrlId);
console.log(urlSearchParams)

let id = urlSearchParams.get("id");
console.log(id); 

  /*** création de la page ***/
 const affichageProduits = document.getElementById("container-products");

 const affichageListeProduits = teddy =>{
    affichageProduits.innerHTML += 
    `<div class= "card">
    <img src=${teddy.imageUrl} alt="ours en peluche" class="card-img-top"/>
    <div class="card-body">
     <h3 class='card-title'> ${teddy.name}</h3>
     <p class='card-text'>${teddy.description}</p>
     <div class="card-price-star">
        <span class='card-price'>${teddy.price / 100}.00€</span>
        <span class="star-blue"><i class="fas fa-star"></i></span>
        <span class="star-blue"><i class="fas fa-star"></i></span>
        <span class="star-blue"><i class="fas fa-star"></i></span>
        <span class="star-blue"><i class="fas fa-star"></i></span>
        <span class="star-blue"><i class="fas fa-star"></i></span>
     </div>
    <form>
     <select id ="choix-colors">
     <option>Couleur</option>
   </select></br></br>
   </form>
     <a href="./basket.html" class="btn btn-primary">ajouter au panier</a>
    </div> 
    </div>`  
    for (let colors of teddy.colors){
      document.getElementById('choix-colors').innerHTML+=
      `<option value="colors">${colors}</option>`
    } /*** Boucle pour récuperer les couleurs ***/  

}; 
/*** ***/
/*** Appel Api pour récupèrer les données par le id ***/
const getTeddy = async function() {
     let response = await fetch('http://localhost:3000/api/teddies/' + id);
     if (response.ok) {
         let teddy = await response.json();
         affichageListeProduits(teddy)}
         else{
          console.error("la liste des produits en vente est temporairement indisponible");
          alert("la liste des produits en vente est temporairement indisponible")
         }
   }
   /*** appel de la fonction ***/
  getTeddy();