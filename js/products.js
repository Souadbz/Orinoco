/*** Récupération de l'id dans l'url ***/
const recoverUrlId = window.location.search;
console.log(recoverUrlId);

/**Extraire l'id**/
const urlSearchParams = new URLSearchParams(recoverUrlId);
console.log(urlSearchParams)

let id = urlSearchParams.get("id");
console.log(id); 

/*** Sélectionner La partie html où les produits seront affichés***/
 const affichageProduits = document.getElementById("container-products");

 /*** Création de la page pour afficher les produits après l'appel Api ***/
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
    <label for="choix-colors">Choisir la couleur : </label>
      <select name="choix-colors" id="choix-colors" class="choix">
    </select></br>
    <label for ="quantity">Quantité :</label>
       <select id="quantity" class="form-select mb-3" aria-label="Quantité">
             <option value="1">1</option>
             <option value="2">2</option>
             <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
        </select>
   </form>
     <button id="ajout" id_product="${teddy._id}" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#myModal">ajouter au panier</button>
    </div> 
    </div>` 
    /*** Boucle pour récuperer les choix de couleurs ***/   
    for (let colors of teddy.colors){
      document.getElementById('choix-colors').innerHTML +=
      `<option value="colors">${colors}</option>`
    } 

}; 
/*** Appel Api pour récupèrer les données par le id **/
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
/**appel de la fonction et affichage du produit **/
getTeddy();

/************************** Localstorage et panier ******************************************************/

/*** si le localStorage ne contient pas des produits ***/
if (localStorage.getItem("cart") === null) {
  var panier = [];
} else {
  /*** Si le localStorage existe déjà et contient des produits ***/
  var panier = localStorage.getItem("cart");
      panier = JSON.parse(panier);    /*** JSON.parse convertit les données au format JSON en Objet javascript ***/                    
}
 /*** Selection du bouton***/
 let ajout = document.querySelector("button");
console.log(ajout)
/*** Ecouter le bouton et envoyer le(les) produit (s)au localstorage ***/
ajout.addEventListener("click", function (){
  let quantity = document.getElementById("quantity").value
  let id_product = document.getElementById("ajout").getAttribute("id_product");
  /*** On crée un objet correspondant au produit ***/
  let teddy = {};
  teddy.id_product = id_product,
  teddy.quantity = quantity
 
  /** On insère l'objet dans le localStorage ***/
  panier.push(obj);
  localStorage.setItem("cart", JSON.stringify(panier)) /***JSON.stringify convertit les données au format objet javascript en JSON ***/          
  /*** On vérifie que le panier s'affiche comme on s'y attend ***/
  console.log(panier);
  console.log(localStorage.getItem("cart"));
});