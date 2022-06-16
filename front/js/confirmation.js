let link = window.location.search

let uspLink = new URLSearchParams(link)

let orderId = uspLink.get("orderid")  

console.log(orderId);

document.getElementById("orderId").innerText = `${orderId}`
