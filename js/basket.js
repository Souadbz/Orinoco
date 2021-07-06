/*const { allowedNodeEnvironmentFlags } = require("process");*/

let panier = JSON.parse(localStorage.getItem("cart")); /*** JSON.parse convertit les données au format JSON en Objet javascript ***/

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
        <td id="colors">${teddy.colors}</td>
        <td><button id="btn-supprimer">supprimer</button></td>
        <td id="total">${teddy.quantity * teddy.price / 100}.00€</td>
        </tr> `; 
           
          /*** affichage des produits**/
       
          for(let i=0; i<panier.length; i++){
            produitsPanier.push(teddy)
            }
            
     })   
 } 
 
/*** Ajout d'un bouton pour supprimer le(s) produits***/

let buttonSupprimer = document.querySelectorAll('#btn-supprimer');

/*** boucle for pour récupérer les produits et écouter le bouton au click ***/
for(let j = 0; j< buttonSupprimer.length; j++ ){
buttonSupprimer[j].addEventListener("click", (event) =>{
event.preventDefault();

/*** Sélection du produit par sa couleur et sa suppression ***/

let idButtonSupprimer = panier[j].colors;
console.log(idButtonSupprimer)
/*** la methode filter pour supprimer les produits selectionnés lors du clic sur le bouton et garder les autres produits non selectionnés */

panier = panier.filter(element=> element.colors !== idButtonSupprimer)

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
Montant total : ${totalCalcul}.00€
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


/*** la validation et controle du formulaire ***/
const monTextAlert = (values) =>{
    return `${values}: Les chiffres et les symboles ne sont pas autorisés. Minimum 3 caractéres et Maximum 20 caractères` 
}

/*** le regEx pour le prenom + le nom + la ville ***/
function regExPrenomNomVille(value){
/*** Caractère de début et de fin de l'expression régulière: ^ (deubt texte) $(fin texte) ***/
    return /^([A-Za-z]{3,20})?([-]{0,1})?([A-Za-z\s]{3,20})$/.test(value);
}

/*** le regEx pour l'email ***/
function regExEmail(value){
        return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(value);
    }
  
 /*** le regEx pour l'adresse ***/  
 function regExAdresse(value){
     return /^[A-Za-z-0-9\s]{10,50}$/.test(value);
 }
/*** le Controle de la validation du prenom***/

const lePrenom = document.getElementById('firstName')
lePrenom.addEventListener("change", function(e){ 
if(regExPrenomNomVille(lePrenom.value)){  
    return true;
 }else{
        alert(monTextAlert("Prénom"))
        return false;
 }
 })
/*** Controle de la validation du nom***/

const leNom = document.getElementById('lastName')
leNom.addEventListener("change", function(e){ 
if(regExPrenomNomVille(leNom.value)){  
    return true;
 }else{
        alert(monTextAlert("Nom"))
        return false;
 }
 })

/*** Controle de la validation de l'email***/
const leEmail = document.getElementById('inputEmail4')
leEmail.addEventListener("change", function(e){ 
if(regExEmail(leEmail.value)){  
    return true;
 }else{
        alert("l'email n'est pas valide")
        return false;
 }
 })

/*** Controle de la validation de l'adresse***/
const lAdresse = document.getElementById('inputAddress')
lAdresse.addEventListener("change", function(e){ 
if(regExAdresse(lAdresse.value)){  
    return true;
 }else{
    alert("l'adresse doit contenir que des chiffres et des lettres sans ponctuation")
        return false;
 }
 })
/*** Controle de la validation de la ville***/

const laVille = document.getElementById('inputCity')
laVille.addEventListener("change", function(e){ 
if(regExPrenomNomVille(laVille.value)){  
    return true;
 }else{
        alert(monTextAlert("Ville"))
        return false;
 }
 })
 /*** Selectionner le id du (des) produit(s) ***/
 
 let products = [];
 for(teddy of panier){
const productsId = teddy.id;
products.push(productsId)
 }
console.log(products)
/***JSON.stringify convertit les données au format objet javascript en JSON (créer la key "products" pour le localstorage) ***/          
localStorage.setItem("products", JSON.stringify(products)) 
 console.log(products)
/*** Sélection du bouton "valider ma commande" ***/
const btnValiderMaCommande = document.getElementById("validerMaCommande");
/*** Ecouter le bouton ***/
btnValiderMaCommande.addEventListener('click', (event)=>{
event.preventDefault();

/*** Mettre les valeurs du formulaire dans un objet à envoyer vers le serveur ***/
let contact = {
    firstName : lePrenom.value,
    lastName : leNom.value,
    address : lAdresse.value,
    city: laVille.value,
    email : leEmail.value,
};console.log(contact)


/*** Mettre les valeurs du formulaire au localstorage***/

    if(regExPrenomNomVille(lePrenom.value) && regExPrenomNomVille(leNom.value)  && regExEmail(leEmail.value) && regExAdresse(lAdresse.value) && regExPrenomNomVille(laVille.value) ){

        localStorage.setItem("contact", JSON.stringify(contact));
          
        }else{
            alert("Veuillez bien remplir le formulaire");
        
        }
/*** Récupérer les valeurs du formulaire et le(s) produit(s) du panier***/
        let commandeClient = JSON.stringify({
            products,
            contact,
        })
        console.log(commandeClient)
/*** Appel de l'API et envoie des données de l'objet avec la méthode Post ***/

let sendOrder = fetch('http://localhost:3000/api/teddies/order', {
    method: "POST",
    body: commandeClient,
    headers: {
      'Accept': 'application/json', 
      'content-type': "application/json"
    },
   
    })
    console.log(sendOrder)
    sendOrder.then(async(response)=>{
    try{
        const contenu= await response.json();
        console.log(contenu);

        if(response.ok){
             /*** récuperer l'id de la response et le mettre dans le localstorage ***/
             console.log(contenu.orderId)
             localStorage.setItem("commande", contenu.orderId);
             window.location.href= "confirmation.html"
        }
        else{
            alert("problème avec le serveur")
        }
    }
    catch(error){
        alert("commande non envoyer, merci de bien remplir le formulaire ") 
    }
})
})
