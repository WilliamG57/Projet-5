let productId = "./product.html?id="
let url = new URL (window.location.href);
let id = url.searchParams.get("id");
console.log(id);

fetch('http://localhost:3000/api/products')
.then(function(response) {
    return response.json();
  })

function displayProduct(product) {
    const div = document.getElementsByClassName("item__img");
    const image = document.createElement("img")
    image.src = product.imgUrl;
    image.alt = product.altTxt;
    div.appendChild(image);
    const h1 = document.getElementById("title");
    title = product.name;
    const p = document.getElementById("price");
    price = product.price;
}



