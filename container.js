import fs from "fs";

class container {
  constructor(file) {
    this.file = file;
  }
  async #readFile() {
    let products = [];
    let productsJson;
    try {
      products = await fs.promises.readFile(this.file, "utf-8");
    } catch (error) {
      console.error("File not found");
    }
    if (products === "") products = "[]";
    productsJson = JSON.parse(products);
    return productsJson;
  }
  async getLenght() {
    const productsJson = await this.#readFile();
    return productsJson.length;
  }
  async save(obj) {
    const productsJson = await this.#readFile();
    const ids = productsJson.map((obj) => obj.id);
    console.log(obj);
    let id = Math.max(...ids) + 1;
    if (Object.keys(obj).length !== 0) {
      try {
        if (productsJson.length > 0) {
          await fs.promises.writeFile(
            this.file,
            JSON.stringify([{ ...obj, id }, ...productsJson], null, 2),
            "utf8"
          );
          return id;
        } else {
          await fs.promises.writeFile(
            this.file,
            JSON.stringify([{ ...obj, id: 1 }], null, 2),
            "utf8"
          );
          return 1;
        }
      } catch (error) {
        console.error("File not saved");
      }
    } else {
      console.warn("No file to create");
      return -1;
    }
  }
  async saveById(obj) {
    const productsJson = await this.#readFile();
    const productIndex = productsJson.findIndex(
      (product) => parseInt(product.id) === parseInt(obj.id)
    );
    productsJson[productIndex] = obj;
    if (productsJson.length > 0) {
      await fs.promises.writeFile(
        this.file,
        JSON.stringify([...productsJson], null, 2),
        "utf8"
      );
      return obj.id;
    } else {
      return productIndex;
    }
  }
  async getById(id) {
    const productsJson = await this.#readFile();
    const productId = productsJson.find(
      (product) => parseInt(product.id) === parseInt(id)
    );
    if (productId) {
      console.log(productId);
      return productId;
    } else {
      console.warn("No product Id");
      return null;
    }
  }
  async getAll() {
    const productsJson = await this.#readFile();
    if (productsJson !== []) {
      console.log(productsJson);
      return productsJson;
    } else {
      console.warn("No products");
      return null;
    }
  }
  async deleteById(id) {
    const productsJson = await this.#readFile();
    const productNew = productsJson.filter(
      (product) => parseInt(product.id) !== parseInt(id)
    );
    if (productNew) {
      try {
        await fs.promises.writeFile(
          this.file,
          JSON.stringify([...productNew], null, 2),
          "utf8"
        );
        console.log(productNew);
      } catch (error) {
        console.error("Error saving", error);
      }
    } else {
      console.warn("There is no Id");
    }
  }
  async deleteAll() {
    try {
      await fs.promises.writeFile(this.file, "[]", "utf8");
    } catch (error) {
      console.error("The file is not saved ", error);
    }
  }
}

export default container;
