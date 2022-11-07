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
    image.src = product.imgUrl;
    image.alt = product.altTxt;
    div.appendChild(image);
    const h1 = document.getElementById("title");
    title = product.name;
    const price = document.getElementById("price");
    price = product.price;
    const description = document.getElementById("description");
    description = product.description;
    console.log(description);
    const select = document.getElementById("colors").innerText = colors;
}