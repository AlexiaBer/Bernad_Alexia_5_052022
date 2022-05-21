let productsArray = [];
let item = [];

fetch("http://localhost:3000/api/products")
  .catch(error => console.log(error))
  .then(data => data.json()) // réponse, qui renvoie une promise
  .then(productsList => {      // productsList = pas le nom de la fonction, c'est une variable. Ce sont mes canapés. Je vais ensuite les afficher
    console.log(productsList); 
    for(let product of productsList) { //boucle qui parcourt le tableau et pour chaque case du tableau créera une variable "product"
        document.getElementById("items").innerHTML += // REVOIR AVEC ULRICH CONCATENATION 
                                                  `           
                                                    <a href="./product.html?id=${product._id}">
                                                      <article>
                                                        <img src="${product.imageUrl}" alt="${product.altTxt}">
                                                        <h3 class="productName">${product.name}</h3>
                                                        <p class="productDescription">${product.description}</p>
                                                      </article>
                                                    </a>
                                                  ` 
      item = product;         // REVOIR AVEC ULRICH PORTEE DES VARIABLES. Comment passer d'une variable locale à globale ?
  
    }
      //   const url = "http://localhost:3000/api/products.html"

  })