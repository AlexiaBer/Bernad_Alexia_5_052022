//fonction pour récupérer le panier dans le LS
function getCart(){
  let cart = localStorage.getItem("cart");
    if (cart == null || cart == undefined) {
       return [];
    } else {
       return JSON.parse(cart);
    }
  }

//fonction pour enregistrer/màj le panier dans le LS
function saveCart(cart){
    localStorage.setItem("cart", JSON.stringify(cart));
 }

//fonction pour calculer le prix total du panier
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

//fonction pour afficher le cart sur la page
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

// pour modifier la quantité d'un produit

     let quantityInput = document.getElementsByClassName("itemQuantity");
      for (let i = 0; i < quantityInput.length; i++) {
            quantityInput[i].addEventListener("change", function(event) {
            let inputModified = event.target;
            let idOfMofifiedProduct = {idDuProduitHtml : inputModified.closest(".cart__item").getAttribute("data-id")};
            let modifiedColorOfProduct = {colorDuProduitHtml : inputModified.parentElement.parentElement.parentElement.children[0].children[1].textContent};
            let newQuantity = inputModified.value;
            let cart = getCart();  
            let modifiedProductIndex = cart.findIndex(prod => prod.id == idOfMofifiedProduct.idDuProduitHtml && prod.color == modifiedColorOfProduct.colorDuProduitHtml)
            location.reload();
            if (modifiedProductIndex != undefined) {
              let updatedProduct = {"id" : idOfMofifiedProduct.idDuProduitHtml, "color" : modifiedColorOfProduct.colorDuProduitHtml, "quantity" : newQuantity};
              cart.splice(modifiedProductIndex, 1, updatedProduct);
              saveCart(cart);
              totalPriceCalculation(cart);
            }
  
            })

          totalPriceCalculation(cart);   
          saveCart(cart);
          }

//pour supprimer un produit du panier (page html) et du cart (localstorage)

      let removeCartItemButton = document.getElementsByClassName('deleteItem');
      for (let i = 0; i < removeCartItemButton.length; i++) {
            removeCartItemButton[i].addEventListener("click", function(event) {
            let buttonClicked = event.target;
            let buttonClickedIdOfProduct = {"idDuProduitHtml" : buttonClicked.parentElement.parentElement.parentElement.parentElement.getAttribute("data-id")};
            let buttonClickedColorOfProduct = {"colorDuProduitHtml" : buttonClicked.parentElement.parentElement.parentElement.children[0].children[1].textContent};
            let cart = getCart();  
            let indexDuProdASuppr = cart.findIndex(prod => prod.id == buttonClickedIdOfProduct.idDuProduitHtml && prod.color == buttonClickedColorOfProduct.colorDuProduitHtml);
            cart.splice(indexDuProdASuppr,1);
            saveCart(cart);
            buttonClicked.parentElement.parentElement.parentElement.parentElement.remove();
            location.reload()
          })
        }
        }

    )}
showCart()



// pour valider les données saisies par l'utilisateur

let form = document.querySelector(".cart__order__form");

function validName (nameInput) {
  let nameRegex = new RegExp("^[a-zA-Z]+$", "g");
  let nameTest = nameRegex.test(nameInput.value);
  return nameTest;
}

function validAddress (addressInput) {
  let addressRegEx = new RegExp('^[a-zA-Z0-9- ]+$', 'g');
  let addressTest = addressRegEx.test(addressInput.value);
  return addressTest;
}

function validCity (cityInput) {
  let cityRegEx = new RegExp("^[a-zA-Z-]+$");
  let cityTest = cityRegEx.test(cityInput.value);
  return cityTest;
}

function validEmail (emailInput) {
  let emailRegEx = new RegExp(
    "^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9-_]+[.]{1}[a-z]{2,10}$",
    "g"
  );
  let emailTest = emailRegEx.test(emailInput.value);
  return emailTest;
};

form.firstName.addEventListener("change", function(){
  if(!validName(this)) {
    document.getElementById("firstNameErrorMsg").innerText = "Le format du prénom n'est pas accepté";
  }
});

form.lastName.addEventListener("change", function(){
  if(!validName(this)) {
    document.getElementById("lastNameErrorMsg").innerText = "Le format du nom n'est pas accepté";
  }
});

form.address.addEventListener("change", function(){
  if(!validAddress(this)) {
    document.getElementById("addressErrorMsg").innerText = "Le format de l'adresse n'est pas accepté";
  }
});

form.city.addEventListener("change", function(){
  if(!validCity(this)){
    document.getElementById("cityErrorMsg").innerText = "Le format de la ville n'est pas accepté";
  }
})

form.email.addEventListener("change", function(){
  if(!validEmail(this)){
    document.getElementById("emailErrorMsg").innerText = "Le format de l'e-mail n'est pas accepté";
  }
});

// pour récupérer les id products du panier dans le LS
const parseCart = JSON.parse(localStorage.getItem("cart"));
let products = [];
for (let product of parseCart){
products.push(product.id)
}

// pour envoyer la requête post

let orderId = "";

async function postAPI() {
  let contact = {
    firstName: form.firstName.value,
    lastName: form.lastName.value,
    address: form.address.value,
    city: form.city.value,
    email:form.email.value
    }

    let response = await fetch("http://localhost:3000/api/products/order", {
    method: "POST",
    headers: {
      "Accept":"application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({contact, products})
    })
    .then(response => response.json())
    .then(data => {
      orderId = data.orderId
      window.location.href = ("confirmation.html?orderid=" + orderId)
    })
    console.log(orderId)
    }

form.addEventListener("submit", (e) => {
  e.preventDefault(); //empêche la page de se re-charger
  postAPI()
})