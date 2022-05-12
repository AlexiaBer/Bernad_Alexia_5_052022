
  let products = [];
  async function getListProducts(){
 await fetch("http://localhost:3000/api/products")

    .then((response) => response.json())
    .then((datas) => (products = datas))
    .catch((error) => console.log(error));
   }

   console.log("products");