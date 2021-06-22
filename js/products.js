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
     <a href="./basket.html"><button id="ajout" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#myModal">ajouter au panier</button></a>
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

  
  /*** selection du bouton ***/
  let ajout = document.querySelector("button");
console.log(ajout)

  
     /*** Le localStorage ***/
/*** Déclarer la variariable contenant les clés et valeurs pour récupérer l'objet dans le localstorage***/
let teddyLocalStorage = JSON.parse(localStorage.getItem("produitsLocalStorage")); /*** JSON.parse convertit les données au format JSON en Objet javascript ***/
/** s'il y a des produits dans le localstorage ***/
if (localStorage.getItem("produitsLocalStorage")){
  teddyLocalStorage= [];
}
/*** s'il n'ya pas de produits dans le localstorage ***/
else {
  let basketInit =[];
  localStorage.setItem("produitsLocalStorage", JSON.stringify(basketInit));   /***JSON.stringify convertit les données au format objet javascript en JSON ***/
  }

/*** LE PANIER ***/
/**ecouter le bouton et envoyer du(des) produit (s)au panier */
ajout.addEventListener("click", function (event){
  event.preventDefault();  
  const ajoutBasket =  getTeddy();
  teddyLocalStorage.push(ajoutBasket);
  localStorage.setItem("produitsLocalStorage", JSON.stringify(teddyLocalStorage)); /*** transformation en format JSON  et l'envoyer dans la key produitsLocalStorage du localstorage ***/
  alert(" le produit a été ajouté au panier")
  location.reload();
}); 


