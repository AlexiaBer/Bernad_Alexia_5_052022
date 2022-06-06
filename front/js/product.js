//PREMIERE PARTIE DU CODE : REMPLIR LA PAGE PRODUIT AVEC LES INFOS PRODUIT

let articleId = getArticleId(); // Je crée une variable qui contiendra l'id du produit 

function getArticleId() {
   return new URL(location.href).searchParams.get("id")  // pour récupérer l'id de la fenêtre actuelle
}

fetch(`http://localhost:3000/api/products/${articleId}`)
   .catch(error => console.log(error))
   .then(data => data.json())
   .then(productInfo => {      // productInfo = pas le nom de la fonction, c'est une variable. Ce sont mes canapés. Je vais ensuite les afficher
      document.getElementsByClassName("item__img")[0].innerHTML += `<img src="${productInfo.imageUrl}" alt="${productInfo.altTxt}">`
      document.getElementById("title").innerHTML += `${productInfo.name}`
      document.getElementById("price").innerHTML += `${productInfo.price}`
      document.getElementById("description").innerHTML += `${productInfo.description}` 

      for (let i = 0; i < productInfo.colors.length; i++) {
         document.getElementById("colors").innerHTML += `
         <option value="">${productInfo.colors[i]}</option>`
      }
   })
// FIN DE LA PREMIERE PARTIE DU CODE.

// DEUXIEME PARTIE DU CODE : L'AJOUT AU PANIER (localStorage)

   function saveCart(cart){
      localStorage.setItem("cart", JSON.stringify(cart));
   }

   function getCart(){
      let cart = localStorage.getItem("cart");
      if (cart == null) {
         return [];
      } else {
         return JSON.parse(cart);
      }
   }
    
   let addToCartButton = document.getElementById("addToCart"); // Je récup l'élément sur lequel je veux détecter le clic
   addToCartButton.addEventListener("click", () => {
      let cart = getCart();
      let quantity = document.getElementById("quantity");
      let selectColor = document.getElementById("colors");
      let selectedColor = selectColor.options[selectColor.selectedIndex].text;
      let productChosen = {"id" : articleId, "color" : selectedColor, "quantity" : quantity.value};
      let idAndColorAlreadyInCart = cart.findIndex(prod => prod.id == productChosen.id && prod.color == productChosen.color);//.find permet de chercher un élément dans le tableau : y a-t-il dans le panier des produits (prod) qui ont le même id que le produit que je viens d'ajouter(product)
      console.log ("index du produit déjà présent dans le LS : " + idAndColorAlreadyInCart);
      if(idAndColorAlreadyInCart != -1) { 
         let newQuantity = parseInt(productChosen.quantity) + parseInt(cart[idAndColorAlreadyInCart].quantity);
         console.log("newQuantity : " + newQuantity);
         let updatedProduct = {"id" : articleId, "color" : selectedColor, "quantity" : newQuantity};
         console.log("updateProduct : " + updatedProduct);
         cart.splice(idAndColorAlreadyInCart, 1, updatedProduct)
         saveCart(cart) 
      } else {
         cart.push(productChosen); // cart est un tableau, et donc en faisant .push : on ajoute un product.
    }
       saveCart(cart) // on enregistre le nouveau panier
  }
  
   );
