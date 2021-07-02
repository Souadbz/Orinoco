/*** recupération du prix total de la commande ***/
let prixTotal = JSON.parse(localStorage.getItem("prixTotal"));

/*** recupération des informations du formulaire ***/

let valeursFormulaire = JSON.parse(localStorage.getItem("valeursFormulaire"));
/*** récupération de l'id de la commande */
let orderId = JSON.parse(localStorage.getItem("commande"))
/*** Ajout de la partie html ***/
const confirmation = document.getElementById("confirmation")
confirmation.innerHTML += `
<h1>Merci ${valeursFormulaire.prenom } ${valeursFormulaire.nom}  pour votre confiance</h1>
<p>Nous avons bien reçu votre commande N° ${orderId} d'un montant de :${prixTotal}.00€</p>
   <p>Pour suivre la préparation de votre commande rendez-vous sur votre compte <strong>Orinoco.com</strong></p>
   <p>Un récapitulatif de commade vous a été envoyé par email à votre adresse email ${valeursFormulaire.email}</p>
   <br>Merci pour votre fidélité et à très vite sur votre <strong>Orinoco.com</strong><br/>L'équipe Orinoco</p> `

 