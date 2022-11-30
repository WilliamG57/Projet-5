const wlt = window.location;
const url = new URL(wlt);
const id = url.searchParams.get("orderId");
localStorage.clear()
const orderId = document.getElementById("orderId");
orderId.innerHTML = id;