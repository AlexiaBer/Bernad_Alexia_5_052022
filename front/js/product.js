//PREMIERE PARTIE DU CODE : REMPLIR LA PAGE PRODUIT AVEC LES INFOS PRODUIT

const articleId = getArticleId(); // Je crée une variable qui contiendra l'id du produit 

function getArticleId() {
   return new URL(location.href).searchParams.get("id")  // pour récupérer l'id de la fenêtre actuelle
}

fetch(`http://localhost:3000/api/products/${articleId}`)
   .catch(error => console.log(error))
   .then(data => data.json())
   .then(productInfo => {      // productInfo = pas le nom de la fonction, c'est une variable. Ce sont mes canapés. Je vais ensuite les afficher
    console.log(productInfo); 
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
   addToCartButton.addEventListener("click", addToCart => {
      let cart = getCart();
      let quantity = document.getElementById("quantity");
      //let selectedColor = document.getElementBy productInfo.colors.value;
      let selectColor = document.getElementById("colors");
      let selectedColor = selectColor.options[selectColor.selectedIndex].value;
     // let selectedColor = selectColor.options[selectColor.selectedIndex].value;
      cart.push(articleId,selectedColor,quantity.value);
      saveCart(cart);
   }
   
   );
