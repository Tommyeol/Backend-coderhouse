const schemaAuthor = new normalizr.schema.Entity(
  "author",
  {},
  { idAttribute: "id" }
);

const schemaMessage = new normalizr.schema.Entity(
  "post",
  {
    author: schemaAuthor,
  },
  { idAttribute: "_id" }
);

const schemaMessages = new normalizr.schema.Entity(
  "posts",
  {
    messages: [schemaMessage],
  },
  { idAttribute: "id" }
);
/* ----------------------------------------------------------------------------- */

/* ----------------------------------------------------------------- */
socket.on("messages", function (messagesN) {
  let messagesNsize = JSON.stringify(messagesN).length;
  console.log(messagesN, messagesNsize);

  let messagesD = normalizr.denormalize(
    messagesN.result,
    schemaMessages,
    messagesN.entities
  );

  let messagesDsize = JSON.stringify(messagesD).length;
  console.log(messagesD, messagesDsize);

  let porcentajeC = parseInt((messagesNsize * 100) / messagesDsize);
  console.log(`Porcentaje de compresión ${porcentajeC}%`);
  document.getElementById("compresion-info").innerText = porcentajeC;

  render(messagesD.messages);
});

function render(data) {
  var html = data
    .map(function (elem, index) {
      return `
            <div>
                <b style="color:blue;">${elem.author.email}</b> 
                [<span style="color:brown;">${elem.fyh}</span>] : 
                <i style="color:green;">${elem.text}</i>
                <img width="50" src="${elem.author.avatar}" alt=" ">
            </div>
        `;
    })
    .join(" ");
  document.getElementById("messages").innerHTML = html;
}

const userCentroMessages = document.getElementById("username");
const textoCentroMessages = document.getElementById("texto");
const botonCentroMessages = document.getElementById("enviar");

function addMessage(e) {
  e.preventDefault();

  var mensaje = {
    author: {
      email: userCentroMessages.value,
      nombre: document.getElementById("firstname").value,
      apellido: document.getElementById("lastname").value,
      edad: document.getElementById("age").value,
      alias: document.getElementById("alias").value,
      avatar: document.getElementById("avatar").value,
    },
    text: textoCentroMessages.value,
  };

  socket.emit("new-message", mensaje);

  textoCentroMessages.value = "";
  textoCentroMessages.focus();

  botonCentroMessages.disabled = true;
}

userCentroMessages.addEventListener("input", () => {
  let hayEmail = userCentroMessages.value.length;
  let hayTexto = textoCentroMessages.value.length;
  textoCentroMessages.disabled = !hayEmail;
  botonCentroMessages.disabled = !hayEmail || !hayTexto;
});

textoCentroMessages.addEventListener("input", () => {
  let hayTexto = textoCentroMessages.value.length;
  botonCentroMessages.disabled = !hayTexto;
});
