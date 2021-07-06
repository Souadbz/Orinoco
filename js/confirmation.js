/*** récupération de l'id de la commande ***/

const commande = localStorage.getItem("commande")

/*** recupération du prix total de la commande ***/

let prixTotal = JSON.parse(localStorage.getItem("prixTotal"));

/*** recupération des informations du formulaire ***/

let contact = JSON.parse(localStorage.getItem("contact"));

/*** Ajout de la partie html ***/
const confirmation = document.getElementById("confirmation")
confirmation.innerHTML += `
<h1>Merci ${contact.firstName } ${contact.lastName} pour votre confiance</h1>
<p>Nous avons bien reçu votre commande <strong>N° ${commande}</strong> d'un montant de : <strong>${prixTotal}.00€</strong></p>
   <p>Pour suivre la préparation de votre commande rendez-vous sur votre compte <strong>Orinoco.com</strong></p>
   <p>Un récapitulatif de commande vous a été envoyé à votre adresse email<strong> ${contact.email}</strong></p>
   <br>Merci pour votre fidélité et à très vite sur <strong>Orinoco.com</strong><br/>L'équipe Orinoco</p> `

/*** On vide le localstorage et le panier ***/
   localStorage.clear()
 