let url = 'http://localhost:3000/api/products'
fetch(url)
.then(function(response) {
    return response.json();
  })
.then(function(response) {
    for (let product of response) {
        afficherProduit(product);
    }
})
//Affichage des produits sur la page index
function afficherProduit(produit) {
    const section = document.getElementById("items");
    const a = document.createElement("a");
    const article = document.createElement("article");
    const image = document.createElement("img");
    const h3 = document.createElement("h3");
    const p = document.createElement("p");

    a.href = "./product.html?id=" + produit._id;

    h3.classList.add("productName");
    p.classList.add("productDescription");
    p.classList.add("productDescription");

    section.appendChild(a);
    a.appendChild(article);
    article.appendChild(image);
    article.appendChild(h3);
    article.appendChild(p);

    image.src = produit.imageUrl;
    image.alt = produit.altTxt;
    h3.innerText = produit.name;
    p.innerText = produit.description;
} 