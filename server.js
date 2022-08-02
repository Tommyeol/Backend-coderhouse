const express = require("express");
const Container = require("./container");
const app = express();

app.get("/", (req, res) => {
  res.send("Welcome to the express server");
});

app.use(express.json());
app.use(express.static("public"));

app.get("/products", async (req, res) => {
  const contender = new Container("./products.txt");
  const products = await contender.getAll();
  console.log(products);
  res.json({ products });
});
app.get("/test", async (req, res) => {
  const contender = new Container("./products.txt");
  const product = await contender.randomItem(Math.floor(Math.random() * 3));
  res.json({ product });
});

const PORT = 4000;
const server = app.listen(PORT, () => {
  console.log(`Listening on port: ${server.address().port}`);
});

server.on("error", (err) => console.log(err));
