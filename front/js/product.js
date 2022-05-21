const articleId = getArticleId(); // Je crée une variable qui contiendra l'id du produit 

function getArticleId() {
   return new URL(location.href).searchParams.get("id")  // pour récupérer l'id de la fenêtre actuelle
}

console.log(articleId)

fetch(`http://localhost:3000/api/products/${articleId}`)
   .catch(error => console.log(error))
   .then(data => data.json())
   .then(productInfo => {      // productsList = pas le nom de la fonction, c'est une variable. Ce sont mes canapés. Je vais ensuite les afficher
    console.log(productInfo); 
document.getElementsByClassName("item__img").innerHTML += `<img src="${productInfo.imageUrl}" alt="${productInfo.altTxt}">`
document.getElementById("title").innerHTML += `${productInfo.name}`
document.getElementById("price").innerHTML += `${productInfo.price}`
document.getElementById("description").innerHTML += `${productInfo.description}`

console.log(productInfo.colors[0], productInfo.colors[1])
   })
