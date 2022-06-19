
//pour récupérer le numéro de commande dans le lien de la page et l'afficher sur la page

let link = window.location.search

let uspLink = new URLSearchParams(link)

let orderId = uspLink.get("orderid")  

document.getElementById("orderId").innerText = `${orderId}`
