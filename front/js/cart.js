const getLocal = JSON.parse(localStorage.getItem("cart"));

    if (getLocal == null || getLocal.length == 0) {
        const emptyLocal  = document.querySelector("h1")
        emptyLocal.innerHTML = emptyLocal.innerText + " est vide";
    } else {     
        console.log(getLocal)
        // function orderCart() {
            let items = getLocal
            for ( i = 0; i < items.length; i++) {
                let id = items[i].id
                let color = items[i].color
                let qty = items[i].quantity
                let url = `http://localhost:3000/api/products/${id}`
                fetch(url)
                    .then((response)=>response.json())
                    .then((cart) => { console.log(cart)
                    document.querySelector("#cart__items").innerHTML += `<article class="cart__item" data-id="${id}" data-color="${color}">
                                                                    <div class="cart__item__img">
                                                                        <img src="${cart.imageUrl}" alt="${cart.altTxt}">
                                                                    </div>
                                                                    <div class="cart__item__content">
                                                                        <div class="cart__item__content__description">
                                                                            <h2>${cart.name}</h2>
                                                                            <p>${color}</p>
                                                                            <p>${cart.price} €</p>
                                                                        </div>
                                                                        <div class="cart__item__content__settings">
                                                                            <div class="cart__item__content__settings__quantity">
                                                                                <p>Qté :</p>
                                                                                <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value=${qty}>
                                                                            </div>
                                                                            <div class="cart__item__content__settings__delete">
                                                                                <p class="deleteItem">Supprimer</p>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </article>`;
                }
            )}
        }
    // }


// function addToCart (productId, color, qty){
//     let items = getLocal();
//     if (items.length == 0) {
//         items = [productId, color, qty]
//         console.log(items)
//     }



// Création des DOM
// const section = document.getElementById("cart__items")
// const article = document.createElement("article")
// const divImage = document.createElement("div")
// const image = document.createElement("img")
// const cntDiv = document.createElement("div")
// const descriptionDiv = document.createElement("div")
// const nomH2 = document.createElement("h2")
// const colorP = document.createElement("p")
// const priceP = document.createElement("p")
// const settingsDiv = document.createElement("div")
// const qtyDiv = document.createElement ("div")
// const qtyP = document.createElement ("p")
// const input = document.createElement("input")
// const deleteDiv = document.createElement("div")
// const deleteP = document.createElement("p")


// // Mise en place des balises
// section.appendChild(article)
// article.appendChild(divImage)
// divImage.appendChild(image)
// article.appendChild(cntDiv)
// cntDiv.appendChild(descriptionDiv)
// descriptionDiv.appendChild(nomH2)
// descriptionDiv.appendChild(colorP)
// descriptionDiv.appendChild(priceP)
// cntDiv.appendChild(settingsDiv)
// settingsDiv.appendChild(qtyDiv)
// qtyDiv.appendChild(qtyP)
// qtyDiv.appendChild(input)
// settingsDiv.appendChild(deleteDiv)
// deleteDiv.appendChild(deleteP)


// // Nommage des balises
// article.className = "cart__item"
// article.setAttribute("data-id","{product-ID}")
// article.setAttribute("data-color","{product-color}")
// divImage.className = "cart__item__img"
// cntDiv.className = "cart__item__content"
// descriptionDiv.className = "cart__item__content__description"
// settingsDiv.className = "cart__item__content__settings"
// qtyDiv.className = "cart__item__content__settings__quantity"
// input.className = "itemQuantity"
// input.type = "number"
// input.name = "itemQuantity"
// input.min = 1
// input.max = 100
// input.value = 
// deleteDiv.className = "cart__item__content__settings__delete"
// deleteP.className = "deleteItem"

// }