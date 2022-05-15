
fetch("http://localhost:3000/api/products")
  .then( data => data.json())
  .then( productsList => {      
    for(let product of productsList){ //boucle qui parcourt le tableau et pour chaque case du tableau créera une variable "product"
      let productArticle = new Object;
      document.getElementById("items").innerHTM = `
                                                <a href="./product.html?id=42">
                                                  <article>
                                                    <img src="${productArticle.imageUrl}" alt="${productArticle.altTxt}">
                                                    <h3 class="productName">${productArticle.name}</h3>
                                                    <p class="productDescription">${productArticle.description}</p>
                                                  </article>
                                                </a>
                                                `                          
    };
    }
    )
    //for(let i = O; i<productsList.length; i++) {}    
    // productsList.forEach(product => parcourir); // cette ligne passe à un autre canapé !! mais toujours pas TOUS les canapés affichés}
    //setAttribute pour modif les liens href ?? element.setAttribute(<name>, <value> ) 