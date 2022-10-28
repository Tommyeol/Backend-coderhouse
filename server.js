import express from "express";
import http from "http";
import cookieParser from "cookie-parser";
import session from "express-session";
import MongoStore from "connect-mongo";
import handlebars from "express-handlebars";
import Products from "./api/products.js";
import Messages from "./api/Messages.js";
import { MongoDB } from "./db/db.js";
import { getProdRandom } from "./generador/products.js";
import { Server as Socket } from "socket.io";
import os from "os";
import cluster from "cluster";
// import { fork } from "child_process";

const numCPUs = os.cpus().length;
const app = express();
const server = http.Server(app);
const io = new Socket(server);

const PORT = process.env.PORT || 8080;
import passport from "passport";
import { Strategy as FacebookStrategy } from "passport-facebook";

let products = new Products();
let Messages = new Messages();

const FACEBOOK_CLIENT_ID = process.argv[3] || "iiiiiiiiiiiiiii";
const FACEBOOK_CLIENT_SECRET =
  process.argv[4] || "ssssssssssssssssssssssssssssssss";

import compression from "compression";
app.use(compression());

import pino from "pino";
const pinoInfo = pino();
const pinoWarn = pino("./logs/warn.log");
const pinoError = pino("./logs/error.log");

app.engine(
  "hbs",
  handlebars({
    extname: ".hbs",
    defaultLayout: "index.hbs",
  })
);
app.set("view engine", "hbs");
app.set("views", "./views");
//--------------------------------------------

app.use(express.static("public"));

app.get("/info", (req, res) => {
  let info = {
    plat: process.platform,
    ver: process.version,
    mem: JSON.stringify(process.memoryUsage(), null, "\t"),
    execPath: process.execPath,
    pid: process.pid,
    carp: process.cwd(),
    argum: JSON.stringify(process.argv, null, "\t"),
  };

  res.render("info", info);
});

const router = express.Router();
app.use("/api", router);

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.get("/products/listar", async (req, res) => {
  res.json(await products.listarAll());
});

router.get("/products/listar/:id", async (req, res) => {
  let { id } = req.params;
  res.json(await products.listar(id));
});

router.post("/products/guardar", async (req, res) => {
  let producto = req.body;
  await products.guardar(producto);
  res.json(producto);
});

router.put("/products/actualizar/:id", async (req, res) => {
  let { id } = req.params;
  let producto = req.body;
  await products.actualizar(producto, id);
  res.json(producto);
});

router.delete("/products/borrar/:id", async (req, res) => {
  let { id } = req.params;
  let producto = await products.borrar(id);
  res.json(producto);
});

router.get("/products/vista", async (req, res) => {
  let prods = await products.listarAll();

  res.render("vista", {
    products: prods,
    hayProducts: prods.length,
  });
});

router.get("/products/vista-test", async (req, res) => {
  let cant = req.query.cant || 10;
  let prods = [];
  for (let i = 0; i < cant; i++) prods.push(getProdRandom(i + 1));

  res.render("vista", {
    products: prods,
    hayProducts: prods.length,
  });
});

io.on("connection", async (socket) => {
  console.log("Nuevo cliente conectado!");

  socket.emit("products", await products.get());

  socket.on("update", async (data) => {
    if ((data = "ok")) {
      io.sockets.emit("products", await products.get());
    }
  });

  socket.emit("messages", await Messages.getAll());

  socket.on("new-message", async function (data) {
    await Messages.guardar(data);
    io.sockets.emit("messages", await Messages.getAll());
  });
});

if (process.argv[2] === "cluster" && cluster.isMaster) {
  console.log("numCPUs: ", numCPUs);
  console.log(`Modo Cluster - PID MASTER ${process.pid}`);
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }
  cluster.on("exit", (worker) => {
    pinoWarn.warn("Worker", worker.process.pid, " died");
  });
} else {
  const server = app.listen(PORT, (err) => {
    if (!err)
      pinoInfo.info(
        `Modo Fork - Express server listening on port ${PORT} - PID WORKER ${process.pid}`
      );
  });
}

/* ------------------------------------------------------- */
server.on("error", (error) => console.log(`Server error ${error}`));
try {
  const mongo = new MongoDB("mongodb://localhost:27017/ecommerce");
  await mongo.conectar();
  pinoWarn.warn("MongoDB connected");
} catch (error) {
  pinoError.error(`Connection error: ${error}`);
}
