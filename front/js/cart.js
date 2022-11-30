//Récupération du panier//
const getLocal = JSON.parse(localStorage.getItem("cart"));

//Gestion du panier si il est vide//
if (getLocal == null || getLocal.length == 0) {
    const emptyLocal = document.querySelector("h1");
    emptyLocal.innerHTML = emptyLocal.innerText + " est vide";
} else {

    //Insertion du localStorage sur la page 
    let items = getLocal;
    let price = 0;
    for (i = 0; i < items.length; i++) {
        let id = items[i].id;
        let color = items[i].color;
        let qty = items[i].quantity;
        let url = `http://localhost:3000/api/products/${id}`;
        fetch(url)
            .then((response) => response.json())
            .then((cart) => {
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
                price += cart.price * qty;
                document.getElementById("totalPrice").innerHTML = price;
            }
            )
    }
}

//-------------Validation du formulaire


// Mise en place des constantes pour le formulaire

const order = document.getElementById("order");
const postUrl = `http://localhost:3000/api/products/order/`;
const prenom = document.getElementById("firstName");
const nom = document.getElementById("lastName");
const adresse = document.getElementById("address");
const ville = document.getElementById("city");
const mail = document.getElementById("email");
const regexCommun = /^[a-zA-Z-éèà]{2,31}$/;
const regexAddress = /^[0-9a-zA-Z-éèà]+\s[a-zA-Z-éèà]+\s[a-zA-Z-éèà]{2,31}$/;
const regexmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

//Test des regex
const errorFirstName = document.getElementById("firstNameErrorMsg");
function validateFirstName(prenom) {
    if (regexCommun.test(prenom) == false) {
        return false;
    } else {
        errorFirstName.innerHTML = null;
        return true;
    }
}

const errorLastName = document.getElementById("lastNameErrorMsg");
function validateLastName(nom) {
    if (regexCommun.test(nom) == false) {
        return false; 
    } else {
        errorLastName.innerHTML = null;
        return true;
    }
}

const errorAddress = document.getElementById("addressErrorMsg");
function validateAddress(adresse) {
    if (regexAddress.test(adresse) == false) {
        return false; 
    } else {
        errorAddress.innerHTML = null;
        return true;
    }
}

const errorCity = document.getElementById("cityErrorMsg");
function validateCity(ville) {
    if (regexCommun.test(ville) == false) {
        return false;
    } else {
        errorCity.innerHTML = null;
        return true;
    }
}

const errorEmail = document.getElementById("emailErrorMsg");
function validateEmail(mail) {
    if (regexmail.test(mail) == false) {
        return false;
    } else {
        errorEmail.innerHTML = null;
        return true;
    }
}

//Evenement au click "commander"
order.addEventListener("click", e => {
    e.preventDefault();
    if (localStorage.getItem("cart") == null) {
        return alert("Le panier est vide");
    }

    let firstName = validateFirstName(prenom.value);
    let lastName = validateLastName(nom.value);
    let address = validateAddress(adresse.value);
    let city = validateCity(ville.value);
    let email = validateEmail(mail.value);
    const contact = {
        firstName: prenom.value,
        lastName: nom.value,
        address: adresse.value,
        city: ville.value,
        email: mail.value
    };

// Retour en cas de non validation du formulaire
    if (
        firstName == false ||
        lastName == false ||
        address == false ||
        city == false ||
        mail == false
    ) {
        if (firstName == false) {
            errorFirstName.innerHTML = "Entrez un prénom valide";
        }
        if (lastName == false) {
            errorLastName.innerHTML = "Entrez un nom valide";
        }
        if (address == false) {
            errorAddress.innerHTML = "Entrez une addresse valide";
        }
        if (city == false) {
            errorCity.innerHTML = "Entrez une ville valide";
        }
        if (email == false) {
            errorEmail.innerHTML = "Entrez un email valide";
        }
        return;
    }
    let productsId = [];
    if (getLocal !== null) {
        for (let i = 0; i < getLocal.length; i++) {
            productsId.push(getLocal[i].id);
        }
    }
    const send = {
        contact: contact, 
        products: productsId
    };

    //Envoi dans le localstorage du panier

    fetch(postUrl, {
        method: "POST",
        body: JSON.stringify(send),
        headers: {
            "Content-Type" : "application/json"
        }
    })
    .then((res) => res.json())
    .then((data) => {
        let confirmationUrl = "./confirmation.html?orderId=" + data.orderId;
        window.location.href = confirmationUrl;
    })
})