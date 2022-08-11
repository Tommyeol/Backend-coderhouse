const fs = require("fs");

class Container {
  constructor(ruta) {
    this.ruta = ruta;
  }

  async readFileFunction(ruta) {
    let archive = await fs.promises.readFile(ruta, "utf8");
    let archiveParsed = await JSON.parse(archive);
    return archiveParsed;
  }

  async save(obj) {
    try {
      let dataArchive = await this.readFileFunction(this.ruta);
      if (dataArchive.length) {
        // [].length = 0 -> false
        await fs.promises.writeFile(
          this.ruta,
          JSON.stringify(
            [...dataArchive, { ...obj, id: dataArchive.length + 1 }],
            null,
            2
          )
        );
      } else {
        await fs.promises.writeFile(
          this.ruta,
          JSON.stringify([{ ...obj, id: dataArchParse.length + 1 }], null, 2)
        );
        console.log(`File has id: ${dataArchive.length + 1}`);
      }
    } catch (error) {
      console.log("Read error", error);
    }
  }

  async updateById(obj) {
    try {
      let dataArch = await this.readFileFunction(this.ruta);
      const objIndex = dataArch.findIndex((prod) => prod.id === obj.id);
      if (objIndex !== -1) {
        dataArch[objIndex] = obj;
        await fs.promises.writeFile(
          this.ruta,
          JSON.stringify(dataArch, null, 2)
        );
        return { message: "Product updated" };
      } else {
        return { error: "Product not found" };
      }
    } catch (error) {
      console.log("Read error", error);
    }
  }

  async getById(id) {
    try {
      const dataArchive = await this.readFileFunction(this.ruta);
      const product = dataArchive.find((product) => product.id === id);
      if (product) {
        return product;
      } else {
        return { error: "Product not found" };
      }
    } catch (error) {
      console.log("There is no Id", error);
    }
  }

  async getAll() {
    try {
      const dataArchive = await this.readFileFunction(this.ruta);
      if (dataArchive.length) {
        //console.log(dataArchParse);
        return dataArchive;
      } else {
        console.log("There is no products");
      }
    } catch (error) {
      console.log("Read error", error);
    }
  }
  async deleteById(id) {
    try {
      const dataArchive = await this.readFileFunction(this.ruta);
      let product = dataArchive.find((product) => product.id === id);
      if (product) {
        const dataArchParseFilter = dataArchive.filter(
          (prod) => prod.id !== id
        );
        await fs.promises.writeFile(
          this.ruta,
          JSON.stringify(dataArchParseFilter, null, 2),
          "utf-8"
        );
        console.log("Product eliminated");
      } else {
        console.log("There is no product");
      }
    } catch (error) {
      console.log("There is no Id", error);
    }
  }
}

module.exports = { Container };
