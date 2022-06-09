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

 function totalPriceCalculation (cart) {

  let articlesQuantity = 0;
  let articlesTotalPrice = 0;
  for (product of cart) {
    articlesQuantity += parseInt(product.quantity);    
    articlesTotalPrice += (parseInt(product.price) * parseInt(product.quantity)); 
   }
   document.getElementById("totalQuantity").innerHTML = articlesQuantity;
   document.getElementById("totalPrice").innerHTML = articlesTotalPrice;
}

function showCart() {
    fetch("http://localhost:3000/api/products/")
    .catch(error => console.log(error))
    .then(data => data.json())
    .then(data => {
      let cart = getCart();
      let contentHtml = "";


      for (let product of cart) {
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
      totalPriceCalculation(cart);

// POUR MODIFIER LA QUANTITE D'UN PRODUIT

     let quantityInput = document.getElementsByClassName("itemQuantity");
      for (let i = 0; i < quantityInput.length; i++) {
            quantityInput[i].addEventListener("change", function(event) {
            let inputModified = event.target;
            let ModifiedIdOfProduct = {idDuProduitHtml : inputModified.closest(".cart__item").getAttribute("data-id")};
            let ModifiedColorOfProduct = {colorDuProduitHtml : inputModified.parentElement.parentElement.parentElement.children[0].children[1].textContent};
            let newQuantity = inputModified.value;
            let cart = getCart();  
            let modifiedProductIndex = cart.findIndex(prod => prod.id == ModifiedIdOfProduct.idDuProduitHtml && prod.color == ModifiedColorOfProduct.colorDuProduitHtml)
            location.reload();
            if (modifiedProductIndex != undefined) {
              let updatedProduct = {"id" : ModifiedIdOfProduct.idDuProduitHtml, "color" : ModifiedColorOfProduct.colorDuProduitHtml, "quantity" : newQuantity};
              cart.splice(modifiedProductIndex, 1, updatedProduct);
              saveCart(cart);
            }
  
            })

          totalPriceCalculation(cart);   
          saveCart(cart);
          }

//POUR SUPPRIMER UN PRODUIT DU PANIER (VISIBLE) ET DU CART (LOCAL STORAGE)

      let removeCartItemButton = document.getElementsByClassName('deleteItem');
      for (let i = 0; i < removeCartItemButton.length; i++) {
            removeCartItemButton[i].addEventListener("click", function(event) {
            let buttonClicked = event.target;
            let buttonClickedIdOfProduct = {"idDuProduitHtml" : buttonClicked.parentElement.parentElement.parentElement.parentElement.getAttribute("data-id")};
            let buttonClickedColorOfProduct = {"colorDuProduitHtml" : buttonClicked.parentElement.parentElement.parentElement.children[0].children[1].textContent};
            let cart = getCart();  
            let indexDuProdASuppr = cart.findIndex(prod => prod.id == buttonClickedIdOfProduct.idDuProduitHtml && prod.color == buttonClickedColorOfProduct.colorDuProduitHtml);
            totalPriceCalculation(cart);
            cart.splice(indexDuProdASuppr,1);
            saveCart(cart);
            buttonClicked.parentElement.parentElement.parentElement.parentElement.remove();
          })
        }
        }

    )}
showCart()

let form = document.querySelector("form.cart__order__form");

console.log(form.lastName);

const validEmail = function (emailInput) {
  let emailRegEx = new RegExp("^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9-_]+[.]{1}[a-z]{2,10}$", "g")
  let emailTest = emailRegEx.test(emailInput.value)
  if(emailTest = false) {
    document.getElementById("emailErrorMsg").innerHTML = "L'adresse e-mail n'est pas valide"
  }
};
 
const validFirstName = function (firstNameInput) {
  let firstNameRegex = new RegExp("[a-zA-Z]+")
  let firstNameTest = firstNameRegex.test(firstNameInput.value)
  if (firstNameTest = false) {
    document.getElementById("firstNameErrorMsg").innerHTML = "Le prénom contient un caractère invalide"
  }
};

const validLastName = function(lastNameInput) {
  let lasttNameRegex = new RegExp("[a-zA-Z]+")
  let lastNameTest = lasttNameRegex.test(lastNameInput.value)
  if (lastNameTest = false) {
    document.getElementById("firstNameErrorMsg").innerHTML = "Le prénom contient un caractère invalide"
  }
}

form.firstName.addEventListener("change", function(){
    validFirstName(this);
});

form.lasttName.addEventListener("change", function(){
  validLastName(this);
});

form.email.addEventListener("change", function(){
  validEmail(this);
});