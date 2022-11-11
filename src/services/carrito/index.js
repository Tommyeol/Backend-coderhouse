const baseUrl = "/api/carrito";
const carritoID = "625c58650227224a5beba017";

export async function getCarritoById() {
  return fetch(`${baseUrl}/${carritoID}/products`).then((res) => res.json());
}

export async function addProductToCart(product) {
  return fetch(`${baseUrl}/${carritoID}/products`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(product),
  }).then((res) => res.json());
}

export async function removeProductFromCart(productId) {
  return fetch(`${baseUrl}/${carritoID}/products/${productId}`, {
    method: "DELETE",
  }).then((res) => res.json());
}
