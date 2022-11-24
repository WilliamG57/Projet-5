//Récupération du panier//
const getLocal = JSON.parse(localStorage.getItem("cart"));

//Gestion du panier si il est vide//
if (getLocal == null || getLocal.length == 0) {
    const emptyLocal = document.querySelector("h1")
    emptyLocal.innerHTML = emptyLocal.innerText + " est vide";
} else {
    console.log(getLocal)

    //Insertion du localStorage sur la page 
    let items = getLocal;
    let price = 0;
    for (i = 0; i < items.length; i++) {
        let id = items[i].id
        let color = items[i].color
        let qty = items[i].quantity
        let url = `http://localhost:3000/api/products/${id}`
        fetch(url)
            .then((response) => response.json())
            .then((cart) => {
                console.log(cart)
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
                let inputs = document.querySelectorAll(".itemQuantity");
                inputs.forEach((qty, m) => {
                    qty.addEventListener("change", evt => {
                        getLocal[m].quantity = Number(inputs[m].value);
                        localStorage.setItem("cart", JSON.stringify(getLocal));
                        window.location.reload();
                    })
                })

                // Supprimer items
                let buttons = document.querySelectorAll(".deleteItem");
                buttons.forEach((button, i) => {
                    button.addEventListener("click", del => {
                        getLocal.splice(i, 1);
                        localStorage.setItem("cart", JSON.stringify(getLocal));
                        if (getLocal.length === 0) {
                            localStorage.removeItem("cart")
                        }
                        window.location.reload();
                    })
                })

                //Calcul du prix total//
                price += cart.price * qty
                document.getElementById("totalPrice").innerHTML = price
            }
            )
    }
}

//Validation du formulaire

const order = document.querySelector(".cart__order");

let patternFirstName = document.querySelector("#firstName");
patternFirstName.setAttribute("pattern", "[a-zA-Z-éèà]*");

let patternLastName = document.querySelector("#lastName");
patternLastName.setAttribute("pattern", "[a-zA-Z-éèà]*");

let patternAddress = document.querySelector("#address")
patternAddress.setAttribute("pattern", "[0-9 a-zA-Z-éèà]*");

let patternCity = document.querySelector("#city");
patternCity.setAttribute("pattern", "[a-zA-Z-éèà]*");

let patternEmail = document.querySelector("#email");
patternEmail.setAttribute("pattern", "/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/");

order.addEventListener("click", e => {
    e.preventDefault();
    let contact = {
        firstName : document.getElementById("firstName").value,
        lastName : document.getElementById("lastName").value,
        address : document.getElementById("address").value,
        city : document.getElementById("city").value,
        email : document.getElementById("email").value,
    };
    let productsId = [];
    if (getLocal !== null) {
        for (let i = 0; i < getLocal.length; i++) {
            productsId.push(getLocal[i].id);
        }
    }
    if (
        regexName.test(contact.firstName) == true &&
        regexName.test(contact.lastName) == true &&
        regexLocation.test(contact.address) == true &&
        regexLocation.test(contact.city) == true &&
        regexEmail.test(contect.email) == true
    ) {
        
    }
})