//mettre ici window.location + product._id ??? pour diriger vers la bonne page produit ?


//class Product{                // pour assigner toutes les propriétés du format JSON à la class Product
   // constructor(product){
    //  this.id = product._id;               //le this. représente un objet de la class Product.
     // this.name = product.name;
     // this.altTxt = product.altTxt;
     // this.imageUrl = product.imageUrl;
   // }
// }

const articleId = getArticleId(); // Je crée une variable qui contiendra l'id du produit 

function getArticleId() {
   return new URL(location.href).searchParams.get("id")  // pour récupérer l'id de la fenêtre actuelle
}

console.log(articleId)

function getArticle(){
   fetch(`http://localhost:3000/api/products/${articleId}`)
   .catch(error)
   .then(data => data.json())
   .then(productInfo => {      
      for(let info of productInfo) { //boucle qui parcourt le tableau et pour chaque case du tableau créera une variable "product"

            document.getElementById("items").innerHTML += // REVOIR AVEC ULRICH CONCATENATION 
                                                      `           
                                                        <a href="./product.html${"?=" + product._id}">
                                                          <article>
                                                            <img src="${product.imageUrl}" alt="${product.altTxt}">
                                                            <h3 class="productName">${product.name}</h3>
                                                            <p class="productDescription">${product.description}</p>
                                                          </article>
                                                        </a>
                                                      ` 
  console.log(productInfo);      
        }
   }
,
document.getElementsByTagName(title)

)


}
