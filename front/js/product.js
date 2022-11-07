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
    div[0].appendChild(image);
    image.src = product.imageUrl;
    image.alt = product.altTxt;
    const h1 = document.getElementById("title");
    h1.innerText = product.name;
    const price = document.getElementById("price");
    price.innerText = product.price;
    const description = document.getElementById("description");
    description.innerText = product.description;
    const select = document.getElementById("colors").value
    select[0].appendChild(colors);
    const option = document.createElement("option").value
    option.innerText = product.colors;
}