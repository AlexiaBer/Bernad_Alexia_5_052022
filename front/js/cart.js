function getCart(){
  let cart = localStorage.getItem("cart");
    if (cart == null) {
       return [];
    } else {
       return JSON.parse(cart);
    }
   }

  function showCart() {

    fetch("http://localhost:3000/api/products/")
    .catch(error => console.log(error))
    .then(data => data.json())
    .then(data => {
      console.log(data);
      let cart = getCart();
      let contentHtml = "";
      for (product of cart) {
        console.log (cart);
        let productMatchesWCatalogue = data.find(el => el._id == product.id)
        if (productMatchesWCatalogue) {
          product.price = productMatchesWCatalogue.price
          contentHtml += `           
          <article class="cart__item" data-id="${productMatchesWCatalogue._id}" data-color="${productMatchesWCatalogue.color}">
          <div class="cart__item__img">
            <img src="${productMatchesWCatalogue.imageUrl}" alt="${productMatchesWCatalogue.altTxt}">
          </div>
          <div class="cart__item__content">
            <div class="cart__item__content__description">
              <h2>${productMatchesWCatalogue.name}</h2>
              <p>${product.color}</p>
              <p>${productMatchesWCatalogue.price} €</p>
            </div>
            <div class="cart__item__content__settings">
              <div class="cart__item__content__settings__quantity">
                <p>Qté : </p>
                <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${product.quantity}">
              </div>
              <div class="cart__item__content__settings__delete">
                <p class="deleteItem">Supprimer</p>
              </div>
            </div>
          </div>
          </article> 
          ` 
          }

      document.getElementById("cart__items").innerHTML = contentHtml;

      }
    })

  }

  showCart();


let removeCartItemButton = document.getElementsByClassName('deleteItem')
for (let i = 0; i < removeCartItemButton.length; i++) {
  let button = removeCartItemButton[i]
  button.addEventListener("click", function() {
    console.log("clicked")
  } )
}
    /** 
   getCart();

    for(let LsArticleChosen of cart) { //boucle qui parcourt le tableau et pour chaque case du tableau créera une variable "articleChosen"
      
      fetch("http://localhost:3000/api/products/" + articleChosen.id)
         .catch(error => console.log(error))
         .then(data => data.json())
         
         .then (ApiProduct => {
            for (let ApiProductCategory of ApiProduct) { 
          // réponse, qui renvoie une promise

      document.getElementById("cart__items").innerHTML +=             // ça devrait être sur la boucle du CART et non pas de l'API !
                                                  `           
                                                  <article class="cart__item" data-id="{product-ID}" data-color="{product-color}">
                                                  <div class="cart__item__img">
                                                    <img src="${ApiProductCategory.imageUrl}" alt="${ApiProductCategory.altTxt}">
                                                  </div>
                                                  <div class="cart__item__content">
                                                    <div class="cart__item__content__description">
                                                      <h2>${ApiProductCategory.name}</h2>
                                                      <p>${LsArticleChosen.color}</p>
                                                      <p>${ApiProductCategory.price} €</p>
                                                    </div>
                                                    <div class="cart__item__content__settings">
                                                      <div class="cart__item__content__settings__quantity">
                                                        <p>Qté : </p>
                                                        <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${LsArticleChosen.quantity}">
                                                      </div>
                                                      <div class="cart__item__content__settings__delete">
                                                        <p class="deleteItem">Supprimer</p>
                                                      </div>
                                                    </div>
                                                  </div>
                                                  </article> 
                                                  ` 
         }
         )
      }
   }
*/
  