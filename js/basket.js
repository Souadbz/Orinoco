/*** Récupérer les objets du localstorage ***/

let teddyLocalStorage = JSON.parse(localStorage.getItem("produitsLocalStorage")); /*** JSON.parse convertit les données au format JSON en Objet javascript ***/

/*** Sélecionner la partie html */
const eltBasket = document.getElementById("container-products-basket");
console.log(eltBasket);
const productsBasket= document.getElementById("productsBaskt")

/*** verifier si le panier est vide ***/
if(teddyLocalStorage === null){
    eltBasket.innerHTML= `<p>le panier est vide</p>`
}
/*** si le panier n'est pas vide ***/
else{
    for(let i=0; i<teddyLocalStorage.length; i++){
        teddyLocalStorage.forEach((teddy) =>{
            productsBasket.innerHTML +=
            ` <tr>
            <td><img src=${teddy.imageUrl} alt="image de l'ours en peluche" /></td>
            <td>${teddy.name}</td>
            <td>${teddy.quantity}</td>
            <td>${teddy.price / 100} €</td>
            <td><a href="#" data-id="${i}"><i class="fas fa-times"></i></i></a></td>
            <td >${teddy.quantity * teddy.price / 100} €</td>
        </tr>`

        });
    }
    
}


/*** Calcul du montant finalet affichage sur la partie html***/
let basketPrice = 0;
teddyLocalStorage.forEach((teddyLocalStorage) => {
    basketPrice += teddyLocalStorage.price * teddy.quantity /100;
});