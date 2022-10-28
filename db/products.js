import * as model from "./model.js";

class ProductsMongoDB {
  constructor() {}

  leer(id) {
    return id ? model.products.find({ _id: id }) : model.products.find({});
  }

  guardar(producto) {
    const productoModel = new model.products(producto);
    return productoModel.save();
  }

  actualizar(producto, id) {
    return model.products.updateOne({ _id: id }, { $set: { ...producto } });
  }

  borrar(id) {
    return model.products.deleteOne({ _id: id });
  }
}

export default ProductsMongoDB;
