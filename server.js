import config from "./config.js";
import express from "express";
import cors from "cors";
import RouterNews from "./router/news.js";

const app = express();

if (config.NODE_ENV == "development") app.use(cors());

app.use(express.static("public"));
app.use(express.json());

const routerNews = new RouterNews();

/*             Route Zone            */
app.use("/noticias", routerNews.start());

/*                      Listen                          */
const PORT = config.PORT || 8000;
const server = app.listen(PORT, () =>
  console.log(
    `Express server listening on port ${PORT} (${config.NODE_ENV} - ${config.TIPO_PERSISTENCIA})`
  )
);
server.on("error", (error) => console.log("Express server error:", error));
