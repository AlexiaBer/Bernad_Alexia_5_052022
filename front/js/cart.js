
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
      let cart = getCart();
      let contentHtml = "";
      for (let product of cart) {
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
      }
      document.getElementById("cart__items").innerHTML = contentHtml;
   
      //POUR CHANGER LA QUANTITE
      const quantityInput = document.getElementsByTagName("input")[0];
      const test = document.getElementsByTagName("value")[0];
      quantityInput.addEventListener("change", updateValue);
      
      
      function updateValue(newValue) {
        test.textContent = newValue.target.value;
        console.log(newValue)
      }
      
      //POUR SUPPRIMER QQCH DU CART
      
      let removeCartItemButton = document.getElementsByClassName('deleteItem');
      console.log(removeCartItemButton);
      for (let i = 0; i < removeCartItemButton.length; i++) {
          removeCartItemButton[i].addEventListener("click", function(event) {
            let cart = getCart();
            let product = {"id" : articleId, "color" : selectedColor, "quantity" : quantity.value}
            if (productMatchesWCatalogue._id == product.id && productMatchesWCatalogue.color == product.color) {
              let deletedProductIndex = cart.findIndex(prod => prod.id == articleId && prod.color == selectedColor);
              console.log(deletedProductIndex)
              localStorage.removeItem(cart[deletedProductIndex])
            }
            else {
            }
            let buttonClicked = event.target
            buttonClicked.parentElement.parentElement.parentElement.parentElement.remove()
            }
          )}
     }
    )}

showCart()


      /** 
      const buttonCreated = document.createElement("button")
      let parentOfButton = document.getElementsByClassName("deleteItem")[0]
      parentOfButton.appendChild(buttonCreated)
      document.getElementsByTagName("button")[0].innerHTML = "Supprimer"
      console.log(buttonCreated)
      */
