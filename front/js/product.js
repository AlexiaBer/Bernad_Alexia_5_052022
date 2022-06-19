//PREMIERE PARTIE DU CODE : REMPLIR LA PAGE PRODUIT AVEC LES INFOS PRODUIT

let articleId = getArticleId(); // Je crée une variable qui contiendra l'id du produit 

function getArticleId() {
   return new URL(location.href).searchParams.get("id")  
}

fetch(`http://localhost:3000/api/products/${articleId}`)
   .catch(error => console.log(error))
   .then(data => data.json())
   .then(productInfo => {      
      document.getElementsByClassName("item__img")[0].innerHTML = `<img src="${productInfo.imageUrl}" alt="${productInfo.altTxt}">`
      document.getElementById("title").innerText = `${productInfo.name}`
      document.getElementById("price").innerText = `${productInfo.price}`
      document.getElementById("description").innerText = `${productInfo.description}` 

      for (let i = 0; i < productInfo.colors.length; i++) {
         document.getElementById("colors").innerHTML += `
         <option value="">${productInfo.colors[i]}</option>`
      }
   })
// FIN DE LA PREMIERE PARTIE DU CODE.

// DEUXIEME PARTIE DU CODE : L'AJOUT AU PANIER (localStorage)

//fonction pour enregistrer/màj le panier dans le LS
   function saveCart(cart){
      localStorage.setItem("cart", JSON.stringify(cart));
   }

//fonction pour récupérer le panier dans le LS
   function getCart(){
      let cart = localStorage.getItem("cart");
      if (cart == null) {
         return [];
      } else {
         return JSON.parse(cart);
      }
   }
    
   let addToCartButton = document.getElementById("addToCart"); 

//pour ajouter le produit dans le cart (localStorage)
   addToCartButton.addEventListener("click", function() {

      let cart = getCart();
      let quantity = document.getElementById("quantity");
      let selectColor = document.getElementById("colors");
      let selectedColor = selectColor.options[selectColor.selectedIndex].text;
      let productChosen = {"id" : articleId, "color" : selectedColor, "quantity" : quantity.value};
      let idAndColorAlreadyInCart = cart.findIndex(prod => prod.id == productChosen.id && prod.color == productChosen.color);
      if(idAndColorAlreadyInCart != -1) { 
         let newQuantity = parseInt(productChosen.quantity) + parseInt(cart[idAndColorAlreadyInCart].quantity);
         let updatedProduct = {"id" : articleId, "color" : selectedColor, "quantity" : newQuantity};
         cart.splice(idAndColorAlreadyInCart, 1, updatedProduct)
         saveCart(cart) 
      } else if (productChosen.quantity == 0 || productChosen.color == "--SVP, choisissez une couleur --") {
         addToCartButton.disabled = true;
      }
      else {
         cart.push(productChosen);
    }
       saveCart(cart)
})