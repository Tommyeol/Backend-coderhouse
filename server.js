const container = require("/container.js");
const list = "/test.txt";

const express = require("express");
const app = express();
app.get("/", (req, res) => {
  res.send("Welcome to the express server");
});
app.get("/store", (req, res) => {
  res.send(container.getAll());
});
app.get("/test", (req, res) => {
  res.send(products.randomItem);
});

const PORT = 8080;
const server = app.listen(PORT, () => {
  console.log(`Listening on port: ${server.address().port}`);
});

server.on("error", (err) => console.log(err));
