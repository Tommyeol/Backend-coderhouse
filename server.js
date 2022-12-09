import config from "./config.js";
import express from "express";
import cors from "cors";
import RouterNoticias from "./router/noticias.js";

const app = express();

if (config.NODE_ENV == "development") app.use(cors());

app.use(express.static("public"));
app.use(express.json());

const routerNoticias = new RouterNoticias();

/*             Route handle by server            */
app.use("/noticias", routerNoticias.start());

/*                      Listening server                          */
const PORT = config.PORT || 8000;
const server = app.listen(PORT, () =>
  console.log(
    `Server express GRAPHQL listening on port ${PORT}
        \rConfig: [Modo: ${config.NODE_ENV}, Persistencia: ${
      config.TIPO_PERSISTENCIA
    }, GRAPHiQL: ${config.GRAPHIQL == "true" ? "Si" : "No"}]`
  )
);
server.on("error", (error) => console.log("Server express error:", error));
