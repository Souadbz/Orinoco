let panier = JSON.parse(localStorage.getItem("cart")); /*** JSON.parse convertit les données au format JSON en Objet javascript ***/
/*** Affichage des produits ***/

/*** Sélecionner la partie html **/
const allProductsBasket = document.getElementById("container-products-basket");
let productsBasket= document.getElementById("productsBasket");

/*** verifier si le panier est vide ***/
if(panier == null || panier.length === 0){
    const basketEmpty =
    `<div>
        <p class="basket-empty"> Votre panier est vide </p>
    </div>`;
    allProductsBasket.innerHTML = basketEmpty;
    
    }
        /*** le panier contient des produits: creation de la partie panier ***/
    else{
        let produitsPanier =[];
        panier.forEach((teddy)=>{
        productsBasket.innerHTML +=
        `<tr>  
        <td>${teddy.name}</td>   
        <td>${teddy.quantity}</td>
        <td id="price">${teddy.price / 100}.00€</td>
        <td><button id="btn-supprimer">supprimer</button></td>
        <td id="total">${teddy.quantity * teddy.price / 100}.00€</td>
        </tr> `; 
           
          /*** affichage des produits**/
       
          for(let i=0; i<teddy.quantity; i++){
            produitsPanier.push(teddy.id)
            }
     })   
 } 
 /*** Ajout d'un bouton pour supprimer le(s) produits***/

let buttonSupprimer = document.querySelectorAll('#btn-supprimer');
console.log(buttonSupprimer);

/*** boucle for pour récupérer les produits et écouter le bouton au click ***/
for(let j = 0; j< buttonSupprimer.length; j++ ){
buttonSupprimer[j].addEventListener("click", (event) =>{
event.preventDefault();

/*** Sélection du produit par son id et sa suppression ***/

let idButtonSupprimer = panier[j].quantity;
console.log(idButtonSupprimer)
/*** la methode filter pour supprimer les produits selectionnés lors du clic sur le bouton et garder les autres produits non selectionnés */

panier = panier.filter(element=> element.quantity !== idButtonSupprimer)
console.log(panier)
/*** envoyer la variable dans le localstorage***//***JSON.stringify convertit les données au format objet javascript en JSON (envoyer la key "cart" au localstorage) ***/          
 localStorage.setItem("cart", JSON.stringify(panier)) 
 alert("le produit sera supprimé du panier");
 window.location.href= "basket.html"
});
 }
 /*** le montant total du panier ***/
/***Déclaration de la variable pour récupérer les prix des articles ***/
let prixTotal = [];

/*** recupérer les prix des articles ***/
for(let k= 0; k < panier.length; k++){
    let prixProduitsBasket = panier[k].price/ 100;

/*** Mettre les prix du panier dans la variable "prixTotal" ***/
prixTotal.push(prixProduitsBasket);
}
/*** Additionner les prix du tableau avec la méthode reduce***/

const reducer = (accumulator, currentValue) => accumulator + currentValue;
const totalCalcul = prixTotal.reduce(reducer,0);

/*** Afficher le prix final */
const affichagePrixFinal =
`<div id='prix-final'>
le montant total est de : ${totalCalcul}.00 €
</div>`

productsBasket.insertAdjacentHTML("beforeend", affichagePrixFinal)

 /***  Selection du bouton pour vider le panier***/
let viderBasket = document.getElementById('viderBasket')
viderBasket.addEventListener('click',  deleteBasket);

/***  Vider le panier***/
function deleteBasket() {
  if (panier == null) {
  } else {
    allProductsBasket.remove();
    localStorage.clear();
    window.location.reload();
  }
};

/************************ La gestion du formulaire ******************/

/*** Sélection du bouton "valider ma commande" ***/

const btnValiderMaCommande = document.getElementById("validerMaCommande");

/*** Ecouter le bouton ***/
btnValiderMaCommande.addEventListener('click', (event)=>{
event.preventDefault();

/*** Mettre les valeurs du formulaire dans un objet ***/

/*** Récupérer les valeurs du formulaire***/

const valeursFormulaire ={
    prenom: document.getElementById('firstName').value,
    nom: document.getElementById('lastName').value,
    email: document.getElementById('inputEmail4').value,
    adresse: document.getElementById('inputAddress').value,
    ville: document.getElementById('inputCity').value,

}
/*** Mettre les valeurs du formulaire au localstorage  ***/
localStorage.setItem("valeursFormulaire", JSON.stringify(valeursFormulaire));

/*** mettre les valeurs et produits selectionnés dans un objet à envoyer vers le serveur ***/

const valeursFormulaireEnvoyer ={
    panier,
    valeursFormulaire,
}
console.log(valeursFormulaireEnvoyer)

})


