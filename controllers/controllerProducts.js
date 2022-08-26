import Container from "../controllers/container.js";

const products = new Container("./data/products.json");

//Get all products or selected
const getProducts = (req, res) => {
  if (req.params.id == undefined) return res.send(products.getAll());
  const id = Number(req.params.id);
  const product = products.getById(id);
  if (!product)
    return res
      .status(404)
      .send({ message: "ID doesn't belong to a listed product" });
  res.json(product);
};

//Add a product
const addProduct = (req, res) => {
  const { name, description, code, pic, price, stock } = req.body;
  products.save({ name, description, code, pic, price, stock });
  res.json({ message: "Product added" });
};

//Update product
const updateProduct = (req, res) => {
  const id = Number(req.params.id);
  if (id < 0 || id > products.objects.length)
    return res
      .status(400)
      .send({ message: "Enter the ID of a listed product" });
  if (isNaN(id))
    return res
      .status(400)
      .send({ message: "Enter the ID of a listed product" });
  products.update(id, req.body);
  res.json({ message: "Product updated" });
};

//Delete product
const deleteProduct = (req, res) => {
  const id = Number(req.params.id);
  if (isNaN(id))
    return res
      .status(400)
      .send({ message: "Enter the ID of a listed product" });
  const productDeleted = products.deleteById(id);
  if (productDeleted === -1)
    return res
      .status(404)
      .json({ message: "ID doesn't belong to a listed product" });
  res.json({ message: "Product eliminated" });
};

export { products, getProducts, addProduct, updateProduct, deleteProduct };
