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
        console.log(panier)
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

/*** envoyer la variable dans le localstorage***/
localStorage.setItem("cart", JSON.stringify(panier)) /***JSON.stringify convertit les données au format objet javascript en JSON (envoyer la key "cart" au localstorage) ***/          
alert("le produit sera supprimé du panier");
window.location.href= "basket.html"
});
}
 /******************* le montant total du panier ***********************************/
/***Déclaration de la variable pour récupérer les prix des articles ***/
let prixTotal = [];

/*** recupérer les prix des articles ***/
for(let k= 0; k < panier.length; k++){
    let prixProduitsBasket = panier[k].price/ 100 * panier[k].quantity;

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

/*** Envoyer le prix Total au localStorage ***/

localStorage.setItem('prixTotal', JSON.stringify(totalCalcul));

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

const contact ={
    prenom: document.getElementById('firstName').value,
    nom: document.getElementById('lastName').value,
    email: document.getElementById('inputEmail4').value,
    adresse: document.getElementById('inputAddress').value,
    ville: document.getElementById('inputCity').value,

}
/*** la validation et controle du formulaire ***/
const monTextAlert = (values) =>{
    return `${values}: Les chiffres et les symboles ne sont pas autorisés. Minimum 3 caractéres et Maximum 20 caractères` 
}

/*** le regEx pour le prenom + le nom + la ville ***/
const regExPrenomNomVille =(value) =>{
/*** Caractère de début et de fin de l'expression régulière: ^ (deubt texte) $(fin texte) ***/
    return /^([A-Za-z]{3,20})?([-]{0,1})?([A-Za-z\s]{3,20})$/.test(value);
}

/*** le regEx pour l'email ***/
const regExEmail =(value) =>{
        return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(value);
    }
  
 /*** le regEx pour l'adresse ***/  

 const regExAdresse =(value) =>{
     return /^[A-Za-z-0-9\s]{10,50}$/.test(value);
 }
/*** le Controle de la validation du prenom***/
function prenomControle(){
const lePrenom = contact.prenom;
if(regExPrenomNomVille(lePrenom)){  
   return true;
}else{
       alert(monTextAlert("Prénom"))
       return false;
}
}
/*** Controle de la validation du nom***/
function nomControle(){
    const lenom = contact.nom;
    if(regExPrenomNomVille(lenom)){  
     
       return true;
    }else{
        alert(monTextAlert("Nom"))
           return false;
    }
    }
/*** Controle de la validation de l'email***/
function emailControle(){
    const leEmail = contact.email;
    if (regExEmail(leEmail)){  
       return true;
    }else{
        alert("l'email n'est pas valide")
           return false;
    }
    }

/*** Controle de la validation de l'adresse***/
function adresseControle(){
    const lAdresse = contact.adresse;
    if (regExAdresse(lAdresse)){  
       return true;
    }else{
        alert("l'adresse doit contenir que des chiffres et des lettres sans ponctuation")
           return false;
    }
    }
/*** Controle de la validation de la ville***/
function villeControle(){
    const laVille = contact.ville;
    if(regExPrenomNomVille(laVille)){        
       return true;
    }else{
        alert(monTextAlert("Ville"))
           return false;
    }
    }

/*** Mettre les valeurs du formulaire au localstorage***/
if(prenomControle() && nomControle()  && emailControle() && adresseControle() && villeControle() ){

localStorage.setItem("valeursFormulaire", JSON.stringify(contact));

}else{
    alert("Veuillez bien remplir le formulaire");

}
/*** mettre les valeurs et produits selectionnés dans un objet à envoyer vers le serveur ***/
const commandeClient ={
    panier,
    contact,
}
console.log(commandeClient)


/*** Appel de l'API et envoie des données de l'objet avec la méthode Post ***/
/*const sendCommande = async function (commande){
    try {
        const demandeServeur = await fetch("http://localhost:3000/api/teddies/order", {
            method: "POST",
            body: JSON.stringify(commande),
            headers: {"Content-Type": "application/json"}
        })
        if(demandeServeur.ok) {
            const commande = await demandeServeur.json()
            console.log(commande.orderId)
            localStorage.setItem("commande", commande.orderId)
            window.location = "confirmation.html"
        
        } else {
            event.preventDefault()
           alert("le serveur ne répond pas")
        } 
    } catch (error) {
        alert("commande non envoyer, merci de bien remplir le formulaire ")
    } 
}
sendCommande(commandeClient)**/

 fetch('http://localhost:3000/api/teddies/order', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',  
      'content-type': "application/json"
    },
    body: JSON.stringify(commandeClient),
 })
 
 .then(response => response.json()) 
 .then (function(retour){
    localStorage.setItem("commande", JSON.stringify(retour.commande));
    window.location.href("confirmation.html?orderId=" + retour.orderId);
 })
  .catch(function (error) {
    alert("commande non envoyer, merci de bien remplir le formulaire ")
});
 })



