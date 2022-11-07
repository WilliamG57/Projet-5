let url = 'http://localhost:3000/api/products'
fetch(url)
.then(function(response) {
    return response.json();
  })
.then(function(response) {
    console.log(response);
    for (let product of response) {
        afficherProduit(product);
    }
})

function afficherProduit(produit) {
    const section = document.getElementById("items");
    const a = document.createElement("a");
    a.href = "./product.html?id=" + produit._id;
    section.appendChild(a);
    const article = document.createElement("article");
    a.appendChild(article);
    const image = document.createElement("img");
    image.src = produit.imageUrl;
    image.alt = produit.altTxt;
    article.appendChild(image);
    const h3 = document.createElement("h3");
    h3.classList.add("productName");
    h3.innerText = produit.name;
    article.appendChild(h3);
    const p = document.createElement("p");
    p.classList.add("productDescription");
    p.innerText = produit.description;
    article.appendChild(p);
} 