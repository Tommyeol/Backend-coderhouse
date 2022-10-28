import ProductsMongoDB from "../db/products.js";

class Products {
  constructor() {
    this.productsMongoDB = new ProductsMongoDB();
  }

  async get() {
    let products = await this.productsMongoDB.leer();
    return products.length ? products : [];
  }

  async listar(id) {
    let prod = await this.productsMongoDB.leer(id);
    console.log(prod);
    return prod || { error: "product not found" };
  }

  async listarAll() {
    let products = await this.productsMongoDB.leer();
    return products.length
      ? products
      : { error: "there is no loaded products" };
  }

  async guardar(prod) {
    return await this.productsMongoDB.guardar(prod);
  }

  async actualizar(prod, id) {
    return await this.productsMongoDB.actualizar(prod, id);
  }

  async borrar(id) {
    return await this.productsMongoDB.borrar(id);
  }
}

export default Productos;
