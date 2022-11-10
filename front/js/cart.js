const local = JSON.parse(localStorage.getItem("cart"))

// Création des DOM
const section = document.getElementById("cart__items")
const article = document.createElement("article")
const image = document.createElement("img")
const cntDiv = document.createElement("div")
const descriptionDiv = document.createElement("div")
const nomH2 = document.createElement("h2")
const colorP = document.createElement("p")
const priceP = document.createElement("p")
const settingsDiv = document.createElement("div")
const qtyDiv = document.createElement ("div")
const qtyP = document.createElement ("p")
const input = document.createElement("input")
const deleteDiv = document.createElement("div")
const deleteP = document.createElement("p")


// Mise en place des balises
section.appendChild(article)
article.appendChild(cntDiv)
cntDiv.appendChild(descriptionDiv)
descriptionDiv.appendChild(nomH2)
descriptionDiv.appendChild(colorP)
descriptionDiv.appendChild(priceP)
cntDiv.appendChild(settingsDiv)
settingsDiv.appendChild(qtyDiv)
qtyDiv.appendChild(qtyP)
qtyDiv.appendChild(input)
settingsDiv.appendChild(deleteDiv)
deleteDiv.appendChild(deleteP)


// Nommage des balises
article.className = "cart__item"
cntDiv.className = "cart__item__content"
descriptionDiv.className = "cart__item__content__description"
settingsDiv.className = "cart__item__content__settings"
qtyDiv.className = "cart__item__content__settings__quantity"
input.className = "itemQuantity"
input.type = "number"
input.name = "itemQuantity"
input.min = 1
input.max = 100
input.value = 
deleteDiv.className = "cart__item__content__settings__delete"
deleteP.className = "deleteItem"








// if(local !=null) 
image.src = local.imageUrl
image.alt = local.imgTxt
