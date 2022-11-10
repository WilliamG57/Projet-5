let productId = "./product.html?id="
let url = new URL (window.location.href);
let id = url.searchParams.get("id");
console.log(id);


fetch(`http://localhost:3000/api/products/${id}`)
.then(function(response) {
    return response.json();
  })
.then(function(response) {
    console.log(response)
    displayProduct(response);
})

function displayProduct(product) {
    const div = document.getElementsByClassName("item__img");
    const image = document.createElement("img");
    div[0].appendChild(image)
    image.src = product.imageUrl
    image.alt = product.altTxt;
    const h1 = document.getElementById("title")
    h1.innerText = product.name;
    const price = document.getElementById("price")
    price.innerText = product.price;
    const description = document.getElementById("description")
    description.innerText = product.description;
    const select = document.getElementById("colors");
    for (let color of product.colors) {
        const option = document.createElement("option")
        select.appendChild(option)
        option.innerText = color
        option.value = color;
    }
}
    const bouton = document.getElementById("addToCart");
    if (bouton !== null) {
        bouton.addEventListener("click", evt => {
            let quantity = document.getElementById("quantity").value;
            let color = document.getElementById ("colors").value;
            console.log({quantity, color})
            if (!color || !quantity) {
                alert("Veuillez sélectionner une couleur et une quantité");
            }
            if (quantity < 1 || quantity > 100){
                alert("Veuillez sélectionner une quantité entre 1 et 100");
            }
            else {
            let productCart = []
            if (localStorage.getItem("cart")!== null){
                productCart = JSON.parse(localStorage.getItem("cart"))
            }
            let data = {
                color:color,
                quantity:Number(quantity),
                id:id
            }
            console.log(data)
            if (data) {
                productCart.push(data)
            }
            localStorage.setItem("cart",JSON.stringify(productCart));
        }})
    }