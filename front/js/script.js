//pour afficher les canapés sur la page d'accueil. Fetch puis boucle qui parcourt le tableau pour afficher chaque canapé.
let productsArray = [];
let item = [];

fetch("http://localhost:3000/api/products")
  .catch(error => console.log(error))
  .then(data => data.json())
  .then(productsList => {      
    console.log(productsList); 
    for(let product of productsList) { 
        document.getElementById("items").innerHTML += 
                                                  `           
                                                    <a href="./product.html?id=${product._id}">
                                                      <article>
                                                        <img src="${product.imageUrl}" alt="${product.altTxt}">
                                                        <h3 class="productName">${product.name}</h3>
                                                        <p class="productDescription">${product.description}</p>
                                                      </article>
                                                    </a>
                                                  `          
    }
  })