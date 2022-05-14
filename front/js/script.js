
fetch("http://localhost:3000/api/products")
  .then( data => data.json())
  .then( productsList => {      
    console.log(productsList);
    for(let product of productsList){
      let productArticle = new Object (product);
      let elt = document.getElementById("items");
      elt.innerHTML = `
      
      <a href="./product.html?id=42">
      <article>
        <img src="${productArticle.imageUrl}" alt="${productArticle.altTxt}">
        <h3 class="productName">${productArticle.name}</h3>
        <p class="productDescription">${productArticle.description}</p>
      </article>
    </a>
`
for (product[0]; product<productsList.length; product++) {
}
}


  });

