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
  <img src=${teddy.imageUrl} alt="ours en peluche" id ="img-teddy" class="card-img-top"/>
  <div class="card-body">
   <h3 class='card-title'id="card-name" productName="${teddy.name}">${teddy.name}</h3>
   <p class='card-text'>${teddy.description}</p>
   <div class="card-price-star">
      <span class='card-price' price='${teddy.price}'>${teddy.price / 100}.00€</span>
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
   <button id="ajout" id_product="${teddy._id}" class="btn btn-primary" type ="submit" data-bs-toggle="modal" data-bs-target="#myModal">ajouter au panier</button>
  </div> 
  </div>` 
  /*** Boucle pour récuperer les choix de couleurs ***/   
  for (let colors of teddy.colors){
    document.getElementById('choix-colors').innerHTML +=
    `<option value="${colors}">${colors}</option>`          
  }; 

  /************************** Localstorage et panier ******************************************************/
/*** si le localStorage contient ou pas des produits ***/
let panier = JSON.parse(localStorage.getItem("cart")) || []; /*** JSON.parse convertit les données au format JSON en Objet javascript ***/                    
  
/*** Selection du bouton***/
let ajout = document.getElementById("ajout");
ajout.addEventListener('click', function(){

 let quantity = parseInt(document.getElementById('quantity').value);
 let id_prod = document.getElementById("ajout").getAttribute("id_product");
 let imageUrl = document.getElementById("img-teddy").getAttribute("src");
 let productName = document.getElementById("card-name").getAttribute('productName');
 let price = document.querySelector(".card-price").getAttribute('price');
 let colors= document.getElementById('choix-colors').value;
 
 /*** On crée un objet ***/

 var teddyObjet = {};
 teddyObjet.id = id_prod;
 teddyObjet.image = imageUrl;
 teddyObjet.name = productName;
 teddyObjet.quantity = quantity; 
 teddyObjet.price = price;
 teddyObjet.colors = colors


/** On insère l'objet dans le localStorage ***/
panier.push(teddyObjet);
/***JSON.stringify convertit les données au format objet javascript en JSON (envoyer la key "cart" au localstorage) ***/          
localStorage.setItem("cart", JSON.stringify(panier)) 

/*** On vérifie que le panier s'affiche comme on s'y attend ***/
console.log(panier);
console.log(localStorage.getItem("cart"));


/*** Ajout de la fenêtre pop-up */
const confirmation =()=>{
  if(window.confirm(`${teddy.name} a bien été ajouté au panier! Vous pouvez consulter le panier OK ou revenir à l'acceuil ANNULER`)){
  window.location.href = "basket.html";
    }else{
       window.location.href= "index.html";
    }
}
confirmation();
 });    
}

 
/*** Appel Api pour récupèrer les données par le id **/
const getTeddy = async function() {
try{ let response = await fetch('http://localhost:3000/api/teddies/' + id);  
 if (response.ok) {
     let teddy = await response.json();
     affichageListeProduits(teddy)}
     else{
      console.error("la liste des produits en vente est temporairement indisponible");
      alert("la liste des produits en vente est temporairement indisponible")
     }
} 
catch (e) {
console.log(e);
}
}
/**appel de la fonction et affichage du produit **/
getTeddy();
