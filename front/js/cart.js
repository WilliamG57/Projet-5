//Récupération du panier//
const getLocal = JSON.parse(localStorage.getItem("cart"));

//Gestion du panier si il est vide//
    if (getLocal == null || getLocal.length == 0) {
        const emptyLocal  = document.querySelector("h1")
        emptyLocal.innerHTML = emptyLocal.innerText + " est vide";
    } else {     
        console.log(getLocal)

//Insertion du localStorage sur la page 
            let items = getLocal;
            let price = 0;
            for ( i = 0; i < items.length; i++) {
                let id = items[i].id
                let color = items[i].color
                let qty = items[i].quantity
                let url = `http://localhost:3000/api/products/${id}`
                fetch(url)
                    .then((response)=>response.json())
                    .then((cart) => { console.log(cart)
                    document.querySelector("#cart__items").innerHTML += 
                        `<article class="cart__item" data-id="${id}" data-color="${color}">
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
                                        <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${qty}">
                                    </div>
                                    <div class="cart__item__content__settings__delete">
                                        <p class="deleteItem" onclik="deleteItem">Supprimer</p>
                                    </div>
                                </div>
                            </div>
                        </article>`;
                        // Modifier quantité
                        let inputs = document.querySelectorAll(".itemQuantity")
                        inputs.forEach((qty, m) => {
                            qty.addEventListener("change", evt => {
                                getLocal[m].quantity = Number(inputs[m].value)
                                localStorage.setItem("cart", JSON.stringify(getLocal))
                                window.location.reload();

                        
                            })
                        })
                        //Calcul du prix total//
                        price += cart.price * qty
                        document.getElementById("totalPrice").innerHTML = price
                }
            )}
    }



//Validation du formulaire
let validateFirstName = document.querySelector("#firstName");
validateFirstName.setAttribute("validate", "[a-z A-Z-éèà]");

let validateLastName = document.querySelector("#lastName")
validateLastName.setAttribute("validate", "[a-z A-Z-éèà]");

let validateAddress = document.querySelector("#address")
validateAddress.setAttribute("validate", "[0-9 a-z A-Z-éèà]");

let validateCity = document.querySelector("#city")
validateCity.setAttribute("validate", "[a-z A-Z-éèà]");