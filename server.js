const express = require("express");
const handlebars = require("express-handlebars");
const app = express();

const { Container } = require("./contender");

app.use(express.urlencoded({ extended: true }));
const port = process.env.PORT || 8080;

const contender = new Container("./products.txt");

app.set("view engine", "hbs");
app.set("views", "./views/layouts");

app.use(express.static("public"));

app.engine(
  "hbs",
  handlebars.engine({
    extname: ".hbs",
    defaultLayout: "",
    layoutsDir: "",
    partialsDir: __dirname + "/views/partials",
  })
);

app.get("/", async (req, res) => {
  const product = await contender.getAll();
  res.render("index", {
    list: product,
    isList: true,
    product: true,
  });
});

app.get("/products", async (req, res) => {
  const product = await contender.getAll();
  res.render("products", {
    title: "Cosmetic products",
    list: product,
    isList: true,
    product: true,
  });
});

app.post("/products", async (req, res) => {
  const objProduct = req.body;
  contender.save(objProduct);
  isList = true;
  res.redirect("/products");
});

app.listen(port, (err) => {
  if (err) throw new Error(`Error starting server: ${err}`);
  console.log(`Server running on port ${port}`);
});
