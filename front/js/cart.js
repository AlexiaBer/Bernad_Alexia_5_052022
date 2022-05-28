function saveCart(cart){
    localStorage.setItem("cart", JSON.stringify(cart));
 }

 function getCart(){
    let cart = localStorage.getItem("cart");
    if (cart == null) {
       return [];
    } else {
       return JSON.parse(cart);
    }
 }