let products = [];

function getProducts () {
  products = fetch("http://localhost:3000/api/products")
  .then(function(res) {
    if (res.ok) {
      return res.json();
    }
  })
  .catch(function(err) {
  });
}


products = getProducts


console.log(getProducts)



// const productArticle = document.getElementById("items");

// const product = document.createElement("a")