
function getCart(){
    let cart = localStorage.getItem("cart");
    if (cart == null || cart == undefined) {
       return [];
    } else {
       return JSON.parse(cart);
    }
  }

function saveCart(cart){
    localStorage.setItem("cart", JSON.stringify(cart));
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
        productMatchesWCatalogue = data.find(el => el._id == product.id)
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
   

     let quantityInput = document.getElementsByClassName("itemQuantity");
      for (let i = 0; i < quantityInput.length; i++) {
            quantityInput[i].addEventListener("change", function(event) {
            let inputModified = event.target;
            let inputModifiedIdOfProduct = {idDuProduitHtml : inputModified.closest(".cart__item").getAttribute("data-id")};
            console.log ("input modified of product : " + inputModifiedIdOfProduct.idDuProduitHtml);
            let inputModifiedColorOfProduct = {colorDuProduitHtml : inputModified.parentElement.parentElement.parentElement.children[0].children[1].textContent}
            console.log("input modified of product : " + inputModifiedColorOfProduct.colorDuProduitHtml);

            let newQuantity = inputModified.value;
            console.log("new quantity : " + newQuantity);
            let cart = getCart();  
            let indexDuProdAModifier = cart.findIndex(prod => prod.id == inputModifiedIdOfProduct.idDuProduitHtml && prod.color == inputModifiedColorOfProduct.colorDuProduitHtml)
            if (indexDuProdAModifier != undefined) {
              let updatedProduct = {"id" : inputModifiedIdOfProduct.idDuProduitHtml, "color" : inputModifiedColorOfProduct.colorDuProduitHtml, "quantity" : newQuantity};
              console.log("updateProduct : " + updatedProduct);
              cart.splice(indexDuProdAModifier, 1, updatedProduct)
              saveCart(cart) 
            }
            console.log ("index du produit à supprimer dans le LS : " + indexDuProdAModifier);
            // MODIF QUANTITE DANS LE LS
            saveCart(cart);
 
            }

            )}
     


//POUR SUPPRIMER UN PRODUIT DU PANIER (VISIBLE) ET DU CART (LOCAL STORAGE)

      let removeCartItemButton = document.getElementsByClassName('deleteItem');
      for (let i = 0; i < removeCartItemButton.length; i++) {
            removeCartItemButton[i].addEventListener("click", function(event) {
            let buttonClicked = event.target;
            let buttonClickedIdOfProduct = {idDuProduitHtml : buttonClicked.parentElement.parentElement.parentElement.parentElement.getAttribute("data-id")}
            console.log (buttonClickedIdOfProduct.idDuProduitHtml);
            let buttonClickedColorOfProduct = {colorDuProduitHtml : buttonClicked.parentElement.parentElement.parentElement.children[0].children[1].textContent}
            console.log(buttonClickedColorOfProduct.colorDuProduitHtml);
            let cart = getCart();  
            let indexDuProdASuppr = cart.findIndex(prod => prod.id == buttonClickedIdOfProduct.idDuProduitHtml && prod.color == buttonClickedColorOfProduct.colorDuProduitHtml)
            console.log ("index du produit à supprimer dans le LS : " + indexDuProdASuppr);
            cart.splice(indexDuProdASuppr,1)
            saveCart(cart);
            buttonClicked.parentElement.parentElement.parentElement.parentElement.remove()
          }
          
            )

        }
      })
    }
showCart()




 /** 
      let input = quantityInput[0];

      input.addEventListener("change", function(event) { 
        console.log(quantityInput.index)
        let inputChanged = event.target
        console.log(inputChanged)
      })

    for (let i = 0; i < quantityInput.length; i++) {
        let input = quantityInput[i]
        let quantityInputArray = [document.getElementsByClassName("itemQuantity")[i]]
    //    console.log (quantityInputArray)
  }
    //  }

    //  function changeQuantityInLs() {
        //(prod => prod.id == productChosen.id && prod.color == productChosen.color)
        
        //let cart = getCart();


        //let updatedProduct = {"id" : articleId, "color" : selectedColor, "quantity" : newQuantity};

        //saveCart(cart) 
      */
    