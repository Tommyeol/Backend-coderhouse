import express from "express";
import container from "./container.js";

const router = express.Router();
const products = new container("./tp4/products.json");

router.get("/api/products", async (req, res) => {
  const allProducts = await products.getAll();
  res.json(allProducts);
});

router.get("/api/products/:id", async (req, res) => {
  const idReq = req.params.id;
  console.log("idReq", idReq);
  const productId = await products.getById(+idReq);
  res.json(productId);
});

router.post("/api/products", async (req, res) => {
  console.log("el req", req.body);
  const productCreated = await products.save(req.body);
  if (productCreated > 0) {
    res.json({
      ok: true,
      message: "Has been added successfully",
      id: productCreated,
    });
  } else {
    res.json({
      ok: false,
      message: "Object is empty",
      error: "Can't create",
      id: productCreated,
    });
  }
});

//If you edit "Id" there is a client to modify values
router.post("/api/products/:id", async (req, res) => {
  console.log("el req", req.body);
  const productCreated = await products.saveById(req.body);
  if (productCreated > 0) {
    res.json({
      ok: true,
      message: "Has been edit successfully",
      id: productCreated,
    });
  } else {
    res.json({
      ok: false,
      message: "Can't edit ",
      error: "Product not found",
      id: productCreated,
    });
  }
});

// Can make through Postman but form is only available in Post
router.put("/api/products/:id", async (req, res) => {
  const productCreated = await products.saveById(req.body);
  if (productCreated > 0) {
    res.json({
      ok: true,
      message: "Has been edit successfully",
      id: productCreated,
    });
  } else {
    res.json({
      ok: false,
      message: "Can't edit ",
      error: "Product not found",
      id: productCreated,
    });
  }
});

// Can only access through Postman
router.delete("/api/products/:id", async (req, res) => {
  const productCreated = await products.deleteById(req.params.id);
  if (productCreated > 0) {
    res.json({
      ok: true,
      message: "Has been added successfully",
      id: productCreated,
    });
  } else {
    res.json({
      ok: false,
      message: "Can't execute",
      error: "Product not found",
      id: productCreated,
    });
  }
});

export { router as routerProducts };
