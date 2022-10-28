let socket = io.connect();

socket.on("products", function (products) {
  document.getElementById("datos").innerHTML = data2TableJS(products);
});

const form = document.querySelector("form");
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const data = {
    title: form[0].value,
    price: form[1].value,
    thumbnail: form[2].value,
  };

  fetch("/api/products/guardar", {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(data),
  })
    .then((respuesta) => respuesta.json())
    .then((products) => {
      form.reset();
      socket.emit("update", "ok");
    })
    .catch((error) => console.error(error));
});

function data2TableJS(products) {
  let res = "";
  if (products.length) {
    res += `
        <style>
            .table td, .table th {
                vertical-align : middle;
            }
        </style>
        <h2>P</h2>
        <div class="table-responsive">
            <table class="table table-dark">
                <tr> <th>Nombre</th> <th>Precio</th> <th>Foto</th> </tr>
        `;
    res += products
      .map(
        (product) => `
                <tr>
                    <td>${product.title}</td>
                    <td>$${product.price}</td>
                    <td><img width="50" src="${product.thumbnail}" alt="not found"></td>
                </tr>
        `
      )
      .join(" ");
    res += `
            </table>
        </div>`;
  }
  return res;
}

function data2TableHBS(products, cb) {
  fetch("plantillas/tabla.hbs")
    .then((respuesta) => respuesta.text())
    .then((plantilla) => {
      console.log("------- plantilla --------");
      console.log(plantilla);

      console.log("---------- html ----------");
      var template = Handlebars.compile(plantilla);
      let html = template({ products });
      console.log(html);

      cb(html);
    });
}
