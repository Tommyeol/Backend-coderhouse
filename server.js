const express = require("express");
const app = express();
const { Container } = require("./contender");

app.use(express.urlencoded({ extended: true }));
const port = process.env.PORT || 8080;

const contender = new Container("./products.txt");

app.set("view engine", "pug");
app.set("views", "./views");

app.get("/", async (req, res) => {
  const product = await contender.getAll();
  res.render("index", {
    title: "Cosmetic products",
    listProducts: product,
    isList: true,
    product: true,
  });
});

app.get("/products", async (req, res) => {
  const product = await contender.getAll();
  res.render("partials/products", {
    title: "Cosmetic products",
    listProducts: product,
    isList: true,
    product: true,
  });
});

app.post("/products", async (req, res) => {
  const objProduct = req.body;
  contender.save(objProduct);
  res.redirect("/products");
});

app.listen(port, (err) => {
  if (err) throw new Error(`Error starting server: ${err}`);
  console.log(`Server is running on port ${port}`);
});
